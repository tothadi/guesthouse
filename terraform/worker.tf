# API runs on VPS — DNS points to VPS IP
resource "cloudflare_record" "api" {
  zone_id         = var.cloudflare_zone_id
  name            = "api"
  content         = var.vps_ip
  type            = "A"
  proxied         = true
  allow_overwrite = true
}
