import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { cn } from '../../lib/utils'
import { ToastMessage } from '../../types'

interface ToastProps {
  toast: ToastMessage
  onRemove: (id: string) => void
}

export function Toast({ toast, onRemove }: ToastProps) {
  const icons = {
    default: <Info className="h-4 w-4 text-blue-600" />,
    success: <CheckCircle className="h-4 w-4 text-green-600" />,
    destructive: <AlertCircle className="h-4 w-4 text-red-600" />,
  }

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-sm transition-all',
        'bg-card/95 border-border',
        toast.variant === 'destructive' && 'border-red-500/30',
        toast.variant === 'success' && 'border-green-500/30',
      )}
    >
      {icons[toast.variant || 'default']}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{toast.title}</p>
        {toast.description && (
          <p className="text-xs text-muted-foreground mt-0.5">{toast.description}</p>
        )}
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

interface ToastContainerProps {
  toasts: ToastMessage[]
  onRemove: (id: string) => void
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-80" aria-live="polite">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}
