import { NextRequest, NextResponse } from 'next/server'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Auth request received:', { 
      hasUsername: !!body.username, 
      hasPassword: !!body.password,
      usernameLength: body.username?.length || 0,
      passwordLength: body.password?.length || 0
    })
    
    const { username, password } = body
    
    // 环境变量调试信息
    console.log('Environment check:', {
      expectedUsername: ADMIN_USERNAME,
      expectedPassword: ADMIN_PASSWORD,
      receivedUsername: username,
      passwordMatch: password === ADMIN_PASSWORD,
      usernameMatch: username === ADMIN_USERNAME
    })
    
    // 检查用户名和密码是否正确
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      console.log('Authentication failed')
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    
    console.log('Authentication successful')
    
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