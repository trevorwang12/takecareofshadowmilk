// Global error suppression for Scratch iframe issues
(function() {
    'use strict';
    
    // Store original console methods
    const originalError = console.error;
    const originalWarn = console.warn;
    
    // Override console.error to suppress Scratch-related errors
    console.error = function(...args) {
        const message = args.join(' ');
        
        // List of error messages to suppress
        const suppressedErrors = [
            'Failed to read the \'cookie\' property from \'Document\'',
            'The document is sandboxed and lacks the \'allow-same-origin\' flag',
            'Failed to execute \'postMessage\' on \'DOMWindow\'',
            'The target origin provided',
            'does not match the recipient window\'s origin',
            'SecurityError',
            'SyntaxError: Identifier',
            'has already been declared',
            'WebSocket connection to',
            'failed: WebSocket is closed',
            'gamedistribution.com',
            'BackgroundUtils',
            'StringUtils',
            'CommonUtils',
            'The document is sandboxed',
            'allow-same-origin'
        ];
        
        // Check if the error should be suppressed
        const shouldSuppress = suppressedErrors.some(errorText => 
            message.includes(errorText)
        );
        
        if (!shouldSuppress) {
            originalError.apply(console, args);
        }
    };
    
    // Override console.warn to suppress Scratch-related warnings
    console.warn = function(...args) {
        const message = args.join(' ');
        
        // List of warning messages to suppress
        const suppressedWarnings = [
            'An iframe which has both allow-scripts and allow-same-origin',
            'can escape its sandboxing',
            'Immersive Translate WARN',
            'sandbox attribute'
        ];
        
        // Check if the warning should be suppressed
        const shouldSuppress = suppressedWarnings.some(warningText => 
            message.includes(warningText)
        );
        
        if (!shouldSuppress) {
            originalWarn.apply(console, args);
        }
    };
    
    // Suppress window errors
    window.addEventListener('error', function(event) {
        const message = event.message || '';
        
        const suppressedErrors = [
            'Failed to read the \'cookie\' property',
            'SecurityError',
            'SyntaxError: Identifier',
            'has already been declared',
            'sandboxed',
            'BackgroundUtils',
            'StringUtils', 
            'CommonUtils',
            'The document is sandboxed',
            'allow-same-origin'
        ];
        
        const shouldSuppress = suppressedErrors.some(errorText => 
            message.includes(errorText)
        );
        
        if (shouldSuppress) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    }, true);
    
    // Suppress unhandled promise rejections
    window.addEventListener('unhandledrejection', function(event) {
        const message = (event.reason && event.reason.message) || '';
        
        const suppressedErrors = [
            'Failed to read the \'cookie\' property',
            'SecurityError',
            'sandboxed'
        ];
        
        const shouldSuppress = suppressedErrors.some(errorText => 
            message.includes(errorText)
        );
        
        if (shouldSuppress) {
            event.preventDefault();
            return false;
        }
    });
    
})();