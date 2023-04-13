# Agregar Una Capa de Entidades
Una _capa de entidades_ es un conjunto de datos alojados en un _servicio de entidades_. Cada capa de entidades contiene _entidades: con un solo tipo de _geometría_ (punto, línea o polígono) y un conjunto de _atributos_. Usted puede usar capas de entidades para almacenar, acceder y administrar grandes cantidades de datos geográficos para sus aplicaciones. Puede obtener entidades de una capa de entidades accediendo su URL.  
En este ejercicio, usará una URL para acceder personalizar y mostrar una capa de entidades alojada.
## Cree un nuevo pen
1. Para iniciar, use el código del [ejercicio anterior](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/5.rutas/README.md).
## Agregue módulos 
1. En la declaración `require`, agregue el módulo [`FeatureLayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html).
```javascript
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
    /* BLOQUE DE CÓDIGO AGREGADO */
    "esri/layers/FeatureLayer"
    /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
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
    /* BLOQUE DE CÓDIGO AGREGADO */
    FeatureLayer
    /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
) {
```
## Agregue una capa de entidades
Las _Entidades_ de tipo _Punto_ son tipicamente mostradas en una capa de entidades en la parte superior de todas las demás capas. Use la clase [`FeatureLayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html) para referenciar la capa [Institución Prestadora de Salud](https://services.arcgis.com/DDzi7vRExVRMO5AB/arcgis/rest/services/Instituci%C3%B3n_Prestadora_de_Salud/FeatureServer/0) y agregar entidades al mapa.
1. En **CodePen**, al final del código de la función principal `function`, cree una [`FeatureLayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html) y ajuste la propiedad [`url`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#url).
```javascript
const ipsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/DDzi7vRExVRMO5AB/arcgis/rest/services/Instituci%C3%B3n_Prestadora_de_Salud/FeatureServer/0"
});
```
2. Agregue la capa `ipsLayer` al mapa.
```javascript
const ipsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/DDzi7vRExVRMO5AB/arcgis/rest/services/Instituci%C3%B3n_Prestadora_de_Salud/FeatureServer/0"
});
/* BLOQUE DE CÓDIGO AGREGADO */
map.add(ipsLayer);
/* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
```
3. Ejecute la aplicación para ver la _capa_ Instituciones Prestadoras de Salud en el mapa.
