# Etap 1: frontend
FROM node:18 AS frontend
WORKDIR /var/app/ui
COPY ui/package.json ui/package-lock.json ./
RUN npm ci
COPY ui/src ./src
COPY ui/public ./public
RUN npm run build

# Etap 2: backend
FROM python:3.14.2

# Instalacja bibliotek systemowych wymaganych do kompilacji niektórych pakietów Python
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    libssl-dev \
    libffi-dev \
    libjpeg-dev \
    zlib1g-dev \
 && rm -rf /var/lib/apt/lists/*

# Aktualizacja pip
RUN pip install --upgrade pip

# Kopiowanie frontendu z poprzedniego etapu
COPY --from=frontend /var/app/ui/build /var/app/ui/build

# Kopiowanie i instalacja wymagań backendu
WORKDIR /var/app/api
COPY api/requirements.txt ./
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Kopiowanie reszty kodu backendu
COPY api ./

# Komenda startowa
CMD ["uvicorn", "main:app", "--port", "80", "--host", "0.0.0.0"]