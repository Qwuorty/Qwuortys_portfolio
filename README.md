# Portfolio WOW Skeleton

Dennis-inspired portfolio skeleton for a Fullstack Developer.

## Current behavior

- Default locale is `ru`.
- Locale path is URL-based: `/ru` and `/en`.
- Project previews are loaded from `work/<project-slug>/cover.jpg`.

## Local run

```bash
docker compose up -d --build
```

Open `http://localhost:8088`.

## Deploy on Ubuntu server

1. Copy this folder to server:

```bash
scp -r portfolio-wow root@82.202.128.84:/root/
```

2. SSH to server and run:

```bash
cd /root/portfolio-wow
chmod +x deploy/server-setup.sh
./deploy/server-setup.sh
```

3. Verify:

```bash
curl -I http://api.jksnxsjzkaurpqsjvzkw.ru/
```

## Notes

- The script sets up Docker if missing.
- The app runs in container `portfolio-wow` and binds to `127.0.0.1:8088`.
- Host Nginx proxies the domain to the container.
