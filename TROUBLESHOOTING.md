# 故障排除指南 / Troubleshooting Guide

## 🚨 常见问题和解决方案 / Common Issues and Solutions

### 1. 生产环境内容不显示 / Production Content Not Showing

#### 症状 / Symptoms:
- ✅ 本地开发环境：Admin 面板设置的内容正常显示
- ❌ 生产环境：页面显示空白或默认内容
- ❌ Custom HTML、Footer、Featured Games 等配置丢失

#### 根本原因 / Root Cause:
前端组件尝试从被禁用的 Admin API 获取数据

#### 解决方案 / Solution:
**已修复** ✅ - 项目已创建公共 API 解决此问题：

```javascript
// 修复前 - 调用 Admin API (被阻止)
fetch('/api/admin/homepage')
fetch('/api/admin/footer')

// 修复后 - 调用公共 API (正常工作)
fetch('/api/homepage')
fetch('/api/footer')
```

#### 验证方法 / Verification:
```bash
# 检查公共 API 是否正常工作
curl https://your-domain.vercel.app/api/homepage
curl https://your-domain.vercel.app/api/footer
curl https://your-domain.vercel.app/api/ads
```

---

### 2. Admin 面板无法访问 / Admin Panel Inaccessible

#### 症状 / Symptoms:
- 🌐 生产环境访问 `/admin` 显示 403 Forbidden
- 🔒 页面显示 "Access Denied" 或 "Admin functionality is disabled"

#### 根本原因 / Root Cause:
这是**正常的安全行为**！生产环境默认禁用 Admin 功能

#### 解决方案 / Solution:

**选项 1: 推荐 - 使用本地开发流程**
```bash
# 1. 本地开发和配置
npm run dev
# 访问 http://localhost:5050/admin

# 2. 完成配置后推送
git add .
git commit -m "Update content"
git push

# 3. 自动部署，内容生效
```

**选项 2: 临时启用生产 Admin (不推荐)**
```bash
# 在 Vercel 环境变量中设置
ENABLE_ADMIN=true
```

⚠️ **安全提醒**: 生产环境启用 Admin 存在安全风险，建议仅用于紧急修复

---

### 3. 广告不显示 / Ads Not Displaying

#### 症状 / Symptoms:
- 广告位置显示空白
- 控制台没有错误信息
- 广告脚本没有加载

#### 可能原因和解决方案 / Possible Causes and Solutions:

#### 原因 1: 广告状态未激活
```javascript
// 检查广告配置
{
  "id": "header-banner",
  "isActive": false, // ← 改为 true
  "htmlContent": "<script>...</script>"
}
```

#### 原因 2: 广告脚本安全验证失败
```javascript
// 检查域名是否在白名单
const trustedAdDomains = [
  'googlesyndication.com',
  'highperformanceformat.com', // 确保域名在列表中
  // ... 其他域名
]
```

#### 原因 3: 广告脚本格式错误
```html
<!-- ✅ 正确格式 -->
<script type="text/javascript">
  atOptions = {
    'key': 'your-key',
    'format': 'iframe',
    'height': 300,
    'width': 160
  };
</script>
<script type="text/javascript" src="//trusted-domain.com/script.js"></script>

<!-- ❌ 错误格式 -->
<script>alert('dangerous code')</script>
```

---

### 4. 数据修改不生效 / Data Changes Not Taking Effect

#### 症状 / Symptoms:
- Admin 面板中修改了设置
- 页面刷新后仍显示旧内容
- 修改似乎没有保存

#### 解决方案 / Solution:

#### 本地开发环境:
```javascript
// 1. 检查浏览器控制台错误
// 2. 重新加载页面
// 3. 清除浏览器缓存

// 4. 如果问题持续，重启开发服务器
npm run dev
```

#### 生产环境:
```bash
# 1. 确保推送了最新修改
git status
git add .
git commit -m "Update configuration"
git push

# 2. 等待 Vercel 自动重新部署
# 3. 清除浏览器缓存
```

---

### 5. 构建错误 / Build Errors

#### 症状 / Symptoms:
```bash
Type error: Property 'xxx' does not exist on type 'yyy'
```

#### 解决方案 / Solution:

#### TypeScript 类型错误:
```bash
# 临时解决 - 忽略类型错误
npm run build
# 构建配置已设置 ignoreBuildErrors: true
```

#### ESLint 错误:
```bash
# 临时解决 - 忽略 Lint 错误  
npm run build
# 构建配置已设置 ignoreDuringBuilds: true
```

