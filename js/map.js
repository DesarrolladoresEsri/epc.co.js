require([
    "esri/config", 
    "esri/Map", 
    "esri/views/MapView",
    
    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",

    "esri/widgets/Locate",
    "esri/widgets/Compass",
    "esri/widgets/Home",

    "esri/widgets/Search",
    
    "esri/widgets/Directions",
    "esri/layers/RouteLayer",

    "esri/layers/FeatureLayer",
    "esri/widgets/Legend",
    
    "esri/widgets/Editor",

    "esri/rest/support/FeatureSet",
    "esri/rest/closestFacility",
    "esri/rest/support/ClosestFacilityParameters",
    "esri/layers/GraphicsLayer",
], function(
    esriConfig, 
    Map, 
    MapView,
    
    BasemapGallery,
    Expand,

    Locate,
    Compass,
    Home,
    
    Search,

    Directions,
    RouteLayer,

    FeatureLayer,
    Legend,
    
    Editor,

    FeatureSet,
    closestFacility, 
    ClosestFacilityParameters,
    GraphicsLayer
) {
    esriConfig.apiKey = "AAPK5f0aa6b2f0e14123ac60ccbbf3ad368aQYlqyHlk2Btg1Mez3cBZ4t7k6x9MaxduUGV82OZKpOUOUKYhaXoxV4CZv1_JlwLe";

    const map = new Map({
        basemap: "arcgis-topographic"
    });
    
    const view = new MapView({
        map: map,
        center: [-74.05142721441229, 4.673855997314436],
        zoom: 13, 
        container: "viewDiv",
        padding:{
            left: 50
        }
    });

    const basemapGallery = new BasemapGallery({
        view: view,
        container: "basemaps-container",
        source: {
            query: {
                title: '"World Basemaps for Developers" AND owner:esri'
            }
        }
    });
    
    const locate = new Locate({
        view: view,
        useHeadingEnabled: true,
        goToOverride: function(view, options) {
            options.target.scale = 1500;
            return view.goTo(options.target);
        }
    });
    view.ui.add(locate, "top-left");

    const compass = new Compass({
        view: view
    });
    view.ui.add(compass, "top-left");

    const home = new Home({
        view: view
    });
    view.ui.add(home,{
        position: "top-left",
        index: 0
    });

    const search = new Search({
        view: view
    });
    view.ui.add(search, {
        position: "top-left",
        index: 0
    });

    const routeLayer = new RouteLayer();
    map.layers.add(routeLayer);
    
    const directions = new Directions({
        view: view,
        layer: routeLayer
    });

    const rtExpand = new Expand({
        view: view,
        content: directions,
        autoCollapse: false
    });
    view.ui.add(rtExpand, "top-right");
    
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
    
    const ipsRenderer = {
        type: "unique-value",
        field: "SEDE_PRINC",
        uniqueValueInfos: [
            createPictureMarkerSymbol("SI", "https://static.arcgis.com/images/Symbols/Government/Hospital.png"),
            createPictureMarkerSymbol("NO", "https://static.arcgis.com/images/Symbols/Government/Hospital-and-Clinics.png")
        ]
    };
    
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
    
    const ipsLayer = new FeatureLayer({
        url: "https://services.arcgis.com/DDzi7vRExVRMO5AB/arcgis/rest/services/Instituci%C3%B3n_Prestadora_de_Salud/FeatureServer/0",
        outFields: ["NOMBRE","NOMBRE_PRE", "CODIGO_PRE", "DIRECCION", "TELEFONO", "EMAIL"],
        popupTemplate: popupIPS,
        renderer: ipsRenderer
    });
    
    map.add(ipsLayer);

    search.sources.push({
        layer: ipsLayer,
        searchFields: ["NOMBRE"],
        displayField: "NOMBRE",
        exactMatch: false,
        outFields: ["NOMBRE","NOMBRE_PRE", "CODIGO_PRE", "DIRECCION", "TELEFONO", "EMAIL"],
        name: "Institución Prestadora de Salud",
        placeholder: "Buscar una IPS",
        maxResults: 6,
        maxSuggestions: 6,
        suggestionsEnabled: true,
        minSuggestCharacters: 0
    });
    
    ipsLayer.queryExtent().then(function(result){
        view.goTo(result.extent);
        home.viewpoint = {
            targetGeometry: result.extent
        }
    });

    const legend = new Legend({
        view: view,
        container:"legend-container",
        layerInfos: [
            {
                layer: ipsLayer,
                title: "Institución Prestadora de Salud"
            }
        ]
    });

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
    
    const edExpand = new Expand({
        view: view,
        content: editor,
        autoCollapse: false
    });
    view.ui.add(edExpand, "bottom-right");

    view.when(() => {
        let activeWidget;

        const handleActionBarClick = ({target}) => {
            if (target.tagName !== "CALCITE-ACTION") {
                return;
            }

            if (activeWidget) {
                document.querySelector(`[data-action-id=${activeWidget}]`).active = false;
                document.querySelector(`[data-panel-id=${activeWidget}]`).hidden = true;
            }

            const nextWidget = target.dataset.actionId;
            if (nextWidget !== activeWidget) {
                document.querySelector(`[data-action-id=${nextWidget}]`).active = true;
                document.querySelector(`[data-panel-id=${nextWidget}]`).hidden = false;
                activeWidget = nextWidget;
            } else {
                activeWidget = null;
            }
        };

        document.querySelector("calcite-action-bar").addEventListener("click", handleActionBarClick);

        let actionBarExpanded = false;

        document.addEventListener("calciteActionBarToggle", event => {
            actionBarExpanded = !actionBarExpanded;
            view.padding = {
                left: actionBarExpanded ? 135 : 45
            }
        });
    });

    const anSearch = new Search({
        container: "analysis-content"
    });
    
    const cfRouteLayer = new GraphicsLayer();
    map.add(cfRouteLayer, 0);

    function setCFRouteSymbol(index){
        if (index == 0){
            return {
                type: "simple-line",
                color: [237, 81, 81, 0.75],
                width: "5",
            }
        } else if (index == 1) {
            return {
                type: "simple-line",
                color: [20, 158, 206, 0.75],
                width: "5",
            }
        } else if (index == 2) {
                return {
                type: "simple-line",
                color: [167, 198, 54, 0.75],
                width: "5",
            }
        } else {
            return {
                type: "simple-line",
                color: [60, 175, 153, 0.75],
                width: "5",
            }
        }
    }

    let startPoint;
    
    anSearch.on("search-complete", function(event){
        if (event.numResults > 0){
            document.querySelector(`[data-action-id=perform-analysis]`).disabled = false;
            startPoint = event.results[0].results[0].feature;
        }     
    });

    anSearch.on("search-clear", function(event){
        cfRouteLayer.removeAll();
        document.querySelector(`[data-action-id=perform-analysis]`).disabled = true;
    });

    const closestFacilityUrl = 'https://route-api.arcgis.com/arcgis/rest/services/World/ClosestFacility/NAServer/ClosestFacility_World/solveClosestFacility';

    function findClosestFacility(){
        cfRouteLayer.removeAll();
        
        const queryParams = {
            spatialRelationship: "intersects",
            geometry: startPoint.geometry,
            distance: 2000,
            units: "meters",
            outSpatialReference: {wkid: 4326},
            returnGeometry: true,
            outFields:["OBJECTID"]
        };

        ipsLayer.queryFeatures(queryParams).then(function(results){
            let closestFacilityParams = new ClosestFacilityParameters({
                facilities: results,
                incidents: new FeatureSet({features: [startPoint]}),
                returnRoutes: true,
                returnFacilities: false,
                defaultTargetFacilityCount: 3
            });

            closestFacility.solve(closestFacilityUrl, closestFacilityParams).then(function(solveResults){
                solveResults.routes.features.forEach((route, i) => {
                    route.symbol = setCFRouteSymbol(i);
                    cfRouteLayer.add(route);
                });
                view.goTo({
                    target: solveResults.routes.features
                });
            });
        }); 
    }
    document.querySelector(`[data-action-id=perform-analysis]`).addEventListener("click", findClosestFacility);
});