var map = new google.maps.Map(document.getElementById('map'), {
	zoom: 17,
	center: new google.maps.LatLng(37.7796217, -3.8018806),
	mapTypeId: google.maps.MapTypeId.ROADMAP
});

var locations = [
    ['Torre Del Oro', 37.7796217, -3.8018806, 3],
];

var infowindow = new google.maps.InfoWindow();

 var contentString = '<div style="text-align:center;"><img style="width: 200px;" src="Imagenes/logo.png"><img style="width: 320px;" src="Imagenes/gmapphoto.jpg"></div>'

var marker, i;
var icons = ["http://maps.google.com/mapfiles/ms/icons/blue-dot.png"];

for (i = 0; i < locations.length; i++){
	marker = new google.maps.Marker({
		position: new google.maps.LatLng(locations[i][1], locations[i][2]),
		map: map,
		icon: icons[i]
	});
	google.maps.event.addListener(marker, 'click', (function (marker, i) {
		return function() {
			infowindow.setContent(contentString);
			infowindow.open(map, marker);
		}
	}) (marker,i));
}