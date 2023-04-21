# Ejecutar Análisis: Calculo de ruta a instalaciones más cercanas
El cálculo de ruta a las instalaciones más cercanas es el proceso de encontrar una o más instalaciones cercanas a partir de incidentes basado en la duración del recorrido o la distancia. Una vez encuentra las instalaciones más cercanas, puede mostrar la mejor ruta e incluir el tiempo de recorrido, la distancia y las indicaciones para cada instalación en diferentes idiomas.  
Puede usar el servicio [Closest facility routing](https://developers.arcgis.com/documentation/mapping-apis-and-services/routing/closest-facility-routing/) para construir aplicaciones que, por ejemplo:  
- Encuentren el hospital más cercano al sitio de un accidente.
- Despachar las dos patrullas de policía a una escena del crimen.
- Encontrar las tres estaciones de bomberos más cercanas que puedan responder a un incendio en un tiempo de recorrido menor a 5 minutos.  

En este ejercicio, usted construirá una herramienta que le permita encontrar las 3 instalaciones más cercanas a su ubicación y mostrar el recorrido.  
## Cree un nuevo pen 
1. para iniciar, use el código del [ejercicio anterior](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/7.editar-capa/README.md).
## Agregue una barra de herramientas  calcite
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
2. Cree el esquema. Para crear el esquema, usted usará [`calcite-shell`](https://developers.arcgis.com/calcite-design-system/components/shell/), el cual organiza otros componentes en la página usando espacios. Los espacios (_slots_) son un concepto de componentes web. Puede encontrar una lista completa de componentes para espacios en la [página de referencia](https://developers.arcgis.com/calcite-design-system/components/).  
- En el elemento `<body>` de su código **HTML**, agregue el componente [`calcite-shell`](https://developers.arcgis.com/calcite-design-system/components/shell/). Ajuste el atributo [`content-behind`](https://developers.arcgis.com/calcite-design-system/components/shell/#component-api-properties-contentBehind) para que los usuarios puedan interactuar con el mapa que está debajo del [`calcite-shell`](https://developers.arcgis.com/calcite-design-system/components/shell/).
- Agregue un elemento `h3` y ubíquelo en el espacio [`header`](https://developers.arcgis.com/calcite-design-system/components/shell/#component-api-slots-header).
- Agregue el componente [`calcite-shell-panel`](https://developers.arcgis.com/calcite-design-system/components/shell-panel/), ubicándolo en el espacio [`panel-start`](https://developers.arcgis.com/calcite-design-system/components/shell/#component-api-slots-panel-start). Ajuste la propiedad [`detached`](https://developers.arcgis.com/calcite-design-system/components/shell-panel/#component-api-properties-detached) para que el contenido del panel aparezca sobre el mapa.
```html
<body>
    <!-- BLOQUE DE CÓDIGO AGREGADO -->
    <calcite-shell content-behind>
        <h3 id="header-title" slot="header">
            Introducción al desarrollo de Alicaciones Web
        </h3>
        <calcite-shell-panel slot="panel-start" detached>

        </calcite-shell-panel>
    <!-- FIN DEL BLOQUE DE CÓDIGO AGREGADO -->
        <div id="viewDiv"></div>
    <!-- BLOQUE DE CÓDIGO AGREGADO -->
    </calcite-shell>
    <!-- FIN DEL BLOQUE DE CÓDIGO AGREGADO -->
</body>
```
3. Agregue los componentes usados para acceder a las herramientas. Los componentes del [`calcite-panel`](https://developers.arcgis.com/calcite-design-system/components/panel/) tendrán contenedores para su herramienta. El panel iniciara oculto y los usuarios pueden mostrarlo usando la [`calcite-action`](https://developers.arcgis.com/calcite-design-system/components/action/) correspondiente. Agregue un componente [`calcite-action-bar`](https://developers.arcgis.com/calcite-design-system/components/action-bar/) y agreguela al espacio [`action-bar`](https://developers.arcgis.com/calcite-design-system/components/shell-panel/#component-api-slots-action-bar) del [`calcite-shell-panel`](https://developers.arcgis.com/calcite-design-system/components/shell-panel/). Agregue un componente [`calcite-action`](https://developers.arcgis.com/calcite-design-system/components/action/), el cual abrirá el panel cuando se haga clic sobre él. Ajuste el atributo [`icon`](https://developers.arcgis.com/calcite-design-system/components/action/#component-api-properties-icon) como `analysis`. Puede ver más opciones en [Iconos de Calcite](https://developers.arcgis.com/calcite-design-system/icons/). Ajuste el atributo [`text`](https://developers.arcgis.com/calcite-design-system/components/action/#component-api-properties-text), que se mostrará cuando se expanda la barra de acciones. Ajuste el atributo global `data-action-id`, el cual se usará para hacer las acciones interactivas. 
```html
<body>
    <calcite-shell content-behind>
        <h3 id="header-title" slot="header">
            Introducción al desarrollo de Alicaciones Web
        </h3>
        <calcite-shell-panel slot="panel-start" detached>
            <!-- BLOQUE DE CÓDIGO AGREGADO -->
            <calcite-action-bar slot="action-bar">
                <calcite-action data-action-id="analysis" icon="analysis" text="Análisis"></calcite-action>
            </calcite-action-bar>
            <!-- FIN DEL BLOQUE DE CÓDIGO AGREGADO -->
        </calcite-shell-panel>
        <div id="viewDiv"></div>
    </calcite-shell>
</body>
```
4. Debajo de la barra de acciones, agregue un componente [`calcite-panel`](https://developers.arcgis.com/calcite-design-system/components/panel/). Agregue componentes [`calcite-block`](https://developers.arcgis.com/calcite-design-system/components/block/) con instrucciones de uso de su herramienta. Agregue un elemento `<div>` para agregar un widget de búsqueda, que se usará para definir el punto de inicio de su herramienta. Agregue un [`calcite-button`](https://developers.arcgis.com/calcite-design-system/components/button/) que le permitirá a sus usuarios ejecutar su herramienta. 
```html
<calcite-shell-panel slot="panel-start" detached>
    <calcite-action-bar slot="action-bar">
        <calcite-action data-action-id="analysis" icon="analysis" text="Análisis"></calcite-action>
    </calcite-action-bar>
    <!-- BLOQUE DE CÓDIGO AGREGADO -->
    <calcite-panel heading="Análisis" data-panel-id="analysis" hidden>
        <calcite-block heading="Instalaciones cercanas" description="El cálculo de ruta de instalaciones cercanas le permite encontrar una o más instalaciones cercanas a partir de un incidente. Use el buscador para definir un punto de partida."></calcite-block>

        <div id="analysis-content" style="width: auto;"></div>

        <calcite-block heading="Calcular" description="Una vez haya definido el punto de partida, haga clic en Ejecutar para encontrar las IPC más cercanas y ver la ruta.">

        </calcite-block>

        <calcite-button data-action-id="perform-analysis" icon-start="find-path" slot="footer-actions" disabled="true">
            Ejecutar
        </calcite-button>
    </calcite-panel>
    <!-- FIN DEL BLOQUE DE CÓDIGO AGREGADO -->
</calcite-shell-panel>
```
5. Al final del código JavaScript, en la función principal `function`, espere a que la vista `view` termina de cargar asíncronamente. Dentro de la función `view.when()`, inicialice una variable para almacenar el nombre del panel que está abierto actualmente. Esto le permitirá agregar más herramientas o widgets con facilidad a la barra en el futuro. Cree una función que se ejecutará cuando cuando se haga clic sobre una acción. La función cerrará el panel activo y abrirá el panel correspondiente a la acción sobre la que se haga clic. Cree un `addEventListener` en la [`calcite-action-bar`](https://developers.arcgis.com/calcite-design-system/components/action-bar/).
```js
view.when(() => {
    let activeWidget;

    const handleActionBarClick = ({target}) => {
        if (target.tagName !== "CALCITE-ACTION") {
            return;
        }

        if (activeWidget) {
            document.querySelector(`[data-action-id=${activeWidget}]`).active = false;
            document.querySelector(`[data-panel-id=${activeWidget}]`).hidden = true;
        }

        const nextWidget = target.dataset.actionId;
        if (nextWidget !== activeWidget) {
            document.querySelector(`[data-action-id=${nextWidget}]`).active = true;
            document.querySelector(`[data-panel-id=${nextWidget}]`).hidden = false;
            activeWidget = nextWidget;
        } else {
            activeWidget = null;
        }
    };

    document.querySelector("calcite-action-bar").addEventListener("click", handleActionBarClick);
});
```
6. Al final de la función `view.when()`, agregue un `addEventListener` en el [`calciteActionBarToggle`](https://developers.arcgis.com/calcite-design-system/components/action-bar/#component-api-events-calciteActionBarToggle) para añadir o remover `padding` a la vista cuando se expando o colapsa la barra. 
```js
view.when(() => {
    let activeWidget;

    const handleActionBarClick = ({target}) => {
        if (target.tagName !== "CALCITE-ACTION") {
            return;
        }

        if (activeWidget) {
            document.querySelector(`[data-action-id=${activeWidget}]`).active = false;
            document.querySelector(`[data-panel-id=${activeWidget}]`).hidden = true;
        }

        const nextWidget = target.dataset.actionId;
        if (nextWidget !== activeWidget) {
            document.querySelector(`[data-action-id=${nextWidget}]`).active = true;
            document.querySelector(`[data-panel-id=${nextWidget}]`).hidden = false;
            activeWidget = nextWidget;
        } else {
            activeWidget = null;
        }
    };

    document.querySelector("calcite-action-bar").addEventListener("click", handleActionBarClick);

    /* BLOQUE DE CÓDIGO AGREGADO */
    let actionBarExpanded = false;

    document.addEventListener("calciteActionBarToggle", event => {
        actionBarExpanded = !actionBarExpanded;
        view.padding = {
            left: actionBarExpanded ? 135 : 45
        }
    });
    /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
});
```
7. Agregue la propiedad [`padding`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#padding) a la vista `view`. Con esto, dará espacio a los elementos de Calcite que se han agregado. 
```js
const view = new MapView({
    map: map,
    center: [-74.05142721441229, 4.673855997314436],
    zoom: 13, 
    container: "viewDiv",
    /* BLOQUE DE CÓDIGO AGREGADO */
    padding:{
        left: 50
    }
    /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
});
```
8. Dentro del elemento `<head>`, en el elemento `<style>` de su código **HTML**, agregue código **CSS** adicional para mejorar la interfaz de usuario. 
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
    /* BLOQUE DE CÓDIGO AGREGADO */
    body {
        display: flex;
    }

    #header-title {
        margin-left: 1rem;
        margin-right: 1rem;
    }
    /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
</style>
```
## Agregue módulos
1. En la declaración `require`, agregue los módulos [`FeatureSet`](https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-FeatureSet.html),  [`closestFacility`](https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-closestFacility.html), [`ClosestFacilityParameters`](https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-ClosestFacilityParameters.html) y [`GraphicsLayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html).
```js
require([
    "esri/config", 
    "esri/Map", 
    "esri/views/MapView",

    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",

    "esri/widgets/Locate",

    "esri/widgets/Search",

    "esri/widgets/Directions",
    "esri/layers/RouteLayer",

    "esri/layers/FeatureLayer",
    "esri/widgets/Legend",

    "esri/widgets/Editor",

    "esri/rest/support/FeatureSet",
    "esri/rest/closestFacility",
    "esri/rest/support/ClosestFacilityParameters",
    "esri/layers/GraphicsLayer",
], function(
    esriConfig, 
    Map, 
    MapView,

    BasemapGallery,
    Expand,

    Locate,

    Search,

    Directions,
    RouteLayer,

    FeatureLayer,
    Legend,

    Editor,
    /* BLOQUE DE CÓDIGO AGREGADO */
    FeatureSet,
    closestFacility, 
    ClosestFacilityParameters,
    GraphicsLayer
    /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
) {
```
## Agregue un widget Search al panel
Este segundo widget [`Search`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html) le permitirá establecer el punto de inicio para calcular rutas hacia las instalaciones más cercanas de la capa [Institución Prestadora de Salud](https://services.arcgis.com/DDzi7vRExVRMO5AB/arcgis/rest/services/Instituci%C3%B3n_Prestadora_de_Salud/FeatureServer/0).
1. Al final del código en la función principal `function`, cree un widget [`Search`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html). Ajuste la propiedad [`container`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html#container) como `analysis-content`.
```js
const anSearch = new Search({
    container: "analysis-content"
});
```
## Agregue una capa de gráficos
Una capa de gráficos es un contenedor para gráficos. Es usada con una vista de mapa para mostrar gráficos en un mapa. Puede añadir más de una capa de gráficos a una vista de mapa. Cree una capa de gráficos para mostrar las rutas resultado de su análisis. 
1. Cree una [`GraphicsLayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html) y agréguela al mapa. 
```js
const anSearch = new Search({
    container: "analysis-content"
});
/* BLOQUE DE CÓDIGO AGREGADO */
const cfRouteLayer = new GraphicsLayer();
map.add(cfRouteLayer, 0);
/* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
```
2. Cree una función `setCFRouteSymbol` para definir el símbolo de las rutas basado en un índice.
```js
function setCFRouteSymbol(index){
    if (index == 0){
        return {
            type: "simple-line",
            color: [237, 81, 81, 0.75],
            width: "5",
        }
    } else if (index == 1) {
        return {
            type: "simple-line",
            color: [20, 158, 206, 0.75],
            width: "5",
        }
    } else if (index == 2) {
            return {
            type: "simple-line",
            color: [167, 198, 54, 0.75],
            width: "5",
        }
    } else {
        return {
            type: "simple-line",
            color: [60, 175, 153, 0.75],
            width: "5",
        }
    }
}
```
## Agregue eventos al widget Search
1. Al final de la función principal `function`, cree una variable para almacenar el punto de partida del análisis.
```js
let startPoint;
```
2. Agregue el evento [`search-complete`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html#event-search-complete) al widget [`Search`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html) del panel. Si hay uno o más resultados, habilite el botón _Ejecutar_ y asigne el resultado de la búsqueda a la variable `startPoint`.
```js
let startPoint;
/* BLOQUE DE CÓDIGO AGREGADO */
anSearch.on("search-complete", function(event){
    if (event.numResults > 0){
        document.querySelector(`[data-action-id=perform-analysis]`).disabled = false;
        startPoint = event.results[0].results[0].feature;
    }     
});
/* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
```
3. Agregue el evento [`search-clear`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html#event-search-clear) al widget [`Search`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html) del panel. Remueva todos los gráficos de la capa de gráficos y deshabilite el botón _Ejecutar_.
```js
anSearch.on("search-complete", function(event){
    if (event.numResults > 0){
        document.querySelector(`[data-action-id=perform-analysis]`).disabled = false;
        startPoint = event.results[0].results[0].feature;
    }     
});
/* BLOQUE DE CÓDIGO AGREGADO */
anSearch.on("search-clear", function(event){
    cfRouteLayer.removeAll();
    document.querySelector(`[data-action-id=perform-analysis]`).disabled = true;
});
/* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
```
## Resuelva la búsqueda de instalaciones cercanas
1. Inicialice una variable con la [URL](https://developers.arcgis.com/documentation/mapping-apis-and-services/routing/closest-facility-routing/#url-requests) del servicio de cálculo de ruta de instalaciones cercanas. 
```js
anSearch.on("search-clear", function(event){
    cfRouteLayer.removeAll();
    document.querySelector(`[data-action-id=perform-analysis]`).disabled = true;
});
/* BLOQUE DE CÓDIGO AGREGADO */
const closestFacilityUrl = 'https://route-api.arcgis.com/arcgis/rest/services/World/ClosestFacility/NAServer/ClosestFacility_World/solveClosestFacility';
/* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
```
2. Cree una función `findClosestFacility`. Dentro de la función, remueva todos los gráficos de la capa de gráficos.
```js
const closestFacilityUrl = 'https://route-api.arcgis.com/arcgis/rest/services/World/ClosestFacility/NAServer/ClosestFacility_World/solveClosestFacility';
/* BLOQUE DE CÓDIGO AGREGADO */
function findClosestFacility(){
    cfRouteLayer.removeAll();
    
}
/* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
```
