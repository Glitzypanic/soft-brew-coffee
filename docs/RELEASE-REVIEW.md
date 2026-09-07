> **Actualización 2026-09-07:** publicación autorizada por el propietario. Notas de Honduras y Costa Rica confirmadas. Instagram se mantiene sin enlace por decisión expresa. Los pendientes anteriores sobre estos puntos quedan cerrados; el resto del documento conserva el historial de trabajo.

# Revisión previa a publicación — 7 de septiembre de 2026

Alcance: sitio completo y cambios posteriores al brief aprobado; revisión de corrección y de cumplimiento del alcance, con un revisor independiente. No se ha publicado ni creado un remoto.

## Hallazgos técnicos corregidos

- P2: Playwright podía aprobar una compilación anterior o reutilizar el servidor de revisión. Ahora compila antes de probar y usa su propia instancia en 4323, sin reutilización. El script de preview utiliza la API de Astro para permanecer vinculado al proceso de pruebas también en sesiones de agentes.
- P3: `Bottle.astro` declaraba el mismo `sizes` para hero y colección. En escritorio de 1920 px la colección podía descargar 720 px para una botella de 306 px a DPR 1. Ahora declara los anchos reales por contexto y breakpoint, conservando derivados para pantallas densas.
- P2: el pie de texto del hero quedaba demasiado cerca de la botella en móvil estrecho. Se reservan 32 px adicionales bajo el escenario de botellas.
- Mantenimiento: los cuatro contornos idénticos usan ahora una sola máscara SVG. No se alteraron los originales ni la dirección visual aprobada.

## Verificación ejecutada

- `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run verify`: tipos sin errores/advertencias, compilación nueva y 10 pruebas aprobadas en Chromium de escritorio y móvil emulado.
- Cobertura: navegación, carga de imágenes, teclado, axe A/AA, anchos 320–1920 px, texto ampliado y reducción de movimiento.
- `npm audit --json`: 0 vulnerabilidades reportadas al ejecutar la revisión.
- `git diff --check`: correcto. Recursos fuente conservados; salida estática aproximadamente 3.4 MB en disco, no equivalente a bytes descargados por visita.
- Límites: no se ha validado Safari/iPhone físico, hosting real, DNS ni comportamiento de caché de un proveedor.

## Cumplimiento del brief y pendientes definitivos

Se conservan cabecera estática, V60 como separador, vaso en footer, cuerpo común de botella, tapas dorada/plateadas, notas e infusiones aprobadas (24/16/26/24 horas). No se añaden tienda, formularios o analítica.

Antes de publicar como sitio definitivo faltan URL confirmada de Instagram y confirmación editorial de las notas provisionales de Honduras y Costa Rica. El `noindex, nofollow` sigue activo deliberadamente; debe retirarse al cerrar esos puntos y configurar metadatos canónicos/sociales con la URL real.

El repositorio local está preparado para subir sus fuentes. Falta elegir el remoto y hosting/dominio. Véanse los comandos y condiciones de despliegue en README.md; la configuración actual sirve en la raíz del dominio, no en una subruta de GitHub Pages.
