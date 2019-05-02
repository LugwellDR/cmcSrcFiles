var db = firebase.firestore();
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);


var collection_Tasks = "tasks";

var arrayOfTasks = [];
var isViewingCompleted = false;
var taskSelected = "All";
var startDateTimeSeconds = 0;
var currentDateTimeSeconds = Math.floor(Date.now()/1000);
const list_div = document.querySelector("#list_div");
db.collection(collection_Tasks).onSnapshot(
	function(querySnapshot) 
	{
		querySnapshot.docChanges().forEach(
			function(change)
			{
				arrayOfTasks.push({docId: change.doc.id, isCompleted: change.doc.data().is_completed, timeStamp: change.doc.data().time_stamp.seconds, taskType: change.doc.data().task_type, taskLocation: change.doc.data().task_location, user: change.doc.data().user, imageName: change.doc.data().image, description: change.doc.data().description});
			});
			document.getElementById("titleDiv").innerHTML = "";
			document.getElementById("titleDiv").innerHTML += "Task Page - Current";
			displayArray(arrayOfTasks, isViewingCompleted, startDateTimeSeconds, currentDateTimeSeconds, taskSelected);
	});

function showCompletedTasks()
{
	if(isViewingCompleted == false)
	{
		isViewingCompleted = true;
	}
	document.getElementById("titleDiv").innerHTML = "";
	document.getElementById("titleDiv").innerHTML += "Task Page - Completed";
	displayArray(arrayOfTasks, isViewingCompleted, startDateTimeSeconds, currentDateTimeSeconds, taskSelected);
}

function showCurrentTasks()
{
	if(isViewingCompleted == true)
	{
		isViewingCompleted = false;
	}
	document.getElementById("titleDiv").innerHTML = "";
	document.getElementById("titleDiv").innerHTML += "Task Page - Current";
	displayArray(arrayOfTasks, isViewingCompleted, startDateTimeSeconds, currentDateTimeSeconds, taskSelected);
}

function groupDuplicateTasks()
{
	var tempDescription;
	var tempLocationOne = [];
	var tempLocationTwo = [];
	for(var testedIndex = 0; testedIndex < arrayOfTasks.length; testedIndex++)
	{
		if(!arrayOfTasks[testedIndex]["isCompleted"])
		{
			for(var testedAgainstIndex = 0; testedAgainstIndex < arrayOfTasks.length; testedAgainstIndex++)
			{
				tempLocationOne = [];
				tempLocationTwo = [];
				if(testedIndex == testedAgainstIndex)
				{
					// Do Nothing
					//console.log("Same Index");
				}
				else if(arrayOfTasks[testedIndex]["taskType"] == arrayOfTasks[testedAgainstIndex]["taskType"])
				{
					// now to check distances Math.abs();
					tempLocationOne = formatGeopoint(arrayOfTasks[testedIndex]["taskLocation"]);
					tempLocationTwo = formatGeopoint(arrayOfTasks[testedAgainstIndex]["taskLocation"]);
					if(Math.abs(tempLocationOne[0] - tempLocationTwo[0]) < (.00015) && Math.abs(tempLocationOne[1] - tempLocationTwo[1]) < (.00015))
					{
						//console.log("Same task type");
						//console.log(tempLocationOne[0] + " " + tempLocationOne[1]);
						//console.log(tempLocationTwo[0] + " " + tempLocationTwo[1]);
						//console.log("Lat Difference: " + (tempLocationOne[0] - tempLocationTwo[0]) + " " + (tempLocationTwo[0] - tempLocationOne[0]));
						//console.log("Lon Difference: " + (tempLocationOne[1] - tempLocationTwo[1]) + " " + (tempLocationTwo[1] - tempLocationOne[1]));
						tempDescription = arrayOfTasks[testedIndex]["description"];
						//console.log(arrayOfTasks[testedIndex]["taskLocation"]);
						arrayOfTasks[testedIndex]["description"] = "|";
						arrayOfTasks[testedIndex]["description"] += " " + tempDescription;
						break;
					}
				}
			}
		}
	}
	sortDescriptionFunction();
	sortTaskTypeFunction();
}

