import React, { useState } from 'react'
import { Plus, BookOpen, Star, ChevronLeft, ChevronRight, ChevronDown, Search } from 'lucide-react'
import { cn, formatRelativeDate } from '../../lib/utils'
import { Prompt } from '../../types'

interface SidebarProps {
  allPrompts: Prompt[]
  selectedId: string | null
  searchQuery: string
  collapsed: boolean
  onCollapse: (v: boolean) => void
  onSelectPrompt: (id: string) => void
  onNewPrompt: () => void
  onSearchChange: (q: string) => void
}

type LibraryFilter = 'all' | 'drafts' | 'archived'

export function Sidebar({
  allPrompts, selectedId, searchQuery, collapsed,
  onCollapse, onSelectPrompt, onNewPrompt, onSearchChange,
}: SidebarProps) {
  const [libraryOpen, setLibraryOpen] = useState(true)
  const [favoritesOpen, setFavoritesOpen] = useState(true)
  const [libraryFilter, setLibraryFilter] = useState<LibraryFilter>('all')

  const matchesSearch = (p: Prompt) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    )
  }

  const libraryPrompts = allPrompts.filter(p => {
    if (!matchesSearch(p)) return false
    if (libraryFilter === 'drafts') return p.status === 'draft'
    if (libraryFilter === 'archived') return p.status === 'archived'
    return p.status === 'published'
  })

  const favoritePrompts = allPrompts.filter(p => p.isFavorite && matchesSearch(p))

  return (
    <aside
      className={cn(
        'fixed left-0 top-14 bottom-0 z-30 flex flex-col bg-card border-r border-border transition-all duration-300',
        collapsed ? 'w-14' : 'w-64'
      )}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => onCollapse(!collapsed)}
        className="absolute -right-3 top-6 h-6 w-6 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors z-10 shadow-sm"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>

      <div className="flex flex-col h-full overflow-hidden">
        {/* New Prompt Button */}
        <div className="p-3">
          <button
            onClick={onNewPrompt}
            className={cn(
              'w-full flex items-center gap-2 h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors',
              collapsed ? 'justify-center px-0' : 'px-3'
            )}
            aria-label="New prompt"
          >
            <Plus className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>New Prompt</span>}
          </button>
        </div>

        {!collapsed && (
          <>
            {/* Search */}
            <div className="px-2 mb-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filter prompts..."
                  value={searchQuery}
                  onChange={e => onSearchChange(e.target.value)}
                  className="w-full h-8 pl-7 pr-3 rounded-md border border-input bg-background text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  aria-label="Filter prompts"
                />
              </div>
            </div>

            {/* Collapsible Sections */}
            <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-2">
              {/* ── Prompt Library ── */}
              <CollapsibleSection
                icon={BookOpen}
                label="Prompt Library"
                count={libraryPrompts.length}
                open={libraryOpen}
                onToggle={() => setLibraryOpen(o => !o)}
              >
                {/* Sub-filter tabs: All / Drafts / Archived */}
                <div className="flex gap-1 mx-1 mb-1.5 mt-1">
                  {(['all', 'drafts', 'archived'] as LibraryFilter[]).map(f => (
                    <button
                      key={f}
                      onClick={() => setLibraryFilter(f)}
                      className={cn(
                        'flex-1 h-6 rounded text-[10px] font-medium capitalize transition-colors',
                        libraryFilter === f
                          ? 'bg-primary/20 text-primary border border-primary/40'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
                      )}
                    >
                      {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>

                {libraryPrompts.length === 0 ? (
                  <EmptySection
                    text={
                      searchQuery ? 'No prompts found' :
                      libraryFilter === 'drafts' ? 'No drafts yet' :
                      libraryFilter === 'archived' ? 'Nothing archived' :
                      'No prompts yet'
                    }
                  />
                ) : (
                  libraryPrompts.map(p => (
                    <PromptListItem
                      key={p.id}
                      prompt={p}
                      isSelected={p.id === selectedId}
                      onClick={() => onSelectPrompt(p.id)}
                    />
                  ))
                )}
              </CollapsibleSection>

              {/* ── Favorites ── */}
              <CollapsibleSection
                icon={Star}
                label="Favorites"
                count={favoritePrompts.length}
                open={favoritesOpen}
                onToggle={() => setFavoritesOpen(o => !o)}
                iconClassName="text-yellow-400"
              >
                {favoritePrompts.length === 0 ? (
                  <EmptySection text="No favorites yet — star a prompt to add it here" />
                ) : (
                  favoritePrompts.map(p => (
                    <PromptListItem
                      key={p.id}
                      prompt={p}
                      isSelected={p.id === selectedId}
                      onClick={() => onSelectPrompt(p.id)}
                    />
                  ))
                )}
              </CollapsibleSection>
            </div>
          </>
        )}

        {/* Collapsed — icon-only avatars */}
        {collapsed && (
          <div className="flex-1 overflow-y-auto mt-1 px-2 space-y-1 pb-4">
            {allPrompts.slice(0, 10).map(p => (
              <button
                key={p.id}
                onClick={() => onSelectPrompt(p.id)}
                className={cn(
                  'w-full h-8 flex items-center justify-center rounded-md text-xs font-bold transition-colors',
                  p.id === selectedId
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
                title={p.name}
              >
                {p.name.charAt(0).toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function CollapsibleSection({
  icon: Icon, label, count, open, onToggle, children, iconClassName,
}: {
  icon: React.ElementType
  label: string
  count: number
  open: boolean
  onToggle: () => void
  children: React.ReactNode
  iconClassName?: string
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-1.5 h-7 px-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
        aria-expanded={open}
      >
        <ChevronDown
          className={cn('h-3.5 w-3.5 flex-shrink-0 transition-transform duration-200', !open && '-rotate-90')}
        />
        <Icon className={cn('h-3.5 w-3.5 flex-shrink-0', iconClassName)} />
        <span className="flex-1 text-left text-[10px] font-semibold uppercase tracking-widest truncate">
          {label}
        </span>
        <span className="text-[10px] bg-secondary/80 text-muted-foreground px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      </button>

      {open && (
        <div className="mt-0.5 space-y-0.5">
          {children}
        </div>
      )}
    </div>
  )
}

function EmptySection({ text }: { text: string }) {
  return (
    <div className="py-4 px-2 text-center">
      <p className="text-[11px] text-muted-foreground leading-relaxed">{text}</p>
    </div>
  )
}

function PromptListItem({
  prompt, isSelected, onClick,
}: {
  prompt: Prompt
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left rounded-md pl-7 pr-2.5 py-2 transition-colors',
        isSelected ? 'bg-accent' : 'hover:bg-accent/50'
      )}
      aria-current={isSelected ? 'true' : undefined}
    >
      <div className="flex items-start justify-between gap-1">
        <span className={cn('text-xs font-medium truncate flex-1', isSelected ? 'text-foreground' : 'text-foreground/80')}>
          {prompt.name}
        </span>
        {prompt.isFavorite && (
          <Star className="h-3 w-3 text-yellow-400 flex-shrink-0 fill-yellow-400 mt-px" />
        )}
      </div>
      <div className="flex items-center gap-1.5 mt-0.5">
        <span className="text-[10px] text-muted-foreground truncate">{prompt.category}</span>
        <span className="text-[10px] text-muted-foreground">·</span>
        <span className="text-[10px] text-muted-foreground">{formatRelativeDate(prompt.updatedAt)}</span>
      </div>
    </button>
  )
}
