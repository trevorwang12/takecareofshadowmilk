// Iframe Error Handler for Scratch Games
// Handles common postMessage and JavaScript errors from embedded games

(function() {
    'use strict';
    
    // Handle postMessage errors silently
    window.addEventListener('message', function(event) {
        // Only process messages from trusted origins
        const trustedOrigins = [
            'https://scratch.mit.edu',
            'https://cdn.scratch.mit.edu'
        ];
        
        if (!trustedOrigins.includes(event.origin)) {
            return;
        }
        
        try {
            // Process trusted messages
            if (event.data && typeof event.data === 'object') {
                // Handle game state messages if needed
                if (event.data.type === 'scratch-project-loaded') {
                    console.debug('Scratch project loaded');
                }
            }
        } catch (error) {
            // Silently handle errors to prevent console spam
            console.debug('PostMessage handled:', error.message);
        }
    });
    
    // Suppress common Scratch-related JavaScript errors
    window.addEventListener('error', function(event) {
        const message = event.message || '';
        const source = event.filename || '';
        
        // Suppress duplicate identifier errors from Scratch
        if (message.includes('has already been declared')) {
            event.preventDefault();
            return false;
        }
        
        // Suppress cookie access errors from sandbox
        if (message.includes('sandboxed') && message.includes('cookie')) {
            event.preventDefault();
            return false;
        }
        
        // Suppress postMessage origin errors
        if (message.includes('target origin') && message.includes('recipient window')) {
            event.preventDefault();
            return false;
        }
        
        // Suppress security errors from iframe
        if (message.includes('SecurityError') && source.includes('scratch.mit.edu')) {
            event.preventDefault();
            return false;
        }
        
        // Allow other errors to show normally
        return true;
    });
    
    // Handle unhandled promise rejections from Scratch
    window.addEventListener('unhandledrejection', function(event) {
        const reason = event.reason || {};
        
        if (typeof reason === 'object' && reason.message) {
            // Suppress known Scratch-related promise rejections
            if (reason.message.includes('postMessage') || 
                reason.message.includes('sandboxed') ||
                reason.message.includes('origin')) {
                event.preventDefault();
                console.debug('Promise rejection handled:', reason.message);
            }
        }
    });
    
    console.debug('Iframe error handler initialized');
})();