#### 永久解决:
```typescript
// 修复具体的类型定义
interface YourInterface {
  xxx: string // 添加缺失的属性
}
```

---

### 6. 环境变量问题 / Environment Variables Issues

#### 症状 / Symptoms:
- 功能在本地工作，部署后不工作
- Admin 功能意外启用/禁用

#### 检查清单 / Checklist:

```bash
# 本地开发环境变量
NODE_ENV=development
ENABLE_ADMIN=true

# Vercel 生产环境变量
NODE_ENV=production  
ENABLE_ADMIN=false
```

#### Vercel 环境变量设置:
1. 访问 Vercel 项目设置
2. 进入 "Environment Variables" 
3. 添加/修改变量
4. 重新部署项目

---

### 7. 性能问题 / Performance Issues

#### 症状 / Symptoms:
- 页面加载缓慢
- 图片加载慢
- JavaScript 执行卡顿

#### 解决方案 / Solutions:

#### 图片优化:
```javascript
// 使用 Next.js Image 组件
import Image from 'next/image'

<Image
  src="/game-image.jpg"
  alt="Game"
  width={400}
  height={300}
  priority={true} // 关键图片优先加载
/>
```

#### 代码分割:
```javascript
// 动态导入大型组件
const AdminPanel = dynamic(() => import('./AdminPanel'), {
  loading: () => <p>Loading...</p>
})
```

#### 缓存策略:
```javascript
// API 响应已配置适当的缓存头
'Cache-Control': 's-maxage=60, stale-while-revalidate'
```

---

## 🔍 调试工具 / Debugging Tools

### 1. 浏览器开发者工具 / Browser DevTools

#### 网络面板:
- 检查 API 请求状态
- 查看加载时间
- 识别失败的资源

#### 控制台:
- 查看 JavaScript 错误
- 检查 API 响应
- 调试组件状态

### 2. Vercel 部署日志 / Vercel Deploy Logs

```bash
# 访问 Vercel 控制台查看:
# 1. 构建日志 - 查看构建过程错误
# 2. 函数日志 - 查看 API 执行情况  
# 3. 部署状态 - 确认部署成功
```

### 3. 本地调试命令 / Local Debug Commands

```bash
# 构建测试
npm run build
npm start

# 类型检查
npx tsc --noEmit

# 依赖分析
npm run build:analyze
```

---

## 🆘 获取帮助 / Getting Help

### 1. 检查现有文档 / Check Existing Documentation

- 📖 `WORKFLOW_GUIDE.md` - 完整工作流程
- 📋 `PRODUCTION_CHECKLIST.md` - 部署检查清单
- 💾 `DATA_PERSISTENCE_SOLUTION.md` - 数据持久化方案

### 2. 系统信息收集 / System Information Collection

遇到问题时，请提供以下信息：

```bash
# 环境信息
Node.js 版本: node --version
npm 版本: npm --version
操作系统: [Windows/macOS/Linux]

# 项目信息
分支: git branch
最后提交: git log -1 --oneline
修改状态: git status

# 错误信息
浏览器控制台错误: [截图或复制文本]
Vercel 部署日志: [相关错误部分]
```

### 3. 常见解决步骤 / Common Resolution Steps

遇到任何问题时，按以下顺序尝试：

```bash
# 1. 清除缓存
rm -rf .next node_modules
npm install

# 2. 重启开发服务器
npm run dev

# 3. 检查并推送最新修改
git status
git add .
git commit -m "Fix: [描述修改]"
git push

# 4. 等待自动部署完成
# 5. 清除浏览器缓存
```

---

## ✅ 预防措施 / Prevention Measures

### 1. 开发最佳实践 / Development Best Practices

- 📝 **定期提交**: 每次功能完成后立即提交
- 🧪 **本地测试**: 推送前在本地验证所有功能
- 📋 **环境检查**: 确保开发和生产环境变量正确
- 🔄 **定期更新**: 保持依赖包最新版本

### 2. 部署前检查 / Pre-Deployment Checklist

- [ ] 本地构建成功: `npm run build`
- [ ] 所有修改已提交: `git status`
- [ ] 环境变量正确设置
- [ ] Admin 面板功能验证
- [ ] 关键页面功能测试

### 3. 监控和维护 / Monitoring and Maintenance

- 📊 **性能监控**: 定期检查页面加载速度
- 🔍 **错误监控**: 关注 Vercel 函数执行状态
- 🔄 **定期备份**: 重要配置变更前备份
- 📈 **使用分析**: 通过 Vercel Analytics 监控使用情况

记住：**预防胜过治疗**！遵循最佳实践可以避免大多数常见问题。🎯