import Jira from './common/net/Jira'

export default class {
  constructor ({ githubEvent, argv, config }) {
    this.Jira = new Jira({
      baseUrl: config.baseUrl,
      token: config.token,
      email: config.email,
    })

    this.config = config
    this.argv = argv
    this.githubEvent = githubEvent
  }

  async execute () {
    await this.Jira.getMyself()
    console.log(`Successfully logged in.`)

    return this.config
  }
}
