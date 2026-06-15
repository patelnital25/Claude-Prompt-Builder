import { useState, useCallback } from 'react'
import { NavBar } from '../components/layout/NavBar'
import { Sidebar } from '../components/layout/Sidebar'
import { PromptWorkspace } from './PromptWorkspace'
import { EmptyState } from './EmptyState'
import { DeleteModal } from '../components/modals/DeleteModal'
import { UnsavedChangesModal } from '../components/modals/UnsavedChangesModal'
import { CreatePromptModal } from '../components/modals/CreatePromptModal'
import { ToastContainer } from '../components/ui/Toast'
import { usePrompts } from '../hooks/usePrompts'
import { useToast } from '../hooks/useToast'
import { Prompt } from '../types'

export function MainLayout() {
  const {
    prompts, selectedPrompt, selectedPromptId,
    searchQuery,
    setSearchQuery, setSelectedPromptId,
    globalSearch, createPrompt, updatePrompt, deletePrompt,
    toggleFavorite, saveAsNew,
  } = usePrompts()

  const { toasts, addToast, removeToast } = useToast()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showUnsavedModal, setShowUnsavedModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [pendingNavId, setPendingNavId] = useState<string | null>(null)
  const [isDirty, setIsDirty] = useState(false)

  const handleSelectPrompt = useCallback((id: string) => {
    if (isDirty && id !== selectedPromptId) {
      setPendingNavId(id)
      setShowUnsavedModal(true)
    } else {
      setSelectedPromptId(id)
    }
  }, [isDirty, selectedPromptId, setSelectedPromptId])

  const handleUnsavedConfirm = () => {
    setShowUnsavedModal(false)
    setIsDirty(false)
    if (pendingNavId) {
      setSelectedPromptId(pendingNavId)
      setPendingNavId(null)
    }
    addToast({ title: 'Changes discarded', variant: 'default' })
  }

  const handleDeleteConfirm = () => {
    if (selectedPrompt) {
      const name = selectedPrompt.name
      deletePrompt(selectedPrompt.id)
      setShowDeleteModal(false)
      setIsDirty(false)
      addToast({ title: 'Prompt deleted', description: `"${name}" has been removed.`, variant: 'destructive' })
    }
  }

  const handleCreate = (data: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt' | 'version' | 'author' | 'isFavorite' | 'status'>) => {
    const newPrompt = createPrompt(data)
    setShowCreateModal(false)
    addToast({ title: 'Prompt created', description: `"${newPrompt.name}" is ready to edit.`, variant: 'success' })
  }

  const handleUpdate = (id: string, updates: Partial<Prompt>) => {
    updatePrompt(id, updates)
    setIsDirty(false)
  }

  const handleRename = (name: string) => {
    if (selectedPrompt) {
      updatePrompt(selectedPrompt.id, { name })
      addToast({ title: 'Prompt renamed', description: `Renamed to "${name}"`, variant: 'success' })
    }
  }

  const handleSaveAsNew = () => {
    if (selectedPrompt) {
      saveAsNew(selectedPrompt.id, `${selectedPrompt.name} (copy)`)
      addToast({ title: 'Prompt duplicated', description: 'A copy has been created.', variant: 'success' })
    }
  }

  const handleToggleFavorite = () => {
    if (selectedPrompt) {
      toggleFavorite(selectedPrompt.id)
      addToast({
        title: selectedPrompt.isFavorite ? 'Removed from favorites' : 'Added to favorites',
        variant: 'success',
      })
    }
  }

  const sidebarWidth = sidebarCollapsed ? 56 : 256

  return (
    <div className="h-screen bg-background overflow-hidden flex flex-col">
      <NavBar onSearch={globalSearch} onSelectPrompt={handleSelectPrompt} />

      <div className="flex flex-1 pt-14 min-h-0">
        <Sidebar
          allPrompts={prompts}
          selectedId={selectedPromptId}
          searchQuery={searchQuery}
          collapsed={sidebarCollapsed}
          onCollapse={setSidebarCollapsed}
          onSelectPrompt={handleSelectPrompt}
          onNewPrompt={() => setShowCreateModal(true)}
          onSearchChange={setSearchQuery}
        />

        <main
          className="flex-1 min-h-0 overflow-hidden transition-all duration-300"
          style={{ marginLeft: sidebarWidth }}
        >
          {selectedPrompt ? (
            <PromptWorkspace
              key={selectedPrompt.id}
              prompt={selectedPrompt}
              onUpdate={handleUpdate}
              onDelete={() => setShowDeleteModal(true)}
              onToggleFavorite={handleToggleFavorite}
              onSaveAsNew={handleSaveAsNew}
              onRename={handleRename}
              onToast={addToast}
            />
          ) : (
            <EmptyState onNewPrompt={() => setShowCreateModal(true)} />
          )}
        </main>
      </div>

      {/* Modals */}
      <DeleteModal
        open={showDeleteModal}
        promptName={selectedPrompt?.name || ''}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
      />
      <UnsavedChangesModal
        open={showUnsavedModal}
        onConfirm={handleUnsavedConfirm}
        onCancel={() => { setShowUnsavedModal(false); setPendingNavId(null) }}
      />
      <CreatePromptModal
        open={showCreateModal}
        onCreate={handleCreate}
        onCancel={() => setShowCreateModal(false)}
      />

      {/* Toasts */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}
