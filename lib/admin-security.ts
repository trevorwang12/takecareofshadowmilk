// Admin Security Configuration
// 管理员安全配置

/**
 * Check if admin functionality is enabled
 * 检查admin功能是否启用
 */
export function isAdminEnabled(): boolean {
  // Check if admin is explicitly disabled
  // 检查admin是否被明确禁用
  if (process.env.ENABLE_ADMIN === 'false') {
    return false
  }
  
  // In development, admin is enabled by default unless explicitly disabled
  // 开发环境中，除非明确禁用，否则admin默认启用
  if (process.env.NODE_ENV === 'development') {
    return true
  }
  
  // In production, check environment variable (must be explicitly enabled)
  // 生产环境中，检查环境变量（必须明确启用）
  return process.env.ENABLE_ADMIN === 'true'
}

/**
 * Admin API route protection middleware
 * Admin API路由保护中间件
 */
export function createAdminResponse(enabled: boolean = isAdminEnabled()) {
  if (!enabled) {
    return {
      success: false,
      error: 'Admin functionality is disabled in production',
      status: 403
    }
  }
  return null // Allow the request to proceed
}

/**
 * Get admin status for client-side checks
 * 获取admin状态用于客户端检查
 */
export function getAdminStatus() {
  return {
    enabled: isAdminEnabled(),
    environment: process.env.NODE_ENV || 'development'
  }
}

/**
 * Log admin access attempts
 * 记录admin访问尝试
 */
export function logAdminAccess(path: string, enabled: boolean) {
  const timestamp = new Date().toISOString()
  const status = enabled ? 'ALLOWED' : 'BLOCKED'
  console.log(`[${timestamp}] Admin Access ${status}: ${path}`)
}