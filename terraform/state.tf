# R2 bucket for Terraform state
resource "cloudflare_r2_bucket" "terraform_state" {
  account_id = var.cloudflare_account_id
  name       = "guesthouse-terraform-state"
  location   = "WEUR"
}
