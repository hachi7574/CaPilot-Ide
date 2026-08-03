import type {
  OrcaCloudCapabilities,
  OrcaCloudOrgSummary,
  OrcaProfileCloudSummary
} from '../../shared/capilot-profiles'

export type OrcaCloudSessionExchangeResponse = {
  accessToken: string
  refreshToken: string
  expiresAt: number
  cloud: OrcaProfileCloudSummary
  organizations?: OrcaCloudOrgSummary[]
  capabilities: OrcaCloudCapabilities
}
