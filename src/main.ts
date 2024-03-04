import * as core from '@actions/core'
import { wait } from './wait'
import { HttpClient } from '@actions/http-client'
/**
 * The main function for the action.
 * @returns {Promise<void>}
 */
export async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('wait')
    const domain: string = core.getInput('domain')
    // const GH_TOKEN: string = core.getInput('gh_token')

    core.debug(`Await ${+ms / 1000}sec till website deploy is live`)
    wait(parseInt(ms, 10))

    core.debug(`Getting your website report ...`)
    const { score, secretsReport } = await getReport(domain)

    core.setOutput('score', `Your website overall score: ${score}\n`)
    core.setOutput('report', secretsReport)

    const outputTable = [
      { data: 'Score', header: true },
      { data: 'Secrets', header: true },
      { data: score.toString() },
      { data: secretsReport }
    ]

    core.summary.addTable([outputTable])
    core.summary.addLink('Generated by Nudgeer', 'https://nudgeer.com')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

async function getReport(
  url: string
): Promise<{ score: number; secretsReport: string }> {
  const http = new HttpClient()
  const nudgeerURL = 'http://161.35.168.63:8000'
  const payload = JSON.stringify({ url })
  const report = await http.post(`${nudgeerURL}/report`, payload)
  const reportJson = JSON.parse(await report.readBody())

  return {
    score: reportJson.total_score,
    secretsReport: reportJson.secrets_report
  }
}

export async function writePRComment(): Promise<string> {
  return 'not implemented yet'
}
