export type PromptStatus = 'published' | 'draft' | 'archived'

export interface Prompt {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  content: string
  isFavorite: boolean
  status: PromptStatus
  createdAt: Date
  updatedAt: Date
  version: number
  author: string
}

export interface HistoryEntry {
  id: string
  promptId: string
  version: number
  content: string
  summary: string
  author: string
  timestamp: Date
}

export interface ToastMessage {
  id: string
  title: string
  description?: string
  variant?: 'default' | 'destructive' | 'success'
}

export type ActiveSection = 'library' | 'favorites' | 'drafts' | 'archived'
export type ActiveTab = 'editor' | 'playground' | 'history'
