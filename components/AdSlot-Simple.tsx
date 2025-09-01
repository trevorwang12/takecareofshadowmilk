"use client"

import { useEffect, useState, useRef } from 'react'

interface AdSlotProps {
  position: 'header' | 'footer' | 'sidebar' | 'hero-bottom' | 'content-top' | 'game-details-bottom' | 'content-bottom' | 'recommendations-top'
  className?: string
}

export default function AdSlotSimple({ position, className = '' }: AdSlotProps) {
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [debugInfo, setDebugInfo] = useState<string>('Loading...')
  const hasLoaded = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Only load once
    if (hasLoaded.current) {
      return
    }
    
    hasLoaded.current = true
    
    const loadAds = async () => {
      try {
        setDebugInfo('Fetching ads...')
        const response = await fetch('/api/ads')
        if (response.ok) {
          const data = await response.json()
          setDebugInfo(`API returned ${data.length} ads`)
          const filteredAds = data.filter((ad: any) => ad.position === position)
          setDebugInfo(`Found ${filteredAds.length} ads for position ${position}`)
          if (filteredAds.length > 0) {
            let adContent = filteredAds[0].htmlContent
            
            // Fix duplicate container ID issues by making them unique
            const uniqueId = `${filteredAds[0].id}-${position}-${Date.now()}`
            adContent = adContent.replace(/container-[a-f0-9]+/g, `container-${uniqueId}`)
            
            setHtmlContent(adContent)
            setDebugInfo(`Ad loaded: ${filteredAds[0].id} (fixed IDs)`)
          } else {
            setDebugInfo(`No ads for position: ${position}`)
          }
        } else {
          setDebugInfo(`API error: ${response.status}`)
        }
      } catch (error) {
        console.error(`AdSlot-${position} load error:`, error)
        setDebugInfo(`Error: ${error}`)
      }
    }
    
    loadAds()
  }, [position])
  
  // Execute scripts after content is set - using iframe method for better compatibility
  useEffect(() => {
    if (htmlContent && containerRef.current) {
      // Wait for DOM to be ready
      setTimeout(() => {
        setDebugInfo(prev => prev + ' | Loading...')
        
        // Try iframe method for better script isolation
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        document.body.appendChild(iframe)
        
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
        if (iframeDoc) {
          // Set up the iframe document
          iframeDoc.open()
          iframeDoc.write(`
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { margin: 0; padding: 0; }
                .ad-container { width: 100%; height: auto; }
              </style>
            </head>
            <body>
              <div class="ad-container">${htmlContent}</div>
              <script>
                // Forward ad content to parent
                setTimeout(function() {
                  var containers = document.querySelectorAll('[id^="container-"]');
                  var hasContent = false;
                  containers.forEach(function(container) {
                    if (container.children.length > 0 || container.innerHTML.trim()) {
                      hasContent = true;
                      // Copy content to parent
                      parent.postMessage({
                        type: 'adContent',
                        position: '${position}',
                        content: container.outerHTML
                      }, '*');
                    }
                  });
                  
                  parent.postMessage({
                    type: 'adStatus', 
                    position: '${position}',
                    containers: containers.length,
                    hasContent: hasContent
                  }, '*');
                }, 3000);
              </script>
            </body>
            </html>
          `)
          iframeDoc.close()
          
          setDebugInfo(prev => prev + ' | Iframe: ✅')
          
          // Clean up iframe after timeout
          setTimeout(() => {
            if (iframe.parentNode) {
              iframe.parentNode.removeChild(iframe)
            }
          }, 10000)
        } else {
          setDebugInfo(prev => prev + ' | Iframe: ❌')
          
          // Fallback to direct script execution
          const scripts = containerRef.current?.querySelectorAll('script') || []
          scripts.forEach((script, index) => {
            try {
              if (script.src) {
                // Try to load external script with fetch first to check if accessible
                fetch(script.src, { mode: 'no-cors' })
                  .then(() => {
                    const newScript = document.createElement('script')
                    newScript.src = script.src
                    newScript.async = true
                    newScript.onload = () => setDebugInfo(prev => prev + ` | Script${index + 1}: ✅`)
                    newScript.onerror = () => setDebugInfo(prev => prev + ` | Script${index + 1}: ❌CORS`)
                    document.head.appendChild(newScript)
                  })
                  .catch(() => {
                    setDebugInfo(prev => prev + ` | Script${index + 1}: ❌FETCH`)
                  })
              } else if (script.textContent) {
                // Try to execute inline script
                try {
                  new Function(script.textContent)()
                  setDebugInfo(prev => prev + ` | Script${index + 1}: ✅INLINE`)
                } catch (e) {
                  setDebugInfo(prev => prev + ` | Script${index + 1}: ❌EXEC`)
                  console.error('Script execution error:', e)
                }
              }
            } catch (e) {
              setDebugInfo(prev => prev + ` | Script${index + 1}: ❌ERR`)
              console.error('Script processing error:', e)
            }
          })
        }
      }, 100)
    }
  }, [htmlContent, position])
  
  // Listen for iframe messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'adStatus' && event.data.position === position) {
        setDebugInfo(prev => prev + ` | Containers: ${event.data.containers} | Content: ${event.data.hasContent ? '✅' : '⏳'}`)
      } else if (event.data.type === 'adContent' && event.data.position === position) {
        // Inject the ad content directly into our container
        if (containerRef.current) {
          const adDiv = document.createElement('div')
          adDiv.innerHTML = event.data.content
          adDiv.style.cssText = 'width: 100%; height: auto; display: block;'
          containerRef.current.appendChild(adDiv)
          setDebugInfo(prev => prev + ' | Injected: ✅')
        }
      }
    }
    
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [position])
  
  return (
    <div className={`ad-slot ad-slot-${position} ${className}`}>
      {/* Temporary debug info */}
      <div style={{
        background: '#f0f0f0',
        border: '1px solid #ccc',
        padding: '10px',
        margin: '5px 0',
        fontSize: '12px',
        color: '#333'
      }}>
        🔍 AdSlot-{position}: {debugInfo}
        {htmlContent && <div>✅ Content loaded ({htmlContent.length} chars)</div>}
      </div>
      
      {/* Test ad to verify mechanism works */}
      {position === 'header' && (
        <div style={{
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
          borderRadius: '8px',
          margin: '10px 0'
        }}>
          🧪 TEST AD - If you see this, the ad mechanism works!
        </div>
      )}
      
      {/* Ad content */}
      {htmlContent && (
        <div 
          ref={containerRef}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          suppressHydrationWarning={true}
        />
      )}
    </div>
  )
}