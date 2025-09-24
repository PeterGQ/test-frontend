# --- Global Variables ---
variable "github_token" {
  description = "GitHub PAT loaded from tfvars"
  sensitive   = true
}

# --- Module Call ---
module "amplify_prod" {
  source = "../../modules/amplify_app"

  # Pass variables to the module
  app_name     = "SaaS-Frontend-Prod"
  repo_url     = "https://github.com/your-username/your-saas-frontend"
  github_token = var.github_token
  branch_name  = "main"
  stage        = "PRODUCTION"

  # Production-specific environment variables
  env_vars = {
    NEXT_PUBLIC_API_URL = "https://api.yourdomain.com"
    # Add other production environment variables here
  }
}