# Calcular rutas
El cálculo de rutas es el proceso de encontrar el camino desde un _origen_ hasta un _destino_ en una red de calles. Puede usar el _servicio de Cálculo de Rutas_ para encontrar rutas, dar indicaciones de conducción, calcular tiempos de conducción y resolver problemas complejos de cálculo de rutas con múltiples vehículos. El widget [`Directions`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Directions.html) facilita la tarea de calcular indicaciones entre dos o más ubicaciones usando una [RouteLayer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-RouteLayer.html). Las indicaciones resultantes son mostradas con instrucciones detalladas giro a giro.  
En este ejercicio, aprenderá a usar el widget [`Directions`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Directions.html) para calcular la ruta y ver las indicaciones de conducción entre dos o más ubicaciones. 
## Cree un nuevo pen
1. Para iniciar, use el código del [ejercicio anterior](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/4.buscar-direccion/README.md).
## Agregue módulos
1. En la declaración `require`, agregue los módulos [`Directions`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Directions.html) y [RouteLayer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-RouteLayer.html).
```javascript
require([
    "esri/config", 
    "esri/Map", 
    "esri/views/MapView",

    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",

    "esri/widgets/Locate",

    "esri/widgets/Search",
    /* BLOQUE DE CÓDIGO AGREGADO */
    "esri/widgets/Directions",
    "esri/layers/RouteLayer"
    /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
], function(
    esriConfig, 
    Map, 
    MapView,

    BasemapGallery,
    Expand,

    Locate,

    Search,
    /* BLOQUE DE CÓDIGO AGREGADO */
    Directions,
    RouteLayer
    /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
) {
```
## Agregue el widget Directions
El widget [`Directions`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Directions.html) proporciona una forma de calcular indicaciones de conducción, entre dos o más ubicaciones con una [RouteLayer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-RouteLayer.html), usando diferentes servicios de Análisis de Redes de Rutas. Este widget genera una ruta encontrando el camino de menor costo entre varios puntos usando un servicio de calculo de rutas específico. Las indicaciones de conducción resultantes son mostradas con instrucciones detalladas giro a giro. 
1. Al final del código en la función principal `function`, cree una [RouteLayer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-RouteLayer.html) y agréguela al mapa.
```javascript
const routeLayer = new RouteLayer();
map.layers.add(routeLayer);
```
2. Cree un widget [`Directions`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Directions.html). Ajuste las propiedades [`view`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html#view) como `view` y `layer` como `routeLayer`.
```javascript
const routeLayer = new RouteLayer();
map.layers.add(routeLayer);
/* BLOQUE DE CÓDIGO AGREGADO */
const directions = new Directions({
    view: view,
    layer: routeLayer
});
/* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
```
3. Cree un widget [`Expand`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Expand.html). Ajuste las propiedades [`view`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html#view) como `view`, `content` como `directions` y `autoCollapse` como `false`. Agregue el widget [`Expand`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Expand.html) en la esquina superior derecha de la vista.
```javascript
const directions = new Directions({
    view: view,
    layer: routeLayer
});
/* BLOQUE DE CÓDIGO AGREGADO */
const rtExpand = new Expand({
    view: view,
    content: directions,
    autoCollapse: false
});
view.ui.add(rtExpand, "top-right");
/* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
```
## Ejecute la aplicación
En **CodePen** ejecute su aplicación. Haga clic en el botón de direcciones en la esquina superior derecha del mapa para abrir la interfaz del widget [`Directions`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Directions.html). Puede usar las cajas de texto para seleccionar dos ubicaciones diferentes para calcular una ruta.
- [Ver ejemplo en vivo](https://desarrolladoresesri.github.io/epc.co.js/5.rutas/rutas.html)
- [Ver código](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/5.rutas/rutas.html)
- [Ir al ejercicio siguiente: Agregar Capas](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/6.agregar-capa/README.md)
- [Ir al ejercicio anterior: Buscar una dirección](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/4.buscar-direccion/README.md)
