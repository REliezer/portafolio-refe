---
title: Sistema Avanzado de Control de Horas PASEE
resume: End-to-end platform for managing and tracking scholarship-work hours for students in UNAH’s PASEE-VOAE program.
date: 2025-04-21
imageCover: "@assets/projects/project-img4.png"
imageCoverAlt: PASEE
categories: [academic-projects, collaborative-projects]
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
    group: "Database"
  - label: "Azure Blob Storage"
    group: "Storage"

description: |
  Hours-tracking system for UNAH scholarship students, designed to simplify the management and monitoring of scholarship hours. The system allows students to log their hours and enables administrative staff to review them. With an intuitive interface and advanced features, it streamlines the process of tracking and validating hours.
  Access to the system is restricted to registered and authenticated users, with role-based permissions (scholarship student or administrator). For user authentication, a token-based system (JWT) is used, providing stronger security.

content:
  description: |
    The application was developed as part of a collaborative academic project, integrating Azure services to achieve a scalable and secure architecture.
    It includes authentication using **JWT tokens**, storage in **Azure Blob Storage**, and business logic in **Azure Functions** connected to an **Azure SQL** database.

  item:
    - nombre: "🧩 General Modules"
      resume: |
        Sections available to all registered users.
      modulos:
      - 🏠 Informational landing page.
      - 📰 News and official announcements.
      - 🎓 General scholarship information.
      - ❓ Frequently Asked Questions (FAQ).
      - 🔐 Secure login with JWT.
      - 🔁 Password change.
    - nombre: "🎓 Modules for Scholarship Students"
      resume: |
        Tools designed to help scholarship students manage their activities and tracking.
      modulos:
        - 🗂️ View available activities.
        - 📝 Register and manage enrolled activities.
        - ✅ Report completed activities.
        - 📋 Track submitted reports.
        - 👤 Scholarship student profile.
        - 🎯 View scholarship status and details.
    - nombre: "🧭 Modules for Administrators"
      resume: |
        Administrative features for managing the PASEE program.
      modulos:
        - ⚙️ Manage and publish activities.
        - 🗓️ Attendance list management.
        - 🧾 Review and validate follow-ups.
        - 📤 Send follow-up reports.
        - 💼 Manage payroll sheets and scholarship students.
        - 💬 Manage the FAQ module.
    - nombre: "💡 Added Value"
      resume: |
        The system brings efficiency and traceability to the university scholarship program.
      modulos:
        - ⏳ Reduced review time for scholarship hours.
        - 🧠 Automation of repetitive administrative tasks.
        - 🔐 Secure access through roles and JWT.
        - ☁️ Full integration with Azure services.
        - 📊 Centralized reports updated in real time.

    - nombre: "🛠️ Tasks Completed"
      resume: |
        Personal contributions to the development within the collaborative team.
      modulos:
        - 🧩 Development of the home interface and informational modules.
        - 🔗 Integration of the frontend with Azure Functions.
        - 📦 Implementation of storage in Azure Blob Storage.
        - 🔐 JWT authentication configuration.
        - 🎨 Visual adjustments using Bootstrap and React.
        - 🧾 Functional testing.

gallery:
  - img: "@assets/projects/pasee/inicio.png"
    imgAlt: "System home"
  - img: "@assets/projects/pasee/comunicados.png"
    imgAlt: "Announcements"
  - img: "@assets/projects/pasee/FAQ.png"
    imgAlt: "Frequently Asked Questions"
  - img: "@assets/projects/pasee/becas_oferta.png"
    imgAlt: "Information about available scholarships"
  # Administrator Modules
  - img: "@assets/projects/pasee/Administrador/login_admin.png"
    imgAlt: "System login for administrators"
  - img: "@assets/projects/pasee/Administrador/actividades_disponibles.png"
    imgAlt: "Manage available activities - Administrator"
  - img: "@assets/projects/pasee/Administrador/actividades_canceladas.png"
    imgAlt: "Canceled activities - Administrator"
  - img: "@assets/projects/pasee/Administrador/actividades_terminadas.png"
    imgAlt: "Completed activities - Administrator"
  - img: "@assets/projects/pasee/Administrador/lista_asistencia.png"
    imgAlt: "Attendance list management - Administrator"
  - img: "@assets/projects/pasee/Administrador/seguimiento_becas.png"
    imgAlt: "Scholarship follow-up - Administrator"
  - img: "@assets/projects/pasee/Administrador/reportes_enviados.png"
    imgAlt: "Sent reports - Administrator"
  - img: "@assets/projects/pasee/Administrador/historial_planillas_pago.png"
    imgAlt: "Payroll sheets history - Administrator"
  # Scholarship Student Modules
  - img: "@assets/projects/pasee/Becario/login.png"
    imgAlt: "System login for scholarship students"
  - img: "@assets/projects/pasee/Becario/actividades_disponibles.png"
    imgAlt: "Available activities - Scholarship student"
  - img: "@assets/projects/pasee/Becario/informacion_actividad_disponibles.png"
    imgAlt: "Available activities information - Scholarship student"
  - img: "@assets/projects/pasee/Becario/formulario_incripcion.png"
    imgAlt: "Enrollment form - Scholarship student"
  - img: "@assets/projects/pasee/Becario/actividades_inscritas.png"
    imgAlt: "Enrolled activities - Scholarship student"
  - img: "@assets/projects/pasee/Becario/reportes_recibidos.png"
    imgAlt: "Received reports - Scholarship student"
  - img: "@assets/projects/pasee/Becario/mi_perfil.png"
    imgAlt: "Personal profile - Scholarship student"
  - img: "@assets/projects/pasee/Becario/mi_beca.png"
    imgAlt: "My scholarship information - Scholarship student"

---

