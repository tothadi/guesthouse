output "client_pages_url" {
  description = "Client Pages project URL"
  value       = "https://${cloudflare_pages_project.client.subdomain}"
}

output "admin_pages_url" {
  description = "Admin Pages project URL"
  value       = "https://${cloudflare_pages_project.admin.subdomain}"
}

output "api_url" {
  description = "API URL"
  value       = "https://api.${var.domain}"
}
