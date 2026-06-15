import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/Dialog'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { Badge } from '../ui/Badge'
import { CATEGORIES } from '../../data/mockData'
import { X, Plus } from 'lucide-react'
import { Prompt } from '../../types'

interface CreatePromptModalProps {
  open: boolean
  onCreate: (data: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt' | 'version' | 'author' | 'isFavorite' | 'status'>) => void
  onCancel: () => void
}

export function CreatePromptModal({ open, onCreate, onCancel }: CreatePromptModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [content, setContent] = useState('')

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags(prev => [...prev, tagInput.trim()])
      }
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => setTags(prev => prev.filter(t => t !== tag))

  const handleCreate = () => {
    if (!name.trim() || !content.trim()) return
    onCreate({ name: name.trim(), description, category, tags, content })
    setName(''); setDescription(''); setCategory(CATEGORIES[0]); setTags([]); setContent('')
  }

  const handleCancel = () => {
    setName(''); setDescription(''); setCategory(CATEGORIES[0]); setTags([]); setContent('')
    onCancel()
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleCancel()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Prompt</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Prompt Name <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="e.g., Customer Support Agent"
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
            <Textarea
              placeholder="Briefly describe what this prompt does..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Tags</label>
            <Input
              placeholder="Type a tag and press Enter..."
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="gap-1 cursor-default">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-foreground">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Prompt Content <span className="text-destructive">*</span>
            </label>
            <Textarea
              placeholder="Enter your prompt content here. Use {{variable}} for template variables..."
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={10}
              className="font-mono text-sm"
            />
            <div className="text-xs text-muted-foreground mt-1 text-right">{content.length} characters</div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleCreate} disabled={!name.trim() || !content.trim()}>
            <Plus className="h-4 w-4 mr-1.5" />
            Create Prompt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
