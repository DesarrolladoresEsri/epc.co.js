# Buscar una dirección
La geocodificación es el proceso de convertir el texto de direcciones o _lugares_ en una _ubicación_. El _Servicio de geocodificación_ puede buscar una dirección o un lugar y realizar _geocodificación inversa_. Use el widget [Search](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html) para acceder al servicio de geocodificación y realizar búsquedas interactivas.  
En este ejercicio, aprenderá a usar el widget [Search](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html) para encontrar direcciones y sitios de interés. 
> Para aprender más acerca de geocodificación y encontrar sitios de interés, visite [Geocode and search](https://developers.arcgis.com/documentation/mapping-apis-and-services/search/) en la guía [Mapping API and location services](https://developers.arcgis.com/documentation/mapping-apis-and-services/)
##  Cree un nuevo pen
1. Para iniciar, use el código del [ejercicio anterior](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/3.ubicacion/README.md).
## Agregue módulos
1. En la declaración `require`, agregue el módulo [`Search`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html).
```javascript
require([
    "esri/config", 
    "esri/Map", 
    "esri/views/MapView",

    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",

    "esri/widgets/Locate",
    /* BLOQUE DE CÓDIGO AGREGADO */
    "esri/widgets/Search"
    /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
], function(
    esriConfig, 
    Map, 
    MapView,

    BasemapGallery,
    Expand,

    Locate,
    /* BLOQUE DE CÓDIGO AGREGADO */
    Search
    /* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
) {
```
## Agregue el widget Search
El _widget_ [`Search`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html) es un control visible que le permite encontrar direcciones y sitios de interés interactivamente. Este widget proporciona sugerencias a medida que teclea y le permite seleccionar un resultado. Cuando selecciona un resultado, el mapa se acerca a este y muestra una ventana emergente con la información de la dirección. Por defecto, el widget usa un [`locator`](https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-locator.html) y [`source`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html#sources) para acceder al _servicio de Geocodificación_.
1. Al final del código en la función principal `function`, cree un widget [`Search`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html). Ajuste la propiedad [`view`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html#view) como `view`.
```javascript
const search = new Search({
    view: view
});
```
2. Agregue el _widget_ en la esquina superior izquierda de la vista. Ajuste la propiedad `index` como `0` para ubicar el widget en la primera posición. Aprenda más sobre añadir componentes de la interfaz de usuario a la vista en [DefaultUI](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-ui-DefaultUI.html).
```javascript
const search = new Search({
    view: view
});
/* BLOQUE DE CÓDIGO AGREGADO */
view.ui.add(search, {
    position: "top-left",
    index: 0
});
/* FIN DEL BLOQUE DE CÓDIGO AGREGADO */
```
## Ejecute la aplicación
En **CodePen** ejecutesu aplicación. El mapa deberá mostrar un _widget_ [`Search`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html) que le permite buscar lugares y sitios de interés de forma interactiva.  
Intente buscar las siguientes ubicaciones:
```
- Bucaramanga
- Aeropuerto El Dorado
- Calle 90 #13-40
- 6.816, -73.01
```
- [Ver ejemplo en vivo](https://desarrolladoresesri.github.io/epc.co.js/4.buscar-direccion/buscar-direccion.html)
- [Ver código](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/4.buscar-direccion/buscar-direccion.html)
- [Ir al ejercicio siguiente: Calcular rutas](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/5.rutas/README.md)
- [Ir al ejercicio anterior: Mostrar ubicación](https://github.com/DesarrolladoresEsri/epc.co.js/blob/main/3.ubicacion/README.md)
