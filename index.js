var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var elevatorService = new google.maps.ElevationService();
var infowindow = new google.maps.InfoWindow();
var map;

function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var currentLocation = new google.maps.LatLng(-27.628313, -48.668854);
    var mapOptions = {
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: currentLocation
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("directionsPanel"));

    // var marker = new google.maps.Marker({
    //     position: currentLocation, 
    //     map: map, 
    //     title:"Current location."
    // }); 
}

function calcRoute() {
    var start = new google.maps.LatLng(-27.6283265, -48.66884490000001);
    var end = new google.maps.LatLng(-27.6282332, -48.669581300000004);
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
    var locations = [start, end];
    var positionalRequest = {
        'locations': locations
    };
    elevatorService.getElevationForLocations(positionalRequest, function(results, status) {
        if (status == google.maps.ElevationStatus.OK) {
            var resultado0 = results[0].elevation;
            var resultado1 = results[1].elevation;
            var diferenca = resultado0 - resultado1;
            if (results[0]) {
                var descidaOuSubida = "aclive"
                if (diferenca < 0) {
                    descidaOuSubida = "declive"
                }
                infowindow.setContent("A elevação no ponto A: " + results[0].elevation.toFixed(2) + " metros.\n" +
                                      "A elevação no ponto B: " + results[1].elevation.toFixed(2) + " metros.\n" +
                                      "Houve uma variação de " + diferenca.toFixed(2) + " metros.\n" +
                                      "Este trecho, portanto, é um " + descidaOuSubida + ".");
                infowindow.setPosition(start);
                infowindow.open(map);
            }
            if (results[1]) {

            }
        }
    });
}