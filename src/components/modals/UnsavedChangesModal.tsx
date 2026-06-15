import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/Dialog'
import { Button } from '../ui/Button'

interface UnsavedChangesModalProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function UnsavedChangesModal({ open, onConfirm, onCancel }: UnsavedChangesModalProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Unsaved Changes</DialogTitle>
          <DialogDescription>
            You have unsaved changes that will be lost if you leave. Do you want to continue?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onCancel}>Keep Editing</Button>
          <Button variant="destructive" onClick={onConfirm}>Discard Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
