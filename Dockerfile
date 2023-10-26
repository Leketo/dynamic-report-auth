FROM node:16-alpine
RUN date
RUN apk update && apk add tzdata
ENV TZ America/Lima
RUN date
WORKDIR /usr/src/app/dynamic-report-auth
# Copiar solo los archivos necesarios para la instalación de dependencias
COPY package*.json ./
COPY . .
# Instalar dependencias
RUN npm install
RUN npm run build

# Construir la aplicación
CMD [ "npm", "start" ]
