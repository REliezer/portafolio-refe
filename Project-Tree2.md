
```
portafolio-refe
├─ .editorconfig
├─ .markdownlint.json
├─ astro.config.mjs
├─ LICENSE
├─ package-lock.json
├─ package.json
├─ Project-Tree.md
├─ public
│  ├─ .htaccess
│  ├─ favicon
│  ├─ fonts
│  ├─ icons
│  └─ robots.txt
├─ README.md
├─ src
│  ├─ assets
│  │  ├─ backgrounds
│  │  ├─ contact
│  │  ├─ home
│  │  ├─ profile
│  │  └─ projects
│  │     ├─ amazonAPI
│  │     │  ├─ gallery_1.png
│  │     │  ├─ gallery_2.png
│  │     │  └─ gallery_3.png
│  │     ├─ cooky
│  │     ├─ default.svg
│  │     ├─ ecommerce
│  │     ├─ pasee
│  │     │  ├─ Administrador
│  │     │  ├─ Becario
│  │     │  ├─ becas_oferta.png
│  │     │  ├─ comunicados.png
│  │     │  ├─ FAQ.png
│  │     │  └─ inicio.png
│  │     ├─ pokeAPI
│  │     │  ├─ PokeQueue.png
│  │     │  └─ ui-pokequeue.png
│  │     ├─ project-img1a.png
│  │     ├─ project-img1b.png
│  │     ├─ project-img4.png
│  │     └─ project-img5.png
│  ├─ components
│  │  ├─ about
│  │  ├─ base
│  │  ├─ common
│  │  ├─ contact
│  │  │  └─ Contact.tsx
│  │  ├─ home
│  │  │  └─ Banner.tsx
│  │  ├─ not-found
│  │  └─ projects
│  ├─ content
│  │  ├─ about
│  │  │  ├─ index.en.md
│  │  │  └─ index.es.md
│  │  ├─ config.ts
│  │  ├─ contact
│  │  │  ├─ index.en.md
│  │  │  └─ index.es.md
│  │  ├─ home
│  │  │  ├─ index.en.md
│  │  │  └─ index.es.md
│  │  ├─ projects
│  │  │  ├─ amazon-api.en.md
│  │  │  ├─ amazon-api.es.md
│  │  │  ├─ cooky.en.md
│  │  │  ├─ cooky.es.md
│  │  │  ├─ ecommerce.en.md
│  │  │  ├─ ecommerce.es.md
│  │  │  ├─ index.en.md
│  │  │  ├─ index.es.md
│  │  │  ├─ opti-entregas-admin.en.md
│  │  │  ├─ opti-entregas-admin.es.md
│  │  │  ├─ opti-entregas-cliente.en.md
│  │  │  ├─ opti-entregas-cliente.es.md
│  │  │  ├─ opti-entregas-react.en.md
│  │  │  ├─ opti-entregas-react.es.md
│  │  │  ├─ opti-entregas-repartidor.en.md
│  │  │  ├─ opti-entregas-repartidor.es.md
│  │  │  ├─ pasee.en.md
│  │  │  ├─ pasee.es.md
│  │  │  ├─ poke-api.en.md
│  │  │  ├─ poke-api.es.md
│  │  │  ├─ portafolio.en.md
│  │  │  ├─ portafolio.es.md
│  │  │  └─ _template.md
│  │  ├─ skill
│  │  │  ├─ index.en.md
│  │  │  └─ index.es.md
│  │  └─ terms
│  │     ├─ index.en.md
│  │     └─ index.es.md
│  ├─ data
│  │  └─ icons.ts
│  ├─ env.d.ts
│  ├─ hooks
│  │  └─ useFormValidation.ts
│  ├─ i18n
│  │  ├─ i18n.ts
│  │  └─ utils.ts
│  ├─ lib
│  │  ├─ contentParser.ts
│  │  ├─ formatDate.ts
│  │  ├─ readingTime.ts
│  │  ├─ sortFunctions.ts
│  │  ├─ taxonomyFilter.ts
│  │  ├─ taxonomyParser.ts
│  │  └─ textConverter.ts
│  ├─ middleware.ts
│  ├─ pages
│  │  ├─ api
│  │  ├─ en
│  │  │  ├─ projects
│  │  │  │  ├─ categories
│  │  │  │  │  ├─ [category].astro
│  │  │  │  │  └─ index.astro
│  │  │  │  ├─ page
│  │  │  │  │  └─ [page].astro
│  │  │  │  ├─ [entry].astro
│  │  │  │  └─ index.astro
│  │  │  ├─404.astro
│  │  │  ├─about.astro
│  │  │  ├─constact.astro
│  │  │  └─index.astro
│  │  ├─ projects
│  │  │  ├─ categories
│  │  │  │  ├─ [category].astro
│  │  │  │  └─ index.astro
│  │  │  ├─ page
│  │  │  │  └─ [page].astro
│  │  │  ├─ [entry].astro
│  │  │  └─ index.astro
│  │  └─404.astro
│  │  └─about.astro
│  │  └─constact.astro
│  │  └─index.astro
│  ├─ schemas
│  │  ├─ social.ts
│  │  └─ tech.ts
│  ├─ styles
│  │  ├─ base
│  │  │  ├─ base.css
│  │  │  └─ fonts.css
│  │  ├─ components
│  │  │  ├─ BannerComponente.css
│  │  │  ├─ ContactComponente.css
│  │  │  ├─ glass.css
│  │  │  ├─ ProjectCardsComponente.css
│  │  │  └─ prose.css
│  │  ├─ main.css
│  │  ├─ utilities
│  │  │  └─ utilities.css
│  │  └─ variables.css
│  ├─ tailwind
│  │  └─ animations.js
│  ├─ types
│  │  └─ index.d.ts
│  └─ utils
│     └─ locale-utils.ts
├─ tailwind.config.js
└─ tsconfig.json

```