import { useState, useRef, useEffect } from 'react'
import { Search, Bell, Settings, ChevronDown, Zap, X } from 'lucide-react'
import { Prompt } from '../../types'

interface NavBarProps {
  onSearch: (query: string) => Prompt[]
  onSelectPrompt: (id: string) => void
}

export function NavBar({ onSearch, onSelectPrompt }: NavBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Prompt[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [notifications] = useState(3)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.trim()) {
      setResults(onSearch(query))
      setShowResults(true)
    } else {
      setResults([])
      setShowResults(false)
    }
  }, [query, onSearch])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 bg-background/95 backdrop-blur border-b border-border flex items-center px-4 gap-4">
      {/* Logo */}
      <div className="flex items-center gap-2 min-w-[200px]">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
          <Zap className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-semibold text-foreground text-sm tracking-tight">Prompt Builder</span>
      </div>

      {/* Global Search */}
      <div ref={searchRef} className="flex-1 max-w-xl mx-auto relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search prompts..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => query && setShowResults(true)}
            className="w-full h-9 pl-9 pr-9 rounded-md border border-input bg-secondary text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background transition-colors"
            aria-label="Search prompts"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setShowResults(false) }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-xl overflow-hidden z-50">
            {results.length > 0 ? (
              <>
                <div className="px-3 py-1.5 text-xs text-muted-foreground border-b border-border">
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </div>
                <ul className="max-h-64 overflow-y-auto">
                  {results.map(p => (
                    <li key={p.id}>
                      <button
                        className="w-full flex items-start gap-3 px-3 py-2.5 hover:bg-accent transition-colors text-left"
                        onClick={() => {
                          onSelectPrompt(p.id)
                          setQuery('')
                          setShowResults(false)
                        }}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground truncate">{p.name}</div>
                          <div className="text-xs text-muted-foreground truncate">{p.category} · {p.description}</div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                No prompts found for "{query}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-1 ml-auto">
        {/* Notifications */}
        <button className="relative h-9 w-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          {notifications > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" aria-label={`${notifications} unread`} />
          )}
        </button>

        {/* Settings */}
        <button className="h-9 w-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors" aria-label="Settings">
          <Settings className="h-4 w-4" />
        </button>

        {/* User */}
        <div className="relative ml-1">
          <button
            onClick={() => setShowUserMenu(p => !p)}
            className="flex items-center gap-2 h-9 px-2 rounded-md hover:bg-accent transition-colors"
            aria-label="User menu"
          >
            <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">NP</div>
            <span className="text-sm text-foreground font-medium hidden sm:block">Nita Patel</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
          </button>
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-1 w-52 bg-popover border border-border rounded-lg shadow-xl overflow-hidden z-50">
              <div className="px-3 py-2.5 border-b border-border">
                <div className="text-sm font-medium">Nita Patel</div>
                <div className="text-xs text-muted-foreground">nitapatel@nexidia.com</div>
              </div>
              {['Profile', 'Settings', 'Team', 'Billing'].map(item => (
                <button key={item} className="w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors">{item}</button>
              ))}
              <div className="border-t border-border">
                <button className="w-full text-left px-3 py-2 text-sm text-destructive hover:bg-accent transition-colors">Sign out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
