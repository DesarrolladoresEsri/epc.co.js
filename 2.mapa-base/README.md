# 2. Cambiar el Mapa Base
El _servicio de capas de mapas base_ proporciona un número de estilos de capas de mapas base como topográfico, calles e imágenesque pueden ser usados en mapas.
En este ejericio usted usará el widget [BasemapGallery](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapGallery.html) para seleccionar y mostrar diferentes _capas de mapa base_.
>Para mayor información, visite [Basemap Layers](https://developers.arcgis.com/documentation/mapping-apis-and-services/maps/services/basemap-layer-service/) en la guía [Mapping API and location services](https://developers.arcgis.com/documentation/mapping-apis-and-services/).
## Cree un nuevo pen
1. Para iniciar, use el código del [ejercicio anterior](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/1.mostrar-mapa/README.md).
## Agregue módulos
En la declaración `require`, agregue el módulo [BasemapGallery](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapGallery.html).
```javascript

require([
    "esri/config", 
    "esri/Map", 
    "esri/views/MapView",
    /* BLOQUE DE CÓDIGO AGREGADO */
    "esri/widgets/BasemapGallery"
    /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
], function(
    esriConfig, 
    Map, 
    MapView,
    /* BLOQUE DE CÓDIGO AGREGADO */
    BasemapGallery
    /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
) {
```
