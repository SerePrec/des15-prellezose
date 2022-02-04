# Desafío 15 - Programación Backend

### CoderHouse

## SERVIDOR CON BALANCE DE CARGA

Retomemos nuestro trabajo para poder ejecutar el servidor en modo fork o cluster, ajustando el balance de carga a través de Nginx.

### Consigna 1

Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.

- Agregar en la vista info, el número de procesadores presentes en el servidor.
- Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.
- Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.
- Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.
- Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.
- Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.

### Consigna 2

- Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:
- Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.
- El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.
- Verificar que todo funcione correctamente.
- Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

> > Aspectos a incluir en el entregable:
> > Incluir el archivo de configuración de nginx junto con el proyecto.  
> > Incluir también un pequeño documento en donde se detallen los comandos que deben ejecutarse por línea de comandos y los argumentos que deben enviarse para levantar todas las instancias de servidores de modo que soporten la configuración detallada en los puntos anteriores.  
> > Ejemplo:  
> > pm2 start ./miservidor.js -- --port=8080 --modo=fork  
> > pm2 start ./miservidor.js -- --port=8081 --modo=cluster  
> > pm2 start ./miservidor.js -- --port=8082 --modo=fork  
> > ...

### Ejecución

Luego de clonar o descargar el repositorio e instalar todas las dependencias con `npm install`, existen dos comandos para levantar el proyecto.
Para levantarlo en modo de desarrollo junto a nodemon, utilizar `npm run dev`. De lo contrario, para ejecutarlo en "modo producción", utilizar `npm start`.

Se puede seleccionar entre dos métodos de persistencia de **datos y sesiones** a través de la variable de entorno `PERS`. El modo `PERS=mongodb_atlas` **(DEFECTO)** para persistir en **MongoDB Atlas** y el modo `PERS=mongodb` para hacer lo mismo en **MongoDB local**

TODO:TODO:

### Vistas

Existen las siguientes vistas que proveen una manera amena de probar el desafío.
Estas vistas se encuentran en las rutas:

- **/** : es la vista principal en donde se encuentra el formulario de carga de productos y el centro de mensajes (chat). Utiliza **websockets**. Requiere autenticación.

- **/login** : formulario de login.

- **/login-error** : vista a la que redirige tras un error en el login.

- **/register** : formulario de registro.

- **/register-error** : vista a la que redirige tras un error en el login.

- **/logout** : vista a la que se accede tras hacer el logout y luego de 5 segundos redirige a home.

- **/productos-mock** : es donde se muestra en una tabla el mock de productos devueltos por la llamada a la API en la ruta de test. Requiere autenticación

- **/info**: muestra información relativa a la app

### API

Consiste en las siguientes rutas:

#### Router /api/productos

| Método | Endpoint                | Descripción                                                                                                                                                                                                                 |
| ------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | **/api/productos/**     | Me permite listar todos los productos disponibles                                                                                                                                                                           |
| POST   | **/api/productos/**     | Para incorporar productos al listado                                                                                                                                                                                        |
| GET    | **/api/productos/:id**  | Me permite listar un producto por su id                                                                                                                                                                                     |
| PUT    | **/api/productos/:id**  | Actualiza un producto por su id. Admite actualizaciones parciales                                                                                                                                                           |
| DELETE | **/api/productos/:id**  | Borra un producto por su id                                                                                                                                                                                                 |
| GET    | **/api/productos-test** | Devuelve un listado de 5 productos mock generados con **Faker.js**                                                                                                                                                          |
| GET    | **/api/randoms**        | Devuelve una cantidad de números aleatorios en el rango del 1 al 1000 especificada por parámetros de consulta (query). Por ej: `/api/randoms?cant=20000`. Si dicho parámetro no se ingresa, calcula 100.000.000 de números. |

### Detalles y comentarios
