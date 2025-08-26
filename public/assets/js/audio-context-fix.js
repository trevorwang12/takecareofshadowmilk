// AudioContext fix for modern browsers
(function() {
    'use strict';
    
    // Flag to track if audio context has been initialized
    let audioContextInitialized = false;
    
    // Function to initialize audio context on user interaction
    function initializeAudioContext() {
        if (audioContextInitialized) return;
        
        try {
            // Create a temporary audio context to trigger user gesture requirement
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Resume the audio context if it's suspended
            if (audioContext.state === 'suspended') {
                audioContext.resume().then(() => {
                    console.log('AudioContext resumed successfully');
                }).catch(err => {
                    console.warn('Failed to resume AudioContext:', err);
                });
            }
            
            // Close the temporary context
            setTimeout(() => {
                audioContext.close();
            }, 100);
            
            audioContextInitialized = true;
            
            // Remove event listeners after initialization
            removeEventListeners();
            
        } catch (error) {
            console.warn('AudioContext initialization failed:', error);
        }
    }
    
    // Event listeners for user interactions
    const events = ['click', 'touchstart', 'touchend', 'keydown'];
    
    function addEventListeners() {
        events.forEach(event => {
            document.addEventListener(event, initializeAudioContext, { once: true, passive: true });
        });
    }
    
    function removeEventListeners() {
        events.forEach(event => {
            document.removeEventListener(event, initializeAudioContext);
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addEventListeners);
    } else {
        addEventListeners();
    }
    
    // Also try to initialize on window load
    window.addEventListener('load', addEventListeners);
    
})();