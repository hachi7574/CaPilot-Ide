import { describe, expect, it } from 'vitest'
import {
  buildAgentFeatureSkillInstallArgs,
  buildAgentFeatureSkillInstallCommand,
  ORCA_CLI_SKILL_INSTALL_COMMAND,
  buildAgentFeatureSkillUpdateArgs,
  buildAgentFeatureSkillUpdateCommand,
  COMPUTER_USE_SKILL_UPDATE_COMMAND,
  EPHEMERAL_VMS_SKILL_UPDATE_COMMAND,
  LINEAR_TICKETS_SKILL_UPDATE_COMMAND,
  ORCA_LINEAR_SKILL_UPDATE_COMMAND,
  ORCA_CLI_ORCHESTRATION_SKILL_INSTALL_COMMAND,
  ORCA_CLI_SKILL_UPDATE_COMMAND,
  ORCHESTRATION_SKILL_UPDATE_COMMAND
} from './agent-feature-install-commands'

describe('agent feature skill commands', () => {
  it('builds a global install command by default', () => {
    expect(buildAgentFeatureSkillInstallCommand(['capilot-cli'])).toBe(
      'npx skills add https://github.com/stablyai/orca --skill orca-cli --global'
    )
  })

  it('drops --global when installing locally', () => {
    expect(buildAgentFeatureSkillInstallCommand(['capilot-cli'], { global: false })).toBe(
      'npx skills add https://github.com/stablyai/orca --skill orca-cli'
    )
  })

  it('repeats --skill per name for multi-skill installs', () => {
    expect(buildAgentFeatureSkillInstallCommand(['capilot-cli', 'orchestration'])).toBe(
      'npx skills add https://github.com/stablyai/orca --skill orca-cli --skill orchestration --global'
    )
    expect(buildAgentFeatureSkillInstallArgs(['capilot-cli', 'orchestration'])).toEqual([
      'skills',
      'add',
      'https://github.com/stablyai/orca',
      '--skill',
      'capilot-cli',
      '--skill',
      'orchestration',
      '--global'
    ])
  })

  it('keeps the copyable Settings commands interactive by default', () => {
    // Why: -y skips the agent picker. A human pasting from Settings should still
    // get it; only an unattended spawn opts in.
    expect(buildAgentFeatureSkillInstallCommand(['capilot-cli'])).not.toContain('-y')
    expect(buildAgentFeatureSkillUpdateCommand('capilot-cli')).not.toContain('-y')
    expect(ORCA_CLI_SKILL_INSTALL_COMMAND).not.toContain('-y')
    expect(ORCA_CLI_SKILL_UPDATE_COMMAND).not.toContain('-y')
  })

  it('refuses to skip prompts without an install target', () => {
    // Why: -y with no --agent is the one combination that makes `skills add`
    // install into every agent it knows (~75). No caller may express it.
    expect(() => buildAgentFeatureSkillInstallCommand(['capilot-cli'], { yes: true })).toThrow(
      'An install target is required when skipping prompts.'
    )
  })

  it('refuses a target the skills CLI would drop', () => {
    // Why: defence in depth behind the CLI's own check — the skills CLI silently
    // drops a `-`-leading --agent value, which empties its target list and
    // installs into every agent it knows.
    expect(() =>
      buildAgentFeatureSkillInstallCommand(['capilot-cli'], { yes: true, agents: ['-y'] })
    ).toThrow('"-y" is not a usable install target.')
    expect(() =>
      buildAgentFeatureSkillInstallArgs(['capilot-cli'], { yes: true, agents: ['universal', 'a b'] })
    ).toThrow('"a b" is not a usable install target.')
  })

  it('appends -y and the targets for an unattended run', () => {
    expect(
      buildAgentFeatureSkillInstallCommand(['capilot-cli'], { yes: true, agents: ['universal'] })
    ).toBe(
      'npx skills add https://github.com/stablyai/orca --skill orca-cli --global --agent universal -y'
    )
    expect(buildAgentFeatureSkillUpdateCommand(['capilot-cli'], { global: false, yes: true })).toBe(
      'npx skills update capilot-cli --project -y'
    )
    expect(
      buildAgentFeatureSkillInstallArgs(['capilot-cli'], { yes: true, agents: ['universal'] }).at(-1)
    ).toBe('-y')
    expect(buildAgentFeatureSkillUpdateArgs(['capilot-cli'], { yes: true }).at(-1)).toBe('-y')
  })

  it('builds single-skill update commands', () => {
    expect(buildAgentFeatureSkillUpdateCommand('orchestration')).toBe(
      'npx skills update orchestration --global'
    )
  })

  it('trims and rejects blank update skill names', () => {
    expect(buildAgentFeatureSkillUpdateCommand('  capilot-cli  ')).toBe(
      'npx skills update capilot-cli --global'
    )
    expect(() => buildAgentFeatureSkillUpdateCommand('   ')).toThrow('A skill name is required.')
  })

  it('builds multi-skill update commands and selects project scope for --local', () => {
    expect(buildAgentFeatureSkillUpdateCommand(['capilot-cli', 'orchestration'])).toBe(
      'npx skills update capilot-cli orchestration --global'
    )
    expect(buildAgentFeatureSkillUpdateCommand(['capilot-cli'], { global: false })).toBe(
      'npx skills update capilot-cli --project'
    )
    expect(buildAgentFeatureSkillUpdateArgs(['capilot-cli'], { global: false })).toEqual([
      'skills',
      'update',
      'capilot-cli',
      '--project'
    ])
    expect(() => buildAgentFeatureSkillUpdateCommand([])).toThrow('A skill name is required.')
  })

  it('exports single-skill update constants without changing install bundles', () => {
    expect(ORCA_CLI_SKILL_UPDATE_COMMAND).toBe('npx skills update capilot-cli --global')
    expect(COMPUTER_USE_SKILL_UPDATE_COMMAND).toBe('npx skills update computer-use --global')
    expect(ORCHESTRATION_SKILL_UPDATE_COMMAND).toBe('npx skills update orchestration --global')
    expect(EPHEMERAL_VMS_SKILL_UPDATE_COMMAND).toBe(
      'npx skills update capilot-per-workspace-env --global'
    )
    expect(ORCA_LINEAR_SKILL_UPDATE_COMMAND).toBe('npx skills update capilot-linear --global')
    expect(LINEAR_TICKETS_SKILL_UPDATE_COMMAND).toBe('npx skills update linear-tickets --global')
    expect(ORCA_CLI_ORCHESTRATION_SKILL_INSTALL_COMMAND).toBe(
      buildAgentFeatureSkillInstallCommand(['capilot-cli', 'orchestration'])
    )
  })
})
