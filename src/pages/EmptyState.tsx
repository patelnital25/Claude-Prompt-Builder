import { Zap, Plus } from 'lucide-react'
import { Button } from '../components/ui/Button'

interface EmptyStateProps {
  onNewPrompt: () => void
}

export function EmptyState({ onNewPrompt }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <div className="relative mb-6">
        <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Zap className="h-10 w-10 text-primary" />
        </div>
        <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-primary flex items-center justify-center">
          <Plus className="h-4 w-4 text-primary-foreground" />
        </div>
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">No prompt selected</h2>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        Select a prompt from the sidebar to view and edit it, or create a new one to get started.
      </p>
      <Button onClick={onNewPrompt} className="gap-2">
        <Plus className="h-4 w-4" />
        Create your first prompt
      </Button>
    </div>
  )
}
