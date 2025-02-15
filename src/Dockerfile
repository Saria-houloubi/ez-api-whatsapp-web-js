FROM node:alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --omit=dev 

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

FROM node:slim  

# Set working directory
WORKDIR /app

# As mentioned https://wwebjs.dev/guide/installation.html#installation-on-linux
RUN apt-get update && apt-get install -y --no-install-recommends \
    gconf-service libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 \
    libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 \
    libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 \
    libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 \
    libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 \
    libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates \
    fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget \
    chromium \
    && rm -rf /var/lib/apt/lists/* 

# Set environment variables
ARG RUN_PORT=5000
ENV PORT=$RUN_PORT

# Copy only built files and dependencies from build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dest ./dest
COPY --from=build /app/*.env ./

# Expose the application port
EXPOSE $PORT

# Start the application
CMD ["node", "dest/index.js"]
