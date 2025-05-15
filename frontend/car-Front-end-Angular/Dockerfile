# Étape 1 : Build de l'application Angular
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Étape 2 : Servir avec NGINX
FROM nginx:alpine

COPY --from=build /app/dist/car-app/browser /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
