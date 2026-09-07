<div align="center">

# Soft Brew Coffee

**Buen café. En frío.**

Una landing editorial para una bebida de café de especialidad: cuatro orígenes, una misma forma de disfrutar el lado frío del café.

[![Verify](https://github.com/Glitzypanic/soft-brew-coffee/actions/workflows/verify.yml/badge.svg)](https://github.com/Glitzypanic/soft-brew-coffee/actions/workflows/verify.yml)
![Astro](https://img.shields.io/badge/Astro-7-111111?logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-typed-3178C6?logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-static-111111?logo=vercel)

[**Visitar la web ↗**](https://soft-brew-coffee.vercel.app) · [Diseño y brief](PROJECT-BRIEF.md) · [Verificación](docs/RELEASE-REVIEW.md)

![Soft Brew Coffee: cuatro orígenes, un lado frío](public/social-cover.png)

</div>

## La colección

<div align="center">
<img src="src/assets/relit-colombia-grey.png" width="23%" alt="Colombia, etiqueta gris y tapa plateada" />
<img src="src/assets/relit-peru-yellow.png" width="23%" alt="Perú, etiqueta amarilla y tapa dorada" />
<img src="src/assets/relit-honduras-orange.png" width="23%" alt="Honduras, etiqueta naranja y tapa plateada" />
<img src="src/assets/relit-costa-rica-blue.png" width="23%" alt="Costa Rica, etiqueta azul y tapa plateada" />
</div>

| Origen | Notas | Infusión | Identidad |
| --- | --- | --- | --- |
| Colombia | Chocolate dulce, caramelo | 24 h | Gris · plata |
| Perú | Avellana tostada, chocolate | 16 h | Amarillo · oro |
| Honduras | Cacao, panela, nuez | 26 h | Naranja · plata |
| Costa Rica | Naranja dulce, miel, caramelo | 24 h | Azul · plata |

Todos los botellines son de **200 ml**. Los mockups comparten cuerpo y proporciones, con reflejos adaptados al entorno. Las notas fueron confirmadas por el responsable del proyecto; las imágenes son representaciones visuales de producto.

## Diseño

- Identidad tipográfica protagonista y retícula editorial con líneas finas.
- Inter Variable y JetBrains Mono servidas localmente.
- Logo original, V60 como separador y vaso de cold brew en el cierre.
- Composición responsive, imágenes WebP con tamaños adaptados y carga diferida.
- Navegación por anclas, acceso por teclado y respeto a movimiento reducido.
- Fotografías originales junto al mar y en una pausa con hielo.

<img src="src/assets/pause.jpeg" width="49%" alt="Cold brew servido con hielo en una mesa de madera" /> <img src="src/assets/coast.jpeg" width="49%" alt="Soft Brew Coffee frente al mar" />

## Tecnología

**Astro 7 · TypeScript · CSS a medida · Fontsource · Playwright · axe-core**

Sitio estático: no necesita backend, base de datos, credenciales ni servicios de terceros para renderizar. No incluye carrito, formularios o analítica. Instagram permanece como texto sin enlace por decisión del propietario.

## Desarrollo local

Requisitos: **Node ≥22.12** y **npm ≥9.6.5**.

```bash
npm ci
npm run dev
```

Abrir `http://127.0.0.1:4322`.

| Comando | Función |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Genera el sitio estático en `dist/` |
| `npm run preview` | Vista previa local de producción |
| `npm run check` | Tipos y diagnósticos de Astro |
| `npm test` | Compila y ejecuta las pruebas de navegador |
| `npm run verify` | Diagnósticos y recorrido completo de pruebas |
| `npm run format` | Formatea fuentes y pruebas |

## Calidad y pruebas

```bash
npx playwright install chromium
npm run verify
```

En Linux puede usarse Chromium instalado:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run verify
```

Las 10 pruebas cubren navegación, carga de imágenes, teclado, reglas automáticas de accesibilidad, anchos de 320 a 1920 px, texto al 200 %, movimiento reducido y metadatos públicos. Playwright genera una compilación nueva y usa un servidor exclusivo en el puerto **4323**. GitHub Actions ejecuta las mismas comprobaciones en cada push a `main` y pull request.

Las pruebas automáticas no sustituyen una revisión manual completa de accesibilidad. La validación actual usa Chromium; Safari e iPhone físico no han sido verificados.

## Estructura

```text
src/
  assets/        Fotografías y mockups de producto
  components/    Botellines, iconos y fichas de origen
  data/          Contenido de la colección
  pages/         Página principal
  styles/        Diseño y responsive
public/
  brand/         Identidad original en SVG
  licenses/      Licencias de fuentes
  social-cover.* Portada para compartir
scripts/         Vista previa aislada para pruebas
tests/           Pruebas de navegador
.github/         Verificación automática y plantillas
docs/            Procedencia, revisiones y decisiones
```

## Editar contenido

Los orígenes, notas, tiempos de infusión y tapas viven en [`src/data/origins.ts`](src/data/origins.ts). La composición está en [`src/pages/index.astro`](src/pages/index.astro) y [`src/styles/global.css`](src/styles/global.css). La procedencia de los recursos se documenta en [ASSETS.md](docs/ASSETS.md).

## Publicación

Preparado para **Vercel**, con `npm ci`, `npm run build` y salida `dist/`. `vercel.json` declara Astro como framework. La URL canónica, el sitemap y los metadatos sociales apuntan al dominio gratuito del proyecto. No necesita variables secretas en producción.

Para cambiar la URL pública, actualizar `astro.config.mjs`, `public/robots.txt`, `public/sitemap.xml`, la expectativa canónica en las pruebas y los enlaces de este README. El sitio se sirve desde la raíz del dominio.

## Documentación

- [Brief y decisiones de diseño](PROJECT-BRIEF.md)
- [Revisión previa a publicación](docs/RELEASE-REVIEW.md)
- [Procedencia de imágenes y tipografías](docs/ASSETS.md)
- [Historial de cambios](CHANGELOG.md)
- [Cómo contribuir](CONTRIBUTING.md)

## Recursos y derechos

Este repositorio es público para mostrar y mantener el proyecto. No se concede una licencia general de reutilización del código, marca, fotografías o mockups. Solicitar autorización antes de reutilizarlos. Las fuentes conservan sus licencias en [`public/licenses/`](public/licenses/).
