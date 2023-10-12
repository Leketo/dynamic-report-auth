Cómo compilar una aplicación Node.js con Docker en Ubuntu 20.04



1.1 - Cómo instalar y usar Docker en Ubuntu 20.04

1- Docker es una aplicación que simplifica el proceso de gestión de procesos de aplicaciones en contenedores . Los contenedores le permiten ejecutar sus aplicaciones en procesos aislados de recursos. Son similares a las máquinas virtuales, pero los contenedores son más portátiles, más amigables con los recursos y más dependientes del sistema operativo host.


Paso 1: Instalación de Docker


Primero, actualizamos su lista existente de paquetes:

```
sudo apt update
```

A continuación, instalamos algunos paquetes de requisitos previos que permitan `apt` usar paquetes a través de HTTPS:

```
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

Luego agreguamos la clave GPG para el repositorio oficial de Docker a su sistema:

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

Agreguamos el repositorio Docker a las fuentes APT:

```
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
```

Nos asegúramos de que está a punto de instalar desde el repositorio de Docker en lugar del repositorio predeterminado de Ubuntu:

```
apt-cache policy docker-ce
```


Finalmente, instalamos Docker:

```
sudo apt install docker-ce
```

Docker ahora debería estar instalado, el demonio iniciado y el proceso habilitado para iniciarse en el arranque. Comprueba que se está ejecutando:

```
sudo systemctl status docker
```



FRONTEND
En la raiz del proyecto se encuentra el archivo `Dockerfile`
```
nano Dockerfile
```


```
FROM node:carbon
# Create app directory
WORKDIR /usr/src/docker-react-sample
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
#To bundle your app’s source code inside the Docker image, use the COPY instruction:
COPY . .
#Your app binds to port 3000 so you’ll use the EXPOSE instruction to have it mapped by the docker daemon:
EXPOSE 3002
CMD ["npm", "start"]
```


Ahora está listo para crear la imagen de la aplicación con el comando `docker build`

```
docker build -t mhschimpf/dynamic-report-auth .
```

Ejecute el siguiente comando para construir el contenedor:

```
docker run -p 3000:3000 -d mhschimpf/dynamic-report-auth
```


Una vez que su contenedor esté en funcionamiento, puede inspeccionar una lista de sus contenedores en ejecución con `docker ps`

```
docker ps
```


Si necesita ingresar al contenedor, puede usar el comando `exec`


```
docker exec -it 5536e6f71244 /bin/bash
```


usar un repositorio para trabajar con imágenes

```
sudo docker login -u mhschimpf
PAss: Soporte1553
```


Ahora puede enviar la imagen de la aplicación a Docker Hub usando la etiqueta que creó anteriormente :your_dockerhub_username/nodejs-image-demo

```
sudo docker push mhschimpf/dynamic-report-auth
```
