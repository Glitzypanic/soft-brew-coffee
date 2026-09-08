> **Actualización 2026-09-07:** publicación autorizada por el propietario. Notas de Honduras y Costa Rica confirmadas. Instagram se mantiene sin enlace por decisión expresa. Los pendientes anteriores sobre estos puntos quedan cerrados; el resto del documento conserva el historial de trabajo.

# PROJECT-BRIEF — Soft Brew Coffee

> Implementación local completada el 6 de septiembre de 2026. Este documento conserva el brief y la entrevista como referencia; el estado actual de la entrega, recursos y comprobaciones está en [README.md](README.md), [docs/ASSETS.md](docs/ASSETS.md) y [docs/VERIFICATION.md](docs/VERIFICATION.md). Las referencias inferiores a trabajo futuro describen el estado previo al desarrollo.

## 0. Estado y lectura del documento
### Actualización de la entrevista — 6 de septiembre de 2026
Estas precisiones posteriores prevalecen sobre los pendientes equivalentes del brief v1.0:
- Honduras (naranja) y Costa Rica (azul) llevan tapa plateada (silver), confirmado por el usuario. Colombia y Perú conservan las referencias existentes.
- El usuario define la bebida como premium y de café de especialidad, con una imagen muy cuidada. Es posicionamiento declarado por la marca; no implica certificaciones ni puntuaciones de cata.
- El usuario delega la redacción del texto. Texto elegido para la pausa fotográfica: «Café de especialidad. Otra forma de disfrutarlo.» El cierre conserva «Sigue el lado frío del café».
- La fase actual se centra en implementación local. Publicación, dominio, hosting y destino definitivo de Instagram se retoman después; no bloquean el desarrollo. La URL y las notas provisionales deben resolverse antes de publicar como sitio definitivo.
- Tipografía aprobada al cierre de la entrevista: Inter para titulares y JetBrains Mono para datos y texto, conservando intacto el logotipo original. Esta decisión sustituye Helvetica Hebrew para los titulares web. Se autoriza instalar las fuentes necesarias; todavía no se han instalado ni incorporado al proyecto.
- Comprobación del logotipo `SoftBrewCoffee.svg`: contiene trazados y no elementos de texto SVG; su reproducción no depende de instalar Helvetica Hebrew.

**Cierre de revisión:** decisiones suficientes para iniciar implementación local. No quedan preguntas bloqueantes de diseño o alcance. La producción de etiquetas y mockups, incorporación de fuentes, adaptación responsive y verificación visual forman parte del trabajo de implementación. Los pendientes de publicación se conservan para esa fase. Los apartados originales inferiores deben leerse con las precisiones de esta actualización.

### 0.1 Fecha, versión y confirmación del usuario
6 de septiembre de 2026. Versión 1.0. Síntesis aprobada por el usuario; ubicación de este archivo aprobada posteriormente. Es un brief para una futura implementación, no evidencia de una web construida o imágenes editadas.

### 0.2 Convenciones de naturaleza, estado y autonomía
Se distinguen hechos declarados, hechos observados, preferencias, decisiones, recomendaciones y contenido provisional. «Aprobado» corresponde a una confirmación del usuario; «pendiente» no autoriza a inventar datos. Las etiquetas Observado, Estimado, No verificado y Propuesta del dossier conservan su significado. Los identificadores D01–D09 remiten al registro de decisiones.

