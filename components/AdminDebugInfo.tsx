'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminDebugInfo() {
  const [showDebug, setShowDebug] = useState(false)

  const debugInfo = {
    adminUsername: process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'undefined',
    adminPassword: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'undefined',
    nodeEnv: process.env.NODE_ENV || 'undefined',
    allEnvVars: Object.keys(process.env)
      .filter(key => key.startsWith('NEXT_PUBLIC_ADMIN'))
      .reduce((obj, key) => ({ ...obj, [key]: process.env[key] }), {})
  }

  if (!showDebug) {
    return (
      <div className="mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowDebug(true)}
        >
          Show Debug Info
        </Button>
      </div>
    )
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-sm">Debug Info</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowDebug(false)}
        >
          Hide
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-xs space-y-2">
          <div><strong>Username:</strong> {debugInfo.adminUsername}</div>
          <div><strong>Password:</strong> {debugInfo.adminPassword}</div>
          <div><strong>Node Env:</strong> {debugInfo.nodeEnv}</div>
          <div><strong>Admin Env Vars:</strong></div>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(debugInfo.allEnvVars, null, 2)}
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}