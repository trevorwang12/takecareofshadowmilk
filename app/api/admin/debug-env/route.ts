import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // 只在开发环境或本地环境中显示环境变量调试信息
  const isDevelopment = process.env.NODE_ENV === 'development'
  const isLocal = !process.env.VERCEL
  
  if (!isDevelopment && !isLocal) {
    return NextResponse.json({ error: 'Debug endpoint not available in production' }, { status: 403 })
  }

  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
  
  return NextResponse.json({
    environment: process.env.NODE_ENV || 'development',
    isVercel: !!process.env.VERCEL,
    hasAdminUsername: !!process.env.ADMIN_USERNAME,
    hasAdminPassword: !!process.env.ADMIN_PASSWORD,
    adminUsernameValue: ADMIN_USERNAME,
    adminPasswordLength: ADMIN_PASSWORD.length,
    adminPasswordHint: ADMIN_PASSWORD.substring(0, 2) + '*'.repeat(Math.max(0, ADMIN_PASSWORD.length - 2)),
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('ADMIN')).sort()
  })
}