# 🚀 部署指南

本项目已针对云端部署进行了全面优化，支持 Vercel、Netlify 等主流云平台。

## ✅ 云端部署兼容性

### 已解决的问题
- ✅ **文件系统操作**：所有API改为内存存储，支持只读文件系统
- ✅ **文件上传**：改为Base64内存存储，无需本地文件系统
- ✅ **数据持久化**：使用内存+默认JSON配置的混合模式
- ✅ **环境变量**：完整支持生产环境配置

### 存储架构
- **内存存储**：所有管理员配置保存在内存中
- **重启恢复**：服务重启后自动从JSON默认配置恢复
- **云端友好**：完全兼容Vercel、Netlify等无状态部署

---

## 🔧 部署到 Vercel

### 1. 准备工作
```bash
# 克隆项目
git clone <your-repo-url>
cd worldguessr

# 安装依赖
npm install
```

### 2. 环境变量配置
在 Vercel 控制台设置以下环境变量：

```bash
# 必需配置
NEXT_PUBLIC_SITE_URL=https://yourdomain.vercel.app
NEXT_PUBLIC_SITE_NAME=Your Games Site
ADMIN_TOKEN=your-super-secure-token-here

# 管理员登录
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password

# 可选配置
NEXT_PUBLIC_FEATURED_GAMES_COUNT=8
NEXT_PUBLIC_HOT_GAMES_COUNT=8
UPLOAD_MAX_SIZE=5242880
```

### 3. 部署
```bash
# 使用 Vercel CLI
npm i -g vercel
vercel

# 或直接连接 Git 仓库到 Vercel
```

---

## 🌐 部署到 Netlify

### 1. 构建配置
项目已包含 `netlify.toml` 配置文件，支持：
- 自动构建和部署
- API路由重写
- 静态资源缓存
- 安全头设置

### 2. 环境变量
在 Netlify 控制台的 Environment Variables 中设置：
```bash
NEXT_PUBLIC_SITE_URL=https://yoursite.netlify.app
ADMIN_TOKEN=your-secure-token
# ... 其他环境变量
```

### 3. 部署
- 连接 Git 仓库到 Netlify
- 构建命令：`npm run build`
- 发布目录：`.next`

---

## 🏗️ 部署到其他平台

### Railway
```bash
# 环境变量
PORT=3000
NEXT_PUBLIC_SITE_URL=https://yourapp.railway.app
```

### Render
```bash
# 构建命令
npm install && npm run build

# 启动命令  
npm start
```

---

## ⚙️ 环境变量详解

### 必需配置
| 变量名 | 描述 | 示例值 |
|--------|------|--------|
| `NEXT_PUBLIC_SITE_URL` | 网站完整URL | `https://yourgames.com` |
| `ADMIN_TOKEN` | 文件上传API令牌 | `secure-token-123` |

### 管理员配置
| 变量名 | 描述 | 默认值 |
|--------|------|--------|
| `ADMIN_USERNAME` | 管理员用户名 | `admin` |
| `ADMIN_PASSWORD` | 管理员密码 | `password` |

### 功能配置
| 变量名 | 描述 | 默认值 |
|--------|------|--------|
| `UPLOAD_MAX_SIZE` | 文件上传大小限制(字节) | `5242880` (5MB) |
| `NEXT_PUBLIC_FEATURED_GAMES_COUNT` | 精选游戏数量 | `8` |
| `NEXT_PUBLIC_HOT_GAMES_COUNT` | 热门游戏数量 | `8` |

---

## 📊 性能优化

### 已启用的优化
- ✅ 图片优化 (Next.js Image)
- ✅ 代码分割和懒加载
- ✅ 静态资源压缩
- ✅ 生产环境Console移除
- ✅ Radix UI组件包优化

### 缓存策略
- **API响应**：无缓存，实时数据
- **静态资源**：长期缓存 (1年)
- **图片资源**：中期缓存 (1天)

---

## 🔒 安全配置

### 安全头
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

### 管理面板保护
- 基于用户名/密码的认证
- API访问令牌验证
- 仅限管理员访问敏感功能

---

## 🐛 故障排除

### 常见问题

1. **构建失败**
   ```bash
   # 清除缓存并重新构建
   rm -rf .next node_modules
   npm install
   npm run build
   ```

2. **环境变量不生效**
   - 确保变量名正确，区分大小写
   - `NEXT_PUBLIC_` 前缀的变量会暴露给客户端
   - 修改后需要重新部署

3. **管理面板无法访问**
   - 检查 `ADMIN_USERNAME/PASSWORD` 设置
   - 确保在 `/admin` 路径访问

4. **文件上传失败**
   - 检查 `ADMIN_TOKEN` 环境变量
   - 确保文件大小在限制内
   - 验证文件格式在允许列表中

### 日志查看
```bash
# Vercel
vercel logs

# Netlify
netlify logs

# 本地调试
npm run dev
```

---

## 📈 监控和分析

### 推荐集成
- **Vercel Analytics**：访问统计和性能监控
- **Google Analytics**：详细的用户行为分析
- **Sentry**：错误监控和性能追踪

### 配置示例
```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

---

## 🔄 更新和维护

### 日常维护
1. 定期更新依赖包
2. 监控性能指标
3. 备份重要配置
4. 检查安全更新

### 数据管理
- **配置数据**：重启后恢复默认值
- **上传文件**：存储为Base64，重启后丢失
- **建议**：重要数据定期导出备份

---

需要帮助？查看 [项目文档](README.md) 或提交 Issue。