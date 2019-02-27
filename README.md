# Jira Login
Used to store credentials for later use by other Jira Actions

For examples on how to use this, check out the [gajira-demo](https://github.com/atlassian/gajira-demo) repository

This is required by other actions like:
- [`Transition`](https://github.com/marketplace/actions/jira-transition) - Transition a Jira issue
- [`Comment`](https://github.com/marketplace/actions/jira-comment) - Add a comment to a Jira issue
- [`Create`](https://github.com/marketplace/actions/jira-create) - Create a new Jira issue
- [`Find issue key`](https://github.com/marketplace/actions/jira-find) - Search for an issue key in commit message, branch name, etc. This issue key is then saved and used by the next actions in the same workflow
- [`TODO`](https://github.com/marketplace/actions/jira-todo) - Create a Jira issue for each TODO comment in committed code
- [`CLI`](https://github.com/marketplace/actions/jira-cli) - Wrapped [go-jira](https://github.com/Netflix-Skunkworks/go-jira) CLI for common Jira actions

## Usage
An example workflow to create a Jira issue for each `//TODO` in code:

```
workflow "Todo issue" {
  on = "push"
  resolves = ["Jira Login"]
}

action "Jira Login" {
  uses = "atlassian/gajira-login@master"
  secrets = ["JIRA_BASE_URL", "JIRA_API_TOKEN", "JIRA_USER_EMAIL"]
}

action "Jira TODO" {
  needs = "Jira Login"
  uses = "atlassian/gajira-todo@master"
  secrets = ["GITHUB_TOKEN"]
  args = "--project=GA --issuetype=Task"
}
```

More examples at [gajira-demo](https://github.com/atlassian/gajira-demo) repository

----
## Action Spec:

### Enviroment variables
- `JIRA_BASE_URL` - URL of Jira instance. Example: `https://<yourdomain>.atlassian.net`
- `JIRA_API_TOKEN` - **Access Token** for Authorization. Example: `HXe8DGg1iJd2AopzyxkFB7F2` ([How To](https://confluence.atlassian.com/cloud/api-tokens-938839638.html))
- `JIRA_USER_EMAIL` - email of the user for which **Access Token** was created for . Example: `human@example.com`

### Arguments
- None

### Writes fields to config file at $HOME/jira/config.yml
- `email` - user email
- `token` - api token
- `baseUrl` - URL for Jira instance

### Writes fields to CLI config file at $HOME/.jira.d/config.yml
- `endpoint` - URL for Jira instance
- `login` - user email

### Writes env to file at $HOME/.jira.d/credentials
- `JIRA_API_TOKEN` - Jira API token to use with CLI