# Agregar Una Capa de Entidades
Una _capa de entidades_ es un conjunto de datos alojados en un _servicio de entidades_. Cada capa de entidades contiene _entidades_ con un solo tipo de _geometría_ (punto, línea o polígono) y un conjunto de _atributos_. Usted puede usar capas de entidades para almacenar, acceder y administrar grandes cantidades de datos geográficos para sus aplicaciones. Puede obtener entidades de una capa de entidades accediendo su URL.  
En este ejercicio, usará una URL para acceder personalizar y mostrar una capa de entidades alojada.
## Cree un nuevo pen
1. Para iniciar, use el código del [ejercicio anterior](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/5.rutas/README.md).
## Agregue módulos 
1. En la declaración `require`, agregue los módulos [`FeatureLayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html) y [`Legend`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Legend.html).
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
## Muestre una ventana emergente
Usted puede mostras atributs de una capa de entidades cuando los usuarios hacen clic sobre una entidad usando una ventana emergente. Las ventanas emergentes pueden configurarse para mostrar los valores de los atributos en crudo, valores calculados o contenido en diferentes formatos, incluyendo gráficas o multimedia. Los _atributos_ de las entidades también pueden mostrarse en una tabla. Use las clases [`PopupTemplate`](https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html) y [`fieldInfos`](https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html#fieldInfos) para mostrar los nombres y valores de los atributos en una tabla para la _capa de entidades_ [Institución Prestadora de Salud](https://services.arcgis.com/DDzi7vRExVRMO5AB/arcgis/rest/services/Instituci%C3%B3n_Prestadora_de_Salud/FeatureServer/0). Una de las ventajas de usar una tabla con [`fieldInfos`](https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html#fieldInfos) es la habilidad de dar formato a los valores de los campos en muchas maneras, por ejemplo, mostrar divisas o el número de lugares decimales. 
1. En la función principal `function` justo antes de crear la capa de entidades  [Institución Prestadora de Salud](https://services.arcgis.com/DDzi7vRExVRMO5AB/arcgis/rest/services/Instituci%C3%B3n_Prestadora_de_Salud/FeatureServer/0), cree un `popupIPS`. En la propiedad [`content`](https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html#content) ajuste `type` como `fields` y defina el arreglo [`fieldInfos`](https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html#fieldInfos).
```javascript
/* BLOQUE DE CÓDIGO AGREGADO */
const popupIPS = {
    title: "{NOMBRE}",
    content:[{
        type: "fields",
        fieldInfos: [
            {
                fieldName: "NOMBRE_PRE",
                label: "Nombre del prestador"
            },
            {
                fieldName: "CODIGO_PRE",
                label: "Código de habilitación del prestador"
            },
            {
                fieldName: "DIRECCION",
                label: "Dirección"
            },
            {
                fieldName: "TELEFONO",
                label: "Teléfono"
            },
            {
                fieldName: "EMAIL",
                label: "Correo Electrónico"
            }
        ]
    }],
    lastEditInfoEnabled: false
}
/* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
const ipsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/DDzi7vRExVRMO5AB/arcgis/rest/services/Instituci%C3%B3n_Prestadora_de_Salud/FeatureServer/0",
    renderer: ipsRenderer
});
```
2. Agregue y ajuste las propiedades [`outfields`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#outFields) y [`popupTemplate`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#popupTemplate) en la capa de entidades. [`FeatureLayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html) hará un [autocast](https://developers.arcgis.com/javascript/latest/guide/programming-patterns/#autocasting) de [`popupTemplate`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#popupTemplate) para crear una instancia de clase del objeto. 
```javascript
const ipsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/DDzi7vRExVRMO5AB/arcgis/rest/services/Instituci%C3%B3n_Prestadora_de_Salud/FeatureServer/0",
    /* BLOQUE DE CÓDIGO AGREGADO */
    outFields: ["NOMBRE","NOMBRE_PRE", "CODIGO_PRE", "DIRECCION", "TELEFONO", "EMAIL"],
    popupTemplate: popupIPS,
    /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
    renderer: ipsRenderer
});
```
## Acérquese a una capa de entidades _(opcional)_
El método [queryExtent()](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryExtent) de la clase [FeatureLayer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html) ejecuta una [Query](https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-Query.html) contra el servicio de entidades y retorna el [Extent](https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Extent.html) de las entidades que satisfacen la consulta. Si no se especifican parámetros, entonces el extent y al recuento de todas las entidades que satisfacen la configuración y filtros de la capa son retornados.
> Para consultar la extensión de entidades o gráficos disponibles o visibles en la vista del lado del cliente en vez de hacer una consulta del lado del servidor, debe usar el método [FeatureLayerView.queryExtent()](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#queryExtent).
1. En la función principal `function`, justo despues de agregar la capa de entidades [Institución Prestadora de Salud](https://services.arcgis.com/DDzi7vRExVRMO5AB/arcgis/rest/services/Instituci%C3%B3n_Prestadora_de_Salud/FeatureServer/0) al mapa, consulte el extent de todas las entidades de la capa.
```javascript
map.add(ipsLayer);
/* BLOQUE DE CÓDIGO AGREGADO */
ipsLayer.queryExtent().then(function(result){
    
});
/* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
```
2. Use el método [`goTo()`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#goTo) de [`view`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html) para acercarse a la capa de entidades usando el resultado de la consulta. 
```javascript
map.add(ipsLayer);
                
ipsLayer.queryExtent().then(function(result){
    /* BLOQUE DE CÓDIGO AGREGADO */
    view.goTo(result.extent);
    /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
});
```
## Ejecute la aplicación
En **CodePen**, ejecute su aplicación. El mapa deberá mostrar la capa de entidades [Institución Prestadora de Salud](https://services.arcgis.com/DDzi7vRExVRMO5AB/arcgis/rest/services/Instituci%C3%B3n_Prestadora_de_Salud/FeatureServer/0) personalizada, el widget [Legend](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Legend.html) en la parte inferior ezquierda del mapa. Haga clic en alguna de las entidades de la capa para ver la ventana emergente. 
- [Ver ejemplo en vivo](https://desarrolladoresesri.github.io/epc.co.js/6.agregar-capa/agregar-capa.html)
- [Ver código](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/6.agregar-capa/agregar-capa.html)
- [Ir al ejercicio siguiente: ]()
- [Ir al ejercicio anterior: Calcular rutas](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/5.rutas/README.md)
