---
title: Creación de un Pipeline de Datos y API con Caché Inteligente
resume: Solución integral de backend para migrar datos a gran escala, implementar APIs seguras y optimizadas, y desplegar todo en la nube.
date: 2025-07-19
imageCover: "@assets/projects/default.svg"
imageCoverAlt: Proyecto Sistemas Expertos
categories: [academic-projects]
platform:
  web: true
  movil: false
  nativo: false
  pwa: false
  desktop: false
  api: true
author: Rodrigo Fúnes
github:
  - title: "Terraform AmazonAPI"
    link: "https://github.com/REliezer/TerraformAmazonAPI"
  - title: "AmazonAPI"
    link: "https://github.com/REliezer/amazonAPI"
    
link: ""

stack:
  - label: "Azure App Service Plans"
    group: "backend"

  - label: "Azure App Service"
    group: "backend"

  - label: "Azure SQL Server"
    group: "base-dato"

  - label: "Azure SQL Database"
    group: "base-dato"

  - label: "Azure Cache for Redis"
    group: "base-dato"

  - label: "Application Insights"
    group: "monitoring"

  - label: "Azure Resource Group"
    group: "infrastructure-admin"

  - label: "Terraform"
    group: "infrastructure-admin"

  - label: "Azure Data Factory"
    group: "infrastructure"

  - label: "Azure Container Registry"
    group: "storage-and-containers"

  - label: "Azure Blob Storage"
    group: "storage-and-containers"

  - label: "Docker"
    group: "storage-and-containers"

  - label: "Firebase Authentication"
    group: "identity-security"

  - label: "Azure Key Vault"
    group: "identity-security"

description: |
  Desarrollo de una solución integral de backend capaz de migrar datos a gran escala, exponerlos mediante una API segura y optimizada, y desplegar todo en un entorno productivo en la nube.  
  Además, se implementa un sistema de monitoreo y una estrategia de caché con invalidación automática.

content:
  description: "Para poder realizar este proyecto se tuvieron que ir completando diferentes fases."
  item:
  - nombre: "🏁 Fase 1: Preparación y Migración de Datos"
    resume: |
        En esta etapa primero se tenia que buscar un dataset que contuviera una cantidad considerable de registros y luego crear la base de datos y las tablas correspondientes en Azure SQL. Para nuestro proyecto se utilizó un dataset de Amazon Products que fué obtenido de Kaggle.
        Para hacer la migración de los datos se utiliza Azure Data Factory mediante la creación de pipelines que extraen los datos del dataset (que fue subido al Azure Blob Storage) hacia cada una de las tablas.
  - nombre: "🔑 Fase 2: Desarrollo de API y Autenticación"
    resume: |
        Con los datos cargados en las tablas de la base de datos se crean varias API para interactuar con ellos, aplicando buenas prácticas de desarrollo y seguridad.
        Para desarrollar las API se utiliza FastAPI (Python) y en ciertos endpoints se requerira un token JWT, se implementa Firebase Authentication para gestionar el registro e inicio de sesión de usuarios mediante correo electronico.
  - nombre: "⏲️ Fase 3: Monitoreo de Rendimiento"
    resume: |
        Se utiliza Azure Application Insights junto con las API para capturar telemetría, trazas de solicitudes, tiempos de respuesta y posibles errores.
        Para ello se realiza múltiples request consecutivos a los endpoints para analizar y observar el comportamiento de la API en el panel de Application Insights.
  - nombre: "🧠 Fase 4: Implementación de Caché con Redis"
    resume: |
        Para mejorar los tiempos de respuesta, se implementó una capa de caché, para ello se Configura y conecta una base de datos de cache con Redis.
        En esta fase se tenia que generar una key para guardar cada respuesta en Redis, teniendo dos posibles escenarios:
    modulos:
      - Si la key existe, la respuesta se devuelve inmediatamente de esta.
      - Si no existe, se consulta la base de datos, se almacena la respuesta en Redis usando la key dinámica y luego se devuelve la respuesta al usuario.
      
  - nombre: "🧹 Fase 5: Invalidación de Caché"
    resume: |
        En esta parte se plantea el problema de que al ingresar nuevos datos, los datos originales cambiarian y dejarían el caché obsoleto, por tanto el caché generado debia ser 'inteligente'.
        Para ello se crea una función que cada vez que se agregaba un nuevo registro esta eliminaba la key específica en Redis que estaba relacionada a cada categoría.
  - nombre: "🚀 Fase 6: Despliegue en la Nube con Docker"
    resume: |
        La última fase... La aplicación debia ser empaquetada y desplegada para funcionar en un entorno de nube real de forma independiente.
        Para ello se creó un Dockerfile con todas las dependencias y configuraciones necesarias para que pudiera ejecutarse de forma aislada y la imagen de Docker se publico en el Azure Container Registry y se terminó con el despliegue del contenedor usando Azure App Service.
  - nombre: "🔐 Fase Extra: Integrar Key Vault"
    resume: |
        Se integró Azure Key Vault para gestionar de forma segura secretos sensibles como cadenas de conexión, claves de acceso a servicios y credenciales. Durante esta fase se modificó la configuración de la aplicación para recuperar estos valores directamente desde Key Vault, aumentando así la seguridad y facilitando la gestión centralizada de secretos, especialmente en entornos de despliegue continuo.
diagrama:
  resume: |
    El diagrama representa el flujo de datos desde la migración de los datos hasta la consulta de estos a traves de una API segura, optimizada y desplegada en la nube. Utilizando servicios de Microsoft Azure.
  image: "@assets/projects/amazonAPI/gallery_1.png"
  imageAlt: "Flujo de Datos"
gallery:
  - img: "@assets/projects/amazonAPI/gallery_1.png"
    imgAlt: "Flujo de los Datos"
  - img: "@assets/projects/amazonAPI/gallery_2.png"
    imgAlt: "Resources created"
  - img: "@assets/projects/amazonAPI/gallery_3.png"
    imgAlt: "Resources created"
---

