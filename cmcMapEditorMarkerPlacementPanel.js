function createMarkerPlacementPanel()
{
	var divNameOut = "floatingMarkerChoicePanel";

	document.getElementById(divNameOut).innerHTML = "";
	document.getElementById(divNameOut).innerHTML += "Choose a marker to place:";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input type='radio' name='markerMapChoice' value='None' checked='checked'> None";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input type='radio' name='markerMapChoice' value='GreenMarker'>";
	document.getElementById(divNameOut).innerHTML += "<img src='./images/GreenRecycle_30px.png' height=15px>";
	document.getElementById(divNameOut).innerHTML += " Normal Recycling";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input type='radio' name='markerMapChoice' value='BlueMarker'>";
	document.getElementById(divNameOut).innerHTML += "<img src='./images/BlueRecycle_30px.png' height=15px>";
	document.getElementById(divNameOut).innerHTML += " Glass Recycling";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input type='radio' name='markerMapChoice' value='TrashBinMarker'>";
	document.getElementById(divNameOut).innerHTML += "<img src='./images/TrashBin_30px.png' height=15px>";
	document.getElementById(divNameOut).innerHTML += " Dumpster Marker";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input type='radio' name='markerMapChoice' value='BatteryMarker'>";
	document.getElementById(divNameOut).innerHTML += "<img src='./images/Battery_30px.png' height=15px>";
	document.getElementById(divNameOut).innerHTML += " Battery Marker";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input type='radio' name='markerMapChoice' value='TemporaryMarker'>";
	document.getElementById(divNameOut).innerHTML += "<img src='./images/MoGreenLogo_30px.png' height=15px>";
	document.getElementById(divNameOut).innerHTML += " Temp Marker";
}
