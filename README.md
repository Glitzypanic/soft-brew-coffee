# Soft Brew Coffee

Landing editorial estática en Astro y CSS a medida. Implementación local del [brief aprobado](PROJECT-BRIEF.md), con Inter, JetBrains Mono y los recursos originales de marca.

## Desarrollo

Requiere Node 22.12 o posterior y npm. El lockfile fija las dependencias utilizadas.

```sh
npm ci
npm run dev
```

Vista local: http://127.0.0.1:4322. No requiere credenciales, servicios externos ni base de datos.

## Comprobaciones

```sh
npx playwright install chromium
npm run verify
```

Si Chromium ya está instalado en Linux:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

Las pruebas cubren navegación por anclas, recursos visuales, teclado, contraste y reglas de accesibilidad automáticas, distintos anchos, texto ampliado y reducción de movimiento. Playwright genera una compilación nueva y arranca su propia vista previa en el puerto 4323; no reutiliza el servidor de revisión del puerto 4322. `npm run verify` comprueba tipos y ejecuta estas pruebas.

## Contenido y recursos

- `src/data/origins.ts`: orígenes, notas, colores, tapas y estado editorial de las notas.
- `src/pages/index.astro`: recorrido y copy.
- `src/styles/global.css`: composición y adaptación responsive.
- `src/assets/`: fotos y mockups; Astro genera derivados WebP responsive durante la compilación.
- `public/brand/`: logotipo y sello originales en SVG.
- `public/licenses/`: licencias de las fuentes, servidas localmente mediante Fontsource.
- `docs/`: procedencia de recursos y resultados de la revisión.

## Antes de publicar

La revisión técnica para publicación está en curso. Confirmar la cuenta e introducir su URL en `instagramUrl` en `src/data/origins.ts`: mientras sea `null`, Instagram se presenta como texto sin enlace ficticio. Confirmar las notas de Honduras y Costa Rica, revisar sus etiquetas representativas y definir dominio/hosting. Después retirar `noindex, nofollow` y completar los metadatos que dependan del dominio.

Los mockups son representaciones visuales autorizadas; no acreditan producción o disponibilidad. Las fotos originales en Descargas permanecen intactas. No se incluyen carrito, precios, reservas, formularios ni analítica.

## Repositorio y despliegue estático

El repositorio Git local ya existe; falta seleccionar el remoto. No subir `node_modules/`, `dist/`, `.env` ni resultados de pruebas (ya están ignorados). Conservar los recursos fuente y sus licencias.

Configuración de un hosting estático:

- Instalación: `npm ci`
- Compilación: `npm run build`
- Carpeta publicable: `dist/`
- Node: 22.12 o posterior
- Sin servidor de aplicación, base de datos o secretos en producción.

Antes del despliegue definitivo, resolver los pendientes editoriales anteriores y configurar URL canónica/metadatos sociales con el dominio real. El `noindex` actual es deliberado mientras esos datos no estén confirmados. Para GitHub Pages bajo una subruta hay que adaptar `base` y las rutas absolutas antes de desplegar; la configuración actual sirve desde la raíz de un dominio.
