export async function callAssistant(
  assistantId: string,
  userPrompt: string,
  threadId?: string,
): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  // Temporary log to verify env variable is loaded correctly
  console.log('Loaded API key:', apiKey?.slice(0, 5))
  if (!apiKey) {
    throw new Error('OpenAI API key is missing')
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
    'OpenAI-Beta': 'assistants=v2',
  }

  const baseUrl = 'https://api.openai.com/v1'

  // create a thread if none exists
  if (!threadId) {
    const threadRes = await fetch(`${baseUrl}/threads`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ messages: [{ role: 'user', content: userPrompt }] }),
    })
    if (!threadRes.ok) {
      throw new Error(`Failed to create thread: ${threadRes.status}`)
    }
    const threadData = (await threadRes.json()) as { id: string }
    threadId = threadData.id
  } else {
    // add the message to the existing thread
    const msgRes = await fetch(`${baseUrl}/threads/${threadId}/messages`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ role: 'user', content: userPrompt }),
    })
    if (!msgRes.ok) {
      throw new Error(`Failed to post message: ${msgRes.status}`)
    }
  }

  // create a run for the assistant
  const runRes = await fetch(`${baseUrl}/threads/${threadId}/runs`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ assistant_id: assistantId }),
  })
  if (!runRes.ok) {
    throw new Error(`Failed to create run: ${runRes.status}`)
  }
  const runData = (await runRes.json()) as { id: string }
  const runId = runData.id

  // poll for run completion
  let runStatus = ''
  while (runStatus !== 'completed') {
    const statusRes = await fetch(`${baseUrl}/threads/${threadId}/runs/${runId}`, {
      headers,
    })
    if (!statusRes.ok) {
      throw new Error(`Failed to fetch run status: ${statusRes.status}`)
    }
    const statusData = await statusRes.json()
    runStatus = statusData.status

    if (['failed', 'cancelled', 'expired'].includes(runStatus)) {
      throw new Error(`Run ended with status ${runStatus}`)
    }

    if (runStatus !== 'completed') {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  // retrieve the final message
  const messagesRes = await fetch(`${baseUrl}/threads/${threadId}/messages`, {
    headers,
  })
  if (!messagesRes.ok) {
    throw new Error(`Failed to fetch messages: ${messagesRes.status}`)
  }
  type Message = {
    role: string
    content: Array<{ text?: { value: string } }>
  }
  const messagesData = await messagesRes.json()
  const assistantMessages: Message[] = messagesData.data.filter((m: Message) => m.role === 'assistant')
  if (assistantMessages.length === 0) return ''
  const lastMessage = assistantMessages[assistantMessages.length - 1]
  return lastMessage.content[0]?.text?.value || ''
}
