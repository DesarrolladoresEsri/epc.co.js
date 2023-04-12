# 3. Mostrar Ubicación
Las aplicaciones pueden encontrar, rastrear y mostrar le geolocalización de un dispositivo con los widgets [`Locate`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Locate.html) y [`Track`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Track.html). Estos widgets usan la [API de Gelocalización HTML5](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation) para encontrar la ubnicación de los dispositivos y proporcionar actualizaciones. Una vez su geolocalización se ha encontrado, puede acercarse a la ubicación, mostrar un gráfico y seguir la ubicación a medida que se va moviendo. El widget [`Locate`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Locate.html) encuentra y se acerca a su ubicación actual después de hacer clic en el botón, mientras que el widget [`Track`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Track.html) anima la vista hacia su ubicación en un intervalo. El widget [`Track`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Track.html) es útil para construir aplicaciones que proporcionan indicaciones de conducción y seguimiento de rutas.  
En este ejercicio, aprenderá a agregar un widget que le permitirá ver la geolocalización de su dispositivo en un mapa.
> Acceder a la ubicación del dispositivo con la API de Geolocalización no está soportado para orígenes inseguros. Por lo tanto, para usar los widgets [`Locate`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Locate.html) y [`Track`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Track.html) el ejercicio debe ejecutarse en **HTTPS**.
## Cree un nuevo pen
1. Para iniciar, use el código del [ejercicio anterior](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/2.mapa-base/README.md).
## Encuentre su geolocalización 
El widget [`Locate`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Locate.html) usa HTML5 para encontrar la ubicación de su dispositivo y acercarse en el mapa. Agregue este widget al mapa para encontrar y mostrar su ubicación actual.
1. En la declaración `require`, agregue el módulo del widget [`Locate`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Locate.html).
```javascript
require([
    "esri/config", 
    "esri/Map", 
    "esri/views/MapView",

    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",
    /* BLOQUE DE CÓDIGO AGREGADO */
    "esri/widgets/Locate"
    /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
], function(
    esriConfig, 
    Map, 
    MapView,

    BasemapGallery,
    Expand,
    /* BLOQUE DE CÓDIGO AGREGADO */
    Locate
    /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
) {
```
2. Al final del código en la función principal `function`, cree el widget [`Locate`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Locate.html) y ajuste la propiedad `useHeadingEnabled` en `false` para que no cambie la rotación del mapa. Use `goToOverride` para proporcionar su propia funcionalidad de zoom personalizada para el widget. En este caso, el mapa se acercará a una escala de `1500`.
```javascript
const locate = new Locate({
    view: view,
    useHeadingEnabled: false,
    goToOverride: function(view, options) {
        options.target.scale = 1500;
        return view.goTo(options.target);
    }
});
```
3. Agregue el widget [`Locate`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Locate.html) en la posición `top-left`de la vista `view`.
```javascript
const locate = new Locate({
    view: view,
    useHeadingEnabled: false,
    goToOverride: function(view, options) {
        options.target.scale = 1500;
        return view.goTo(options.target);
    }
});
/* BLOQUE DE CÓDIGO AGREGADO */
view.ui.add(locate, "top-left");
/* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
```
## Ejecute la aplicación
En **CodePen**, ejecute su aplicación y haga clic en el botón de ubicación. El mapa debería acercarse a una escala de 1500. El símbolo azul representa su geolocalización.
> Si previamente no ha permitido a su navegador usar su ubicación, este solicitará permisos antes de acceder a la ubicación del dispositivo. Debe aprobar esta solicitud para que el widget funcione. Si está usando CodePen, es posible que el widget no funcione en la vista **Editor**. Si esto sucede, cambie a la vista **Debug** y ejecute la aplicación nuevamente. 

- [Ver ejemplo en vivo](https://desarrolladoresesri.github.io/epc.co.js/3.ubicacion/ubicacion.html)
- [Ver código](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/3.ubicacion/ubicacion.html)
- [Ir al ejercicio siguiente: Buscar una dirección](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/4.buscar-direccion/README.md)
- [Ir al ejercicio anterior: Cambiar el mapa base](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/2.mapa-base/README.md)
