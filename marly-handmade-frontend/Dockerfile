# ---------- Etapa de compilación ----------
  FROM node:22 AS builder
  WORKDIR /frontend
  
  COPY package*.json ./
  RUN npm install
  
  COPY . .
  RUN npm run build
  
  # ---------- Etapa de ejecución ----------
  FROM nginx:stable-alpine
  
  RUN rm -rf /usr/share/nginx/html/*
  COPY --from=builder /frontend/dist /usr/share/nginx/html
  
  EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]
  