--------------------------------------------------------------------------------------------------------------------------
"Este proyecto plantea la creación de un sistema de pedidos online para un restaurante. Se implementaron las partes necesarias para montar una REST API que permita realizar altas, bajas, modificaciones y obtención de información sobre una estructura de datos que podría consumir un cliente. Parte del desafío está enfocado en lograr que el desarrollo del proyecto sea puesto en producción utilizando web services."
--------------------------------------------------------------------------------------------------------------------------

==> Pasos para crear la base de datos:
    1) Descargar e instalar MySQL Workbench o utilizar PhpMyAdmin a través de XAMPP. Para crear la base de datos, ejecutar el código SQL que se encuentra en el archivo 'create_DB_query.txt'.
    *** Importante: El nombre de la base de datos debe ser 'proyectodelilah'.


==> Pasos requeridos para inicializar la base y el servidor:
    1) clonar el repositorio desde https://github.com/FrancoPaganucci/delilah-resto o descargar archivos y abrir el proyecto desde un editor de código.
    2) Descargar e instalar XAMPP. Una vez instalado, abrir el panel de control de XAMPP y clickear "start" en "Apache" y "MySql".
    3) Para instalar las dependencias, ejecutar el comando "npm install" en la terminal. 
    4) Para levantar el servidor y conectar la base de datos: desde la terminal, ejecutar el comando "npm run startServer". Deberás tener instalado Node.JS y nodemon en tu entorno.

==> DB CONFIG:
Las variables de entorno se encuentran en un archivo '.env', con lo cual el acceso a la base de datos estará restringido a quienes tengan acceso a ese archivo. Este archivo no se encuentra en el repositorio público de GitHub.
Como la DB va a ser montada en localhost, las variables de entorno deben llevar los siguientes valores:
DB_SERVER=localhost
DB_USER=root
DB_PASS=
DB_NAME=proyectodelilah
DB_PORT=3306
APP_PORT=3000

==> Testing con Postman: Para realizar tests en los endpoints, puede utilizar Postman.

==> Enlace al repositorio del proyecto: https://github.com/FrancoPaganucci/delilah-resto
