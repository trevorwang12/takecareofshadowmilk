'use client'

import React, { useState, useEffect } from 'react'
import { friendlyLinksManager, type FriendlyLink, type FriendlyLinksSettings } from '@/lib/friendly-links-manager'

const FriendlyLinks: React.FC = () => {
  const [links, setLinks] = useState<FriendlyLink[]>([])
  const [settings, setSettings] = useState<FriendlyLinksSettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 加载数据
  const loadData = async () => {
    try {
      const [activeLinks, settingsData] = await Promise.all([
        friendlyLinksManager.getActiveLinks(),
        friendlyLinksManager.getSettings()
      ])
      
      setLinks(activeLinks)
      setSettings(settingsData)
    } catch (error) {
      console.error('Failed to load friendly links:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()

    // 监听友情链接更新事件
    const handleLinksUpdate = () => {
      loadData()
    }

    window.addEventListener('friendlyLinksUpdated', handleLinksUpdate)

    return () => {
      window.removeEventListener('friendlyLinksUpdated', handleLinksUpdate)
    }
  }, [])

  // 如果正在加载、设置为不可见或没有链接，则不显示
  if (isLoading || !settings?.isVisible || links.length === 0) {
    return null
  }

  return (
    <div className="text-center text-sm text-gray-500 mb-4">
      <div className="flex flex-wrap justify-center gap-4">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target={settings.openInNewTab ? '_blank' : '_self'}
            rel={settings.openInNewTab ? 'noopener noreferrer' : undefined}
            className="hover:text-blue-600 transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  )
}

export default FriendlyLinks