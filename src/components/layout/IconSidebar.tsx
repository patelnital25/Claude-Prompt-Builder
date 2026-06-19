import React from 'react'
import {
  Home, Sparkles, BarChart2, Lightbulb, Users,
  Search, Settings, Network,
} from 'lucide-react'
import { cn } from '../../lib/utils'

interface IconSidebarProps {
  activeView: 'prompt-builder'
}

export function IconSidebar({ activeView }: IconSidebarProps) {
  const decorativeIcons = [Network, BarChart2, Lightbulb, Users, Search]

  return (
    <aside
      className="fixed left-0 top-14 bottom-0 z-40 w-14 flex flex-col"
      style={{ backgroundColor: '#FFFFFF', borderRight: '1px solid #C8DCE8' }}
    >
      {/* Top nav icons */}
      <nav className="flex flex-col items-center pt-2 flex-1 gap-0.5" aria-label="App navigation">

        {/* Home — visible but not active */}
        <SidebarIcon
          icon={Home}
          label="Home"
          active={false}
          onClick={() => {}}
        />

        {/* Prompt Builder — always active */}
        <SidebarIcon
          icon={Sparkles}
          label="Prompt Builder"
          active={activeView === 'prompt-builder'}
          onClick={() => {}}
          tooltip="Prompt Builder"
        />

        {/* Thin divider */}
        <div className="w-8 h-px my-1" style={{ backgroundColor: '#C8DCE8' }} />

        {/* Decorative icons (no action) */}
        {decorativeIcons.map((Icon, i) => (
          <SidebarIcon
            key={i}
            icon={Icon}
            label=""
            active={false}
            onClick={() => {}}
          />
        ))}
      </nav>

      {/* Settings pinned to bottom */}
      <div
        className="flex flex-col items-center py-2"
        style={{ borderTop: '1px solid #C8DCE8' }}
      >
        <SidebarIcon icon={Settings} label="Settings" active={false} onClick={() => {}} />
      </div>
    </aside>
  )
}

// ── Single icon button ────────────────────────────────────────────────────────

function SidebarIcon({
  icon: Icon, label, active, onClick, tooltip,
}: {
  icon: React.ElementType
  label: string
  active: boolean
  onClick: () => void
  tooltip?: string
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label || tooltip}
      title={tooltip || label}
      className={cn(
        'relative flex items-center justify-center w-full h-11 transition-colors group',
        active
          ? 'text-[#005F87]'
          : 'hover:text-[#005F87]'
      )}
      style={
        active
          ? { backgroundColor: '#E0F0F8' }
          : undefined
      }
      onMouseEnter={e => {
        if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = '#F0F8FC'
      }}
      onMouseLeave={e => {
        if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = ''
      }}
    >
      {/* Active left-edge indicator */}
      {active && (
        <span
          className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r"
          style={{ backgroundColor: '#006699' }}
        />
      )}

      <Icon
        className="h-5 w-5 transition-colors"
        style={{ color: active ? '#006699' : '#7AAEC8' }}
      />

      {/* Tooltip on hover */}
      {(tooltip || label) && (
        <span className="pointer-events-none absolute left-full ml-2 px-2 py-1 text-xs font-medium text-white rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50"
          style={{ backgroundColor: '#005F87' }}
        >
          {tooltip || label}
        </span>
      )}
    </button>
  )
}
