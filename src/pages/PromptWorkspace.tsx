import { useState, useCallback } from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { Code2, Beaker, Clock } from 'lucide-react'
import { Prompt } from '../types'
import { WorkspaceHeader } from '../components/prompts/WorkspaceHeader'
import { PromptEditor } from '../components/prompts/PromptEditor'
import { PlaygroundTab } from '../components/prompts/PlaygroundTab'
import { HistoryTab } from '../components/prompts/HistoryTab'
import { cn } from '../lib/utils'

interface PromptWorkspaceProps {
  prompt: Prompt
  onUpdate: (id: string, updates: Partial<Prompt>) => void
  onDelete: () => void
  onToggleFavorite: () => void
  onSaveAsNew: () => void
  onRename: (name: string) => void
  onToast: (msg: { title: string; description?: string; variant?: 'default' | 'success' | 'destructive' }) => void
}

export function PromptWorkspace({
  prompt, onUpdate, onDelete, onToggleFavorite, onSaveAsNew, onRename, onToast,
}: PromptWorkspaceProps) {
  const [activeTab, setActiveTab] = useState('editor')
  const [isDirty, setIsDirty] = useState(false)

  const handleSave = useCallback((updates: Partial<Prompt>) => {
    onUpdate(prompt.id, updates)
    setIsDirty(false)
    onToast({ title: 'Prompt saved', description: 'Your changes have been saved.', variant: 'success' })
  }, [prompt.id, onUpdate, onToast])

  const tabs = [
    { id: 'editor', label: 'Editor', icon: Code2 },
    { id: 'playground', label: 'Playground', icon: Beaker },
    { id: 'history', label: 'History', icon: Clock },
  ]

  return (
    <div className="flex flex-col h-full">
      <WorkspaceHeader
        prompt={prompt}
        onToggleFavorite={onToggleFavorite}
        onDelete={onDelete}
        onSaveAsNew={onSaveAsNew}
        onRename={onRename}
      />

      <TabsPrimitive.Root
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col flex-1 min-h-0"
      >
        {/* Tab bar — card-style tabs with visible active state */}
        <div className="flex-none bg-secondary/30 border-b border-border px-4">
          <TabsPrimitive.List className="flex items-end gap-1 pt-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <TabsPrimitive.Trigger
                key={id}
                value={id}
                className={cn(
                  'group relative flex items-center gap-1.5 px-4 h-9 text-sm font-medium rounded-t-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                  'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border data-[state=active]:border-b-background',
                  'data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:hover:bg-accent/40'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
                {id === 'editor' && isDirty && (
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-primary"
                    aria-label="Unsaved changes"
                  />
                )}
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>
        </div>

        <TabsPrimitive.Content
          value="editor"
          className="flex-1 min-h-0 overflow-hidden focus-visible:outline-none"
        >
          <PromptEditor prompt={prompt} onSave={handleSave} onDirtyChange={setIsDirty} />
        </TabsPrimitive.Content>
        <TabsPrimitive.Content
          value="playground"
          className="flex-1 min-h-0 overflow-hidden focus-visible:outline-none"
        >
          <PlaygroundTab prompt={prompt} />
        </TabsPrimitive.Content>
        <TabsPrimitive.Content
          value="history"
          className="flex-1 min-h-0 overflow-hidden focus-visible:outline-none"
        >
          <HistoryTab promptId={prompt.id} />
        </TabsPrimitive.Content>
      </TabsPrimitive.Root>
    </div>
  )
}
