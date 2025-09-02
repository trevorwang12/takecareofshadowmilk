'use client'

interface AdminAuth {
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
const AUTH_KEY = 'admin_auth_token'
const AUTH_EXPIRY_KEY = 'admin_auth_expiry'
const LOGIN_ATTEMPTS_KEY = 'admin_login_attempts'
const LOGIN_LOCKOUT_KEY = 'admin_lockout_until'

const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15分钟

// 生成简单的认证令牌
const generateAuthToken = (): string => {
  return btoa(Date.now().toString() + Math.random().toString(36))
}

// 检查认证状态
const checkAuthStatus = (): boolean => {
  if (typeof window === 'undefined') return false
  
  const token = localStorage.getItem(AUTH_KEY)
  const expiry = localStorage.getItem(AUTH_EXPIRY_KEY)
  
  if (!token || !expiry) return false
  
  const expiryTime = parseInt(expiry)
  if (Date.now() > expiryTime) {
    // 令牌已过期，清除
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem(AUTH_EXPIRY_KEY)
    return false
  }
  
  return true
}

// 检查登录锁定状态
const isLockedOut = (): boolean => {
  if (typeof window === 'undefined') return false
  
  const lockoutUntil = localStorage.getItem(LOGIN_LOCKOUT_KEY)
  if (!lockoutUntil) return false
  
  const lockoutTime = parseInt(lockoutUntil)
  if (Date.now() > lockoutTime) {
    // 锁定时间已过，清除锁定
    localStorage.removeItem(LOGIN_LOCKOUT_KEY)
    localStorage.removeItem(LOGIN_ATTEMPTS_KEY)
    return false
  }
  
  return true
}

// 记录失败登录尝试
const recordFailedAttempt = (): void => {
  if (typeof window === 'undefined') return
  
  const attempts = parseInt(localStorage.getItem(LOGIN_ATTEMPTS_KEY) || '0') + 1
  localStorage.setItem(LOGIN_ATTEMPTS_KEY, attempts.toString())
  
  if (attempts >= MAX_LOGIN_ATTEMPTS) {
    const lockoutUntil = Date.now() + LOCKOUT_DURATION
    localStorage.setItem(LOGIN_LOCKOUT_KEY, lockoutUntil.toString())
    console.warn(`账户已被锁定 ${LOCKOUT_DURATION / 60000} 分钟，由于连续 ${MAX_LOGIN_ATTEMPTS} 次登录失败`)
  }
}

// 清除登录尝试记录
const clearLoginAttempts = (): void => {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem(LOGIN_ATTEMPTS_KEY)
  localStorage.removeItem(LOGIN_LOCKOUT_KEY)
}

// 登录函数（增强安全性）
const login = (username: string, password: string): { success: boolean; message?: string } => {
  // 检查是否被锁定
  if (isLockedOut()) {
    const lockoutUntil = localStorage.getItem(LOGIN_LOCKOUT_KEY)
    const remainingTime = Math.ceil((parseInt(lockoutUntil!) - Date.now()) / 60000)
    return { 
      success: false, 
      message: `账户已被锁定，请等待 ${remainingTime} 分钟后重试` 
    }
  }
  
  // 输入验证
  if (!username?.trim() || !password?.trim()) {
    return { success: false, message: '用户名和密码不能为空' }
  }
  
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    recordFailedAttempt()
    const attempts = parseInt(localStorage.getItem(LOGIN_ATTEMPTS_KEY) || '0')
    const remaining = MAX_LOGIN_ATTEMPTS - attempts
    
    if (remaining > 0) {
      return { 
        success: false, 
        message: `用户名或密码错误，还有 ${remaining} 次尝试机会` 
      }
    } else {
      return { 
        success: false, 
        message: `登录失败次数过多，账户已被锁定 ${LOCKOUT_DURATION / 60000} 分钟` 
      }
    }
  }
  
  // 登录成功
  clearLoginAttempts()
  const token = generateAuthToken()
  const expiry = Date.now() + (24 * 60 * 60 * 1000) // 24小时过期
  
  localStorage.setItem(AUTH_KEY, token)
  localStorage.setItem(AUTH_EXPIRY_KEY, expiry.toString())
  
  return { success: true }
}

// 登出函数
const logout = (): void => {
  localStorage.removeItem(AUTH_KEY)
  localStorage.removeItem(AUTH_EXPIRY_KEY)
}

// 导出认证功能
export const adminAuth: AdminAuth = {
  get isAuthenticated() {
    return checkAuthStatus()
  },
  login,
  logout
}

// React Hook for authentication
import { useState, useEffect } from 'react'

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsAuthenticated(checkAuthStatus())
  }, [])

  const handleLogin = (username: string, password: string): { success: boolean; message?: string } => {
    const result = login(username, password)
    if (result.success) {
      setIsAuthenticated(true)
    }
    return result
  }

  const handleLogout = (): void => {
    logout()
    setIsAuthenticated(false)
  }

  return {
    isAuthenticated,
    isLoading,
    login: handleLogin,
    logout: handleLogout
  }
}