/**
 * Why: a repo reached over SSH runs the CaPilot CLI through the relay shim, which
 * is always deployed as plain `capilot` (Unix) / `capilot.cmd` (Windows). The
 * Linux-only `capilot-ide` rename — which exists solely to avoid shadowing the
 * GNOME CaPilot screen reader on a local desktop — must not be applied to those
 * remotes, or `capilot-ide claude-teams` lands on a PATH where it does not exist.
 * `connectionId` is the SSH signal; WSL and local stay false.
 */
export function repoIsRemote(repo: { connectionId?: string | null }): boolean {
  return Boolean(repo.connectionId)
}
