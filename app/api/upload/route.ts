import { NextRequest, NextResponse } from 'next/server'

// 支持的图片格式（从环境变量读取，带默认值）
const ALLOWED_TYPES = (process.env.ALLOWED_IMAGE_TYPES || 'image/jpeg,image/png,image/gif,image/webp').split(',')
const MAX_FILE_SIZE = parseInt(process.env.UPLOAD_MAX_SIZE || '5242880') // 默认5MB
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin-token-here'

// 内存中存储上传的文件（Base64格式）
interface UploadedFile {
  id: string
  fileName: string
  originalName: string
  dataUrl: string  // Base64 data URL
  size: number
  type: string
  uploadDate: string
}

let uploadedFiles: UploadedFile[] = []

// 生成唯一文件ID
function generateFileId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${timestamp}-${random}`
}

// 生成唯一文件名
function generateFileName(originalName: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  const extension = originalName.split('.').pop() || ''
  return `${timestamp}-${random}${extension ? '.' + extension : ''}`
}

export async function POST(request: NextRequest) {
  try {
    // 管理员权限检查
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== `Bearer ${ADMIN_TOKEN}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // 验证文件类型
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, GIF and WebP are allowed.' },
        { status: 400 }
      )
    }

    // 验证文件大小
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // 读取文件内容并转换为Base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`
    
    // 生成文件信息
    const fileId = generateFileId()
    const fileName = generateFileName(file.name)
    
    const uploadedFile: UploadedFile = {
      id: fileId,
      fileName,
      originalName: file.name,
      dataUrl,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString()
    }
    
    // 存储到内存中
    uploadedFiles.push(uploadedFile)
    
    console.log(`File uploaded: ${fileName} (${file.size} bytes) - Base64 storage`)
    
    return NextResponse.json({
      success: true,
      url: dataUrl,  // 返回Base64 data URL
      fileName,
      size: file.size,
      type: file.type,
      id: fileId
    })

  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}

// 获取上传的文件列表（可选功能）
export async function GET(request: NextRequest) {
  try {
    // 管理员权限检查
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== `Bearer ${ADMIN_TOKEN}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 按上传时间排序（最新的在前）
    const sortedFiles = [...uploadedFiles].sort((a, b) => 
      new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
    )
    
    const fileInfos = sortedFiles.map(file => ({
      id: file.id,
      name: file.fileName,
      originalName: file.originalName,
      url: file.dataUrl,
      size: file.size,
      type: file.type,
      uploadDate: file.uploadDate
    }))
    
    return NextResponse.json({ files: fileInfos })

  } catch (error) {
    console.error('Error listing files:', error)
    return NextResponse.json(
      { error: 'Failed to list files' },
      { status: 500 }
    )
  }
}