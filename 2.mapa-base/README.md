# 2. Cambiar el Mapa Base
El _servicio de capas de mapas base_ proporciona un número de estilos de capas de mapas base como topográfico, calles e imágenesque pueden ser usados en mapas.
En este ejericio usted usará el widget [BasemapGallery](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapGallery.html) para seleccionar y mostrar diferentes _capas de mapa base_.
>Para mayor información, visite [Basemap Layers](https://developers.arcgis.com/documentation/mapping-apis-and-services/maps/services/basemap-layer-service/) en la guía [Mapping API and location services](https://developers.arcgis.com/documentation/mapping-apis-and-services/).
## Cree un nuevo pen
1. Para iniciar, use el código del [ejercicio anterior](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/1.mostrar-mapa/README.md).
## Agregue módulos
En la declaración `require`, agregue los módulos [BasemapGallery](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapGallery.html) y [Expand](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Expand.html).
```javascript

require([
    "esri/config", 
    "esri/Map", 
    "esri/views/MapView",
    /* BLOQUE DE CÓDIGO AGREGADO */
    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand"
    /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
], function(
    esriConfig, 
    Map, 
    MapView,
    /* BLOQUE DE CÓDIGO AGREGADO */
    BasemapGallery,
    Expand
    /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
) {
```
## Seleccione un mapa base desde la galería
1. Cree una [BasemapGallery](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapGallery.html) y ajuste el parámetro `query` en la propiedad [`source`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapGallery.html#source) para buscar el grupo de mapas base "World Basemaps for Developers".
```javascript
const view = new MapView({
    map: map,
    center: [-74.05142721441229, 4.673855997314436],
    zoom: 13, 
    container: "viewDiv"
});
/* BLOQUE DE CÓDIGO AGREGADO */
const basemapGallery = new BasemapGallery({
    view: view,
    source: {
        query: {
            title: '"World Basemaps for Developers" AND owner:esri'
        }
    }
});
/* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
```
2. Cree un [Expand](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Expand.html) y ajuste las propiedades `view`, `content` y `autoCollapse` como `view`, `basemapGallery` y `true` respectivamente.
```javascript
const basemapGallery = new BasemapGallery({
    view: view,
    source: {
        query: {
            title: '"World Basemaps for Developers" AND owner:esri'
        }
    }
});
/* BLOQUE DE CÓDIGO AGREGADO */
const bgExpand = new Expand({
    view: view,
    content: basemapGallery,
    autoCollapse: true
});
/* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
```
3. Agregue el widget [Expand](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Expand.html) en la posición `top-right` de la vista [`view`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-ui-DefaultUI.html).
```javascript
const bgExpand = new Expand({
    view: view,
    content: basemapGallery,
    autoCollapse: true
});
/* BLOQUE DE CÓDIGO AGREGADO */
view.ui.add(bgExpand, "top-right");
/* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
```

## Ejecute la aplicación
En **CodePen**, ejecute su aplicación. Ahora debería ver un widget en la parte superior derecha de su aplicación que le permite elegir entre diferentes mapas base.
-[Ver ejemplo en vivo](https://desarrolladoresesri.github.io/epc.co.js/2.mapa-base/mapa-base.html)
-[Ver código](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/2.mapa-base/mapa-base.html)
-[Ir al ejercicio siguiente: Mostrar ubicación](#)
-[Ir al ejercicio anterior: Mostrar un mapa](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/1.mostrar-mapa/README.md)
