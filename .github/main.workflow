workflow "Test" {
  on = "push"
  resolves = ["Jira Login"]
}

action "Jira Login" {
  uses = "./"
  secrets = ["JIRA_BASE_URL", "JIRA_USER_EMAIL", "JIRA_API_TOKEN"]
}