function formatGeopoint(geopointStringIn)
{
	var arrayOut = [2];
	var stringMod = "";
	stringMod = geopointStringIn.split(",");
	stringMod[0] = stringMod[0].split("(");
	stringMod[1] = stringMod[1].split(")");
	arrayOut[0] = stringMod[0][1];
	arrayOut[1] = stringMod[1][0];
	return arrayOut;
}

function displayArray(arrayOfTasksIn, isCompletedIn, startTimeIn, endTimeIn, taskTypeIn)
{
	list_div.innerHTML = ""
	for(var i = 0; i < arrayOfTasksIn.length; i++)
	{				
		if(arrayOfTasksIn[i].isCompleted == isCompletedIn && arrayOfTasksIn[i].timeStamp >= startTimeIn && arrayOfTasksIn[i].timeStamp <= endTimeIn && (taskTypeIn == "All" || arrayOfTasksIn[i].taskType == taskTypeIn))
		{
			list_div.innerHTML += "<input id='tasklist_checkbox' name='taskCheckBoxes' type='checkbox' value='" + arrayOfTasksIn[i].docId + "'>"
			list_div.innerHTML += "<i id='tasklist_task'>" + arrayOfTasksIn[i].taskType + "</i>"
			list_div.innerHTML += "<i id='tasklist_datetime'>" + formatDatetime(arrayOfTasksIn[i].timeStamp * 1000) + "</i>"
			list_div.innerHTML += "<i id='tasklist_description'>" + getDescription(arrayOfTasksIn[i].description) + "</i>"
			getNumberOfBreaks(arrayOfTasksIn[i].description);
			for(var k = 0; k < getNumberOfBreaks(arrayOfTasksIn[i].description); k++)
			{
				list_div.innerHTML += "<br>"
			}
			list_div.innerHTML += "<i id='tasklist_reportedby'>" + arrayOfTasksIn[i].user + "</i>"
			
			if(arrayOfTasksIn[i].imageName != "None")
			{
				list_div.innerHTML += "<button class='buttonClass' id='getImageButton' value='" + arrayOfTasksIn[i].imageName + "' onclick='getImage(this.value)'>Image</button>"
				list_div.innerHTML += "<button class='buttonClass' id='getImageButtonPopout' value='" + arrayOfTasksIn[i].imageName + "' onclick='getImagePopout(this.value)'>Popout</button>"
				list_div.innerHTML += "<img id='img_holder" + arrayOfTasksIn[i].imageName + "' src='' height='100%'/><br>"
			}
			else
			{
				list_div.innerHTML += "<b id='tasklist_doesnotexist'>This task does not contain a photo</b><br>"
			}
		}
		
	}
}

function selectTasksFromTaskTypes()
{
	taskSelected = document.getElementById("tastTypeSelected").options[document.getElementById("tastTypeSelected").selectedIndex].value;
	displayArray(arrayOfTasks, isViewingCompleted, startDateTimeSeconds, currentDateTimeSeconds, taskSelected);
}
	
