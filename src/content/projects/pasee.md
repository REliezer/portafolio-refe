---
title: Sistema Avanzado de Control de Horas PASEE
resume: Sistema de control de horas para estudiantes becados de la UNAH y personal administrativo del programa PASEE de VOAE.
date: 2025-04-21
imageCover: "@assets/projects/project-img4.png"
imageCoverAlt: PASEE
categories: [Proyectos Academicos, Proyectos Colaborativos]
platform:
  web: true
  movil: true
  nativo: false
  pwa: false
  desktop: false
  api: false
author: Rodrigo Fúnes
github: 
  - title: "Repositorio GitHub"
    link: "https://github.com/CarlosTorresGz/BecasUnahFE"
link: "https://becas-unah-pasee.vercel.app/"

stack:
  - label: "HTML"
    group: "Frontend"
  - label: "CSS"
    group: "Frontend"
  - label: "JavaScript"
    group: "Frontend"
  - label: "Bootstrap"
    group: "Frontend"
  - label: "ReactJS"
    group: "Frontend"
  - label: "Azure Functions"
    group: "Backend"
  - label: "Azure SQL Database"
    group: "Base de Datos"
  - label: "Azure Blob Storage"
    group: "Almacenamiento"

description: |
  Sistema de control de horas para estudiantes becados de la UNAH, diseñado para facilitar la gestión y seguimiento de las horas beca. Este sistema permite a los estudiantes registrar sus horas, así como al personal administrativo revisar dichas horas. Con una interfaz intuitiva y funcionalidades avanzadas, el sistema optimiza el proceso de control y seguimiento de horas.
  El acceso al sistema está restringido a solo aquellos usuarios que estén registrados y autenticados, con permisos diferenciados según su rol (becario o administrador). Para la autentificación de los usuarios se utiliza un sistema basado en tokens (JWT) brindando al sistema una mejor seguridad.

content:
  item:
    - nombre: "Módulos Generales"
      modulos:
      - Landing Page
      - Noticias/Comunicados
      - Información de Becas
      - Preguntas Frecuentes
      - Login
      - Cambio de Contraseña
    - nombre: "Módulos para Becarios"
      modulos:
      - Actividades Disponibles
      - Actividades Inscritas
      - Actividades Realizadas
      - Reportes de Seguimiento Recibidos
      - Perfil del Becario
      - Información de la Beca
    - nombre: "Módulos para Administradores"
      modulos:
      - Gestión de Actividades
      - Lista de Asistencia
      - Revisión de Seguimiento
      - Reportes de Seguimiento Enviados
      - Gestión de Planillas
      - Gestión de Preguntas Frecuentes
  
---

