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
Cree un widget Editor
El widget [`Editor`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html) le da la habilidad de añadir, editar y eliminar entidades de forma interactiva. El widget verificará todas las capas editables en el mapa y las dispondrá automáticamente. 
1. En **CodePen**, al final del código de la función principal `function`, cree un `editor`. Ajuste la propiedad [`view`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html#view) como `view`. Cree un arreglo [`layerInfos`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html#layerInfos) y agregue los elementos del [`formTemplate`](https://developers.arcgis.com/javascript/latest/api-reference/esri-form-FormTemplate.html). Agregue un arreglo [`expressionInfos`](https://developers.arcgis.com/javascript/latest/api-reference/esri-form-ExpressionInfo.html) al [`formTemplate`](https://developers.arcgis.com/javascript/latest/api-reference/esri-form-FormTemplate.html) con una expresión para los valores requeridos. 
```js
const editor = new Editor({
    view:view,
    layerInfos: [{
        layer: ipsLayer,
        formTemplate: {
            elements:[
                {
                    type: "field",
                    fieldName: "NOMBRE",
                    label: "Nombre",
                    requiredExpression: "requiredField"
                },
                {
                    type: "field",
                    fieldName: "NOMBRE_PRE",
                    label: "Nombre del prestador"
                },
                {
                    type: "field",
                    fieldName: "CODIGO_PRE",
                    label: "Código de habilitación del prestador"
                },
                {
                    type: "field",
                    fieldName: "DIRECCION",
                    label: "Dirección"
                },
                {
                    type: "field",
                    fieldName: "TELEFONO",
                    label: "Teléfono"
                },
                {
                    type: "field",
                    fieldName: "EMAIL",
                    label: "Correo Electrónico"
                },
                {
                    type: "field",
                    fieldName: "SEDE_PRINC",
                    label: "Es sede principal",
                    requiredExpression: "requiredField"
                }
            ],
            expressionInfos: [
                {
                    name: "requiredField",
                    expression: "true"
                }
            ]
        }
    }]
});
```
2. Cree un widget [Expand](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Expand.html) y ajustge las propiedades [`view`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html#view) como `view`, [`content`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Expand.html#content) como `editor` y [`autoCollapse`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Expand.html#autoCollapse) como `false`.
```js
const edExpand = new Expand({
    view: view,
    content: editor,
    autoCollapse: false
});
```
3. Agregue el widget [Expand](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Expand.html) en la parte inferior derecha de su aplicación.
```js
const edExpand = new Expand({
    view: view,
    content: editor,
    autoCollapse: false
});
/* BLOQUE DE CÓDIGO AGREGADO */
view.ui.add(edExpand, "bottom-right");
/* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
```

## Ejecute la aplicación
En **CodePen**, ejecute su aplicación. 
1. Haga clic en el botón Editar, ubicado en la esquina inferior derecha de su aplicación. En el widget [`Editor`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html), seleccione la capa [Institución Prestadora de Salud](https://services.arcgis.com/DDzi7vRExVRMO5AB/arcgis/rest/services/Instituci%C3%B3n_Prestadora_de_Salud/FeatureServer/0) en el grupo _Crear entidades_ y haga clic en cualquier lugar del mapa para crear una entidad IPS. Incluya los atributos de la siguiente tabla y finalice con el botón _Crear_.  

| Nombre del campo | Valor |
| ------------- | ------------- |
| Nombre | Mi IPS |
| Nombre del prestador | EPN Salud |
| Código de habilitación del prestador | 1100000000 |
| Es sede principal | Es sede principal  |

2. En el widget [`Editor`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html), haga clic en _Seleccionar_ y luego haga clic sobre la entidad que acaba de crear. Escriba los atributos que se muestran en la siguiente tabla y finalice haciendo clic en el botón _Actualizar_.  

| Nombre del campo | Valor |
| ------------- | ------------- |
| Nombre | Seguridad Global IPS |
| Teléfono | 16387272 |
| Correo Electrónico | contacto@sgips.com |

3. En el widget [`Editor`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html), haga clic en _Seleccionar_ y luego haga clic sobre la entidad que acaba de crear. Haga clic en el botón _Eliminar_.  

- [Ver ejemplo en vivo](https://desarrolladoresesri.github.io/epc.co.js//7.editar-capa/editar-capa.html)
- [Ver código](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/7.editar-capa/editar-capa.html)
- [Ir al ejercicio siguiente: Ejecutar análisis](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/8.analisis/README.md)
- [Ir al ejercicio anterior: Agregar una capa de entidades](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/6.agregar-capa/README.md)
