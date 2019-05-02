function createZoneEditorPanel()
{
	var divNameOut = "floatingZoneEditTogglePanel";
	
	document.getElementById(divNameOut).innerHTML = "";
	document.getElementById(divNameOut).innerHTML += "Reset Zones:";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input type='checkbox' name='zoneRestColorChoice' value='true' onclick='toggleResetZoneColor()'> Reset Zone Color";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "Toggle Marker/Zone Deletion:";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input type='checkbox' name='zoneDeleteToggle' value='toggleDelete' onclick='toggleDeleting()'> Delete Zones/Markers";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "Toggle Editable Zones:";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input type='checkbox' name='zoneMapChoice' value='zoneEditToggle' onclick='toggleEditableZones()'> Edit Zone";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input type='button' name='zoneSaveChanges' value='Submit' onclick='savePointChanges()'> Save Changes";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "Color Time Intervals:";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input type='numberGreen' name='greenInterval' step='1' min='1' placeholder='Days'>";
	document.getElementById(divNameOut).innerHTML += "<input type='submit' onclick='setGreenInterval()'>";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input type='numberYellow' name='yellowInterval' step='1' min='1' placeholder='Days'>";
	document.getElementById(divNameOut).innerHTML += "<input type='submit' onclick='setYellowInterval()'>";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input type='numberOrange' name='orangeInterval' step='1' min='1' placeholder='Days'>";
	document.getElementById(divNameOut).innerHTML += "<input type='submit' onclick='setOrangeInterval()'>";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "Set Zone Colors To DB:";
	document.getElementById(divNameOut).innerHTML += "<input type=button onclick='savePointChanges()' value='Set'>";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "Apply Task Time Changes:";
	document.getElementById(divNameOut).innerHTML += "<input type=button onclick='saveTaskTimeChanges()' value='Apply'>";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<div id='duration_list_div'></div>";
}
