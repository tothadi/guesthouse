# Root domain → client Pages
resource "cloudflare_record" "client_root" {
  zone_id         = var.cloudflare_zone_id
  name            = "@"
  content         = cloudflare_pages_project.client.subdomain
  type            = "CNAME"
  proxied         = true
  allow_overwrite = true
}

# www → client Pages
resource "cloudflare_record" "client_www" {
  zone_id         = var.cloudflare_zone_id
  name            = "www"
  content         = cloudflare_pages_project.client.subdomain
  type            = "CNAME"
  proxied         = true
  allow_overwrite = true
}

# admin subdomain → admin Pages
resource "cloudflare_record" "admin" {
  zone_id         = var.cloudflare_zone_id
  name            = "admin"
  content         = cloudflare_pages_project.admin.subdomain
  type            = "CNAME"
  proxied         = true
  allow_overwrite = true
}
