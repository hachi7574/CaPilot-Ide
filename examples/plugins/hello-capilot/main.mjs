// Sample CaPilot plugin worker entry. Runs inside the out-of-process plugin
// worker (plain Node, no Electron), forked lazily on the first trigger. The
// default export receives the `capilot` API: command registration, event
// handlers, and the capability-gated host API.
export default function activate(capilot) {
  capilot.commands.register('hello-ping', async (args) => {
    const stored = await capilot.host.call('storage.get', { key: 'pings' })
    const count = (typeof stored?.value === 'number' ? stored.value : 0) + 1
    await capilot.host.call('storage.set', { key: 'pings', value: count })
    return { pong: true, count, args: args ?? null }
  })

  capilot.events.on('worktree.created', async (payload) => {
    capilot.log(`worktree created: ${payload.worktreeId} at ${payload.path}`)
    await capilot.host.call('notifications.show', {
      title: 'Worktree created',
      body: payload.path
    })
  })

  capilot.events.on('agent.status.changed', (payload) => {
    capilot.log(`agent status: ${payload.state} in ${payload.worktreeId ?? 'unknown worktree'}`)
  })
}
