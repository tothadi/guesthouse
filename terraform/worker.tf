# Worker custom domain for the backend API
# NOTE: The worker must be deployed via GitHub Actions first before this can apply.
# On first run, comment this out. Uncomment after the first backend deploy.
# resource "cloudflare_workers_domain" "api" {
#   account_id = var.cloudflare_account_id
#   hostname   = "api.${var.domain}"
#   service    = "guesthouse-api"
#   zone_id    = var.cloudflare_zone_id
# }
