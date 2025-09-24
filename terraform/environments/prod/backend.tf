# You must create this S3 bucket in your AWS account before running Terraform.
terraform {
  backend "s3" {
    bucket = "your-saas-terraform-state-bucket" # A globally unique S3 bucket name
    key    = "frontend/prod/terraform.tfstate"
    region = "us-east-1"
  }
}