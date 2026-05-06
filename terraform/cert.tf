# Cloudflare Origin Certificate for api.konczevolgyivendeghaz.hu
resource "tls_private_key" "origin" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

resource "tls_cert_request" "origin" {
  private_key_pem = tls_private_key.origin.private_key_pem

  subject {
    common_name = "api.${var.domain}"
  }
}

resource "cloudflare_origin_ca_certificate" "api" {
  csr                = tls_cert_request.origin.cert_request_pem
  hostnames          = ["api.${var.domain}"]
  request_type       = "origin-rsa"
  requested_validity = 5475 # 15 years
}

output "origin_cert" {
  description = "Origin certificate PEM (save to backend/certs/origin.pem on VPS)"
  value       = cloudflare_origin_ca_certificate.api.certificate
  sensitive   = true
}

output "origin_key" {
  description = "Origin private key PEM (save to backend/certs/origin-key.pem on VPS)"
  value       = tls_private_key.origin.private_key_pem
  sensitive   = true
}
