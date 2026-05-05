# Client frontend Pages project
resource "cloudflare_pages_project" "client" {
  account_id        = var.cloudflare_account_id
  name              = "guesthouse-client"
  production_branch = "main"

  deployment_configs {
    production {
      compatibility_date = "2024-09-23"
    }
    preview {
      compatibility_date = "2024-09-23"
    }
  }
}

# Admin frontend Pages project
resource "cloudflare_pages_project" "admin" {
  account_id        = var.cloudflare_account_id
  name              = "guesthouse-admin"
  production_branch = "main"

  deployment_configs {
    production {
      compatibility_date = "2024-09-23"
    }
    preview {
      compatibility_date = "2024-09-23"
    }
  }
}

# Custom domain for client: konczevolgyivendeghaz.hu
resource "cloudflare_pages_domain" "client_root" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.client.name
  domain       = var.domain
}

# Custom domain for client: www.konczevolgyivendeghaz.hu
resource "cloudflare_pages_domain" "client_www" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.client.name
  domain       = "www.${var.domain}"
}

# Custom domain for admin: admin.konczevolgyivendeghaz.hu
resource "cloudflare_pages_domain" "admin_subdomain" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.admin.name
  domain       = "admin.${var.domain}"
}
