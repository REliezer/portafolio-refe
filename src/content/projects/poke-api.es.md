---
title: Generador de Reportes
resume: Aplicación web en la nube para generar reportes CSV basados en datos de una API externa (PokeAPI) mediante la selección de una categoria (tipo de pokemon) y opcional un numero máximo de registro.
date: 2025-08-08
imageCover: "@assets/projects/pokeAPI/ui-pokequeue.png"
imageCoverAlt: Proyecto Sistemas Expertos
categories: [Proyectos Academicos]
platform:
  web: true
  movil: false
  nativo: false
  pwa: false
  desktop: false
  api: true
author: Rodrigo Fúnes
github:
  - title: "PokeQueue UI"
    link: "https://github.com/REliezer/pokequeue-ui"
  - title: "PokeQueue API"
    link: "https://github.com/REliezer/pokequeueAPI"
  - title: "Azure Functions"
    link: "https://github.com/REliezer/pokequeue-function"
  - title: "PokeQueue SQL Scripts"
    link: "https://github.com/REliezer/pokequeue-sql"
  - title: "PokeQueue Terraform"
    link: "https://github.com/REliezer/pokequeue-terrafom" 
link: ""

stack:
  - label: "Azure App Service Plans"
    group: "Frontend"

  - label: "Azure App Service"
    group: "Frontend"

  - label: "Next.js"
    group: "Frontend"

  - label: "Azure App Service Plans"
    group: "Backend"

  - label: "Azure App Service"
    group: "Backend"

  - label: "FastAPI"
    group: "Backend"

  - label: "Azure SQL Server"
    group: "Base de Datos"

  - label: "Azure SQL Database"
    group: "Base de Datos"

  - label: "Azure Resource Group"
    group: "Infraestructura y Administración"

  - label: "Terraform"
    group: "Infraestructura y Administración"

  - label: "Azure Container Registry"
    group: "Almacenamiento y Contenedores"

  - label: "Azure Blob Storage"
    group: "Almacenamiento y Contenedores"

  - label: "Docker"
    group: "Almacenamiento y Contenedores"
  
  - label: "Azure Functions"
    group: "Procesamiento Asíncrono"

  - label: "Azure Queue Storage"
    group: "Almacenamiento y Contenedores"

description: |
  Aplicación web que permite a los usuarios solicitar la creación de reportes CSV basados en datos de una API externa (PokeAPI).
  La aplicación cuenta con una interfaz moderna, una API robusta, un proceso de fondo desacoplado y utiliza servicios en la nube de Azure, como se muestra en la arquitectura de referencia.

