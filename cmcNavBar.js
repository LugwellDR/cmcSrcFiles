function createNavBar()
{
	var divNameOut = "NavBarDivID";

	document.getElementById(divNameOut).innerHTML = "";
	document.getElementById(divNameOut).innerHTML += "<ul id='NavBarID' class='active'>";
	document.getElementById(divNameOut).innerHTML += "<li><a href='home.html'>Home</a></li>";
	document.getElementById(divNameOut).innerHTML += "<li><a href='cmcAbout.html'>About</a></li>";
	document.getElementById(divNameOut).innerHTML += "<li><a href='cmcHeatmap.html'>Heatmap & Stats</a></li>";
	document.getElementById(divNameOut).innerHTML += "<li><a href='cmcTaskPage.html'>Tasks</a></li>";
	document.getElementById(divNameOut).innerHTML += "<li><a href='cmcMapEditor.html'>Zone & Marker Editor</a></li>";
	document.getElementById(divNameOut).innerHTML += "<li><a href='cmcAccountManager.html'>Account Manager</a></li>";
	document.getElementById(divNameOut).innerHTML += "</ul>";
}
