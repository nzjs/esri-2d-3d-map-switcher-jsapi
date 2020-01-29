
require([
    "esri/WebScene", "esri/WebMap", "esri/views/MapView", "esri/views/SceneView",
    "esri/Graphic", "esri/widgets/Locate", "esri/widgets/Home", "esri/widgets/Search", 
    "esri/widgets/BasemapToggle", "esri/widgets/Legend", "esri/widgets/Expand", "dijit/ConfirmDialog", "dojo/domReady!"
    ], function (
    WebScene, WebMap, MapView, SceneView,
    Graphic, Locate, Home, Search, BasemapToggle,
    Legend, Expand, ConfirmDialog) {

    function addWidgets(view) {
        // Define our widgets for the view
        const locateWidget = new Locate({
        view: view,   
        graphic: new Graphic({
        symbol: { type: "simple-marker" }  
        })
        });
        const homeWidget = new Home({
        view: view,   
        graphic: new Graphic({
        symbol: { type: "simple-marker" }  
        })
        });
        const searchWidget = new Search({
        view: view,   
        graphic: new Graphic({
        symbol: { type: "simple-marker" }  
        })
        });
        const basemapWidget = new BasemapToggle({
        view: view,  
        nextBasemap: 'topo-vector',
        //"streets", "satellite", "hybrid", "terrain", "topo", "gray", "dark-gray", "oceans", 
        //"national-geographic", "osm", "dark-gray-vector", "gray-vector", "streets-vector", 
        //"topo-vector", "streets-night-vector", "streets-relief-vector", "streets-navigation-vector"
        graphic: new Graphic({
        symbol: { type: "simple-marker" }  
        })
        });
        const legendWidget = new Legend({
        view: view
        })
        // Add widgets to the current view
        view.ui.add(locateWidget, "top-left");
        view.ui.add(homeWidget, "top-left");
        view.ui.add(searchWidget, "top-right");
        view.ui.add(basemapWidget, "bottom-left");
        view.ui.add(legendWidget, "bottom-right")
    }

    const webmap = new WebMap({
        portalItem: {
        id: "7ac2d14d9a4b4a7380be447ae3c722f6"
        }
    });

    const webscene = new WebScene({
        portalItem: {
        id: "708d4b4cec0b4e018180492f13848167"
        }
    });

    const mapView = new MapView({
        container: "mapViewDiv",
        map: webmap
    });
    addWidgets(mapView);

    const sceneView = new SceneView({
        container: "sceneViewDiv",
        map: webscene
    });  
    addWidgets(sceneView);

    let is2D = true;

    // button that switches between 2D and 3D views
    const switchButton = document.getElementById("switch-view");
    switchButton.addEventListener("click", function () {
        is2D = !is2D;
        switchButton.innerHTML = is2D ? "Switch to 3D" : "Switch to 2D";
        switchView();
    });

    function switchView() {
        const newView = is2D ? mapView : sceneView;
        const oldView = is2D ? sceneView : mapView;

        newView.extent = oldView.extent;

        if (newView === sceneView) {
        newView.goTo({
            rotation: oldView.rotation,
            tilt: 0
            }, {
            animate: false
            })
            .then(function () {
            animateOpacity(newView, oldView);
            newView.goTo({
                tilt: 60
            }, {
                speedFactor: 0.3
            });
            });
        } else {
        oldView.goTo({
            tilt: 0
            }, {
                speedFactor: 0.5
            })
            .then(function () {
            animateOpacity(newView, oldView);
            newView.rotation = 360 - oldView.camera.heading;
            });
        }
    }

    function animateOpacity(newView, oldView) {
        newView.container.classList.remove("switch-off");
        newView.container.classList.add("switch-on");

        oldView.container.classList.remove("switch-on");
        oldView.container.classList.add("switch-off");
    }


    splashContent = "<a href='#'></a>Welcome to the official website for the West Coast Civil Defence & Emergency Management (CDEM) Group Tsunami Evacuation Zones geospatial viewer. West Coast CDEM Group does not warrant its accuracy and disclaims all liability whatsoever for any error, inaccuracy or incompleteness of the information. No person should rely on any information within this viewer without seeking independent and professional advice.<br/><br/>"+
    "The following terms along with the disclaimer and privacy policy serve as the agreement governing the visitors use of this website that may also be referred to as ‘the site’. The parties to this agreement include and are limited to the West Coast Civil Defence & Emergency Management Group which we may refer to as “we” or “us” or “our” and the visitor to the site, who we may refer to as ‘you’.<br/><br/>"+
    "<strong>Website Contents & Terms of Use Information</strong><br/><br/>"+
    "We hope that this website provides you with the information that you require on the West Coast Tsunami Evacuation Zones and the Tsunami Evacuation information and messaging.<br/><br/>"+
    "This West Coast Tsunami Evacuation Zones geospatial viewer has been prepared by the West Coast Civil Defence & Emergency Management (CDEM) Group. This has been provided to the West Coast CDEM Coordinating Executive Group (CEG) as well as all other partner organisations and agencies for use in tsunami response and recovery planning, as well as the community for a better understanding of the tsunami evacuation zones and to be used in personal evacuation planning.<br/><br/>"+
    "The West Coast Tsunami Evacuation Zones are to be used only in tsunami response and recovery planning and in defining areas where people should be evacuated from and areas where people can evacuate to. It is important to recognise that the evacuation zones are not tsunami hazard zones, tsunami risk zones, or tsunami inundation zones. They are areas that we recommend people evacuate from as a precaution after natural warnings, or in an official tsunami warning.<br/><br/>"+
    "The West Coast CDEM Group are in the process of upgrading these evacuation zones as there are many uncertainties involved including knowledge of potential tsunami sources, source characteristics, bathymetry and topography, tsunami propagation and inundation characteristics. For these reasons the data provided cannot be relied on for any reason other response and recovery planning.<br/><br/>"+
    "All viewers of these zones need to be aware that the New Zealand Coastal Policy Statement (Department of Conservation 2010) sets out national policy under the Resource Management Act 1991 (RMA) for managing areas potentially affected by coastal hazards, which includes the potential effects of tsunami, and how to avoid or mitigate them. However other than evacuation planning, the current West Coast Evacuation Zones supplied by the West Coast CDEM Group cannot be used for any other purpose such as requirements for subdivision, development, land-use and tsunami risk assessment.<br/><br/>"+
    "Additional to the inaccuracy and uncertainty of the provided zones, there is a lot of uncertainty around how tsunamis will behave, particularly large tsunamis, as we have not experienced many of these in our short-written history. Every tsunami is different depending on its source, the direction it is arriving from, and the sea state and tide at the time. There is no one tsunami that would inundate an entire zone. Rather, the zones represent an ‘envelope’ around many different possible tsunami scenarios. Inevitably this will lead to some degree of over-evacuation in any tsunami event. <br/><br/>"+
    "Should you have questions please contact the West Coast CDEM Group at info@westcoastemergency.govt.nz <br/><br/>"+
    "Last updated: 18th November 2019";

    const splash = new ConfirmDialog({
        title: "Introduction & Disclaimer",
        content: splashContent,
        style: "width: 600px"
    })
    window.onload = splash.show();

    });
