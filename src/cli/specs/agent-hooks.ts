import type { CommandSpec } from '../args'
import { GLOBAL_FLAGS } from '../args'

export const AGENT_HOOK_COMMAND_SPECS: CommandSpec[] = [
  {
    path: ['agent', 'hooks', 'status'],
    summary: 'Show whether CaPilot-managed agent status hooks are enabled',
    usage: 'capilot agent hooks status [--json]',
    allowedFlags: [...GLOBAL_FLAGS],
    examples: ['capilot agent hooks status', 'capilot agent hooks status --json']
  },
  {
    path: ['agent', 'hooks', 'off'],
    summary: 'Disable CaPilot-managed agent status hooks and remove local hook entries',
    usage: 'capilot agent hooks off [--json]',
    allowedFlags: [...GLOBAL_FLAGS],
    examples: ['capilot agent hooks off']
  },
  {
    path: ['agent', 'hooks', 'on'],
    summary: 'Enable CaPilot-managed agent status hooks',
    usage: 'capilot agent hooks on [--json]',
    allowedFlags: [...GLOBAL_FLAGS],
    examples: ['capilot agent hooks on']
  }
]
