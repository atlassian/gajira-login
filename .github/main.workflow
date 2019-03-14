workflow "Test" {
  on = "push"
  resolves = ["Jira Login"]
}

action "Jira Login" {
  uses = "./"
  secrets = ["JIRA_BASE_URL", "JIRA_USER_EMAIL", "JIRA_API_TOKEN"]
}

workflow "Test on issues" {
  on = "issues"
  resolves = ["Jira Login-1"]
}

action "Jira Login-1" {
  uses = "./"
  secrets = ["JIRA_API_TOKEN", "JIRA_BASE_URL", "JIRA_USER_EMAIL"]
}
