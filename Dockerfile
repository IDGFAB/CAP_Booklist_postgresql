# ---- base: dipendenze e build del runtime ----
FROM node:20-alpine AS base
WORKDIR /app

# Copiamo solo manifest per sfruttare la cache di npm ci
COPY package.json package-lock.json ./

# Installa solo deps runtime (niente dev)
RUN npm ci --omit=dev

# Copia il resto del progetto
COPY . .

# Porta CAP (default 4004)
EXPOSE 4004

# Sicurezza: esegui come utente non-root
RUN addgroup -S app && adduser -S app -G app
USER app

# Comando di default: deploy + serve con profilo Postgres
# Nota: usiamo npx perché i binari (cds-serve/cds-deploy) sono forniti da @sap/cds
CMD ["sh","-c","npm run deploy:pg && npm run start:pg:prod"]