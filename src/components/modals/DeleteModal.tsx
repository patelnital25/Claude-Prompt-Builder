import { AlertTriangle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/Dialog'
import { Button } from '../ui/Button'

interface DeleteModalProps {
  open: boolean
  promptName: string
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteModal({ open, promptName, onConfirm, onCancel }: DeleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <DialogTitle>Delete Prompt?</DialogTitle>
          </div>
          <DialogDescription>
            <span className="font-medium text-foreground">"{promptName}"</span> will be permanently deleted. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Delete Prompt</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
