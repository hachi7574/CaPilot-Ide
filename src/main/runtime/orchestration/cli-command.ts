import type { ProjectExecutionRuntimeResolution } from '../../../shared/project-execution-runtime'
import { isWslUncPath } from '../../../shared/wsl-paths'
import { splitWorktreeIdForFilesystem } from '../../../shared/worktree-id'

export type OrchestrationCliCommand = 'capilot' | 'capilot-ide'

export function resolveTerminalOrchestrationCliCommand(args: {
  connectionId: string | null
  isWsl: boolean | null | undefined
  worktreeId: string
  projectRuntime?: ProjectExecutionRuntimeResolution
}): OrchestrationCliCommand {
  if (args.connectionId) {
    return 'capilot'
  }
  if (args.isWsl !== null && args.isWsl !== undefined) {
    return args.isWsl ? 'capilot-ide' : 'capilot'
  }
  if (args.projectRuntime?.status === 'resolved' && args.projectRuntime.runtime.kind === 'wsl') {
    return 'capilot-ide'
  }

  const worktreePath = splitWorktreeIdForFilesystem(args.worktreeId)?.worktreePath
  return worktreePath && isWslUncPath(worktreePath) ? 'capilot-ide' : 'capilot'
}
