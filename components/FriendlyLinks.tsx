'use client'

import React, { useState, useEffect } from 'react'

interface FriendlyLink {
  id: string
  name: string
  url: string
  description: string
  isVisible: boolean
  order: number
  createdAt: string
  updatedAt: string
}

const FriendlyLinks: React.FC = () => {
  const [links, setLinks] = useState<FriendlyLink[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 加载数据
  const loadData = async () => {
    try {
      const response = await fetch('/api/friendly-links')
      if (response.ok) {
        const data = await response.json()
        setLinks(data)
      }
    } catch (error) {
      console.error('Failed to load friendly links:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // 如果正在加载或没有链接，则不显示
  if (isLoading || links.length === 0) {
    return null
  }

  return (
    <div className="text-center text-sm text-gray-500 mb-4">
      <div className="flex flex-wrap justify-center gap-4">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
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