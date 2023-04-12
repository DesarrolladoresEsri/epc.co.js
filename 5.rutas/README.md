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
1. 
