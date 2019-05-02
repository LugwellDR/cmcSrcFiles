function createResourceMarkerPanel()
{
	var divNameOut = "floatingMarkerDisplayPanel";
	var URLIn = window.location.pathname;
	var filename = URLIn.substring(URLIn.lastIndexOf('/') + 1);
	
	document.getElementById(divNameOut).innerHTML = "";
	document.getElementById(divNameOut).innerHTML += "Hide or Show markers:";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='clearMarkersType(this.name)' name='GreenMarker' type=button value='Hide'>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='showMarkersType(this.name)' name='GreenMarker' type=button value='Show'>";
	document.getElementById(divNameOut).innerHTML += "<img src='./images/GreenRecycle_30px.png' height=15px> Normal Recycling";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='clearMarkersType(this.name)' name='BlueMarker' type=button value='Hide'>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='showMarkersType(this.name)' name='BlueMarker' type=button value='Show'>";
	document.getElementById(divNameOut).innerHTML += "<img src='./images/BlueRecycle_30px.png' height=15px> Glass Recycling";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='clearMarkersType(this.name)' name='BatteryMarker' type=button value='Hide'>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='showMarkersType(this.name)' name='BatteryMarker' type=button value='Show'>";
	document.getElementById(divNameOut).innerHTML += "<img src='./images/Battery_30px.png' height=15px> Battery Recycling";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='clearMarkersType(this.name)' name='TrashBinMarker' type=button value='Hide'>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='showMarkersType(this.name)' name='TrashBinMarker' type=button value='Show'>";
	document.getElementById(divNameOut).innerHTML += "<img src='./images/TrashBin_30px.png' height=15px> Dumpster";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='clearMarkersType(this.name)' name='TemporaryMarker' type=button value='Hide'>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='showMarkersType(this.name)' name='TemporaryMarker' type=button value='Show'>";
	document.getElementById(divNameOut).innerHTML += "<img src='./images/MoGreenLogo_30px.png' height=15px> Temp Marker";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='clearAllMarkers()' name='Hide_All' type=button value='Hide'>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='showAllMarkers()' name='Show_All' type=button value='Show'> All Markers";
	if(filename == "cmcMapEditor.html")
	{
		document.getElementById(divNameOut).innerHTML += "<br>";
		document.getElementById(divNameOut).innerHTML += "<input onclick='removeZonesOnMap()' type=button value='Hide'>";
		document.getElementById(divNameOut).innerHTML += "<input onclick='showZonesOnMap()' type=button value='Show'> Zones";
	}
}
