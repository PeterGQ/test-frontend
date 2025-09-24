# The main Amplify Application, linked to your GitHub repo
resource "aws_amplify_app" "app" {
  name       = var.app_name
  repository = var.repo_url
  access_token = var.github_token

  # Default environment variables for all branches
  environment_variables = var.env_vars
}

# The specific branch environment within the Amplify App
resource "aws_amplify_branch" "branch" {
  app_id      = aws_amplify_app.app.id
  branch_name = var.branch_name
  stage       = var.stage
}