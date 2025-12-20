---
title: Sistema Avanzado de Control de Horas PASEE
resume: Plataforma integral para la gestión y seguimiento de horas beca de estudiantes del programa PASEE-VOAE en la UNAH.
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
  - title: "Frontend"
    link: "https://github.com/CarlosTorresGz/BecasUnahFE"
  - title: "Azure Functions"
    link: "https://github.com/REliezer/Azure-Functions"
    
link: ""

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
  description: |
    La aplicación fue desarrollada como parte de un proyecto académico colaborativo, integrando servicios de Azure para lograr una arquitectura escalable y segura.
    Incluye autenticación mediante **tokens JWT**, almacenamiento en **Azure Blob Storage**, y lógica de negocio en **Azure Functions** conectadas a una base de datos **Azure SQL**.

  item:
    - nombre: "🧩 Módulos Generales"
      resume: |
        Secciones accesibles a todos los usuarios registrados.
      modulos:
      - 🏠 Landing Page informativa.
      - 📰 Noticias y comunicados oficiales.
      - 🎓 Información general sobre becas.
      - ❓ Preguntas frecuentes (FAQ).
      - 🔐 Login seguro con JWT.
      - 🔁 Cambio de contraseña.
    - nombre: "🎓 Módulos para Becarios"
      resume: |
        Herramientas diseñadas para que los becarios gestionen sus actividades y seguimiento.
      modulos:
        - 🗂️ Visualización de actividades disponibles.
        - 📝 Registro y control de actividades inscritas.
        - ✅ Reporte de actividades realizadas.
        - 📋 Seguimiento de reportes recibidos.
        - 👤 Perfil personal del becario.
        - 🎯 Visualización del estado y detalles de la beca.
    - nombre: "🧭 Módulos para Administradores"
      resume: |
        Funcionalidades administrativas para la gestión del programa PASEE.
      modulos:
        - ⚙️ Gestión y publicación de actividades.
        - 🗓️ Control de listas de asistencia.
        - 🧾 Revisión y validación de seguimientos.
        - 📤 Envío de reportes de seguimiento.
        - 💼 Gestión de planillas y becarios.
        - 💬 Administración del módulo de preguntas frecuentes.
    - nombre: "💡 Valor agregado"
      resume: |
        El sistema aporta eficiencia y trazabilidad al programa de becas universitarias.
      modulos:
        - ⏳ Reducción del tiempo de revisión de horas beca.
        - 🧠 Automatización de tareas administrativas repetitivas.
        - 🔐 Seguridad en los accesos mediante roles y JWT.
        - ☁️ Integración completa con servicios de Azure.
        - 📊 Reportes centralizados y actualizados en tiempo real.

    - nombre: "🛠️ Tareas realizadas"
      resume: |
        Aportes personales al desarrollo dentro del equipo colaborativo.
      modulos:
        - 🧩 Desarrollo de la interfaz de inicio y módulos informativos.
        - 🔗 Integración del frontend con las Azure Functions.
        - 📦 Implementación del almacenamiento en Azure Blob.
        - 🔐 Configuración de autenticación con JWT.
        - 🎨 Ajustes visuales con Bootstrap y React.
        - 🧾 Pruebas funcionales.
gallery:
  - img: "@assets/projects/pasee/inicio.png"
    imgAlt: "Inicio del sistema"
  - img: "@assets/projects/pasee/comunicados.png"
    imgAlt: "Comunicados"
  - img: "@assets/projects/pasee/FAQ.png"
    imgAlt: "Preguntas frecuentes"
  - img: "@assets/projects/pasee/becas_oferta.png"
    imgAlt: "Información de becas disponibles"
  # Módulos para Administradores
  - img: "@assets/projects/pasee/Administrador/login_admin.png"
    imgAlt: "Login del sistema para administradores"
  - img: "@assets/projects/pasee/Administrador/actividades_disponibles.png"
    imgAlt: "Gestión de actividades disponibles - Administrador"
  - img: "@assets/projects/pasee/Administrador/actividades_canceladas.png"
    imgAlt: "Actividades canceladas - Administrador"
  - img: "@assets/projects/pasee/Administrador/actividades_terminadas.png"
    imgAlt: "Actividades terminadas - Administrador"
  - img: "@assets/projects/pasee/Administrador/lista_asistencia.png"
    imgAlt: "Control de lista de asistencia - Administrador"
  - img: "@assets/projects/pasee/Administrador/seguimiento_becas.png"
    imgAlt: "Seguimiento de becas - Administrador"
  - img: "@assets/projects/pasee/Administrador/reportes_enviados.png"
    imgAlt: "Reportes enviados - Administrador"
  - img: "@assets/projects/pasee/Administrador/historial_planillas_pago.png"
    imgAlt: "Historial de planillas de pago - Administrador"
  # Módulos para Becarios
  - img: "@assets/projects/pasee/Becario/login.png"
    imgAlt: "Login del sistema para becarios"
  - img: "@assets/projects/pasee/Becario/actividades_disponibles.png"
    imgAlt: "Actividades disponibles - Becario"
  - img: "@assets/projects/pasee/Becario/informacion_actividad_disponibles.png"
    imgAlt: "Información de actividades disponibles - Becario"
  - img: "@assets/projects/pasee/Becario/formulario_incripcion.png"
    imgAlt: "Formulario de inscripción - Becario"
  - img: "@assets/projects/pasee/Becario/actividades_inscritas.png"
    imgAlt: "Actividades inscritas - Becario"
  - img: "@assets/projects/pasee/Becario/reportes_recibidos.png"
    imgAlt: "Reportes recibidos - Becario"
  - img: "@assets/projects/pasee/Becario/mi_perfil.png"
    imgAlt: "Perfil personal - Becario"
  - img: "@assets/projects/pasee/Becario/mi_beca.png"
    imgAlt: "Información de mi beca - Becario"

---

