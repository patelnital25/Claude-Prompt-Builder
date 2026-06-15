import { useState, useEffect } from 'react'
import { RotateCcw, Copy, Trash2, Sparkles } from 'lucide-react'
import { Prompt } from '../../types'
import { Button } from '../ui/Button'
import { Textarea } from '../ui/Textarea'
import { MOCK_LLM_RESPONSES } from '../../data/mockData'

interface PlaygroundTabProps {
  prompt: Prompt
}

export function PlaygroundTab({ prompt }: PlaygroundTabProps) {
  const [editablePrompt, setEditablePrompt] = useState(prompt.content)
  const [testInput, setTestInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)

  const handleGenerate = async () => {
    if (!testInput.trim()) return
    setLoading(true)
    setOutput('')
    setGenerated(false)
    await new Promise(r => setTimeout(r, 800 + Math.random() * 700))
    const response = MOCK_LLM_RESPONSES[Math.floor(Math.random() * MOCK_LLM_RESPONSES.length)]
    setLoading(false)
    setGenerated(true)
    // Simulate streaming
    let i = 0
    const stream = setInterval(() => {
      i += Math.floor(Math.random() * 8) + 3
      setOutput(response.substring(0, i))
      if (i >= response.length) {
        setOutput(response)
        clearInterval(stream)
      }
    }, 20)
  }

  const handleClear = () => {
    setOutput('')
    setGenerated(false)
    setTestInput('')
  }

  const copyOutput = () => navigator.clipboard.writeText(output)

  useEffect(() => {
    setEditablePrompt(prompt.content)
  }, [prompt.id])

  return (
    <div className="flex h-full divide-x divide-border overflow-hidden">
      {/* Left panel - Prompt */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-secondary/20">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">System Prompt</span>
          <span className="text-xs text-muted-foreground">{editablePrompt.length} chars</span>
        </div>
        <Textarea
          value={editablePrompt}
          onChange={e => setEditablePrompt(e.target.value)}
          className="flex-1 rounded-none border-0 resize-none font-mono text-sm focus-visible:ring-0 bg-transparent h-full"
          placeholder="System prompt..."
        />
      </div>

      {/* Right panel - Testing */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Test Input */}
        <div className="flex-none">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-secondary/20">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">User Input</span>
          </div>
          <Textarea
            value={testInput}
            onChange={e => setTestInput(e.target.value)}
            placeholder="Type your test input here..."
            rows={5}
            className="rounded-none border-0 border-b border-border resize-none text-sm focus-visible:ring-0 bg-transparent"
          />
        </div>

        {/* Generate button */}
        <div className="flex-none flex items-center gap-2 px-4 py-2.5 border-b border-border">
          <Button
            onClick={handleGenerate}
            disabled={loading || !testInput.trim()}
            size="sm"
            className="gap-1.5"
          >
            {loading ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                Generate
              </>
            )}
          </Button>
          {generated && (
            <>
              <Button variant="outline" size="sm" onClick={handleGenerate} className="gap-1.5">
                <RotateCcw className="h-3.5 w-3.5" />
                Regenerate
              </Button>
              <Button variant="ghost" size="sm" onClick={copyOutput} className="gap-1.5">
                <Copy className="h-3.5 w-3.5" />
                Copy
              </Button>
              <Button variant="ghost" size="sm" onClick={handleClear} className="gap-1.5 text-muted-foreground">
                <Trash2 className="h-3.5 w-3.5" />
                Clear
              </Button>
            </>
          )}
        </div>

        {/* Output */}
        <div className="flex-1 overflow-y-auto">
          {loading && !output && (
            <div className="flex items-center gap-3 p-4">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce" />
              </div>
              <span className="text-sm text-muted-foreground">Generating response...</span>
            </div>
          )}
          {output && (
            <div className="p-4">
              <pre className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">{output}</pre>
              {loading && <span className="inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5" />}
            </div>
          )}
          {!loading && !output && (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center px-6">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">Ready to test</p>
              <p className="text-xs text-muted-foreground mt-1">Enter a user input and click Generate</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
