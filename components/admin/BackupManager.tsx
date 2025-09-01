"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Download, Upload, Loader2, AlertCircle, CheckCircle, Database } from 'lucide-react'

interface BackupData {
  games: any[]
  categories: any[]
  seo: any
  homepage: any
  ads: any
  recommendations: any
  featuredGames: any
  footer: any
  friendlyLinks: any
  backupDate: string
}

export default function BackupManager() {
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)
  const [importInstructions, setImportInstructions] = useState<string[] | null>(null)

  // 导出备份
  const handleExport = async () => {
    setIsExporting(true)
    setMessage(null)
    
    try {
      const response = await fetch('/api/admin/backup', {
        method: 'GET'
      })
      
      if (!response.ok) {
        throw new Error('Failed to create backup')
      }
      
      // 获取文件内容
      const backupData = await response.text()
      
      // 创建下载链接
      const blob = new Blob([backupData], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `site-backup-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      setMessage({ type: 'success', text: 'Backup exported successfully!' })
    } catch (error) {
      console.error('Export error:', error)
      setMessage({ type: 'error', text: 'Failed to export backup' })
    } finally {
      setIsExporting(false)
    }
  }

  // 导入备份（验证和显示说明）
  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    setIsImporting(true)
    setMessage(null)
    setImportInstructions(null)
    
    try {
      const text = await file.text()
      const backupData: BackupData = JSON.parse(text)
      
      // 验证备份数据结构
      if (!backupData.games || !backupData.categories || !backupData.backupDate) {
        throw new Error('Invalid backup file format')
      }
      
      // 发送到服务器验证
      const response = await fetch('/api/admin/backup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: text
      })
      
      if (!response.ok) {
        throw new Error('Failed to process backup')
      }
      
      const result = await response.json()
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message })
        setImportInstructions(result.instructions || [])
      } else {
        throw new Error(result.error || 'Import failed')
      }
      
    } catch (error) {
      console.error('Import error:', error)
      setMessage({ type: 'error', text: `Import failed: ${error instanceof Error ? error.message : 'Unknown error'}` })
    } finally {
      setIsImporting(false)
      // 清空文件输入
      event.target.value = ''
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5" />
            <span>Data Backup & Restore</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Export Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Export Backup</h3>
              <p className="text-sm text-gray-600 mb-4">
                Download a complete backup of all your site data including games, categories, and settings.
              </p>
              <Button
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center space-x-2"
              >
                {isExporting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>{isExporting ? 'Exporting...' : 'Export Backup'}</span>
              </Button>
            </div>
          </div>

          <div className="border-t pt-6">
            {/* Import Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Import Backup</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Upload a previously exported backup file. Note: This will validate the backup but won't immediately restore data due to memory storage architecture.
                </p>
                <div className="relative">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    disabled={isImporting}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    id="backup-file"
                  />
                  <Button
                    asChild
                    disabled={isImporting}
                    variant="outline"
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <label htmlFor="backup-file">
                      {isImporting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      <span>{isImporting ? 'Processing...' : 'Choose Backup File'}</span>
                    </label>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Status Messages */}
          {message && (
            <Alert className={message.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
              {message.type === 'error' ? (
                <AlertCircle className="h-4 w-4 text-red-600" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
              <AlertDescription className={message.type === 'error' ? 'text-red-800' : 'text-green-800'}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          {/* Import Instructions */}
          {importInstructions && (
            <Alert className="border-blue-200 bg-blue-50">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <div className="space-y-2">
                  <p className="font-semibold">Manual Restore Required:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {importInstructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Information */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-semibold">Important Information:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  <li>Backups include all games, categories, and site settings</li>
                  <li>Data is stored in memory for cloud deployment compatibility</li>
                  <li>Server restart will reset data to default values from JSON files</li>
                  <li>For permanent storage, manually update the /data/*.json files as instructed</li>
                  <li>Regular backups are recommended before making major changes</li>
                </ul>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}