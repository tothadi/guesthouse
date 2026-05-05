variable "cloudflare_api_token" {
  description = "Cloudflare API token with permissions for Workers, Pages, and DNS"
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID"
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID for konczevolgyivendeghaz.hu"
  type        = string
}

variable "domain" {
  description = "Root domain name"
  type        = string
  default     = "konczevolgyivendeghaz.hu"
}
