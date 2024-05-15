import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { dirname } from 'path'
import { stringify } from 'yaml'

const cliConfigPath = `${process.env.HOME}/.jira.d/config.yml`
const cliCredentialsPath = `${process.env.HOME}/.jira.d/credentials`
const configPath = `${process.env.HOME}/jira/config.yml`

import Action from './action'

// eslint-disable-next-line import/no-dynamic-require
const githubEvent = require(process.env.GITHUB_EVENT_PATH)

async function exec () {
  try {
    if (!process.env.JIRA_BASE_URL) throw new Error('Please specify JIRA_BASE_URL env')
    if (!process.env.JIRA_API_TOKEN) throw new Error('Please specify JIRA_API_TOKEN env')
    if (!process.env.JIRA_USER_EMAIL) throw new Error('Please specify JIRA_USER_EMAIL env')

    const config = {
      baseUrl: process.env.JIRA_BASE_URL,
      token: process.env.JIRA_API_TOKEN,
      email: process.env.JIRA_USER_EMAIL,
    }

    const result = await new Action({
      githubEvent,
      argv: {},
      config,
    }).execute()

    if (result) {
      const extendedConfig = Object.assign({}, config, result)

      if (!existsSync(configPath)) {
        mkdirSync(dirname(configPath), { recursive: true })
      }

      writeFileSync(configPath, stringify(extendedConfig))

      if (!existsSync(cliConfigPath)) {
        mkdirSync(dirname(cliConfigPath), { recursive: true })
      }

      writeFileSync(cliConfigPath, stringify({
        endpoint: result.baseUrl,
        login: result.email,
      }))

      writeFileSync(cliCredentialsPath, `JIRA_API_TOKEN=${result.token}`)

      return
    }

    console.log('Failed to login.')
    process.exit(78)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

exec()
