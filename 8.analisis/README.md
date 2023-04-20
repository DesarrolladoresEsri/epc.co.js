# Ejecutar Análisis: Calculo de ruta a instalaciones más cercanas
El cálculo de ruta a las instalaciones más cercanas es el proceso de encontrar una o más instalaciones cercanas a partir de incidentes basado en la duración del recorrido o la distancia. Una vez encuentra las instalaciones más cercanas, puede mostrar la mejor ruta e incluir el tiempo de recorrido, la distancia y las indicaciones para cada instalación en diferentes idiomas.  
Puede usar el servicio [Closest facility routing](https://developers.arcgis.com/documentation/mapping-apis-and-services/routing/closest-facility-routing/) para construir aplicaciones que, por ejemplo:  
- Encuentren el hospital más cercano al sitio de un accidente.
- Despachar las dos patrullas de policía a una escena del crimen.
- Encontrar las tres estaciones de bomberos más cercanas que puedan responder a un incendio en un tiempo de recorrido menor a 5 minutos.  

En este ejercicio, usted construirá una herramienta que le permita encontrar las 3 instalaciones más cercanas a su ubicación y mostrar el recorrido.  
## Cree un nuevo pen 
1. para iniciar, use el código del [ejercicio anterior](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/7.editar-capa/README.md).
## Agregue una barra de calcite
[Calcite Design System](https://developers.arcgis.com/calcite-design-system/) es una colección de recursos de diseño y desarrollo para crear aplicaciones cohesivas con experiencias atractivas y fáciles de usar con un esfuerzo mínimo. Este incluye un kit de UI, iconos, esquemas de colores y una librería de componentes web con elementos de UI como botones, páneles, alertas y mucho más. Agregue una barra de [Calcite Design System](https://developers.arcgis.com/calcite-design-system/) a su aplicación.
1. En el elemento `<head>` de su código **HTML**, agregue las referencias a los componentes de Calcite.
```html
<style>
    html,
    body,
    #viewDiv {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
    }
</style>
<!-- BLOQUE DE CÓDIGO AGREGADO -->
<script src="https://js.arcgis.com/calcite-components/1.2.0/calcite.esm.js" type="module"></script>
<link rel="stylesheet" href="https://js.arcgis.com/calcite-components/1.2.0/calcite.css" />
<!-- FIN DEL BLOQUE DE CÓDIGO AGREGADO -->
<link rel="stylesheet" href="https://js.arcgis.com/4.26/esri/themes/light/main.css">
<script src="https://js.arcgis.com/4.26/"></script>
```
2. Cree el esquema
Para crear el esquema, usted usará [`calcite-shell`](https://developers.arcgis.com/calcite-design-system/components/shell/), el cual organiza otros componentes en la página usando espacios. Los espacios (_slots_) son un concepto de componentes web. Puede encontrar una lista completa de componentes para espacios en la [página de referencia](https://developers.arcgis.com/calcite-design-system/components/).  
- En el elemento `<body>` de su código **HTML**, agregue el componente [`calcite-shell`](https://developers.arcgis.com/calcite-design-system/components/shell/). Ajuste el atributo [`content-behind`](https://developers.arcgis.com/calcite-design-system/components/shell/#component-api-properties-contentBehind) para que los usuarios puedan interactuar con el mapa que está debajo del [`calcite-shell`](https://developers.arcgis.com/calcite-design-system/components/shell/).
- Agregue el componente [`calcite-shell-panel`](https://developers.arcgis.com/calcite-design-system/components/shell-panel/), ubicándolo en el espacio [`panel-start`](https://developers.arcgis.com/calcite-design-system/components/shell/#component-api-slots-panel-start). Ajuste la propiedad [`detached`](https://developers.arcgis.com/calcite-design-system/components/shell-panel/#component-api-properties-detached) para que el contenido del panel aparezca sobre el mapa.
```html
<body>
    <!-- BLOQUE DE CÓDIGO AGREGADO -->
    <calcite-shell content-behind>
        <calcite-shell-panel slot="panel-start" detached>

        </calcite-shell-panel>
    <!-- FIN DEL BLOQUE DE CÓDIGO AGREGADO -->
        <div id="viewDiv"></div>
    <!-- BLOQUE DE CÓDIGO AGREGADO -->
    </calcite-shell>
    <!-- FIN DEL BLOQUE DE CÓDIGO AGREGADO -->
</body>
```
