import React, { useState, useEffect } from 'react'
import { Save, RotateCcw, Calendar, User, Hash, X } from 'lucide-react'
import { Prompt } from '../../types'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { Badge } from '../ui/Badge'
import { CATEGORIES } from '../../data/mockData'
import { formatDate } from '../../lib/utils'

interface PromptEditorProps {
  prompt: Prompt
  onSave: (updates: Partial<Prompt>) => void
  onDirtyChange: (dirty: boolean) => void
}

export function PromptEditor({ prompt, onSave, onDirtyChange }: PromptEditorProps) {
  const [name, setName] = useState(prompt.name)
  const [description, setDescription] = useState(prompt.description)
  const [category, setCategory] = useState(prompt.category)
  const [content, setContent] = useState(prompt.content)
  const [tags, setTags] = useState<string[]>(prompt.tags)
  const [tagInput, setTagInput] = useState('')
  const [saving, setSaving] = useState(false)

  const isDirty =
    name !== prompt.name ||
    description !== prompt.description ||
    category !== prompt.category ||
    content !== prompt.content ||
    JSON.stringify(tags) !== JSON.stringify(prompt.tags)

  useEffect(() => {
    onDirtyChange(isDirty)
  }, [isDirty, onDirtyChange])

  useEffect(() => {
    setName(prompt.name)
    setDescription(prompt.description)
    setCategory(prompt.category)
    setContent(prompt.content)
    setTags(prompt.tags)
  }, [prompt.id])

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    onSave({ name, description, category, content, tags })
    setSaving(false)
  }

  const handleCancel = () => {
    setName(prompt.name)
    setDescription(prompt.description)
    setCategory(prompt.category)
    setContent(prompt.content)
    setTags(prompt.tags)
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) setTags(prev => [...prev, tagInput.trim()])
      setTagInput('')
    }
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-background">
      <div className="flex-1 p-6 space-y-5 max-w-4xl">

        {/* Metadata strip */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground pb-3 border-b border-border/60">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3 text-primary/60" />
            Created {formatDate(prompt.createdAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3 text-primary/60" />
            Modified {formatDate(prompt.updatedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="h-3 w-3 text-primary/60" />
            {prompt.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Hash className="h-3 w-3 text-primary/60" />
            Version {prompt.version}
          </span>
        </div>

        {/* Prompt Name */}
        <FieldGroup label="Prompt Name">
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            className="text-base font-medium border-[#B8D0E0] bg-white focus-visible:border-primary/60 focus-visible:ring-primary/30"
          />
        </FieldGroup>

        {/* Description */}
        <FieldGroup label="Description">
          <Textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={2}
            placeholder="Describe what this prompt does..."
            className="border-[#B8D0E0] bg-white focus-visible:border-primary/60 focus-visible:ring-primary/30"
          />
        </FieldGroup>

        {/* Category + Tags */}
        <div className="grid grid-cols-2 gap-4">
          <FieldGroup label="Category">
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-[#B8D0E0] bg-white px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/60 transition-colors"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </FieldGroup>

          <FieldGroup label="Tags" hint="Press Enter to add">
            <Input
              placeholder="e.g. support, seo…"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              className="border-[#B8D0E0] bg-white focus-visible:border-primary/60 focus-visible:ring-primary/30"
            />
          </FieldGroup>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 -mt-2">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                {tag}
                <button
                  onClick={() => setTags(prev => prev.filter(t => t !== tag))}
                  className="hover:text-foreground transition-colors"
                  aria-label={`Remove tag ${tag}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Prompt Content */}
        <FieldGroup
          label="Prompt Content"
          hint={`${content.length} characters`}
          hintRight
        >
          <div className="rounded-md border border-[#B8D0E0] overflow-hidden focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary/60 transition-all">
            <Textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={18}
              className="font-mono text-sm leading-relaxed resize-y border-0 rounded-none bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Enter your prompt content. Use {{variable}} for template variables..."
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            Use{' '}
            <code className="bg-secondary/80 border border-border px-1.5 py-0.5 rounded text-xs font-mono text-primary/80">
              {'{{variable}}'}
            </code>
            {' '}for dynamic template variables
          </p>
        </FieldGroup>
      </div>

      {/* Sticky save bar */}
      {isDirty && (
        <div className="sticky bottom-0 flex items-center justify-between px-6 py-3 bg-card border-t border-border shadow-lg">
          <span className="text-xs text-amber-400 font-medium flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 inline-block" />
            Unsaved changes
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
              Discard
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              <Save className="h-3.5 w-3.5 mr-1.5" />
              {saving ? 'Saving…' : 'Save Changes'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Field label wrapper ───────────────────────────────────────────────────────

function FieldGroup({
  label, hint, hintRight = false, children,
}: {
  label: string
  hint?: string
  hintRight?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <div className={`flex items-center mb-1.5 ${hintRight ? 'justify-between' : 'gap-2'}`}>
        <label className="text-xs font-semibold uppercase tracking-wide text-[#2D6A8A]">
          {label}
        </label>
        {hint && (
          <span className="text-xs text-muted-foreground">{hint}</span>
        )}
      </div>
      {children}
    </div>
  )
}
