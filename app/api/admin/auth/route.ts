import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    // 检查密码是否正确
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }
    
    // 创建响应，设置认证cookie
    const response = NextResponse.json({ success: true, message: 'Authentication successful' })
    
    // 设置认证cookie，24小时过期
    response.cookies.set('admin-auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    })
    
    return response
  } catch (error) {
    console.error('Authentication error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  // 检查认证状态
  const authCookie = request.cookies.get('admin-auth')
  
  if (authCookie?.value === 'authenticated') {
    return NextResponse.json({ authenticated: true })
  }
  
  return NextResponse.json({ authenticated: false }, { status: 401 })
}

export async function DELETE(request: NextRequest) {
  // 登出 - 清除认证cookie
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' })
  response.cookies.delete('admin-auth')
  return response
}