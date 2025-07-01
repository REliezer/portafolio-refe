---
title: Plataforma de E-commerce y Analítica en Azure
resume: Infraestructura modular para una plataforma de comercio electrónico y analítica de datos, desplegada con Terraform sobre Azure.
date: 2025-06-21
image: "@assets/projects/default.svg"
imageAlt: Diagrama de arquitectura cloud del proyecto
categories: [Proyectos Academicos]
platform:
  web: false
  movil: false
  nativo: false
  pwa: false
  desktop: false
  api: false
author: Rodrigo Fúnes
github:
  - title: "Infra Core"
    link: "https://github.com/REliezer/proyecto-ecommerce-infra-core"
  - title: "Infra Apps"
    link: "https://github.com/REliezer/proyecto-ecommerce-infra-apps"
  - title: "Infra Analytics"
    link: "https://github.com/REliezer/proyecto-ecommerce-infra-analytics"
link: ""

stack:
  - label: "Azure App Service"
    group: "Frontend"

  - label: "Azure App Service"
    group: "Backend"

  - label: "Azure Functions"
    group: "Backend"

  - label: "Azure SQL Database"
    group: "Base de Datos"

  - label: "Azure SQL DW"
    group: "Base de Datos"

  - label: "Azure Blob Storage"
    group: "Almacenamiento"

  - label: "Azure Queue Storage"
    group: "Almacenamiento"

  - label: "Terraform"
    group: "Otros"

  - label: "Azure Data Factory"
    group: "Otros"

description:
  Una empresa de comercio electrónico en crecimiento busca una infraestructura escalable y robusta en la nube para gestionar sus operaciones de venta en línea. La plataforma debe soportar un alto volumen de transacciones, proporcionar una experiencia de usuario fluida a través de un portal principal, permitir la gestión interna de productos y pedidos mediante un portal de backoffice, y ofrecer capacidades analíticas avanzadas sobre los datos de ventas para la toma de decisiones estratégicas.
  Además, la plataforma debe ser capaz de manejar tareas intensivas o que no requieren una respuesta inmediata al usuario de forma eficiente en segundo plano, asegurando que la experiencia del usuario no se vea afectada por procesos de larga duración, como la confirmación de pedidos, la actualización de inventarios complejos o la generación de notificaciones masivas.

content:
  description: "El diseño modular basado en múltiples repositorios permitió una separación clara de responsabilidades y facilita el mantenimiento del código. Esta división se alineó con buenas prácticas de infraestructura, donde cada componente tiene una función específica."
  item: 
    - nombre: "Infraestructura Core"
      resume: "Para recursos base y compartidos, como Storage, cola, y SQL transaccional"
      modulos:
      - Resource Group
      - SQL Server (DB transaccional)
      - SQL DataBase
      - Storage Account (Queue y Blob)
      - Function Worker
    - nombre: "Infraestructura Apps"
      resume: "Para componentes de aplicación como los Web Apps para el portal y el backoffice."
      modulos:
      - App Services (portal y backoffice)
    - nombre: "Infraestructura Analitica"
      resume: "Para la infraestructura de analítica y orquestación de datos."
      modulos:
      - SQL Server DW
      - SQL Data Warehouse
      - Data Factory
diagrama:
  resume: "Diagrama de arquitectura del proyecto de e-commerce y Analítica en Azure el cual se divide en cuatro capas logicas."
  image: "@assets/projects/Proyecto Expertos.png"
  imageAlt: "Arquitectura propuesta"
---

