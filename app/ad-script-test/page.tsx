"use client"

export default function AdScriptTestPage() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>广告脚本测试页面</h1>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>测试1: 直接HTML脚本 (revenuecpmgate.com)</h2>
        <div style={{ border: '2px solid #ff6b6b', padding: '20px', minHeight: '100px' }}>
          <div 
            dangerouslySetInnerHTML={{
              __html: `<script async="async" data-cfasync="false" src="//pl27550504.revenuecpmgate.com/7f4e324f2b07a5d92952cf5ac8a8dd2f/invoke.js"></script>
<div id="container-7f4e324f2b07a5d92952cf5ac8a8dd2f"></div>`
            }}
          />
        </div>
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>测试2: 直接HTML脚本 (highperformanceformat.com)</h2>
        <div style={{ border: '2px solid #4ecdc4', padding: '20px', minHeight: '200px' }}>
          <div 
            dangerouslySetInnerHTML={{
              __html: `<script type="text/javascript">
	atOptions = {
		'key' : 'd01b6a20602175d470ff4d3f0b9e70b9',
		'format' : 'iframe',
		'height' : 300,
		'width' : 160,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/d01b6a20602175d470ff4d3f0b9e70b9/invoke.js"></script>`
            }}
          />
        </div>
      </div>
      
      <div style={{ marginBottom: '20px', padding: '15px', background: '#d1ecf1', borderRadius: '8px' }}>
        <h3>📋 测试说明</h3>
        <ul>
          <li>如果看到广告内容，说明外部脚本工作正常</li>
          <li>如果只看到空框，可能是广告屏蔽器或网络问题</li>
          <li>脚本可能需要几秒钟加载时间</li>
          <li>某些广告可能有地理位置限制</li>
        </ul>
      </div>
    </div>
  )
}