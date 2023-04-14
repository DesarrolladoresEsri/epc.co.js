# Editar Una Capa de Entidades
Usted puede añadir, editar y borrar _entidades_ en una _capa de entidades_ con el _widget_ [`Editor`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html). Este widget le permite editar tanto _geometrías_ como _atributos_. Para usar el widget, necesita asegurarse de contar con las credenciales correctas para acceder y editar la capa de entidades, y que la propiedad **Enable Editing** está ajustada como `true` en la página de elemento de la capa de entidades. Puede verigicar las credenciales y ajustes en la página de propiedades del elemento en su cuenta de ArcGIS.  
En este ejercicio, usted usará el widget [`Editor`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html) para añadir, editar y borrar entidades en la capa de entidades [Institución Prestadora de Salud](https://services.arcgis.com/DDzi7vRExVRMO5AB/arcgis/rest/services/Instituci%C3%B3n_Prestadora_de_Salud/FeatureServer/0).
## Cree un nuevo pen
1. Para iniciar, use el código del [ejercicio anterior](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/6.agregar-capa/README.md).
## Agregue módulos
1. En la declaraciòn `require`, agregue el módulo [`Editor`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html).
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

    "esri/layers/FeatureLayer",
    "esri/widgets/Legend",
    /* BLOQUE DE CÓDIGO AGREGADO */
    "esri/widgets/Editor"
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

    FeatureLayer,
    Legend,
    /* BLOQUE DE CÓDIGO AGREGADO */
    Editor,
    /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
) {
```
