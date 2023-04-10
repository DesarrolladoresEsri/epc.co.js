# 1. Mostrar un Mapa
Un mapa contiene capas de datos Geográficos. Un mapa contiene una capa de mapa base y, opcionalmente, una o más capas da datos. Usted puede mostrar un área específica de un mapa usando una vista de mapa y ajustando la ubicación y el nivel de zoom. En este ejercicio aprenderá cómo crear y mostrar un mapa de un área de Bogotá, Colombia usando la capa de mapa base topográfico. El mapa y el código de este ejercicio será usado como punto de partida para los siguientes puntos.
## Prerrequisitos
> Para este ejercicio necesita una cuenta gratuita de [desarrollador de ArcGIS](https://developers.arcgis.com/sign-up/) para acceder a su tablero de control de desarrollador y las API keys. Es necesario crear y copiar la API key para acceder a los servicios usados durante el ejercicio.
## Cree un nuevo pen
1. Ingrese a [CodePen](https://codepen.io/pen/?editors=1000) para crear un nuevo pen para su aplicación de mapa. 
## Agregue el código HTML
Defina una página HTML para crear un mapa que sea del ancho y alto total de la ventana del navegador. 
1. En **CodePen** > **HTML**, agregue código HTML y CSS para crear una página con un elemento `viewDiv`. El `viewDiv` es el elemento que muestra el mapa y su CSS reajusta las configuraciones de cualquier navegador web de manera que este pueda consumir el ancho y alto completo de la ventana.
La etiqueta `<!DOCTYPE html>` no es necesaria en CodePen. Si está usando un editor diferente o ejecutando la página en un servidor local, asegúrese de añadir esta etiqueta al inicio de su página HTML.
```html
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
        <title>ArcGIS Maps SDK for JavaScript Tutorials: Display a map</title>

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

    </head>
    <body>
        <div id="viewDiv"></div>
    </body>
</html>
```
## Referencie la API
En la etiqueta `head`, agregue referencias al archivo CSS y la librería JS.
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
<link rel="stylesheet" href="https://js.arcgis.com/4.26/esri/themes/light/main.css">
<script src="https://js.arcgis.com/4.26/"></script>
<!-- FIN DEL BLOQUE DE CÓDIGO AGREGADO -->
```
## Agregue módulos
El _ArcGIS Maps SDK for JavaScript_ está disponible como [módulos AMD](https://dojotoolkit.org/documentation/tutorials/1.10/modules/index.html) y [módulos ES](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), pero este ejercicio está basado en módulos AMD. La función AMD `require` usa referencias para determinar cuales módulos serán cargados -por ejemplo, puede especificar `esri/Map` para cargar el módulo [Map](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html). Después de que los módulos se han cargado, son pasados como parámetros, (ej. `Map`) a la función callback donde pueden ser usados en su aplicación. Es importante mantener las referencias del módulo y los parámetros del callback en el mismo orden. Para aprender más acerca de los diferentes tipos de módulos, visite la guía [Introduction to Tooling](https://developers.arcgis.com/javascript/latest/tooling-intro/).
1. En la etiqueta `<head>`, agregue una etiqueta `<script>`y una declaración `require` para cargar los módulos [`Map`](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html) y [`MapView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html). Tambien puede agregar el código JavaScript al panel **CodePen** > **JS** en lugar del panel **HTML**. Si hace esto, remueva la etiqueta `<script>`. 
```html
<link rel="stylesheet" href="https://js.arcgis.com/4.26/esri/themes/light/main.css">
<script src="https://js.arcgis.com/4.26/"></script>
<!-- BLOQUE DE CÓDIGO AGREGADO -->
<script>
    require(["esri/config", "esri/Map", "esri/views/MapView"], function(esriConfig, Map, MapView) {

    });
</script>
<!-- FIN DEL BLOQUE DE CÓDIGO AGREGADO -->
```
## Consiga una API key
Se requiere una API key para acceder a los [servicios de ArcGIS](https://developers.arcgis.com/documentation/mapping-apis-and-services/services/).
1. Vaya a su [tablero de control de desarrollador](https://developers.arcgis.com/dashboard/) para conseguir una _API key_
2. Copie su API key para usarla en el siguiente paso. 
## Cree un mapa
Use un [`Map`](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html) para ajustar la capa de mapa base y aplicar su _API Key_
1. Regrese a **CodePen**.
2. En la declaración `require`, cree un nuevo [`Map`](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html) y ajuste la propiedad [`basemap`](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap) como `arcgis-topographic`. Para habilitar el acceso al [servicio de Mapas base](https://developers.arcgis.com/documentation/mapping-apis-and-services/maps/services/basemap-layer-service/), ajuste la propiedad `apiKey`. 
>Aprenda más sobre cómo un mapa y una vista de mapa funcionan en la guía [Mapping and location services](https://developers.arcgis.com/documentation/mapping-apis-and-services/).
```html
<script>
    require(["esri/config", "esri/Map", "esri/views/MapView"], function(esriConfig, Map, MapView) {
        /* BLOQUE DE CÓDIGO AGREGADO */
        esriConfig.apiKey = "SU_API_KEY";

        const map = new Map({
            basemap: "arcgis-topographic"
        });
        /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
    });
</script>
```
## Cree una vista de mapa
Use una [`MapView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html) y ajuste la propiedad [`map`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#map). Para centrar la vista de mapa, ajuste la propiedad [`center`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#center) a `-74.05142721441229, 4.673855997314436` y la propiedad [`zoom`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#zoom) a `13`. Ajuste la propiedad [`container`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#container) a `viewDiv` para mostrar los contenidos del mapa. 
La [`MapView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html) muestra los contenidos del mapa. Las propiedades [`center`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#center) y [`zoom`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#zoom) determinan la _ubicación_ del mapa y el nivel de zoom al cual es mostrado una vez carga. 
La propiedad [`zoom`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#zoom) ajusta el nivel de zoom del mapa. Los valores típicamente varían entre 0 y 20: 0 es lo más lejano desde la superficie de la tierra y 20 lo más cercano. Algunos mapas base soportan niveles adicionales de zoom por encima de 23. 
La [`MapView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html) también soporta un numero de eventos de toque como `click` y `double-click`. Puede usar esos eventos para cambiar la posición del mapa o para encontrar _entidades_ en las _capas_.
>Aprenda más sobre cómo un mapa y una vista de mapa funcionan en la guía [Mapping and location services](https://developers.arcgis.com/documentation/mapping-apis-and-services/).
```html
<script>
    require(["esri/config", "esri/Map", "esri/views/MapView"], function(esriConfig, Map, MapView) {
        esriConfig.apiKey = "SU_API_KEY";

        const map = new Map({
            basemap: "arcgis-topographic"
        });
        /* BLOQUE DE CÓDIGO AGREGADO */
        const view = new MapView({
            map: map,
            center: [-74.05142721441229, 4.673855997314436],
            zoom: 13, 
            container: "viewDiv"
        });
        /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
    });
</script>
```
