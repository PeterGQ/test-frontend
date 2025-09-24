# --- Global Variables ---
variable "github_token" {
  description = "GitHub PAT loaded from tfvars"
  sensitive   = true
}

# --- Module Call ---
module "amplify_staging" {
  source = "../../modules/amplify_app"

  # Pass variables to the module with staging-specific values
  app_name     = "SaaS-Frontend-Staging"
  repo_url     = "https://github.com/your-username/your-saas-frontend"
  github_token = var.github_token
  branch_name  = "staging"
  stage        = "DEVELOPMENT"

  # Staging-specific environment variables
  env_vars = {
    NEXT_PUBLIC_API_URL = "https://staging-api.yourdomain.com"
    # Add other staging environment variables here
  }
}