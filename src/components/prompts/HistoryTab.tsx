import { Clock, User, GitBranch } from 'lucide-react'
import { mockHistory } from '../../data/mockData'
import { formatDate } from '../../lib/utils'
import { Badge } from '../ui/Badge'

interface HistoryTabProps {
  promptId: string
}

export function HistoryTab({ promptId }: HistoryTabProps) {
  const history = mockHistory
    .filter(h => h.promptId === promptId)
    .sort((a, b) => b.version - a.version)

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-16">
        <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-3">
          <Clock className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium">No history yet</p>
        <p className="text-xs text-muted-foreground mt-1">Changes will appear here after you save</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl overflow-y-auto h-full">
      <div className="flex items-center gap-2 mb-6">
        <GitBranch className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-sm font-medium text-foreground">Version History</h2>
        <Badge variant="secondary">{history.length} versions</Badge>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-2 bottom-2 w-px bg-border" />

        <div className="space-y-4">
          {history.map((entry, i) => (
            <div key={entry.id} className="relative flex gap-4">
              {/* Timeline dot */}
              <div className={`relative z-10 h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${i === 0 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                v{entry.version}
              </div>

              <div className={`flex-1 rounded-lg border p-4 mb-1 ${i === 0 ? 'border-primary/30 bg-primary/5' : 'border-border bg-card'}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Version {entry.version}</span>
                      {i === 0 && <Badge variant="success">Current</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{entry.summary}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{formatDate(entry.timestamp)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  <span>{entry.author}</span>
                </div>
                {i > 0 && (
                  <button className="mt-2 text-xs text-primary hover:underline">
                    Restore this version
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
