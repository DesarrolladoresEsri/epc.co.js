# 1. Mostrar un Mapa
Un mapa contiene capas de datos Geográficos. Un mapa contiene una capa de mapa base y, opcionalmente, una o más capas da datos. Usted puede mostrar un área específica de un mapa usando una vista de mapa y ajustando la ubicación y el nivel de zoom. En este ejercicio aprenderá cómo crear y mostrar un mapa de un área de Bogotá, Colombia usando la capa de mapa base topográfico. El mapa y el código de este ejercicio será usado como punto de partida para los siguientes puntos.
## Prerrequisitos
Para este ejercicio necesita una cuenta gratuita de [desarrollador de ArcGIS](https://developers.arcgis.com/sign-up/) para acceder a su tablero de control de desarrollador y las API keys. Es necesario crear y copiar la API key para acceder a los servicios usados durante el ejercicio.
## Cree un nuevo pen
1. Ingrese a [CodePen](https://codepen.io/pen/?editors=1000) para crear un nuevo pen para su aplicación de mapa. 
## Agregue el código HTML
Defina una página HTML para crear un mapa que sea del ancho y alto total de la ventana del navegador. 
1. En **CodePen** > **HTML**, agregue código HTML y CSS para crear una página con un elemento `viewDiv`. El `viewDiv` es el elemento que muestra el mapa y su CSS reajusta las configuraciones de cualquir navegador web de manera que este pueda consumir el ancho y alto completo de la ventana.
La etiqueta `<!DOCTYPE html>` no es necesaria en CodePen. Si está usando un editor diferente o ejecutando la página en un servidor local, asegúrese de añadir esta etiqueta al inicio de su página HTML.
```
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
