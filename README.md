# Soft Brew Coffee

Landing editorial estática en Astro y CSS a medida. Implementación local del [brief aprobado](PROJECT-BRIEF.md), con Inter, JetBrains Mono y los recursos originales de marca.

## Desarrollo

Requiere una versión de Node compatible con Astro 7 (ver `node_modules/astro/package.json`) y npm. El lockfile fija las dependencias utilizadas.

```sh
npm ci
npm run dev
```

Vista local: http://127.0.0.1:4322. No requiere credenciales, servicios externos ni base de datos.

## Comprobaciones

```sh
npm run check
npm run build
npx playwright install chromium
npm test
```

Si Chromium ya está instalado en Linux:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

Las pruebas cubren navegación por anclas, recursos visuales, teclado, contraste y reglas de accesibilidad automáticas, distintos anchos, texto ampliado y reducción de movimiento. Playwright arranca una vista previa de la compilación; cerrar un servidor de desarrollo existente si se necesita comprobar exclusivamente `dist/`.

## Contenido y recursos

- `src/data/origins.ts`: orígenes, notas, colores, tapas y estado editorial de las notas.
- `src/pages/index.astro`: recorrido y copy.
- `src/styles/global.css`: composición y adaptación responsive.
- `src/assets/`: fotos y mockups; Astro genera derivados WebP responsive durante la compilación.
- `public/brand/`: logotipo y sello originales en SVG.
- `public/licenses/`: licencias de las fuentes, servidas localmente mediante Fontsource.
- `docs/`: procedencia de recursos y resultados de la revisión.

## Antes de publicar

La publicación está expresamente pospuesta. Confirmar la cuenta e introducir su URL en `instagramUrl` en `src/data/origins.ts`: mientras sea `null`, Instagram se presenta como texto sin enlace ficticio. Confirmar las notas de Honduras y Costa Rica, revisar sus etiquetas representativas y definir dominio/hosting. Después retirar `noindex, nofollow` y completar los metadatos que dependan del dominio.

Los mockups son representaciones visuales autorizadas; no acreditan producción o disponibilidad. Las fotos originales en Descargas permanecen intactas. No se incluyen carrito, precios, reservas, formularios ni analítica.
