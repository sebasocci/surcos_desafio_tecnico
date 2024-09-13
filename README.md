<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://www.surcos.com/images_/logo_SB.png?20210924" width="200" alt="Nest Logo" /></a>
</p>

# Gestión de Tareas API RESTFUL

## Descripción

Este proyecto es una API RESTFUL básica para la gestión de tareas. Permite a los usuarios autenticarse, registrar tareas y gestionar su estado.

## Funcionalidades

- **Registro y Autenticación:** Los usuarios pueden registrarse y autenticarse utilizando JSON Web Tokens (JWT).
- **Gestión de Tareas:** Una vez autenticado, un usuario puede:
  - Crear una nueva tarea.
  - Ver la lista de todas sus tareas.
  - Actualizar una tarea existente.
  - Marcar una tarea como completada o eliminar una tarea.

## Instalación de Dependencias

Para instalar las dependencias del proyecto, ejecuta:

```bash
$ npm install
```

## Ejecución de la apliación

Para ejecutar la aplicación localmente, usa uno de los siguientes comandos:

  - Este comando ejecuta la aplicación en modo desarrollo (http://localhost:3001/api/docs)
```bash
$ npm run start
```
  - Este comando ejecuta la aplicación en modo desarrollo con recarga automática en cambios.
```bash
$ npm run start:dev
```

## Ejecución de Pruebas Unitarias

  - Para ejecutar las pruebas unitarias, usa:
```bash
$ npm run test
```

## Uso de Docker con Docker Compose

Asegúrate de que Docker y Docker Compose estén Instalados

Debes tener Docker y Docker Compose instalados en tu máquina. Puedes descargar Docker Desktop, que incluye Docker Compose, desde el sitio web de Docker.

  - # Construir y Ejecutar la Aplicación con Docker Compose:
```bash
$ docker-compose up --build
```

Esto levantará el servicio en la ruta: http://localhost:3001/api/docs

## Estructura del Proyecto

La estructura del proyecto está organizada en módulos para seguir una arquitectura limpia y modular. Los componentes principales son:

  - src/app.module.ts: Configura el módulo raíz de la aplicación.
  - src/auth/: Contiene la lógica de autenticación, incluyendo JWT.
  - src/usuarios/: Maneja las operaciones relacionadas con los usuarios.
  - src/tarea/: Maneja las operaciones relacionadas con las tareas.
  - src/redis/: Maneja la implementación de caché con redis.
  - src/utilidades/: Contiene herramientas y excepciones comunes.
  - src/config/: Configuraciones del proyecto (por ejemplo, conexión a la base de datos).

## Decisiones de Diseño

- **NestJS: Se eligió NestJS por varias razones:** Una vez autenticado, un usuario puede:
  - Arquitectura Modular y Escalable: NestJS promueve una arquitectura modular que facilita el mantenimiento y escalabilidad del proyecto a medida que crece.
  - Soporte para TypeScript: NestJS está diseñado con TypeScript en mente, proporcionando un sistema de tipos estático que mejora la robustez del código y ayuda a evitar errores comunes.
  - Facilidad de Desarrollo con Decoradores: Los decoradores de NestJS simplifican la definición de rutas, controladores y servicios, haciendo que el código sea más legible y fácil de entender.
  - Integración con Bibliotecas Populares como JWT para autenticación y TypeORM para el manejo de la base de datos.
  - Documentación y Comunidad Activa

- **JWT para Autenticación:** Se usa JWT para manejar la autenticación de usuarios de forma segura, proporcionando una forma robusta y escalable de gestionar sesiones y permisos.

- **CRUD de Tareas**: La API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las tareas, asegurando que los usuarios puedan gestionar sus tareas de manera efectiva.

## Contacto

- Author - Sebastián Socci
- Mail - sebasocci87@gmail.com

