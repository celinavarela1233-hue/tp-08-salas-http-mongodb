# tp-08-salas-http-mongodb

## 1. Origen de la copia y nombre del proyecto
Nombre de la copia: tp-008-salas-http-mongodb
Punto de partida: tp-07-salas-mongodb
Se retiro el servicio de memoria y la importacion de semillas JSON en el arranque del servidor

## 2. Versiones utilizadas y confirmacion de uso de Atlas Free
Node.js: v24.19.0
npm: 10.x
Express: ^4.21.2
Mongoose: ^8.8.1
Confirmación de MongoDB Atlas: Se utilizó un clúster gratuito MongoDB Atlas Free Tier, utilizando la base de datos reservas_salas_u8

## 3. Preparación de MongoDB Atlas e Instalación desde cero
Paso 1: Instalar dependencias
Desde la raíz del proyecto, ejecutar: npm install

Paso 2: Configurar MongoDB AtlasAcceder a MongoDB Atlas. 
Crear o reutilizar un clúster gratuito de tipo M0 Free. 

Paso 3: Configurar variables de entorno
Copiar la plantilla .env.example a .env

## 4. Diagnóstico DNS y Comandos de Ejecución
Diagnóstico DNS
En src/config/base-datos.js se forzaron explícitamente los servidores de resolución DNS de Google y Cloudflare

Comandos:

Arranque del servidor web: node --env-file=.env src/index.js

ejecutar: npm run format

ejecutar verificacion: npm run check

## 5. Tabla de Endpoints de la API REST
GET /api/reservas 200 y arreglo

GET /api/reservas/:id 200 y recurso

POST /api/reservas 201, recurso guardado y Location

GET /api/reservas?sala=Sala%20Norte 200 y coincidencias exactas

ID mal formado 400 JSON

ID bien formado inexistente 404 JSON

Creación inválida o JSON mal formado 400 JSON, sin escritura

Fallo inesperado durante operación 500 JSON, sin traza ni secreto

## 6. Matriz de Resultados 
Listado vacío si la base es nueva 200, []

Creación válida 201 y Location

Consulta por ID creado 200, mismo recurso

Consulta tras reiniciar 200, mismo ID

ID "1" 400

ID válido inexistente 404

Estudiante vacío o email sin @ 400, cantidad sin aumento

Sala o turno no permitido 400, cantidad sin aumento

Fecha vacía 400

Personas 0, 7, 2.5 o "abc", por separado 400

Personas true, arreglo u objeto 400

POST sin cuerpo o JSON mal formado 400 JSON

Campos extra estado o _id No los asigna el cliente

Filtro exacto por sala Solo coincidencias; sin coincidencias []

Sala repetida como parámetro 400

Listar dos veces Cantidad estable

Formulario válido / inválido 302 / 400

Estado y sitio Conteo persistente y vistas correctas

Fallo de arranque con URI ausente No abre el puerto


## 7. Comparacion con el tp07
el tp07 la aplicación Express funcionaba en memoria utilizando una semilla JSON temporal. Y el tp08 se eliminó la dependencia del almacenamiento en memoria y las semillas iniciales