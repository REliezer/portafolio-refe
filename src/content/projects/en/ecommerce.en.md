---
title: E-commerce and Analytics Platform on Azure
resume: Modular infrastructure for an e-commerce and data analytics platform, deployed with Terraform on Azure.
date: 2025-06-21
imageCover: "@assets/projects/default.svg"
imageCoverAlt: Diagrama de arquitectura cloud del proyecto
categories: [Proyectos Academicos]
platform:
  web: true
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
  - label: "Azure App Service Plans"
    group: "Frontend"

  - label: "Azure App Service"
    group: "Frontend"

  - label: "Azure App Service Plans"
    group: "Backend"

  - label: "Azure App Service"
    group: "Backend"

  - label: "Azure Functions"
    group: "Storage"

  - label: "Azure SQL Database"
    group: "Database"

  - label: "Azure SQL DW"
    group: "Database"

  - label: "Azure Blob Storage"
    group: "Storage"

  - label: "Azure Queue Storage"
    group: "Storage"

  - label: "Terraform"
    group: "Others"

  - label: "Azure Data Factory"
    group: "Others"

description: |
  A growing e-commerce company is looking for a scalable and robust cloud infrastructure to manage its online sales operations. The platform must support a high volume of transactions, provide a smooth user experience through a main portal, enable internal management of products and orders through a backoffice portal, and offer advanced analytics capabilities on sales data for strategic decision-making.
  In addition, the platform must be able to efficiently handle intensive tasks—or tasks that do not require an immediate user response—in the background, ensuring the user experience is not affected by long-running processes such as order confirmations, complex inventory updates, or mass notification generation.

content:
  description: "The modular design based on multiple repositories enabled a clear separation of responsibilities and makes code maintenance easier. This split aligns with infrastructure best practices, where each component has a specific function."
  item:
    - nombre: "Core Infrastructure"
      resume: "For foundational and shared resources, such as Storage, queues, and transactional SQL."
      modulos:
      - Resource Group
      - SQL Server (transactional DB)
      - SQL Database
      - Storage Account (Queue and Blob)
      - Function Worker
    - nombre: "Apps Infrastructure"
      resume: "For application components such as Web Apps for the main portal and the backoffice."
      modulos:
      - App Services (main portal and backoffice)
    - nombre: "Analytics Infrastructure"
      resume: "For analytics and data orchestration infrastructure."
      modulos:
      - SQL Server DW
      - SQL Data Warehouse
      - Data Factory

diagrama:
  resume: |
    The diagram represents the proposed architecture for an e-commerce platform with analytics capabilities, implemented using Microsoft Azure services. It is divided into four logical layers.
  image: "@assets/projects/ecommerce/diagrama.avif"
  imageAlt: "Proposed architecture"
  diagramaComponent:
  - nombre: "Authentication Layer"
    resume: "To centralize authentication for customers and administrators. It integrates with both portals through secure login and authorization flows."
  - nombre: "Application Layer"
    resume: "Both web portals (Main Portal and Backoffice) are deployed as Azure Web Apps and interact with data storage and queue services for asynchronous processing."
  - nombre: "Background Processing Layer"
    resume: "This layer handles tasks that do not require an immediate response, improving overall performance and user experience."
  - nombre: "Data Layer"
    resume: "Ensures persistent storage for operational information such as products, users, and orders, and supports analysis of the generated data."

gallery:
  - img: "@assets/projects/ecommerce/gallery_1.avif"
    imgAlt: "Resources Infraestructures Core"
  - img: "@assets/projects/ecommerce/gallery_2.svg"
    imgAlt: "Resources Infraestructures Core"
  - img: "@assets/projects/ecommerce/gallery_3.avif"
    imgAlt: "Resources Infraestructures Apps"
  - img: "@assets/projects/ecommerce/gallery_4.svg"
    imgAlt: "Resources Infraestructures Apps"
  - img: "@assets/projects/ecommerce/gallery_5.avif"
    imgAlt: "Resources Infraestructures Analytics"
  - img: "@assets/projects/ecommerce/gallery_6.svg"
    imgAlt: "Resources Infraestructures Analytics"
---

