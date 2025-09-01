// GitHub API storage for data persistence
// GitHub API 数据持久化存储

interface GitHubFile {
  name: string
  path: string
  sha: string
  content: string
}

interface GitHubCommitResponse {
  content: {
    sha: string
  }
  commit: {
    sha: string
  }
}

class GitHubStorage {
  private owner: string
  private repo: string
  private token: string
  private branch: string

  constructor() {
    this.owner = 'trevorwang12'
    this.repo = 'worldguessr'
    this.token = process.env.GITHUB_TOKEN || ''
    this.branch = 'main'
  }

  private get headers() {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    }
  }

  private get baseUrl() {
    return `https://api.github.com/repos/${this.owner}/${this.repo}`
  }

  async getFile(filePath: string): Promise<any> {
    try {
      if (!this.token) {
        console.log('No GitHub token, falling back to local file system')
        return null
      }

      const response = await fetch(`${this.baseUrl}/contents/${filePath}?ref=${this.branch}`, {
        headers: this.headers
      })

      if (!response.ok) {
        console.log(`GitHub API error: ${response.status}`)
        return null
      }

      const data = await response.json()
      const content = Buffer.from(data.content, 'base64').toString('utf8')
      
      return {
        content: JSON.parse(content),
        sha: data.sha
      }
    } catch (error) {
      console.error('Error fetching from GitHub:', error)
      return null
    }
  }

  async saveFile(filePath: string, content: any, sha?: string): Promise<boolean> {
    try {
      if (!this.token) {
        console.log('No GitHub token, cannot save to GitHub')
        return false
      }

      const contentBase64 = Buffer.from(JSON.stringify(content, null, 2)).toString('base64')
      
      const body: any = {
        message: `Update ${filePath} via admin panel 🤖`,
        content: contentBase64,
        branch: this.branch
      }

      if (sha) {
        body.sha = sha
      }

      const response = await fetch(`${this.baseUrl}/contents/${filePath}`, {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify(body)
      })

      if (!response.ok) {
        console.error(`GitHub API error: ${response.status}`)
        return false
      }

      console.log(`Successfully saved ${filePath} to GitHub`)
      return true
    } catch (error) {
      console.error('Error saving to GitHub:', error)
      return false
    }
  }

  async loadData(fileName: string): Promise<any> {
    const filePath = `data/${fileName}`
    const githubFile = await this.getFile(filePath)
    
    if (githubFile) {
      console.log(`Loaded ${fileName} from GitHub`)
      return githubFile.content
    }

    // Fallback to local file system for development
    try {
      const fs = await import('fs/promises')
      const path = await import('path')
      const localPath = path.join(process.cwd(), 'data', fileName)
      const fileContent = await fs.readFile(localPath, 'utf8')
      console.log(`Loaded ${fileName} from local filesystem`)
      return JSON.parse(fileContent)
    } catch (error) {
      console.error(`Failed to load ${fileName}:`, error)
      return null
    }
  }

  async saveData(fileName: string, data: any): Promise<boolean> {
    const filePath = `data/${fileName}`
    
    // Try to get current SHA for updating existing file
    const currentFile = await this.getFile(filePath)
    const sha = currentFile?.sha

    const success = await this.saveFile(filePath, data, sha)
    
    if (!success) {
      // Fallback to local file system for development
      try {
        const fs = await import('fs/promises')
        const path = await import('path')
        const localPath = path.join(process.cwd(), 'data', fileName)
        await fs.writeFile(localPath, JSON.stringify(data, null, 2), 'utf8')
        console.log(`Saved ${fileName} to local filesystem`)
        return true
      } catch (error) {
        console.error(`Failed to save ${fileName}:`, error)
        return false
      }
    }

    return true
  }

  isConfigured(): boolean {
    return !!this.token && !!this.owner && !!this.repo
  }
}

export const githubStorage = new GitHubStorage()
export default GitHubStorage