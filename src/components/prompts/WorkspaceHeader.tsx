import React, { useState, useRef, useEffect } from 'react'
import {
  Star, MoreHorizontal, Save, Copy, RotateCcw,
  Trash2, Pencil, Check, X,
} from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Prompt } from '../../types'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'

interface WorkspaceHeaderProps {
  prompt: Prompt
  onToggleFavorite: () => void
  onDelete: () => void
  onSaveAsNew: () => void
  onRename: (name: string) => void
}

export function WorkspaceHeader({
  prompt, onToggleFavorite, onDelete, onSaveAsNew, onRename,
}: WorkspaceHeaderProps) {
  const [renaming, setRenaming] = useState(false)
  const [nameValue, setNameValue] = useState(prompt.name)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setNameValue(prompt.name)
    setRenaming(false)
  }, [prompt.id, prompt.name])

  useEffect(() => {
    if (renaming) inputRef.current?.focus()
  }, [renaming])

  const confirmRename = () => {
    const trimmed = nameValue.trim()
    if (trimmed && trimmed !== prompt.name) onRename(trimmed)
    setRenaming(false)
  }

  const cancelRename = () => {
    setNameValue(prompt.name)
    setRenaming(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') confirmRename()
    if (e.key === 'Escape') cancelRename()
  }

  return (
    <div className="flex items-center justify-between px-6 py-3.5 border-b border-border bg-card/60 backdrop-blur-sm">
      {/* Left — name + badges */}
      <div className="flex items-start gap-3 min-w-0 flex-1">
        {renaming ? (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <input
              ref={inputRef}
              value={nameValue}
              onChange={e => setNameValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={confirmRename}
              className="flex-1 min-w-0 bg-background border-2 border-primary/60 rounded-md px-2.5 py-1 text-lg font-semibold text-foreground focus:outline-none focus:border-primary transition-colors"
              aria-label="Rename prompt"
            />
            <button
              onMouseDown={e => { e.preventDefault(); confirmRename() }}
              className="h-7 w-7 flex items-center justify-center rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex-shrink-0"
              aria-label="Confirm rename"
            >
              <Check className="h-3.5 w-3.5" />
            </button>
            <button
              onMouseDown={e => { e.preventDefault(); cancelRename() }}
              className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-accent transition-colors text-muted-foreground flex-shrink-0"
              aria-label="Cancel rename"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 group/title">
              <h1 className="text-lg font-semibold text-foreground truncate">{prompt.name}</h1>
              <button
                onClick={() => setRenaming(true)}
                className="opacity-0 group-hover/title:opacity-100 h-6 w-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-all flex-shrink-0"
                aria-label="Rename prompt"
                title="Rename"
              >
                <Pencil className="h-3 w-3" />
              </button>
              <Badge
                variant={
                  prompt.status === 'draft' ? 'secondary' :
                  prompt.status === 'archived' ? 'outline' : 'success'
                }
              >
                {prompt.status}
              </Badge>
              <Badge variant="outline" className="text-xs">v{prompt.version}</Badge>
            </div>
            {prompt.description && (
              <p className="text-sm text-muted-foreground truncate mt-0.5">{prompt.description}</p>
            )}
          </div>
        )}
      </div>

      {/* Right — favorite + three-dots */}
      {!renaming && (
        <div className="flex items-center gap-1 flex-shrink-0 ml-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFavorite}
            aria-label={prompt.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="h-8 w-8"
          >
            <Star
              className={cn(
                'h-4 w-4 transition-colors',
                prompt.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
              )}
            />
          </Button>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label="More options"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={6}
                className="z-50 min-w-[192px] overflow-hidden rounded-lg border border-border bg-popover py-1 shadow-2xl animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
              >
                <DropdownMenuItem
                  icon={<Save className="h-4 w-4 text-muted-foreground" />}
                  label="Save As New"
                  onSelect={onSaveAsNew}
                />
                <DropdownMenuItem
                  icon={<Copy className="h-4 w-4 text-muted-foreground" />}
                  label="Duplicate"
                  onSelect={onSaveAsNew}
                />
                <DropdownMenuItem
                  icon={<RotateCcw className="h-4 w-4 text-muted-foreground" />}
                  label="Restore"
                  onSelect={() => {}}
                />

                {/* Separator before destructive action */}
                <DropdownMenu.Separator className="my-1 h-px bg-border mx-1" />

                <DropdownMenuItem
                  icon={<Trash2 className="h-4 w-4" />}
                  label="Delete"
                  onSelect={onDelete}
                  destructive
                />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      )}
    </div>
  )
}

// ── Shared menu item ──────────────────────────────────────────────────────────

function DropdownMenuItem({
  icon, label, onSelect, destructive = false,
}: {
  icon: React.ReactNode
  label: string
  onSelect: () => void
  destructive?: boolean
}) {
  return (
    <DropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        'flex items-center gap-2.5 mx-1 px-2.5 py-2 text-sm rounded-md cursor-pointer select-none outline-none transition-colors',
        destructive
          ? 'text-destructive hover:bg-destructive/10 focus:bg-destructive/10'
          : 'text-foreground hover:bg-accent focus:bg-accent'
      )}
    >
      {icon}
      {label}
    </DropdownMenu.Item>
  )
}
