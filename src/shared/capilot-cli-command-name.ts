export function getOrcaCliCommandNameForPlatform(platform: NodeJS.Platform): string {
  if (platform === 'linux') {
    return 'capilot-ide'
  }
  if (platform === 'win32') {
    return 'capilot.cmd'
  }
  return 'capilot'
}
