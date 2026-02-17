#!/usr/bin/env bash
set -euo pipefail

DOMAIN="api.jksnxsjzkaurpqsjvzkw.ru"
PROJECT_DIR="/opt/portfolio-wow"
SITE_CONF="/etc/nginx/sites-available/${DOMAIN}.conf"

if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "docker install failed" >&2
  exit 1
fi

mkdir -p "${PROJECT_DIR}"
cp -r . "${PROJECT_DIR}"
cd "${PROJECT_DIR}"

docker compose down || true
docker compose up -d --build

cat > "${SITE_CONF}" <<EOF
server {
  listen 80;
  server_name ${DOMAIN};

  location / {
    proxy_pass http://127.0.0.1:8088;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
  }
}
EOF

ln -sf "${SITE_CONF}" "/etc/nginx/sites-enabled/${DOMAIN}.conf"
nginx -t
systemctl reload nginx

echo "Deployed. Open: http://${DOMAIN}"
