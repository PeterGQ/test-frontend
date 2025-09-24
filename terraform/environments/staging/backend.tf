terraform {
  backend "s3" {
    bucket = "your-saas-terraform-state-bucket" # Use the same bucket
    key    = "frontend/staging/terraform.tfstate" # A different key for this environment
    region = "us-east-1"
  }
}