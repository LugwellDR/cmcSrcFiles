function createTaskPageInformationPanel()
{
	var divNameOut = "bodyText";
	document.getElementById(divNameOut).innerHTML = "";
	document.getElementById(divNameOut).innerHTML += "<p>Click the submit button to complete marked tasks.</p>";
	document.getElementById(divNameOut).innerHTML += "<button onClick='changeToCompleted()'>Submit</button>";
}