function selectTasksFromTimeRange()
{
	var tempValue;
	var firstMonth = document.getElementById("firstMon").options[document.getElementById("firstMon").selectedIndex].value;
	var firstDay = document.getElementById("firstDay").options[document.getElementById("firstDay").selectedIndex].value;
	var firstYear = document.getElementById("firstYear").options[document.getElementById("firstYear").selectedIndex].value;
	var secondMonth = document.getElementById("secondMon").options[document.getElementById("secondMon").selectedIndex].value;
	var secondDay = document.getElementById("secondDay").options[document.getElementById("secondDay").selectedIndex].value;
	var secondYear = document.getElementById("secondYear").options[document.getElementById("secondYear").selectedIndex].value;
	console.log(firstMonth + " " + firstDay + " " + firstYear + " to " + " " + secondMonth + " " + secondDay + " " + secondYear);
	startDateTimeSeconds = new Date(firstMonth + " " + firstDay + ", " + firstYear + " " + "23:59:59").getTime() / 1000;
	currentDateTimeSeconds = new Date(secondMonth + " " + secondDay + ", " + secondYear + " " + "23:59:59").getTime() / 1000;
	if(startDateTimeSeconds >= currentDateTimeSeconds)
	{
		tempValue = startDateTimeSeconds;
		startDateTimeSeconds = currentDateTimeSeconds;
		currentDateTimeSeconds = tempValue;
	}
	selectTasksFromTaskTypes();
	//displayArray(arrayOfTasks, isViewingCompleted, startDateTimeSeconds, currentDateTimeSeconds, taskSelected);
}

function sortTimeStampFunction()
{
	arrayOfTasks.sort(function(a, b){return a.timeStamp - b.timeStamp});
	arrayOfTasks.reverse();
	displayArray(arrayOfTasks, isViewingCompleted, startDateTimeSeconds, currentDateTimeSeconds, taskSelected);
}

function sortTaskTypeFunction()
{
	arrayOfTasks.sort(function(a, b){return getStringIntegerValue(a.taskType) - getStringIntegerValue(b.taskType)});
	displayArray(arrayOfTasks, isViewingCompleted, startDateTimeSeconds, currentDateTimeSeconds, taskSelected);
}

function sortDescriptionFunction()
{
	arrayOfTasks.sort(function(a, b){return getStringIntegerValue(a.description[0]) - getStringIntegerValue(b.description[0])});
	//arrayOfTasks.sort(function(a, b){return a.description - b.description});
	displayArray(arrayOfTasks, isViewingCompleted, startDateTimeSeconds, currentDateTimeSeconds, taskSelected);
}

function getStringIntegerValue(stringIn)
{
	var strIntTotal = 0;
	for(var i = 0; i < stringIn.length; i++)
	{
		strIntTotal += stringIn.charCodeAt(i);
	}
	return strIntTotal;
}

function getImage(valueIn)
{
	var storage = firebase.storage();
	var storageRef = storage.ref();
	storageRef.child(valueIn + '.jpeg').getDownloadURL().then(
		function(url)
		{
			// `url` is the download URL for 'images/stars.jpg'
			// This can be downloaded directly:
			var xhr = new XMLHttpRequest();
			xhr.responseType = 'blob';
			xhr.onload = function(event)
						 {
							 var blob = xhr.response;
						 };
			xhr.open('GET', url);
			//xhr.send();
			// Or inserted into an <img> element:
			var img = document.getElementById('img_holder' + valueIn);
			//var imagePopout = window.open("", "Task Image", "width=500px,height=500px,titlebar=no");
			//imagePopout.document.write("<title>Task Image</title>" + '<img src= '+ url +'></img>');
			if(img.src != url)
			{
				img.src = url;
			}
			else
			{
				img.src = "";
			}			
		})
		.catch(
			function(error) 
			{
				//Error handling
			});
}

function getImagePopout(valueIn)
{
	var storage = firebase.storage();
	var storageRef = storage.ref();
	storageRef.child(valueIn + '.jpeg').getDownloadURL().then(
		function(url)
		{
			// `url` is the download URL for 'images/stars.jpg'
			// This can be downloaded directly:
			var xhr = new XMLHttpRequest();
			xhr.responseType = 'blob';
			xhr.onload = function(event)
						 {
							 var blob = xhr.response;
						 };
			xhr.open('GET', url);
			//xhr.send();
			// Or inserted into an <img> element:
			var img = document.getElementById('img_holder' + valueIn);
			var imagePopout = window.open("", "Task Image", "width=500px,height=500px,titlebar=no,left=600");
			imagePopout.document.write("<title>Task Image</title>" + '<img src= '+ url +'></img>');		
		})
		.catch(
			function(error) 
			{
				//Error handling
			});
}

