# Proyecto Final

Este es el repositorio de tu Proyecto Final, que incluye un backend en Node.js con Express, un frontend en React, y una base de datos Oracle 21c.

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Base de Datos](#base-de-datos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

## Requisitos

Asegúrate de tener instalados los siguientes requisitos:

- **Node.js**: Versión 20.17.0
- **Oracle Database**: Versión 21c o superior
- **React**: Versión 18.3.1
- **Express**: Versión 4.21.1
- **Oracle Instant Client** para la conexión a Oracle desde Node.js (descargable desde el sitio web de Oracle)

## Instalación

Sigue estos pasos para instalar y configurar los paquetes y dependencias de backend y frontend.

### 1. Instalación de Dependencias

#### Backend

1. Abre una terminal y navega al directorio del servidor:

    ```bash
    cd server/
    ```

2. Instala los paquetes necesarios:

    ```bash
    npm install
    ```

#### Frontend

1. Abre otra terminal o pestaña y navega al directorio del cliente:

    ```bash
    cd client/
    ```

2. Instala los paquetes necesarios:

    ```bash
    npm install
    ```

### 2. Configuración de la Base de Datos

1. Asegúrate de que tu instancia de Oracle Database esté en funcionamiento.
2. Crea el esquema y las tablas en la base de datos ejecutando el archivo DDL proporcionado en el directorio `database` de este proyecto.

## Configuración

En el directorio del servidor (`server/`), crea un archivo `.env` y configura los parámetros de conexión a la base de datos. Asegúrate de incluir las credenciales de usuario de Oracle Database:

```plaintext
DB_USER=<tu_usuario>
DB_PASSWORD=<tu_contraseña>
DB_CONNECT_STRING=<tu_cadena_de_conexion> # Ejemplo: localhost/XE
PORT=3001
``` 

## Ejecución

Una vez instaladas las dependencias y configurada la base de datos, puedes iniciar el servidor y el cliente.

### 1. Ejecución del Backend

Asegúrate de estar en el directorio `server/` y ejecuta el siguiente comando para iniciar el backend en modo de desarrollo:

    node index.js

Esto iniciará el servidor en [http://localhost:3001](http://localhost:3001).

### 2. Ejecución del Frontend

Navega al directorio `client/` y ejecuta el siguiente comando para iniciar el frontend en modo de desarrollo:

    npm start

Esto abrirá el frontend en [http://localhost:3000](http://localhost:3000).

## Base de Datos

El proyecto utiliza **Oracle 21c** como base de datos. Asegúrate de tener un esquema adecuado con las tablas y relaciones necesarias.

Para crear la base de datos, ejecuta el archivo DDL proporcionado en la carpeta `database/`. Este archivo contiene las instrucciones de creación de tablas, claves foráneas y restricciones necesarias para el correcto funcionamiento de la aplicación.

## Estructura del Proyecto

    Proyecto_Final/
    ├── client/                # Frontend con React
    │   ├── src/               # Código fuente React
    │   ├── public/            # Archivos públicos
    │   └── package.json       # Configuración y dependencias del frontend
    ├── server/                # Backend con Node.js y Express
    │   ├── models/            # Modelos de datos y conexión a Oracle
    │   ├── controllers/       # Controladores para lógica de negocio
    │   ├── routes/            # Rutas de API
    │   ├── config/            # Configuración de base de datos
    │   └── package.json       # Configuración y dependencias del backend
    └── database/
        └── schema.sql         # DDL para creación de tablas y relaciones en Oracle

## Tecnologías Utilizadas

- **Backend**:
  - Node.js y Express: Para construir la API REST.
  - OracleDB: Cliente de Oracle para Node.js.

- **Frontend**:
  - React: Para la interfaz de usuario.

- **Base de Datos**:
  - Oracle 21c: Base de datos relacional para la persistencia de datos.

## Notas Adicionales

- **Oracle Instant Client**: Para conectar Node.js con Oracle, es necesario instalar el Oracle Instant Client y configurar correctamente la variable de entorno `LD_LIBRARY_PATH` o `PATH` (según el sistema operativo).
  
- **Ports**: El backend está configurado para ejecutarse en el puerto 5000 y el frontend en el 3000. Ajusta los puertos en el archivo `.env` o en el código si es necesario.