### 0.3 Materiales y fuentes consultados
- [Dossier editorial](/home/glitzypanic/Documents/design-references/2026-09-06-layouts-editoriales/referencia-diseno-layouts-editoriales.md), leído completo. Analiza tres capturas: E01 Wanderlust, E02 Jean Grey y E03 BRUT. Cubre composiciones estáticas; E02 y E03 están cortadas. No verifica fuentes exactas, medidas CSS, interacciones ni versiones móvil/escritorio. Sus proporciones son estimaciones, no especificaciones.
- [Branding original](/home/glitzypanic/Downloads/Soft%20Brew%20Coffe%20Branding/Soft%20Brew%20Coffe%20Branding): documento RTF, etiquetas PDF de Colombia y Perú inspeccionadas visualmente, archivo de Affinity y gráficos SVG disponibles.
- Fotografías inspeccionadas: [IMG_0485.jpeg](/home/glitzypanic/Downloads/IMG_0485.jpeg), [IMG_0396.jpeg](/home/glitzypanic/Downloads/IMG_0396.jpeg), [IMG_0433.jpeg](/home/glitzypanic/Downloads/IMG_0433.jpeg).
- Conversación del proyecto: fuente de las decisiones, autorizaciones y datos declarados.
- [Astro](https://astro.build/): consultado para fundamentar una base de contenido ligera. No se fija una versión del framework.

## 1. Contexto e intención del sitio
### 1.1 Contexto aportado por el usuario
Soft Brew Coffee es una marca de cold brew embotellado. El usuario solicita una landing editorial atractiva dedicada a presentar sus productos, adaptando el dossier a la identidad de las etiquetas y usando mucho contraste. Confirma que los cuatro productos tendrán 200 ml y el modelo de botellín mostrado en sus fotos.

### 1.2 Público y acción principal
Acción principal aprobada: conocer los cuatro productos y terminar en Instagram para seguir descubriendo la marca. No se ha definido una segmentación demográfica; no es necesario inventarla para este recorrido. Personas interesadas en conocer el producto es una hipótesis funcional, no un estudio de público.

### 1.3 Personalidad y rasgos relevantes para el diseño
Identidad gráfica contundente: nombre grande, datos monoespaciados, divisiones visibles, símbolos propios y superficies de alto contraste. Los envases y las etiquetas deben seguir siendo reconocibles.

### 1.4 Vocabulario del proyecto
- Marca: Soft Brew Coffee, aunque algunas carpetas originales omiten una «e».
- Orígenes: Colombia, Perú, Honduras y Costa Rica. El usuario los llamó inicialmente «varietales»; se presentarán como orígenes porque son países.
- Botellín: envase real de las fotografías, de 200 ml.
- Notas: descriptores sensoriales; las de Honduras y Costa Rica son propuestas editoriales sin validación del café real.
- Mockup: representación del producto basada en el envase y las etiquetas; no demuestra existencia de una fotografía real de ese origen.

## 2. Mapa del sitio y composición
### 2.1 Páginas, secciones y propósito de cada una
Una landing con cuatro partes aprobadas:
1. Apertura: marca monumental y composición de botellines sobre amarillo, negro y gris; reconocer la marca y el producto.
2. Los cuatro orígenes: índice lateral y cuatro filas amplias; identificar y comparar origen, color y notas.
3. Pausa fotográfica: vaso con hielo y recorte frente al mar, con texto breve; aportar contexto de consumo y variar el ritmo.
4. Cierre: marca a gran escala, frase «Sigue el lado frío del café» y enlace a Instagram.

### 2.2 Recorrido principal y navegación
Lectura vertical: identidad → productos → contexto fotográfico → Instagram. La navegación interna, si se muestra, debe apuntar a las secciones existentes. No se añaden páginas de producto ni destinos ficticios. El índice de orígenes puede orientar la lectura mediante anclas; es un detalle derivable.

### 2.3 Esquema de escritorio
Esquema conceptual aprobado, sin medidas cerradas:
```text
┌───────────────────────────┬─────────────────────────┐
│ MARCA / TITULAR GRANDE     │ COMPOSICIÓN BOTELLINES  │
├─────────┬─────────────────┴─────────────────────────┤
│         │ COLOMBIA · gris · envase y notas          │
│ ÍNDICE  ├───────────────────────────────────────────┤
│ CUATRO  │ PERÚ · amarillo · envase y notas          │
│ ORÍGENES├───────────────────────────────────────────┤
│         │ HONDURAS · naranja · envase y notas       │
│         ├───────────────────────────────────────────┤
│         │ COSTA RICA · azul · envase y notas        │
├─────────┴─────────────────────┬─────────────────────┤
│ FOTO VASO / BOTELLA            │ FOTO MAR / TEXTO    │
├───────────────────────────────┴─────────────────────┤
│ CIERRE · INSTAGRAM · MARCA GRANDE                    │
└─────────────────────────────────────────────────────┘
```
Las filas alternan el peso de texto e imagen. El índice abarca la colección, sin que esto implique comportamiento fijo al hacer scroll. Las proporciones se ajustarán a imágenes y textos reales.

### 2.4 Esquema de móvil
```text
MARCA / TITULAR
COMPOSICIÓN BOTELLINES
ÍNDICE DE ORÍGENES
COLOMBIA: imagen + datos
PERÚ: imagen + datos
HONDURAS: imagen + datos
COSTA RICA: imagen + datos
FOTO VASO + TEXTO BREVE
FOTO MAR
CIERRE / INSTAGRAM / MARCA
```

### 2.5 Reglas de adaptación y estado de aprobación del layout
Composición aprobada para ambos formatos. En móvil se apilan marca y botellines, el índice pasa arriba y se conservan bloques de color, asociación imagen/datos y separadores. No reducir toda la página proporcionalmente ni introducir desplazamiento horizontal. Los puntos de reorganización y recortes exactos son derivables mediante pruebas; el comportamiento móvil no procede de observación de las referencias.

## 3. Contenido y recursos
### 3.1 Material disponible y ubicación
Directorio original: `/home/glitzypanic/Downloads/Soft Brew Coffe Branding/Soft Brew Coffe Branding/`.
- `ColdBrewLabelColombia.pdf` y `ColdBrewLabelPeru.pdf`: etiquetas existentes.
- `SoftBrewCoffeeLabel.af`: fuente de Affinity disponible; editabilidad no comprobada.
- `Branding Design.rtfd/TXT.rtf`: parámetros declarados de color y tipografía; dimensiones de etiqueta 9 × 6 cm y borde redondeado.
- `Branding Design.rtfd/`: dos capturas de las etiquetas.
- `Graphic elements/SoftBrewCoffee.svg`, `Details.svg`, `KeepCold.svg`, `Qr-Code.svg`: gráficos disponibles; integridad y uso web por verificar.
- Las tres fotografías enlazadas en 0.3 muestran el modelo real del envase.

| Origen | Volumen confirmado | Color aprobado | Notas y procedencia |
|---|---|---|---|
| Colombia | 200 ml | Gris #D2D2D2 | Chocolate dulce, caramelo; etiqueta existente |
| Perú | 200 ml | Amarillo #D9D218 | Avellana tostada, chocolate; etiqueta existente |
| Honduras | 200 ml | Naranja #FF5A1F | Cacao, panela y nuez; propuesta provisional autorizada |
| Costa Rica | 200 ml | Azul #2455FF | Naranja dulce, miel y caramelo; propuesta provisional autorizada |

Las etiquetas existentes dicen «Arábica». No extender automáticamente esa declaración a los nuevos cafés ni deducir un cultivar concreto.

### 3.2 Contenido provisional autorizado
El usuario autorizó crear notas para Honduras y Costa Rica; aceptó los perfiles anteriores como provisionales por validar. Autorizó editar/recortar sus fotos y crear mockups detallados si conviene a la estética. Las nuevas etiquetas y mockups todavía no existen como entregables. El texto breve de transición puede proponerse, pero no inventar historia, proceso, recetas, certificaciones, disponibilidad ni propiedades del producto.

### 3.3 Material faltante y dependencias visuales
Faltan destino exacto de Instagram, etiquetas derivadas de Honduras y Costa Rica, recursos fotográficos editados, comprobación de archivos/licencia tipográfica y validación sensorial de los nuevos orígenes. Las fotos permiten trabajar con la forma del envase, sin pedir un modelo alternativo. No hay confirmación de color de tapa por origen nuevo; conservar el modelo visible y resolver ese detalle antes de presentar mockups como fieles al producto final.

### 3.4 Tono del texto y función narrativa de las imágenes
Texto breve, directo y centrado en producto. Español como supuesto de trabajo por conversación y etiquetas; nombre de marca intacto. Fotografías con funciones distintas: producto en apertura, experiencia de consumo en el vaso, contexto espontáneo frente al mar. La foto con cítrico no acredita ingredientes ni una receta del producto.

## 4. Funcionalidades e integraciones
### 4.1 Comportamientos requeridos
Lectura responsive, presentación de cuatro orígenes y enlace real a Instagram. Navegación interna coherente si se incorpora.

### 4.2 Enlaces, servicios e integraciones existentes
Instagram aprobado como destino, URL pendiente. No inferir el destino del QR como cuenta oficial sin comprobarlo. No hay integraciones adicionales solicitadas.

### 4.3 Funciones reales, simuladas y pendientes
El enlace final debe ser funcional al disponer de la URL. Los mockups son recursos representativos; las notas nuevas son contenido provisional. No hay funcionalidades simuladas solicitadas. Ningún comportamiento está implementado en este brief.

### 4.4 Estados relevantes de interacción
Enlaces distinguibles con hover y foco de teclado; objetivos táctiles legibles y cómodos. No añadir acordeones o menús complejos por los signos presentes en las referencias, cuyas interacciones no están verificadas.

## 5. Dirección visual
### 5.1 Idea rectora y personalidad
D01: «Etiqueta expandida». Trasladar el lenguaje de las etiquetas a una superficie editorial continua, con titulares monumentales y botellines protagonistas.

### 5.2 Elementos distintivos y fundamento
Marca y símbolos propios, texto monoespaciado, divisiones de datos, colores por origen y forma del envase real. La identidad nace del material entregado, no de una estética genérica de cafetería.

### 5.3 Jerarquía, composición, ritmo y densidad
Alternar apertura grande, colección de filas y pausa fotográfica. Contrastar tipografía monumental con datos pequeños pero legibles. Variar proporciones dentro de una retícula estable; conservar aire interior aunque las celdas compartan bordes.

### 5.4 Tipografía
El documento de branding especifica Helvetica Hebrew para títulos y JetBrains Mono para texto. En la entrevista posterior, el usuario aprobó Inter para titulares web y JetBrains Mono para texto y datos, conservando la marca original en sus recursos gráficos. Incorporar las fuentes y sus licencias durante la implementación. No atribuir a BRUT. una familia concreta ni copiar su condensación a costa de la identidad propia.

### 5.5 Color
Paleta aprobada en 3.1 más negro para estructura y grandes superficies. El gris y amarillo proceden del documento de marca; naranja y azul son ampliaciones explícitamente aprobadas, no colores originales descubiertos. Usar grandes superficies, no solo pequeños acentos. Elegir texto claro u oscuro por contraste comprobado; preservar los colores de origen.

### 5.6 Espaciado y layout
Franjas contiguas, divisiones compartidas, alturas variables y alineaciones claras. Espaciado exacto y ancho máximo son derivables. Evitar bordes dobles entre celdas. La retícula de doce columnas mencionada por el dossier es una propuesta técnica, no una obligación ni un hecho medido.

### 5.7 Fotografía e imágenes
D04 autoriza criterio editorial para recortar y editar, y recurrir a mockups fieles cuando una foto no encaje. Aplicación propuesta dentro de esa autonomía:
- IMG_0433: aislar los dos envases de la madera para una composición sobre la paleta, conservando diagonales y sombras creíbles.
- IMG_0396: recorte más cerrado del vaso, hielo y botella para la pausa fotográfica.
- IMG_0485: reducir cielo y enfatizar el botellín frente al mar.
Mantener forma, proporciones de 200 ml y legibilidad de las etiquetas. Conservar originales y producir derivados. No introducir textos deformados, marcas inventadas o cambios de envase en los mockups. La tapa aparece dorada y plateada en las fotos; no hay una regla confirmada para los cuatro orígenes.

### 5.8 Navegación
Discreta, integrada en la retícula. El contenido y producto dominan la página. Instagram es el cierre del recorrido. No se ha aprobado un encabezado fijo ni navegación adicional.

### 5.9 Radios, bordes y sombras
Predominan ángulos rectos y líneas visibles en la página según la dirección editorial. Mantener esquinas redondeadas de las etiquetas reales; no confundir esa geometría del objeto con radios de todos los módulos web. Sombras fotográficas para volumen del producto, sin sombras decorativas generalizadas en paneles.

### 5.10 Movimiento
No hay animación concreta aprobada. La composición debe funcionar estática. Cualquier movimiento posterior debe justificar su función y respetar reducción de movimiento; no inferir tickers animados de las capturas.

### 5.11 Referencias: qué adoptar y qué rechazar
[Dossier, apartados 4–10](/home/glitzypanic/Documents/design-references/2026-09-06-layouts-editoriales/referencia-diseno-layouts-editoriales.md):
- E03 BRUT.: adoptar contundencia de titulares, índice lateral de una colección y color en superficies. Adaptar a tipografía y paleta propias.
- E01 Wanderlust: adoptar claridad, aire interior y celdas conectadas.
- E02 Jean Grey: adoptar alternancia del foco y relación entre imagen grande y módulos; no incorporar capítulos numerados sin función.
- Todas: marco continuo y variación interna, Observado en las capturas. Las proporciones son Estimado.
- No trasladar identidad, fotos ajenas, microtexto ilegible o supuestas interacciones. Responsive es Propuesta propia aprobada, no comportamiento verificado de esas webs.

### 5.12 Alertas de genericidad y resolución
Evitar convertir los cuatro productos en tarjetas iguales desconectadas de la retícula. No usar marrones por asociación automática con café, degradados decorativos o copy corporativo. Resolver la variedad mediante proporciones, fotografía, marca y colores aprobados. Estas son reglas del proyecto, no prohibiciones universales de componentes.

## 6. Solución técnica
### 6.1 Necesidades que condicionan la arquitectura
Una página de contenido, imágenes de producto, adaptación responsive y enlace externo. No se ha solicitado lógica de aplicación ni datos dinámicos propios.

### 6.2 Recomendación principal y estado de aprobación
D08: Astro y CSS a medida, aprobados explícitamente. Generación estática apropiada para el contenido. JavaScript solo para comportamientos que lo necesiten; no es necesario para la retícula.

### 6.3 Alternativas consideradas y razones de descarte
No se compararon otras tecnologías con el usuario; no inventar un proceso de selección. La recomendación se fundamentó en el alcance de presentación y la ligereza del contenido.

### 6.4 Dependencias técnicas e incógnitas
Comprobar tipografías web, formatos de imágenes, exportación de gráficos y enlace de Instagram. Hosting, dominio y versión de Astro no están decididos. No se requieren para entender el brief; deben resolverse cuando afecten publicación o implementación.

## 7. Registro de decisiones y autonomía
### 7.1 Decisiones y preferencias confirmadas
| ID | Decisión | Fuente y estado | Impacto |
|---|---|---|---|
| D01 | Etiqueta expandida, editorial y alto contraste | Propuesta aceptada por el usuario | Dirección visual |
| D02 | Cuatro orígenes y colores de 3.1 | Solicitud y aprobación explícitas | Catálogo y paleta |
| D03 | Mismo modelo de botellín de fotos, todos 200 ml | Aclaración explícita del usuario | Imágenes y contenido |
| D04 | Editar/recortar fotos y crear mockups si conviene | Autorización explícita | Autonomía de imagen |
| D05 | Crear notas de Honduras y Costa Rica, provisionales | Delegación y aceptación posterior | Copy con validación pendiente |
| D06 | Cierre a Instagram | Propuesta aceptada | Acción principal |
| D07 | Recorrido y composiciones de escritorio/móvil | Propuesta aceptada | Estructura de página |
| D08 | Astro y CSS a medida | Aprobación explícita | Base técnica |
| D09 | Síntesis y ubicación del brief | Aprobaciones explícitas | Documento final |

### 7.2 Recomendaciones pendientes y suposiciones temporales
Español para los textos por contexto. Perfiles sensoriales nuevos provisionales. No hay especificación del color de tapa por origen ni fuente web disponible. Los pendientes de sección 10 no son decisiones tácitas.

### 7.3 Detalles derivables y cambios que requieren consulta
Se pueden derivar espaciados, dimensiones responsive, recortes, ajustes cromáticos de fotos, distribución fina y estados de enlaces dentro de las reglas aprobadas. Se autorizaron mockups detallados. Consultar cambios de identidad, tipografía protagonista, composición principal, recorrido, color por origen o modelo de envase. No convertir datos provisionales en hechos verificados.

## 8. Restricciones, exclusiones y riesgos
### 8.1 Restricciones de diseño y desarrollo
Preservar identidad y fuentes originales. Respetar el modelo real de 200 ml y paleta aprobada. El brief no autoriza publicar datos falsos ni omitir incertidumbres de producto.

### 8.2 Elementos explícitamente excluidos
La solicitud es solo presentar productos. Carrito, checkout, cuentas, reservas, CMS e infraestructura comercial no forman parte del alcance. No se solicitó construirlos. Este documento tampoco implementa ni despliega la web.

### 8.3 Riesgos, impacto y comprobación necesaria
- Texto generado en mockups: puede alterar marca/notas; comparar cada etiqueta con recursos aprobados.
- Notas nuevas: pueden no corresponder al café; validar antes de publicación como descripción real.
- Azul y naranja: la combinación con texto debe medirse para mantener legibilidad.
- Fuentes: disponibilidad/licencia podría afectar fidelidad; comprobar antes de sustituir.
- Fotos: recortes y dimensiones deben probarse en ambos formatos; no asumir que una captura de build verifica la composición.

## 9. Criterios iniciales de aceptación
### 9.1 Fidelidad visual y de contenido
Marca reconocible, retícula editorial continua y superficies de alto contraste. Cuatro orígenes con colores y notas de 3.1, todos de 200 ml. Envases fieles a las fotos y etiquetas sin deformaciones. Sin datos comerciales inventados.

### 9.2 Recorrido y comportamiento funcional
El orden de sección 2 se entiende visualmente. Instagram lleva a la cuenta confirmada; anclas internas, si existen, llegan a su sección. No usar enlaces ficticios como si estuvieran completos.

### 9.3 Adaptación a móvil y escritorio
Verificación visual real en ambos: sin desbordamiento horizontal, etiquetas reconocibles, lectura clara, recortes intencionales e índice reorganizado. La colección conserva su jerarquía al apilarse.

### 9.4 Accesibilidad
Comprobar contraste de texto, foco visible, navegación por teclado, estructura de encabezados y alternativas de imagen. Los orígenes no se distinguen solo por color: deben estar escritos. Si se añade movimiento, respetar preferencias de reducción. Estos son criterios por comprobar, no resultados ya obtenidos.

### 9.5 Identificación de contenido provisional y simulaciones
Mantener identificadas en los materiales de trabajo las notas provisionales y las imágenes generadas. Validar afirmaciones sensoriales antes de publicación real. No presentar mockups como fotografías documentales. No es necesario mostrar detalles técnicos de generación en la experiencia pública.

## 10. Continuación con /grill-with-docs
### 10.1 Preguntas priorizadas y decisiones que dependen de ellas
| Prioridad | Pregunta pendiente | Motivo / decisión afectada | Evidencia para cerrar |
|---|---|---|---|
| Alta antes de publicar | ¿Cuál es el enlace exacto de Instagram? | Destino de la acción principal | URL confirmada por usuario y enlace comprobado |
| Alta antes de afirmar como real | ¿Las notas de Honduras y Costa Rica describen el café disponible? | Veracidad del catálogo | Confirmación del usuario basada en producto real |
| Alta antes de cerrar tipografía | ¿Se dispone de fuente y permiso de uso web de Helvetica Hebrew? | Fidelidad tipográfica | Archivos/licencia o alternativa aprobada |
| Media antes de cerrar mockups | ¿Qué tapa corresponde a cada origen? | Fidelidad del envase; fotos muestran dos colores | Confirmación o foto del producto final |
| Media antes de añadir datos | ¿Hay información confirmada adicional de los nuevos cafés? | Evitar extender «Arábica» o inventar proceso | Ficha del usuario/proveedor |
| Media antes de cerrar copy | ¿Cuál será el texto breve de la pausa fotográfica? | Narrativa sin inventar hechos | Copy revisado por usuario |
| Baja hasta publicación | ¿Qué dominio y hosting se utilizarán? | Configuración de publicación | Destino y autorización correspondiente |

### 10.2 Comprobaciones candidatas para /prototype
No se ha solicitado ni ejecutado un prototipo. Candidatos dentro de D04 y D07:
- Apertura: comparar recorte/aislamiento de fotografía real frente a mockup fiel, alternativas autorizadas. Elegir por reconocimiento del envase, fidelidad de etiquetas e integración con el titular.
- Adaptación: comprobar la misma retícula aprobada con ajustes de recorte y proporción derivables. Criterio: lectura y reconocimiento sin desbordamiento; no son alternativas de recorrido.
- Paleta: comparar combinaciones de texto claro/oscuro dentro de los colores aprobados. Criterio: contraste verificable sin perder identidad de origen.

### 10.3 Decisiones que se conservan y condiciones para reabrirlas
Conservar D01–D09 y reabrirlas solo ante contradicción, nueva evidencia o dependencia sin resolver, explicando el motivo y consultando al usuario. La entrevista posterior profundiza pendientes; no reinicia decisiones aprobadas ni convierte supuestos en hechos. El brief no prevalece sobre correcciones posteriores ni modifica instrucciones de otras skills.

## 11. Información para la futura implementación frontend
### 11.1 Reglas y valores disponibles para tokens
Colores en 3.1 y negro; tipografías declaradas en 5.4 con dependencia abierta; bordes compartidos y ángulos rectos en módulos; espaciado y tamaños derivables. No hay medidas exactas ni breakpoints aprobados que deban inventarse como hechos.

### 11.2 Estructura, contenido e interacciones de entrada
Implementar el mapa y esquemas de sección 2 con recursos de sección 3, reglas de sección 5, base técnica de sección 6 y criterios de sección 9. La única integración acordada es Instagram. No hay recursos editados o nuevas etiquetas producidos por esta entrega.

### 11.3 Autonomía permitida y bloqueos pendientes
Aplicar D04 a los recursos derivados y 7.3 a detalles de interfaz. Fuentes, URL y veracidad de notas necesitan su evidencia antes de cerrar sus decisiones respectivas; no bloquean la comprensión del conjunto. Leer este brief junto con decisiones posteriores y cualquier especificación o prototipo que se apruebe. El siguiente paso documental es `/grill-with-docs`; no se ejecuta automáticamente.

## Actualización de paleta — 2026-09-08

Solicitud del propietario: Honduras pasa de naranja a rosado y Costa Rica a un azul más armónico. Implementación local: Honduras #EAA4BD y Costa Rica #9DAFE5, ambos con texto #111111 y tapas plateadas. Etiquetas y reflejos del vidrio adaptados con edición de imágenes. Esta actualización sustituye los colores anteriores de estos dos orígenes.

### Paleta intensa confirmada

El propietario descarta los tonos suaves y confirma Honduras rosa vibrante #F2529D y Costa Rica verde esmeralda #008F6B. Etiquetas y reflejos actualizados, ambas tapas plateadas. Sustituye la propuesta pastel anterior.

Corrección del propietario: todas las letras deben ser negras. Costa Rica se ajusta a #19B889 con tinta #111111, tanto en la interfaz como en la etiqueta; reflejos actualizados.

Actualización: el propietario vuelve a solicitar azul intenso en lugar del verde. Se aplica #496DFF con tinta negra, etiqueta y reflejos azules, conservando tapa plateada y estado Próximamente.
