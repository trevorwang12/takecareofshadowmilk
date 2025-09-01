# 🚀 Quick Start Guide | 快速开始指南

Get your gaming website live in **5 minutes** with cloud deployment!

5分钟内让你的游戏网站在云端上线！

## ⚡ **1. Clone & Install | 克隆安装**

```bash
git clone <your-repo-url>
cd worldguessr
npm install
```

## 🔧 **2. Development Setup | 开发设置**

```bash
# Start development server
npm run dev

# Visit your site
# 网站: http://localhost:3000
# 管理面板: http://localhost:3000/admin
```

**Default Admin Login | 默认管理员登录:**
- Username: `admin`
- Password: `admin123`

## ☁️ **3. Deploy to Cloud | 部署到云端**

### **Option A: Vercel (Recommended)**

1. **One-Click Deploy:**
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

2. **Set Environment Variables in Vercel Dashboard:**
   ```bash
   NEXT_PUBLIC_SITE_URL=https://yourdomain.vercel.app
   NEXT_PUBLIC_ADMIN_USERNAME=your_admin
   NEXT_PUBLIC_ADMIN_PASSWORD=secure_password_123
   ADMIN_TOKEN=your-secure-token-here
   ```

### **Option B: Netlify**

1. **One-Click Deploy:**
   [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

2. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Set same environment variables as above

## 🎮 **4. Add Your Games | 添加游戏**

1. **Access Admin Panel:** `https://yourdomain.com/admin`
2. **Go to "Games" Tab | 进入"游戏"标签**
3. **Click "Add Game" | 点击"添加游戏"**
4. **Fill Game Information | 填写游戏信息:**
   - Name & Description
   - Game URL (iframe link)
   - Category & Tags
   - Thumbnail Image URL

## ⚙️ **5. Customize Your Site | 自定义网站**

### **SEO Settings | SEO设置**
- **Admin Panel → SEO Settings**
- Update site name, description, keywords
- Configure social media settings

### **Homepage Content | 首页内容**
- **Admin Panel → Homepage**
- Customize hero section
- Update FAQ, features, "What is" sections

### **Advertisement | 广告设置**
- **Admin Panel → Advertisements** 
- Configure 8+ ad positions
- Add custom HTML ad codes

## 🎯 **Key Features | 主要功能**

✅ **Cloud-Ready:** Zero file system dependencies  
✅ **Real-time Updates:** Admin changes reflect instantly  
✅ **Performance Optimized:** 81% smaller admin panel  
✅ **SEO Friendly:** Comprehensive SEO management  
✅ **Mobile Responsive:** Perfect on all devices  
✅ **Secure:** Admin authentication & security headers  

## 📁 **Important Files | 重要文件**

```
📁 Key Configuration Files
├── .env.example          # Environment variables template
├── vercel.json            # Vercel deployment config  
├── netlify.toml           # Netlify deployment config
├── DEPLOYMENT.md          # Complete deployment guide
└── data/
    ├── games.json         # Games database
    ├── categories.json    # Game categories  
    └── *.json             # Other configurations
```

## 🆘 **Need Help? | 需要帮助？**

- 📖 **Full Documentation:** [README.md](./README.md)
- 🚀 **Deployment Guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)  
- 🐛 **Issues:** Check troubleshooting section in README

## 🎉 **Success! | 成功！**

Your gaming website is now live! 🎮

你的游戏网站现在已经上线了！🎮

**Next Steps:**
1. Change admin password
2. Add more games via admin panel
3. Customize branding & SEO
4. Configure advertisements
5. Share with the world! 🌍

---

**Happy Gaming! | 游戏愉快！** 🎮✨