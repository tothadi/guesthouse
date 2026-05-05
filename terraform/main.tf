terraform {
  required_version = ">= 1.9"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }

  # Uncomment after initial apply to migrate state to R2
  # backend "s3" {
  #   bucket = "guesthouse-terraform-state"
  #   key    = "terraform.tfstate"
  #
  #   region = "auto"
  #   endpoints = {
  #     s3 = "https://<ACCOUNT_ID>.r2.cloudflarestorage.com"
  #   }
  #
  #   skip_credentials_validation = true
  #   skip_requesting_account_id  = true
  #   skip_metadata_api_check     = true
  #   skip_region_validation      = true
  #   skip_s3_checksum            = true
  #   use_lockfile                = true
  # }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}
