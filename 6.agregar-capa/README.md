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
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend"
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
    FeatureLayer,
    Legend
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
## Edite el estilo de la capa
Las _capas de Entidades_ pueden ser personalizadas del lado del cliente por medio de un [renderer](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-Renderer.html). Los renderizadores son los responsables de usar los valores de los atributos para aplicar el símbolo apropiado a cada _entidad_ cuando la capa se dibuja. Los renderizadores pueden ser usados con variables visuales y expresiones para crear visualizaciones más complejas orientadas a los datos.  
Puede usar renderizadores para personalizar los datos de una capa de entidades por valores de atributo únicos. Use las clases [`UniqueValueRenderer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-UniqueValueRenderer.html) y [`PictureMarkerSymbol`](https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-PictureMarkerSymbol.html) para editar las entidades de punto con diferentes símbolos, basados en el atributo _SEDE_PRINC_ en la capa de entidades [Institución Prestadora de Salud](https://services.arcgis.com/DDzi7vRExVRMO5AB/arcgis/rest/services/Instituci%C3%B3n_Prestadora_de_Salud/FeatureServer/0).
1. En la función principal `function`, justo antes de crear la capa de entidades [Institución Prestadora de Salud](https://services.arcgis.com/DDzi7vRExVRMO5AB/arcgis/rest/services/Instituci%C3%B3n_Prestadora_de_Salud/FeatureServer/0), cree una función `createPictureMarkerSymbol` con `value` y `url` como parámetros. La función retornará un símbolo de tipo `picture-marker` para cada tipo de IPS.
```javascript
/* BLOQUE DE CÓDIGO AGREGADO */
function createPictureMarkerSymbol(value, url){
    return {
        value:value,
        symbol: {
            type: "picture-marker",
            url: url,
            width: "15px",
            height: "15px"
        }
    }
}
/* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
const ipsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/DDzi7vRExVRMO5AB/arcgis/rest/services/Instituci%C3%B3n_Prestadora_de_Salud/FeatureServer/0",
});
map.add(ipsLayer);
```
2. Cree un renderizador con el nombre `ipsRenderer` y defínalo como [`unique-value`](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-UniqueValueRenderer.html). Ajuste la propiedad [`field`](https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-UniqueValueRenderer.html#field) como `SEDE_PRINC`. En el arreglo [`uniqueValueInfos`](), agregue las URL de imágenes únicas para cada tipo de IPS.
```javascript
function createPictureMarkerSymbol(value, url){
    return {
        value:value,
        symbol: {
            type: "picture-marker",
            url: url,
            width: "15px",
            height: "15px"
        }
    }
}
/* BLOQUE DE CÓDIGO AGREGADO */
const ipsRenderer = {
    type: "unique-value",
    field: "SEDE_PRINC",
    uniqueValueInfos: [
        createPictureMarkerSymbol("SI", "https://static.arcgis.com/images/Symbols/Government/Hospital.png"),
        createPictureMarkerSymbol("NO", "https://static.arcgis.com/images/Symbols/Government/Hospital-and-Clinics.png")
    ]
};
/* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
```
3. Agregue la propiedad [`renderer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#renderer) a la capa de entidades [Institución Prestadora de Salud](https://services.arcgis.com/DDzi7vRExVRMO5AB/arcgis/rest/services/Instituci%C3%B3n_Prestadora_de_Salud/FeatureServer/0). La capa de entidades hará un [autocast](https://developers.arcgis.com/javascript/latest/programming-patterns/#autocasting) de `renderer` y creará instancias del objeto. 
```javascript
const ipsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/DDzi7vRExVRMO5AB/arcgis/rest/services/Instituci%C3%B3n_Prestadora_de_Salud/FeatureServer/0",
    /* BLOQUE DE CÓDIGO AGREGADO */
    renderer: ipsRenderer
    /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
});

map.add(ipsLayer);
```
4. Ejecute la aplicación para ver los cambios en la capa [Institución Prestadora de Salud](https://services.arcgis.com/DDzi7vRExVRMO5AB/arcgis/rest/services/Instituci%C3%B3n_Prestadora_de_Salud/FeatureServer/0).
## Agregue una leyenda
El widget [Legend](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Legend.html) describe los símbolos usados para representar capas en un mapa. Todos los simbolos y textos usados en este widget son configurados en el renderizador de la capa. La leyenda solo mostrará las capas y subcapas que sean visibles en la vista. 
1. Al final del código, en la función principal `function`, cree un widget [`Legend`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Legend.html). Ajuste la propiedad [`view`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html#view) como `view`. Agregue la información de la capa de entidades [Institución Prestadora de Salud](https://services.arcgis.com/DDzi7vRExVRMO5AB/arcgis/rest/services/Instituci%C3%B3n_Prestadora_de_Salud/FeatureServer/0) al arreglo [`layerInfos`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Legend.html#layerInfos).
```javascript
const ipsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/DDzi7vRExVRMO5AB/arcgis/rest/services/Instituci%C3%B3n_Prestadora_de_Salud/FeatureServer/0",
    renderer: ipsRenderer
});

map.add(ipsLayer);
/* BLOQUE DE CÓDIGO AGREGADO */
const legend = new Legend({
    view: view,
    layerInfos: [
        {
            layer: ipsLayer,
            title: "Institución Prestadora de Salud"
        }
    ]
});
/* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
```
