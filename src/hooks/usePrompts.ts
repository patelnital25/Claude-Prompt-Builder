import { useState, useCallback } from 'react'
import { Prompt, ActiveSection } from '../types'
import { mockPrompts } from '../data/mockData'
import { generateId } from '../lib/utils'

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts)
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<ActiveSection>('library')
  const [searchQuery, setSearchQuery] = useState('')

  const selectedPrompt = prompts.find(p => p.id === selectedPromptId) || null

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSection =
      activeSection === 'library' ? prompt.status === 'published' :
      activeSection === 'favorites' ? prompt.isFavorite :
      activeSection === 'drafts' ? prompt.status === 'draft' :
      activeSection === 'archived' ? prompt.status === 'archived' : true

    if (!searchQuery) return matchesSection

    const q = searchQuery.toLowerCase()
    return matchesSection && (
      prompt.name.toLowerCase().includes(q) ||
      prompt.description.toLowerCase().includes(q) ||
      prompt.category.toLowerCase().includes(q) ||
      prompt.tags.some(t => t.toLowerCase().includes(q))
    )
  })

  const globalSearch = useCallback((query: string): Prompt[] => {
    if (!query) return []
    const q = query.toLowerCase()
    return prompts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    )
  }, [prompts])

  const createPrompt = useCallback((data: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt' | 'version' | 'author' | 'isFavorite' | 'status'>) => {
    const newPrompt: Prompt = {
      ...data,
      id: generateId(),
      isFavorite: false,
      status: 'published',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
      author: 'Nita Patel',
    }
    setPrompts(prev => [newPrompt, ...prev])
    setSelectedPromptId(newPrompt.id)
    setActiveSection('library')
    return newPrompt
  }, [])

  const updatePrompt = useCallback((id: string, updates: Partial<Prompt>) => {
    setPrompts(prev => prev.map(p =>
      p.id === id
        ? { ...p, ...updates, updatedAt: new Date(), version: p.version + 1 }
        : p
    ))
  }, [])

  const deletePrompt = useCallback((id: string) => {
    setPrompts(prev => prev.filter(p => p.id !== id))
    if (selectedPromptId === id) setSelectedPromptId(null)
  }, [selectedPromptId])

  const toggleFavorite = useCallback((id: string) => {
    setPrompts(prev => prev.map(p =>
      p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
    ))
  }, [])

  const saveAsNew = useCallback((sourceId: string, newName: string) => {
    const source = prompts.find(p => p.id === sourceId)
    if (!source) return
    const newPrompt: Prompt = {
      ...source,
      id: generateId(),
      name: newName,
      isFavorite: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    }
    setPrompts(prev => [newPrompt, ...prev])
    setSelectedPromptId(newPrompt.id)
  }, [prompts])

  return {
    prompts,
    filteredPrompts,
    selectedPrompt,
    selectedPromptId,
    activeSection,
    searchQuery,
    setSearchQuery,
    setSelectedPromptId,
    setActiveSection,
    globalSearch,
    createPrompt,
    updatePrompt,
    deletePrompt,
    toggleFavorite,
    saveAsNew,
  }
}