function getDescription(descriptionIn)
{
	var outputString = "";
	var currentCount = 0;
	var letterCountMax = 105;
	if(descriptionIn.length < letterCountMax)
	{
		return descriptionIn;
	}
	else
	{
		for(var i = 0; i < descriptionIn.length; i++)
		{
			outputString += descriptionIn[i];
			currentCount++;
			if(currentCount == letterCountMax)
			{
				outputString += "<br>";
				currentCount = 0;
			}
		}
	}
	return outputString;
}

function getNumberOfBreaks(descriptionIn)
{
	var letterCountMax = 105;
	var breakCount = descriptionIn.length/letterCountMax;
	return Math.floor(breakCount);
}

function changeToCompleted()
{
	var allCheckBoxes = document.getElementsByName("taskCheckBoxes");
	var boxesChecked = [];
	var toggleBoolean = false;
	if(isViewingCompleted == false)
	{
		toggleBoolean = true;
	}
	for(var i = 0; i < allCheckBoxes.length; i++)
	{
		if(allCheckBoxes[i].checked)
		{
			boxesChecked.push(allCheckBoxes[i]);
		}
	}
	db.collection(collection_Tasks).onSnapshot(
	function(querySnapshot) 
	{
		querySnapshot.docChanges().forEach(
			function(change)
			{
				for(var i = 0; i < boxesChecked.length; i++)
				{
					if(boxesChecked[i].value == change.doc.id)
					{
						console.log(change.doc.data().is_completed);
						db.collection(collection_Tasks).doc(change.doc.id).set(
						{
							description: change.doc.data().description,
							image: change.doc.data().image,
							is_completed: toggleBoolean,
							task_location: change.doc.data().task_location,
							task_type: change.doc.data().task_type,
							time_stamp: change.doc.data().time_stamp,
							user: change.doc.data().user
						})
						.then(
							function() 
							{
								//alert("Task has been marked as completed!");
								reloadWindowTimed();
							})
						.catch(
							function(error)
							{
								console.error("Error writing document: ", error);
							});
						break;
					}
				}	
			});
	});	
}
//FOR TESTING PURPOSES ONLY
function resetTasks()
{
	db.collection(collection_Tasks).get().then(
		function(querySnapshot) 
		{
			querySnapshot.forEach(
				function(doc) 
				{
					db.collection(collection_Tasks).doc(doc.id).set(
						{
							description: doc.data().description,
							image: doc.data().image,
							is_completed: false,
							task_location: doc.data().task_location,
							task_type: doc.data().task_type,
							time_stamp: doc.data().time_stamp,
							user: doc.data().user
						})
						.then(
							function() 
							{
								//alert("Task has been reset to default!");
								reloadWindowTimed();
							})
						.catch(
							function(error)
							{
								console.error("Error writing document: ", error);
							});
				});
		});
}

function reloadWindowTimed()
{
	setTimeout(function(){ window.location.reload(); }, 300);
}


function formatDatetime(datetimeIn)
{
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var tempDate = new Date(datetimeIn);
	var tempMonth = months[tempDate.getMonth()];
	var tempDay = tempDate.getDate();
	var tempHH = tempDate.getHours();
	var tempMM = tempDate.getMinutes();
	
	if(tempHH < 10 && tempMM < 10)
	{
		return (tempMonth + " " + tempDay + " 0" + tempHH + "0" + tempMM);
	}
	if(tempHH < 10)
	{
		return (tempMonth + " " + tempDay + " 0" + tempHH + tempMM);
	}
	if(tempMM < 10)
	{
		return (tempMonth + " " + tempDay + " " + tempHH + "0" + tempMM);
	}
	return (tempMonth + " " + tempDay + " " + tempHH + tempMM);
}