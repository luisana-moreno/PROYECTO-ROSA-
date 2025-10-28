# Servidor JSON

Este proyecto implementa un servidor JSON que gestiona operaciones CRUD para diferentes entidades relacionadas con la ganadería y la administración de recursos. Utiliza una base de datos en formato JSON para almacenar la información.

## Estructura del Proyecto

- **src/controllers**: Contiene los controladores que manejan las operaciones CRUD para cada entidad.
  - `cattleController.js`: Operaciones para el ganado.
  - `employeesController.js`: Operaciones para los empleados.
  - `clientController.js`: Operaciones para los clientes.
  - `inventoryController.js`: Operaciones para el inventario.
  - `pasturesController.js`: Operaciones para los potreros.
  - `usersController.js`: Operaciones para los usuarios.
  - `milkProductionController.js`: Operaciones para la producción de leche.
  - `vaccinationController.js`: Operaciones para las vacunaciones.

- **src/routes**: Define las rutas para las operaciones CRUD.
  - `cattleRoutes.js`: Rutas para el ganado.
  - `employeesRoutes.js`: Rutas para los empleados.
  - `clientRoutes.js`: Rutas para los clientes.
  - `inventoryRoutes.js`: Rutas para el inventario.
  - `pasturesRoutes.js`: Rutas para los potreros.
  - `usersRoutes.js`: Rutas para los usuarios.
  - `milkProductionRoutes.js`: Rutas para la producción de leche.
  - `vaccinationRoutes.js`: Rutas para las vacunaciones.

- **src/db**: Contiene la base de datos en formato JSON.
  - `database.json`: Almacena los datos de las diferentes entidades.

- **src/app.js**: Punto de entrada de la aplicación. Configura el servidor y las rutas.

- **src/config.js**: Contiene la configuración del servidor, como el puerto y otras configuraciones necesarias.

- **package.json**: Configuración para npm, lista las dependencias y scripts para el proyecto.

## Instalación

1. Clona el repositorio.
2. Navega al directorio del proyecto.
3. Ejecuta `npm install` para instalar las dependencias.

## Uso

Para iniciar el servidor, ejecuta:

```
npm start
```

El servidor estará disponible en `http://localhost:3000` (o el puerto configurado en `config.js`).

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cambios.

## Licencia

Este proyecto está bajo la Licencia MIT.