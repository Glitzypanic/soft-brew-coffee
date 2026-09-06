# Procedencia y estado de los recursos

## Originales de la marca

`public/brand/soft-brew-coffee.svg` y `keep-cold.svg` son copias de los SVG de `Downloads/Soft Brew Coffe Branding/Soft Brew Coffe Branding/Graphic elements/`. El logotipo permanece en trazados, sin sustitución tipográfica. El sello se reutiliza también como favicon.

`src/assets/pause.jpeg`, `coast.jpeg` y `original-bottles.jpeg` son copias sin cambios de `Downloads/IMG_0396.jpeg`, `IMG_0485.jpeg` e `IMG_0433.jpeg`, respectivamente. La tercera se conserva como referencia de los envases. La maquetación aplica encuadres mediante `object-fit` y `object-position`; Astro optimiza las imágenes publicadas en WebP. No se modificaron los originales de Descargas.

## Mockups de producto

Los cuatro `src/assets/bottle-*.png` se generaron con la herramienta integrada imagegen a partir de las fotos de la marca y sus etiquetas. Son representaciones autorizadas, no fotografías documentales ni archivos de impresión de etiquetas.

Los prompts se conservan en [image-prompts.json](image-prompts.json) y [image-background-prompt.txt](image-background-prompt.txt). La primera solicitud de transparencia devolvió un damero dibujado; una edición posterior produjo fondo blanco. Los recursos finales son RGB, de 1024 × 1536 píxeles. `BottleMasks.astro` recorta sus contornos en la presentación sin alterar los archivos ni teñir los colores de las tapas. Las sombras se aplican al contenedor.

| Origen | Color de referencia | Tapa | Notas |
|---|---|---|---|
| Colombia | #D2D2D2 | Plateada, foto de los dos botellines | De etiqueta original |
| Perú | #D9D218 | Dorada, foto original | De etiqueta original |
| Honduras | #FF5A1F | Plateada, decisión del usuario | Provisionales autorizadas |
| Costa Rica | #2455FF | Plateada, decisión del usuario | Provisionales autorizadas |

La fotografía frente al mar muestra Colombia con tapa dorada; se conserva como foto real, mientras el mockup toma como referencia la tapa plateada de IMG_0433. Los colores de las superficies web son los hexadecimales aprobados; la iluminación de los mockups produce variaciones en sus etiquetas. No se interpreta el QR representado en los mockups como vínculo funcional ni como cuenta oficial. Antes de usar estas imágenes en producción comercial, revisar esos detalles junto con las notas nuevas.

## Fuentes

Inter Variable y JetBrains Mono se incorporan mediante Fontsource y se sirven desde el propio sitio, sin peticiones a Google Fonts. Los archivos de licencia OFL están incluidos en `public/licenses/`. No se requiere instalar fuentes en el sistema para desarrollar o visitar la web.
