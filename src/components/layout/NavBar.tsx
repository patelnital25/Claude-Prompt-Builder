import React, { useState, useRef, useEffect } from 'react'
import { Search, Bell, HelpCircle, Info, ChevronDown, X } from 'lucide-react'
import { Prompt } from '../../types'

const NICE_BLUE = '#006699'

interface NavBarProps {
  onSearch: (query: string) => Prompt[]
  onSelectPrompt: (id: string) => void
}

export function NavBar({ onSearch, onSelectPrompt }: NavBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Prompt[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
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
    <header
      className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-4 gap-4"
      style={{ backgroundColor: NICE_BLUE }}
    >
      {/* ── Left: Logo + App name ── */}
      <div className="flex items-center gap-2.5 min-w-[220px]">
        <div
          className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.35)' }}
        >
          <SignalIcon />
        </div>
        <span className="text-white font-semibold text-sm tracking-[0.1em] uppercase select-none">
          Prompt Builder
        </span>
      </div>

      {/* ── Center: Global search ── */}
      <div ref={searchRef} className="flex-1 max-w-lg mx-auto relative">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5B9DB8]" />
          <input
            type="text"
            placeholder="Type here to search for a prompt..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => query && setShowResults(true)}
            aria-label="Search prompts"
            className="w-full h-9 pl-9 pr-9 rounded-full border-0 bg-white text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none shadow-sm"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setShowResults(false) }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Search dropdown */}
        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50">
            {results.length > 0 ? (
              <>
                <div className="px-3 py-1.5 text-xs text-gray-500 border-b border-gray-100 bg-gray-50">
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </div>
                <ul className="max-h-60 overflow-y-auto">
                  {results.map(p => (
                    <li key={p.id}>
                      <button
                        className="w-full flex items-start gap-3 px-3 py-2.5 hover:bg-blue-50 transition-colors text-left"
                        onClick={() => {
                          onSelectPrompt(p.id)
                          setQuery('')
                          setShowResults(false)
                        }}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-800 truncate">{p.name}</div>
                          <div className="text-xs text-gray-500 truncate">{p.category} · {p.description}</div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="px-3 py-6 text-center text-sm text-gray-500">
                No prompts found for "{query}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Right: Icons + User ── */}
      <div className="flex items-center gap-0.5 ml-auto">
        <TopBarIconBtn icon={Bell} label="Notifications" badge />
        <TopBarIconBtn icon={HelpCircle} label="Help" />
        <TopBarIconBtn icon={Info} label="Info" />

        <div className="w-px h-5 mx-1.5" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />

        {/* User */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(p => !p)}
            className="flex items-center gap-1.5 h-8 px-2 rounded transition-colors"
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '')}
            aria-label="User menu"
          >
            <div
              className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
              style={{ backgroundColor: 'rgba(255,255,255,0.25)', color: 'white' }}
            >
              NP
            </div>
            <span className="text-sm font-medium hidden sm:block text-white">Nita Patel</span>
            <ChevronDown className="h-3.5 w-3.5 hidden sm:block text-white/70" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-1.5 w-52 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50">
              <div className="px-3 py-2.5 border-b border-gray-100 bg-gray-50">
                <div className="text-sm font-semibold text-gray-800">Nita Patel</div>
                <div className="text-xs text-gray-500">nitapatel@nexidia.com</div>
              </div>
              {['Profile', 'Settings', 'Team', 'Billing'].map(item => (
                <button key={item} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
                  {item}
                </button>
              ))}
              <div className="border-t border-gray-100">
                <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">Sign out</button>
              </div>
            </div>
          )}
        </div>

        {/* NiCE branding */}
        <div className="ml-2 pl-3" style={{ borderLeft: '1px solid rgba(255,255,255,0.25)' }}>
          <span className="font-bold text-sm text-white select-none" style={{ letterSpacing: '0.15em' }}>
            NiCE
          </span>
        </div>
      </div>
    </header>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function TopBarIconBtn({ icon: Icon, label, badge = false }: { icon: React.ElementType; label: string; badge?: boolean }) {
  return (
    <button
      className="relative h-8 w-8 flex items-center justify-center rounded transition-colors"
      style={{ color: 'rgba(255,255,255,0.85)' }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.12)'
        ;(e.currentTarget as HTMLElement).style.color = 'white'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.backgroundColor = ''
        ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)'
      }}
      aria-label={label}
      title={label}
    >
      <Icon style={{ width: '1.05rem', height: '1.05rem' }} />
      {badge && (
        <span
          className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full"
          style={{ backgroundColor: '#FF6B35' }}
          aria-hidden="true"
        />
      )}
    </button>
  )
}

function SignalIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '1rem', height: '1rem' }}>
      <circle cx="10" cy="14" r="1.5" fill="white" />
      <path d="M6.5 11A4.5 4.5 0 0 1 13.5 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3.5 8.5A9 9 0 0 1 16.5 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
