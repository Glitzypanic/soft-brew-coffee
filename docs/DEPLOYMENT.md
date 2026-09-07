# Publicación — 2026-09-07

- Sitio público: https://soft-brew-coffee.vercel.app
- Repositorio: https://github.com/Glitzypanic/soft-brew-coffee
- Destino: producción, Vercel, sin dominio comprado.
- Fuente desplegada: commit `1421b0e`.
- Despliegue: `dpl_7wQp6noiGrz4HwRV6yp8P5BAYi6x`.
- Método: compilación estática local enviada mediante el conector oficial de Vercel.

## Resultado verificado

La URL pública responde HTTP 200 sin autenticación. Se compararon los 36 archivos publicados con `dist/`: todos coinciden byte por byte. Se comprobó navegación por anclas y visualización de productos en el navegador público. La portada social, fuentes, CSS, WebP, robots y sitemap están incluidos.

La compilación completa ocupa aproximadamente 1.6 MB en disco, frente a 3.4 MB antes de limitar las imágenes de respaldo; no representa la transferencia inicial de una visita. Se conservaron los originales.

La versión de producto pasó las 10 pruebas de `npm run verify` y GitHub Actions. El conector creó el despliegue, pero sus herramientas de consulta de proyecto/logs devolvieron 403 por ámbito de cuenta; por eso se validó la publicación por HTTP y navegador. No se modificó la protección de URLs internas de Vercel.

## Próximas actualizaciones

GitHub Actions verifica cada push y pull request. **El repositorio todavía no está conectado al despliegue automático de Vercel**: este primer despliegue se hizo con el conector. Un push por sí solo no actualiza la web.

Para automatizarlo, importar este repositorio en el proyecto Vercel existente o conectar su integración GitHub desde los ajustes de Vercel. Usar Astro, Node 22, `npm ci`, `npm run build` y carpeta `dist`. Alternativamente, volver a publicar una compilación verificada con el conector/CLI autorizado.

Instagram permanece sin URL por decisión del propietario. Las notas están confirmadas. La indexación pública está habilitada y la URL canónica utiliza el dominio gratuito de Vercel.
