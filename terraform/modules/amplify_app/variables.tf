variable "app_name" {
  description = "The name of the Amplify application."
  type        = string
}

variable "repo_url" {
  description = "The URL of the GitHub repository."
  type        = string
}

variable "github_token" {
  description = "The GitHub Personal Access Token for Amplify to access the repo."
  type        = string
  sensitive   = true # This prevents the token from being shown in logs.
}

variable "branch_name" {
  description = "The specific Git branch to build and deploy."
  type        = string
}

variable "stage" {
  description = "The Amplify stage for this branch (e.g., PRODUCTION, DEVELOPMENT)."
  type        = string
}

variable "env_vars" {
  description = "A map of environment variables for the Amplify build."
  type        = map(string)
  default     = {}
}