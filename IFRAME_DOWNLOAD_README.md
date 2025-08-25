# iframe 游戏本地化部署指南

本指南说明如何将第三方 iframe 游戏下载并部署到自己的服务器。

## 1. 准备工作

需要的工具:
- Chrome 浏览器
- 文本编辑器
- Git (可选)

## 2. 下载游戏文件

1. 打开 Chrome 浏览器,访问游戏 iframe 页面
2. 按 F12 打开开发者工具
3. 切换到 Network (网络) 标签
4. 刷新页面,观察加载的资源
5. 在 Filter (过滤器) 中输入以下后缀逐个筛选:
   - .html
   - .js
   - .css 
   - .png/.jpg/.webp
   - .json
6. 右键点击每个资源 -> Save as... (另存为) 保存到本地
7. 保持文件的目录结构不变

或者使用wget命令一键下载:

```bash
wget --recursive --no-parent --no-clobber --page-requisites --html-extension --convert-links --restrict-file-names=windows --domains crazy-cattle3d.org --no-check-certificate https://crazy-cattle3d.org/game/crazycattle3d/v11/
```

参数说明:
- `--recursive`: 递归下载
- `--no-parent`: 不下载父级目录的文件
- `--no-clobber`: 不覆盖已存在的文件
- `--page-requisites`: 下载显示页面所需的所有文件
- `--html-extension`: 将下载的.html?query 格式文件保存为.html
- `--convert-links`: 转换文档中的链接为相对路径
- `--restrict-file-names=windows`: 限制文件名为Windows兼容格式
- `--domains crazy-cattle3d.org`: 限制wget只下载来自crazy-cattle3d.org域名的文件，忽略其他域名的资源
- `--no-check-certificate`: 不检查SSL证书

## 3. 整理文件结构

创建以下目录结构:
```
public/
  └── game/
      └── crazycattle3d/
          └── v11/
              ├── index.html
              ├── assets/
              │   ├── js/
              │   ├── css/
              │   └── images/
              └── config/
```

## 4. 修改配置

1. 检查 index.html 中的资源路径,确保都使用相对路径
2. 修改项目配置:

```js
// config/content.ts
gameSection: {
  game: {
    url: '/crazy-cattle-3d.embed',
    externalUrl: '/game/crazycattle3d/v11/index.html'
  }
}

// next.config.js
async rewrites() {
  return [
    {
      source: '/crazy-cattle-3d.embed',
      destination: '/game/crazycattle3d/v11/index.html',
    },
  ]
}
```

## 5. 测试

1. 本地测试:
```bash
npm run dev
```
2. 访问 http://localhost:3000 验证游戏是否正常加载
3. 检查以下内容:
   - 游戏资源是否完整加载
   - 游戏交互是否正常
   - 控制台是否有报错

## 6. 部署

1. 提交代码到 GitHub
2. Vercel 会自动部署
3. 验证线上环境游戏运行情况

## 常见问题

1. 资源 404
- 检查文件路径是否正确
- 确认文件大小写是否匹配

2. 跨域问题
- 检查资源是否都在同一域名下
- 必要时配置 CORS 头

3. 游戏无法加载
- 检查 Network 面板是否有资源加载失败
- 验证 rewrites 配置是否正确

## 注意事项

1. 确保有游戏资源的使用授权
2. 保留原有的版权信息
3. 定期同步更新游戏版本
4. 建议保存一份原始文件备份

## 维护建议

1. 记录版本号和更新时间
2. 做好文件备份
3. 监控游戏运行状态
4. 保持与游戏源站同步更新

