---
title: Creating a Data Pipeline and API with Intelligent Caching
resume: Comprehensive backend solution to migrate data at scale, implement secure and optimized APIs, and deploy everything to the cloud.
date: 2025-07-19
imageCover: "@assets/projects/default.svg"
imageCoverAlt: Expert Systems Project
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
    group: "Backend"

  - label: "Azure App Service"
    group: "Backend"

  - label: "Azure SQL Server"
    group: "Database"

  - label: "Azure SQL Database"
    group: "Database"

  - label: "Azure Cache for Redis"
    group: "Database"

  - label: "Application Insights"
    group: "Monitoring"

  - label: "Azure Resource Group"
    group: "Infrastructure and Administration"

  - label: "Terraform"
    group: "Infrastructure and Administration"

  - label: "Azure Data Factory"
    group: "Integration and Automation"

  - label: "Azure Container Registry"
    group: "Storage and Containers"

  - label: "Azure Blob Storage"
    group: "Storage and Containers"

  - label: "Docker"
    group: "Storage and Containers"

  - label: "Firebase Authentication"
    group: "Identity and Security"

  - label: "Azure Key Vault"
    group: "Identity and Security"

description: |
  Development of a comprehensive backend solution capable of migrating data at scale, exposing it through a secure and optimized API, and deploying everything in a production cloud environment.
  In addition, a monitoring system and a caching strategy with automatic invalidation are implemented.

content:
  description: "To complete this project, different phases had to be carried out."
  item:
  - nombre: "🏁 Phase 1: Data Preparation and Migration"
    resume: |
        In this stage, the first step was to find a dataset containing a considerable number of records and then create the database and the corresponding tables in Azure SQL. For our project, an Amazon Products dataset obtained from Kaggle was used.
        To migrate the data, Azure Data Factory was used by creating pipelines that extracted the data from the dataset (uploaded to Azure Blob Storage) into each of the tables.
  - nombre: "🔑 Phase 2: API Development and Authentication"
    resume: |
        With the data loaded into the database tables, several APIs were created to interact with them, applying best development and security practices.
        The APIs were developed using FastAPI (Python), and certain endpoints required a JWT token. Firebase Authentication was implemented to manage user registration and login via email.
  - nombre: "⏲️ Phase 3: Performance Monitoring"
    resume: |
        Azure Application Insights was used together with the APIs to capture telemetry, request traces, response times, and possible errors.
        To do so, multiple consecutive requests were made to the endpoints to analyze and observe the API’s behavior in the Application Insights dashboard.
  - nombre: "🧠 Phase 4: Cache Implementation with Redis"
    resume: |
        To improve response times, a caching layer was implemented by configuring and connecting a Redis cache database.
        In this phase, a key had to be generated to store each response in Redis, with two possible scenarios:
    modulos:
      - If the key exists, the response is returned immediately from it.
      - If it does not exist, the database is queried, the response is stored in Redis using the dynamic key, and then the response is returned to the user.

  - nombre: "🧹 Phase 5: Cache Invalidation"
    resume: |
        This phase addressed the problem that when new data is inserted, the original data changes and the cache becomes stale, so the generated cache had to be “smart.”
        To do this, a function was created so that whenever a new record was added, it would delete the specific Redis key related to each category.
  - nombre: "🚀 Phase 6: Cloud Deployment with Docker"
    resume: |
        The final phase... The application had to be packaged and deployed to run independently in a real cloud environment.
        For this, a Dockerfile was created with all the necessary dependencies and configurations so it could run in isolation, the Docker image was published to Azure Container Registry, and deployment was completed by running the container on Azure App Service.
  - nombre: "🔐 Extra Phase: Integrate Key Vault"
    resume: |
        Azure Key Vault was integrated to securely manage sensitive secrets such as connection strings, service access keys, and credentials. During this phase, the application configuration was modified to retrieve these values directly from Key Vault, increasing security and enabling centralized secret management, especially in continuous deployment environments.

diagrama:
  resume: |
    The diagram represents the data flow from data migration to querying it through a secure, optimized API deployed in the cloud, using Microsoft Azure services.
  image: "@assets/projects/amazonAPI/gallery_1.png"
  imageAlt: "Data Flow"
gallery:
  - img: "@assets/projects/amazonAPI/gallery_1.png"
    imgAlt: "Data Flow"
  - img: "@assets/projects/amazonAPI/gallery_2.png"
    imgAlt: "Resources created"
  - img: "@assets/projects/amazonAPI/gallery_3.png"
    imgAlt: "Resources created"
---