content:
  description: |
    🛠️ Este proyecto no solo consistía en construir desde cero, sino en mejorar y ampliar funcionalidades ya existentes.
    A lo largo del desarrollo se abordaron diversos desafíos técnicos que involucraron el Frontend, Backend, el worker asíncrono en Azure Functions, y la infraestructura cloud.
    Cada mejora tuvo como objetivo principal elevar la experiencia del usuario, mejorar el rendimiento del sistema y optimizar el manejo de datos provenientes de la PokeAPI."
  item:
  - nombre: "🗑️ Implementar Eliminación Completa de Reportes"
    resume: |
      El sistema Generador de Reportes proporcionado solamente permitia generar nuevos reportes a partir del tipo de pokemon seleccionado, por lo cual como primera tarea era permitir al usuario poder eliminar los reportes. Para ello se implementaron los siguientes cambios en Frontend y Backend:
    modulos:
    - Se agregó un botón de 'Eliminar' a cada fila de la tabla de reportes que se mostraba en la UI.
    - Implementación de una ventana modal que se muestra al usuario cuando hace click en el botón, pidiendo la confirmacion de dicha acción antes de proceder.
    - Creación e implementacion de un nuevo endpoint que permitia eliminar el registro de la base de datos y el archivo (reporte) CSV correspondiente.
    - Manejo de posibles errores que se podrian presentar tanto al eliminar el registro como el archivo.
    - Mejoras en la UI/UX, como actualización de la tabla y mensaje de confirmación cuando se elimino correctamente.
  - nombre: "📊 Enriquecer Reporte con Detalles del Pokémon"
    resume: |
      Los reportes generados por el sistema solo contenian dos campos: el nombre (name) y la url del pokemon (url). Por lo cual se solicitaba modificar este proceso para incluir mas información del pokemon utilizando la url existente.
      Para esto se implementaron los siguientes cambios en el worker (Azure Function) que era el responsable de obtener y crear los archivos CSV:
    modulos:
    - Luego de obtener la lista inicial de Pokemon con el name y url de cada uno, se procedio a iterar sobre cada pokemon utilizando la url para obtener otros datos como height, weight, sprite, generation, types, stats (hp, attack, defense, special-attack, special-defense, speed) y abilities.
    - Para mantener el codigo mas limpio y ordenado se crearon dos nuevas funciones auxiliares get_pokemon_info y get_pokemon_generation. La primera devolvia en una lista todos los campos nuevos y que luego eran agregados a los ya existente. La segunda funcion se implemento para poder obtener la generation del pokemon, ya que este valor no se encontraba directamente a traves de la url inicial y se necesitaba hacer una tercera petición.
    - Manejo de posibles errores que se podrian presentar al momento de hacer el llamado a las request.
  - nombre: "🎲 Reportes con Muestreo Aleatorio"
    resume: |
      El sistema proporcionado estaba creado para generar los reportes utilizando todos los pokemon que pertenecian a una categoria (type), por lo cual se solicitaba agregar una opcion en donde el usuario pudiera ingresar una cantidad (sample_size) que seria el numero total de registro que contendria el informe. Ademas los registros retornados debian ser aleatorios.
      Para esta tarea se hicieron cambios en el Frontend, Backend, en el worker (Azure Function) y en la Base de Datos:
    modulos:
    - En la UI se agrego un campo de entrada de tipo numérico, que era en donde el usuario iba a ingresar el valor de registros a retornar.
    - En la base de datos se agrego el campo 'sample_size' del tipo INT NULL a la tabla 'request'. Este campo es para almacenar el numero de registro que se habian solicitado en caso de haber sido enviado.
    - En la parte del backend se agrego el campo 'sample_size' al modelo Pydantic y se modifico el endpoint 'insert_pokemon_request' para que recibiera el nuevo valor y lo enviar al worker.
    - Una vez recibido el 'sample_size' en el worker este solo debia generar los registro dependiendo del 'sample_size' y de forma aleatoria usando como base la colección completa de registros.
    - Manejo de posibles errores que se podrian presentar tanto al momento de hacer el llamado a las request
    - Validación de la entrada ingresada por el susario, que sea un entero positivo.
    - Mejoras en la UI/UX, como mostrar mensajes en caso de que el valor ingresado este incorrecto.
diagrama:
  resume: |
    El siguiente diagrama representa la arquitectura utilizada para crear el sistema Generador de Reportes. Se utilizarón servicios de Microsoft Azure.
  image: "@assets/projects/pokeAPI/PokeQueue.png"
  imageAlt: "Arquitectura Propuesta"
  diagramaComponent: 
  - nombre: "🧮 Base de Datos"
    resume: |
      Se utilizó Azure SQL Database para almacenar la informacion de los request y report creados.
  - nombre: "🗂️ Almacenamiento de reporte generados y mensajes"
    resume: |
      Se utilizó Azure Blob Storage para guardar los reportes creados en formato CSV y Azure Queue Storage para almacenar los mensajes recibidos al momento de generar nuevos reportes.
  - nombre: "⚙️ Proceso Asíncrono"
    resume: |
      Se utilizó Azure Functions (Python Queue Trigger) para procesar los mensajes que estaban en el Queue Storage.
  - nombre: "🖥️ Frontend"
    resume: |
      Se creo utilizando Next.js desplegada en Azure App Service.
  - nombre: "📡 Backend"
    resume: |
      Se utilizó API Python con FastAPI desplegada en Azure App Service.
  - nombre: "🐳 Despliegue en la nube"
    resume: |
      Para que la aplicación funcionara en un entorno de nube real de forma independiente se creó un Dockerfile con todas las dependencias y configuraciones necesarias y la imagen de Docker se publico en el Azure Container Registry.

---

