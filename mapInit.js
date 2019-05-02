var db = firebase.firestore();
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

var collection_Zones = "NAU_zones";
var collection_Markers = "NAU_markers";
var collection_Tasks = "tasks";
var collection_ColorDuration = "NAU_zone_duration";

var URLIn = window.location.pathname;
var filename = URLIn.substring(URLIn.lastIndexOf('/') + 1);
var map;
var cmcHeatmap; // Heatmap Variable
var heatMapRadius = 20; // Heatmap Variable
var heatMapMaxIntensity = 20; // Heatmap Variable
var iconList = []; // Heatmap Variable
var mapIcons = []; // Heatmap Variable
var startDateTimeSeconds = 0; // Heatmap Variable
var currentDateTimeSeconds = Math.floor(Date.now()/1000); // Heatmap Variable
var taskStatus = "All"; // Heatmap Variable
var polygonArrayZoneDisplay = []; // Zone Variable
var tempPolyZoneDisplay = []; // Zone Variable // MapEditor Variable
var mapMarkerLocations = []; // Marker Variable
var infoWindow; // MapEditor Variable
var polygonArray = []; // MapEditor Variable
var tempPoly = []; // MapEditor Variable
var mapMarkerLocations = []; // MapEditor Variable
var ableToDelete = false; // MapEditor Variable
var ableToReset = false; // MapEditor Variable
var completeTaskList = [];

var greenCustomTime = 1; // Pull from Database // MapEditor Variable
var yellowCustomTime = 1; // Pull from Database // MapEditor Variable
var orangeCustomTime = 1; // Pull from Database // MapEditor Variable
var greenTime = 1; // MapEditor Variable
var yellowTime = 1; // MapEditor Variable
var orangeTime = 1; // MapEditor Variable

function initializeMap()
{
	var location = new google.maps.LatLng(35.18354547135446, -111.6539989154029);
	var mapZoom = 16;
	map = new google.maps.Map(document.getElementById("mapHTML"),
	{
		center: location,
		zoom: mapZoom,
		styles: [ // https://mapstyle.withgoogle.com/
		{
			"featureType": "poi.business",
			"stylers": [
			{
				"visibility": "off"
			}]
		},
		{
			"featureType": "poi.park",
			"elementType": "labels.text",
			"stylers": [
			{
				"visibility": "off"
			}]
		}]
	});
	
	
	console.log(filename);
	
	if(filename == "home.html")
	{
		getZones();
	}
	
	// Enable ResourceMarker Bar
	if(filename == "home.html" || filename == "cmcMapEditor.html")
	{
		getResourceMarkerInformationFromDB();
	}
	// Enable Heatmap On Map
	if(filename == "cmcHeatmap.html")
	{
		getTasksInformationFromDB();
	}
	if(filename == "cmcMapEditor.html")
	{
		getZoneDuration();
		getTasksInformationFromDBEDITOR();
		setMarkerCreatorListener();
		setPolygonDrawer();
	}
}

function getZones()
{
	db.collection(collection_Zones).get().then(
		function(querySnapshot)
		{
		querySnapshot.forEach(
			function(doc) 
			{
				tempPolyZoneDisplay = [];
				for(var i = 0; i < doc.data().points.length; i++)
				{
					tempPolyZoneDisplay.push(new google.maps.LatLng(doc.data().points[i].latitude, doc.data().points[i].longitude));
				}
				var p = new google.maps.Polygon(
				{
					paths: tempPolyZoneDisplay,
					strokeColor: "#000000",
					strokeWeight: 1,
					fillColor: doc.data().color,
					fillOpacity: 0.45
				});
				polygonArrayZoneDisplay.push(p);
			});
			for(var i = 0; i < polygonArrayZoneDisplay.length; i++)
			{	
				polygonArrayZoneDisplay[i].setMap(map);
			}
		});
}

// START Marker Functions.
function getResourceMarkerInformationFromDB()
{
	db.collection(collection_Markers).get().then(
		function(querySnapshot) 
		{
		querySnapshot.forEach(
			function(doc) 
			{
				addMarkerToMAP(doc.data().point.latitude, doc.data().point.longitude, doc.id, doc.data().markerType);
			});
		});
}

function addMarkerToMAP(lat, lng, uniqueIDIn, markerTypeIn)
{
	var mapMarker = new google.maps.Marker(
	{
		position: new google.maps.LatLng(lat, lng),
		markerID: uniqueIDIn,
		markerType: markerTypeIn,
		icon: getMarkerIcon(markerTypeIn),
		map: map
	});
	mapMarkerLocations.push(mapMarker);
	mapMarker.addListener('click', deleteMapMarkerFromDB);
}

function getMarkerIcon(markerTypeIn)
{
	if(markerTypeIn == "GreenMarker")
	{
		return './images/GreenRecycle_30px.png';
	}
	else if(markerTypeIn == "BlueMarker")
	{
		return './images/BlueRecycle_30px.png';
	}
	else if(markerTypeIn == "BatteryMarker")
	{
		return './images/Battery_30px.png';
	}
	else if(markerTypeIn == "TrashBinMarker")
	{
		return './images/TrashBin_30px.png';
	}
	else if(markerTypeIn == "TemporaryMarker")
	{
		return './images/MoGreenLogo_30px.png';
	} // TASK ICONS AFTER THIS LINE
	else if(markerTypeIn == "Trash Can")
	{
		return './images/TrashBin_30px.png';
	}
	else if(markerTypeIn == "Shopping Cart")
	{
		return './images/ShoppingCart_30px.png';
	}
	else if(markerTypeIn == "General Issues")
	{
		return './images/General_30px.png';
	}
	else if(markerTypeIn == "Safety Hazard")
	{
		return './images/Safety_30px.png';
	}
	else if(markerTypeIn == "ADA Report")
	{
		return './images/ADA_30px.png';
	}
	else if(markerTypeIn == "Litter")
	{
		return './images/Litter_30px.png';
	}
	else if(markerTypeIn == "Vandalism")
	{
		return './images/Vandalism_30px.png';
	}
	else if(markerTypeIn == "Broken Fixture")
	{
		return './images/Fixture_30px.png';
	}
	else if(markerTypeIn == "Repair")
	{
		return './images/Repair_30px.png';
	}
}

function clearMarkersType(nameIn) 
{
	for (var i = 0; i < mapMarkerLocations.length; i++)
	{
		if(nameIn == mapMarkerLocations[i].markerType)
		{
			mapMarkerLocations[i].setMap(null);
		}
	}
}

function showMarkersType(nameIn)
{
	for (var i = 0; i < mapMarkerLocations.length; i++)
	{
		if(nameIn == mapMarkerLocations[i].markerType)
		{
			mapMarkerLocations[i].setMap(map);
		}
	}
}

function clearAllMarkers()
{
	for (var i = 0; i < mapMarkerLocations.length; i++)
	{
		mapMarkerLocations[i].setMap(null);
	}
}
function showAllMarkers()
{
	for (var i = 0; i < mapMarkerLocations.length; i++)
	{
		mapMarkerLocations[i].setMap(map);
	}
}

function deleteMapMarkerFromDB()
{
	if(ableToDelete)
	{
		db.collection(collection_Markers).doc(this.markerID).delete().then(
			function() 
			{
				//console.log("Document successfully deleted!");
			})
			.catch(
				function(error) 
				{
					console.error("Error removing document: ", error);
				});
	}
}
// END Marker Functions.

function getTasksInformationFromDBEDITOR()
{
	var pointArrayTEST = [];
	var pointLatLngTEST = [];
	
	db.collection(collection_Tasks).get().then(
		function(querySnapshot) 
		{
			querySnapshot.forEach(
				function(doc) 
				{
					pointLatLngTEST = [];
					pointLatLngTEST = formatGeopoint(doc.data().task_location);
					pointArrayTEST.push(new google.maps.LatLng(pointLatLngTEST[0],pointLatLngTEST[1]));
					iconList.push([new google.maps.LatLng(pointLatLngTEST[0],pointLatLngTEST[1]), doc.data().task_type, doc.data().time_stamp.seconds, doc.data().is_completed]);
				});
		});
}

// START Heatmap Functions.
function getHeatmapCoordinates()
{
	var pointArray = [];
	var pointLatLng = [];
	db.collection(collection_Tasks).get().then(
		function(querySnapshot) 
		{
			querySnapshot.forEach(
				function(doc) 
				{
					//console.log(doc.data().task_location + " " + doc.data().task_type);
					pointLatLng = [];
					pointLatLng = formatGeopoint(doc.data().task_location);
					pointArray.push(new google.maps.LatLng(pointLatLng[0],pointLatLng[1]));
				});
		});
	//console.log(pointArray);
	return pointArray;
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

function createHeatmap(taskStatusIn = 'All', startTimeIn = startDateTimeSeconds, endTimeIn = currentDateTimeSeconds)
{
	var testArray = [];
	if(taskStatusIn == "All")
	{
		for(var i = 0; i < mapIcons.length; i++)
		{
			if(mapIcons[i].timeStamp >= startTimeIn && mapIcons[i].timeStamp <= endTimeIn)
			{
				testArray.push(new google.maps.LatLng(mapIcons[i].position.lat(), mapIcons[i].position.lng()));
			}
		}
	}
	else if(taskStatusIn == "t")
	{
		for(var i = 0; i < mapIcons.length; i++)
		{
			if(mapIcons[i].timeStamp >= startTimeIn && mapIcons[i].timeStamp <= endTimeIn && mapIcons[i].isCompleted)
			{
				testArray.push(new google.maps.LatLng(mapIcons[i].position.lat(), mapIcons[i].position.lng()));
			}
		}
	}
	else if(taskStatusIn == "f")
	{
		for(var i = 0; i < mapIcons.length; i++)
		{
			if(mapIcons[i].timeStamp >= startTimeIn && mapIcons[i].timeStamp <= endTimeIn && (mapIcons[i].isCompleted === false))
			{
				testArray.push(new google.maps.LatLng(mapIcons[i].position.lat(), mapIcons[i].position.lng()));
			}
		}
	}
	hideHeatmap();
	//data: getHeatmapCoordinates(),
	cmcHeatmap = new google.maps.visualization.HeatmapLayer(
	{
		data: testArray,
		radius: heatMapRadius,
		maxIntensity: heatMapMaxIntensity
	});
	showHeatmap();
}

function showHeatmap()
{
	if(cmcHeatmap)
	{
		cmcHeatmap.setMap(map);
	}
	
}

function hideHeatmap()
{
	if(cmcHeatmap)
	{
		cmcHeatmap.setMap(null);
	}
}

function setHeatMapRadius()
{
	if(cmcHeatmap)
	{
		heatMapRadius = document.getElementById("heatMapRadiusSelection").options[document.getElementById("heatMapRadiusSelection").selectedIndex].value;
		cmcHeatmap.radius = heatMapRadius;
		hideHeatmap();
		showHeatmap();
	}
}

function setHeatMapIntensity()
{
	if(cmcHeatmap)
	{
		heatMapMaxIntensity = document.getElementById("heatMapIntensitySelection").options[document.getElementById("heatMapIntensitySelection").selectedIndex].value;
		cmcHeatmap.maxIntensity = heatMapMaxIntensity;
		hideHeatmap();
		showHeatmap();
	}
}

function getTasksInformationFromDB()
{
	var pointArrayTEST = [];
	var pointLatLngTEST = [];
	
	db.collection(collection_Tasks).get().then(
		function(querySnapshot) 
		{
			querySnapshot.forEach(
				function(doc) 
				{
					pointLatLngTEST = [];
					pointLatLngTEST = formatGeopoint(doc.data().task_location);
					pointArrayTEST.push(new google.maps.LatLng(pointLatLngTEST[0],pointLatLngTEST[1]));
					iconList.push([new google.maps.LatLng(pointLatLngTEST[0],pointLatLngTEST[1]), doc.data().task_type, doc.data().time_stamp.seconds, doc.data().is_completed]);
				});
				for(var i = 0; i < iconList.length; i++)
				{
					//console.log(iconList[i][0] + " " + iconList[i][1]);
					var mapMarker = new google.maps.Marker(
					{
						position: iconList[i][0],
						icon: getMarkerIcon(iconList[i][1]),
						markerType: iconList[i][1],
						timeStamp: iconList[i][2],
						isCompleted: iconList[i][3],
						map: map
					});
					mapIcons.push(mapMarker);
				}
				showAllTaskMarkers();
				/*
				for (var i = 0; i < mapIcons.length; i++)
				{
					mapIcons[i].setMap(map);
				}
				*/
		});
}

function showAllTaskMarkers()
{
	for (var i = 0; i < mapIcons.length; i++)
	{
		mapIcons[i].setMap(map);
	}
}

function clearAllTaskMarkers()
{
	for (var i = 0; i < mapIcons.length; i++)
	{
		mapIcons[i].setMap(null);
	}
}

function showTaskMarkersType(nameIn, startTimeIn = startDateTimeSeconds, endTimeIn = currentDateTimeSeconds, taskStatusIn = taskStatus)
{
	clearAllTaskMarkers();
	console.log(nameIn + " " + startTimeIn + " " + endTimeIn + " " + taskStatusIn);
	//nameIn = document.getElementById("markerTaskTypeSelected").options[document.getElementById("markerTaskTypeSelected").selectedIndex].value;
	for (var i = 0; i < mapIcons.length; i++)
	{
		//console.log(nameIn + " " + startTimeIn + " " + endTimeIn + " " + taskStatusIn);
		if(nameIn == mapIcons[i].markerType && mapIcons[i].timeStamp >= startTimeIn && mapIcons[i].timeStamp <= endTimeIn && taskStatusIn == "All")
		{
			mapIcons[i].setMap(map);
		}
		else if(nameIn == mapIcons[i].markerType && mapIcons[i].timeStamp >= startTimeIn && mapIcons[i].timeStamp <= endTimeIn && mapIcons[i].isCompleted)
		{
			if(taskStatusIn == 't')
			{
				mapIcons[i].setMap(map);
			}
		}
		else if(nameIn == mapIcons[i].markerType && mapIcons[i].timeStamp >= startTimeIn && mapIcons[i].timeStamp <= endTimeIn && !mapIcons[i].isCompleted)
		{
			if(taskStatusIn == 'f')
			{
				mapIcons[i].setMap(map);
			}
		}
		else if(nameIn == "All" && mapIcons[i].timeStamp >= startTimeIn && mapIcons[i].timeStamp <= endTimeIn && taskStatusIn == "All")
		{
			mapIcons[i].setMap(map);
		}
		else if(nameIn == "All" && mapIcons[i].timeStamp >= startTimeIn && mapIcons[i].timeStamp <= endTimeIn && mapIcons[i].isCompleted)
		{
			if(taskStatusIn == 't')
			{
				mapIcons[i].setMap(map);
			}
		}
		else if(nameIn == "All" && mapIcons[i].timeStamp >= startTimeIn && mapIcons[i].timeStamp <= endTimeIn && !mapIcons[i].isCompleted)
		{
			if(taskStatusIn == 'f')
			{
				mapIcons[i].setMap(map);
			}
		}
		else if(nameIn == "HeatMap" && taskStatusIn == "All")
		{
			createHeatmap("All");
			break;
		}
		else if(nameIn == "HeatMap" && taskStatusIn == "t")
		{
			createHeatmap("t");
			break;
		}
		else if(nameIn == "HeatMap" && taskStatusIn == "f")
		{
			createHeatmap("f");
			break;
		}
	}
}

function clearTaskMarkersType(nameIn) 
{
	for (var i = 0; i < mapIcons.length; i++)
	{
		if(nameIn == mapIcons[i].markerType)
		{
			mapIcons[i].setMap(null);
		}
	}
}

function selectTaskTypesToShow()
{
	clearAllTaskMarkers();
	if(document.getElementById("markerTaskTypeSelected").options[document.getElementById("markerTaskTypeSelected").selectedIndex].value == "HeatMap")
	{
		showTaskMarkersType(document.getElementById("markerTaskTypeSelected").options[document.getElementById("markerTaskTypeSelected").selectedIndex].value, startDateTimeSeconds, currentDateTimeSeconds, taskStatus);
	}
	else
	{
		showTaskMarkersType(document.getElementById("markerTaskTypeSelected").options[document.getElementById("markerTaskTypeSelected").selectedIndex].value, startDateTimeSeconds, currentDateTimeSeconds, taskStatus);
	}
}

function selectShowTasksWithStatus() // BROKEN STILL NEEDS TO BE FIXED - 20190408
{
	taskStatus = document.getElementById("isCompletedSelected").options[document.getElementById("isCompletedSelected").selectedIndex].value;
	selectTaskTypesToShow();
}

function selectTasksMarkersFromTimeRange()
{
	var tempValue;
	var firstMonth = document.getElementById("firstMon").options[document.getElementById("firstMon").selectedIndex].value;
	var firstDay = document.getElementById("firstDay").options[document.getElementById("firstDay").selectedIndex].value;
	var firstYear = document.getElementById("firstYear").options[document.getElementById("firstYear").selectedIndex].value;
	var secondMonth = document.getElementById("secondMon").options[document.getElementById("secondMon").selectedIndex].value;
	var secondDay = document.getElementById("secondDay").options[document.getElementById("secondDay").selectedIndex].value;
	var secondYear = document.getElementById("secondYear").options[document.getElementById("secondYear").selectedIndex].value;
	startDateTimeSeconds = new Date(firstMonth + " " + firstDay + ", " + firstYear + " " + "23:59:59").getTime() / 1000;
	currentDateTimeSeconds = new Date(secondMonth + " " + secondDay + ", " + secondYear + " " + "23:59:59").getTime() / 1000;
	if(startDateTimeSeconds >= currentDateTimeSeconds)
	{
		tempValue = startDateTimeSeconds;
		startDateTimeSeconds = currentDateTimeSeconds;
		currentDateTimeSeconds = tempValue;
	}
	selectTaskTypesToShow();
}

// END Heatmap Functions.

// START MapEditor Functions.
function setZoneColor()
{
	var dateStampSeconds = Math.floor(Date.now()/1000); // TIMESTAMP TEST
	var timeDifference = 0;
	var zoneColor = "#40ff00"
	// TIMESTAMP TEST 604800: 7 days
	// TIMESTAMP TEST 86400: 1 day
	// GREEN: "#40ff00"
	// YELLOW: "#f1f442"
	// Orange: "#ff951c"
	// Red: "#ff0000"
	//console.log((greenTime * 86400) + " " + (yellowTime * 86400) + " " + (orangeTime * 86400));
	db.collection(collection_Zones).get().then( 
		function(querySnapshot) 
		{
		querySnapshot.forEach(
			function(doc) 
			{
				tempPoly = [];
				for(var i = 0; i < doc.data().points.length; i++)
				{
					tempPoly.push(new google.maps.LatLng(doc.data().points[i].latitude, doc.data().points[i].longitude));
					//console.log(dateStampSeconds); // TIMESTAMP TEST
					//console.log(doc.data().zoneTimeStamp); // TIMESTAMP TEST
					//console.log(dateStampSeconds - doc.data().zoneTimeStamp.seconds); 
					//console.log(new Date(doc.data().zoneTimeStamp.seconds * 1000)); // TIMESTAMP TEST
					//console.log(new Date((dateStampSeconds - 86400) * 1000)); // TIMESTAMP TEST
				}
				timeDifference = dateStampSeconds - doc.data().zoneTimeStamp.seconds;
				//console.log(timeDifference);
				if(timeDifference >= 0 && timeDifference < (greenTime * 86400))
				{
					zoneColor = "#40ff00";
				}
				else if(timeDifference >= (greenTime * 86400) && timeDifference < (yellowTime * 86400))
				{
					zoneColor = "#f1f442";
				}
				else if(timeDifference >= (yellowTime * 86400) && timeDifference < (orangeTime * 86400))
				{
					zoneColor = "#ff951c";
				}
				else
				{
					zoneColor = "#ff0000";
				}
				var p = new google.maps.Polygon(
				{
					paths: tempPoly,
					docID: doc.id,
					strokeColor: "#000000",
					strokeWeight: 1,
					fillColor: zoneColor,
					fillOpacity: 0.45,
					clickable: true,
					editable: false
				});
				p.addListener('click', deleteZoneFromDB);
				p.addListener('click', resetZoneColor);
				p.addListener('click', displayZoneID);
				polygonArray.push(p);
				
			});
			setZonesOnMap(map);
		});
}

function displayZoneID()
{
	console.log(this.docID);
}

function setMarkerCreatorListener()
{
	google.maps.event.addListener(map, 'click',
		function(e)
		{
			var chosenMarkerIcon = document.getElementsByName("markerMapChoice");
			for(var i = 0; i < chosenMarkerIcon.length; i++)
			{
				if(chosenMarkerIcon[i].checked)
				{
					chosenMarkerIcon = chosenMarkerIcon[i].value;
					break;
				}
			}

			if(chosenMarkerIcon == "None")
			{
				// Do Nothing
				var contentString = '<b> Location Clicked</b><br>' + e.latLng.lat() + ", " + e.latLng.lng() + '<br>';
				infoWindow.setContent(contentString);
				infoWindow.setPosition(e.latLng);
				infoWindow.open(map);
			}
			else if(chosenMarkerIcon == "GreenMarker")
			{
				db.collection(collection_Markers).doc().set(
				{
					point: new firebase.firestore.GeoPoint(e.latLng.lat(), e.latLng.lng()),
					markerType: "GreenMarker",
				})
				.then(
					function() 
					{
						//alert("Green coordinate successfully added!");
						mapMarkerLocations = [];
						getResourceMarkerInformationFromDB();
						showMarkersType("GreenMarker");
					})
				.catch(
					function(error) 
					{
						console.error("Error writing document: ", error);
					});
			}
			else if(chosenMarkerIcon == "BlueMarker")
			{
				db.collection(collection_Markers).doc().set(
				{
					point: new firebase.firestore.GeoPoint(e.latLng.lat(), e.latLng.lng()),
					markerType: "BlueMarker"
				})
				.then(
					function() 
					{
						//alert("Blue coordinate successfully added!");
						mapMarkerLocations = [];
						getResourceMarkerInformationFromDB();
						showMarkersType("BlueMarker");
					})
				.catch(
					function(error) 
					{
						console.error("Error writing document: ", error);
					});
			}
			else if(chosenMarkerIcon == "BatteryMarker")
			{
				db.collection(collection_Markers).doc().set(
				{
					point: new firebase.firestore.GeoPoint(e.latLng.lat(), e.latLng.lng()),
					markerType: "BatteryMarker"
				})
				.then(
					function() 
					{
						//alert("Battery coordinate successfully added!");
						mapMarkerLocations = [];
						getResourceMarkerInformationFromDB();
						showMarkersType("BatteryMarker");
					})
				.catch(
					function(error) 
					{
						console.error("Error writing document: ", error);
					});
			}
			else if(chosenMarkerIcon == "TrashBinMarker")
			{
				db.collection(collection_Markers).doc().set(
				{
					point: new firebase.firestore.GeoPoint(e.latLng.lat(), e.latLng.lng()),
					markerType: "TrashBinMarker"
				})
				.then(
					function() 
					{
						//alert("Battery coordinate successfully added!");
						mapMarkerLocations = [];
						getResourceMarkerInformationFromDB();
						showMarkersType("TrashBinMarker");
					})
				.catch(
					function(error) 
					{
						console.error("Error writing document: ", error);
					});
			}
			else if(chosenMarkerIcon == "TemporaryMarker")
			{
				db.collection(collection_Markers).doc().set(
				{
					point: new firebase.firestore.GeoPoint(e.latLng.lat(), e.latLng.lng()),
					markerType: "TemporaryMarker"
				})
				.then(
					function() 
					{
						//alert("Battery coordinate successfully added!");
						mapMarkerLocations = [];
						getResourceMarkerInformationFromDB();
						showMarkersType("TemporaryMarker");
					})
				.catch(
					function(error) 
					{
						console.error("Error writing document: ", error);
					});
			}
		});
	infoWindow = new google.maps.InfoWindow;
}

function setPolygonDrawer()
{
	var drawingManager = new google.maps.drawing.DrawingManager(
	{
		drawingMode: google.maps.drawing.OverlayType.NONE,
		drawingControl: true,
		drawingControlOptions:
		{
			position: google.maps.ControlPosition.BOTTOM_CENTER,
			drawingModes: ['polygon']
		},
		polygonOptions:
		{
			fillColor: "#40ff00",
			fillOpacity: 0.45,
			strokeWeight: 1,
			clickable: true,
			editable: false,
			zIndex: 0
		}
	});
	drawingManager.setMap(map);
	// END Drawing Polygons.

	// START Polygon Creator Value To Console Log And Database.
	google.maps.event.addListener(drawingManager, 'polygoncomplete',
		function(e)
		{
			/* // For Testing.
			console.log("Polygon Created")
			e.getPath().getArray().forEach(
				function(value, index, arrayIn)
				{
					console.log(" Point: " + index + " Lat/Lng: " + value);
				})
			*/
			addPolygonPoints(e.getPath().getArray());
		});
}

function setZonesOnMap(map) 
{
	for (var i = 0; i < polygonArray.length; i++)
	{
		polygonArray[i].setMap(map);
	}
	if(ableToDelete == true)
	{
		modifyPolygonPoints(polygonArray, false);
	}
}

function showZonesOnMap()
{
	for (var i = 0; i < polygonArray.length; i++)
	{
		polygonArray[i].setMap(map);
	}
}

function removeZonesOnMap()
{
	setZonesOnMap(null);
}

function toggleEditableZones()
{
	for(var i = 0; i < polygonArray.length; i++)
	{	
		if(polygonArray[i].editable == false)
		{
			polygonArray[i].setOptions({editable: true});
		}
		else
		{
			polygonArray[i].setOptions({editable: false});
		}
		//console.log(polygonArray[i].editable);
	}
	removeZonesOnMap();
	setZonesOnMap(map);
}

function addPolygonPoints(polygonIn)
{
	var arrayToDB = Array();
	polygonIn.forEach(
		function(value, index, arrayIn) 
		{
			arrayToDB.push(new firebase.firestore.GeoPoint(value.lat(), value.lng()));
		});
	db.collection(collection_Zones).doc().set(
	{
		color: "#40ff00",
		zoneTimeStamp: new Date(),
		points: arrayToDB
	})
	.then(
		function() 
		{
			//alert("Coordinate successfully added!");
		})
	.catch(
		function(error) 
		{
			console.error("Error writing document: ", error);
		});
}

function savePointChanges()
{
	modifyPolygonPoints(polygonArray, false);
	updateLastManualUpdate();
}

function modifyPolygonPoints(polygonIn, msgDisplay)
{
	var arrayToDB = Array();
	db.collection(collection_Zones).onSnapshot(
		function(querySnapshot) 
		{
			querySnapshot.docChanges().forEach(
				function(change)
				{
					for(var i = 0; i < polygonIn.length; i++)
					{
						for(var j = 0; j < polygonIn[i].getPath().getArray().length; j++)
						{
							arrayToDB.push(new firebase.firestore.GeoPoint(polygonIn[i].getPath().getArray()[j].lat(), polygonIn[i].getPath().getArray()[j].lng()));
							
						}
						if(change.doc.id == polygonIn[i].docID)
						{
							//console.log("This is the matching doc: " + change.doc.id + " " + polygonIn[i].docID);
							//console.log(polygonIn[i].fillColor);
							db.collection(collection_Zones).doc(change.doc.id).set(
								{
									color: polygonIn[i].fillColor,
									zoneTimeStamp: change.doc.data().zoneTimeStamp,
									points: arrayToDB
								})
								.then(
									function() 
									{
										//alert("Coordinate(s) successfully Modified!");
									})
								.catch(
									function(error)
									{
										console.error("Error writing document: ", error);
									})
						}
						arrayToDB = [];
					}
				});
		});
	if(msgDisplay == true)
	{
		alert("Coordinate(s) successfully Modified!");
	}
}

function deleteZoneFromDB()
{
	if(ableToDelete)
	{
		console.log(this.docID);
		db.collection(collection_Zones).doc(this.docID).delete().then(
			function() 
			{
				console.log("Document successfully deleted!");
			})
			.catch(
				function(error) 
				{
					console.error("Error removing document: ", error);
				});
	}
}

function resetZoneColor()
{
	var currentTime = new Date(Date.now());
	var currentTimeSeconds = Math.floor(Date.now()/1000);
	var tempUniqueID = this.docID;
	if(ableToReset)
	{
		db.collection(collection_Zones).onSnapshot(
			function(querySnapshot) 
			{
				querySnapshot.docChanges().forEach(
					function(change)
					{
						//console.log(tempUniqueID + " " + change.doc.id);
						if(tempUniqueID == change.doc.id && (currentTimeSeconds - change.doc.data().zoneTimeStamp.seconds) > 60)
						{
							db.collection(collection_Zones).doc(change.doc.id).set(
							{
								color: change.doc.data().color,
								points: change.doc.data().points,
								zoneTimeStamp: currentTime
							})
							.then(
								function() 
								{
									//alert("Task has been marked as completed!");
								})
							.catch(
								function(error)
								{
									console.error("Error writing document: ", error);
								});
						}								
					});
			});						
	}	
}

function toggleDeleting()
{
	if(ableToDelete == false)
	{
		ableToDelete = true;
	}
	else
	{
		ableToDelete = false;
	}
	console.log(ableToDelete);
}

function toggleResetZoneColor()
{
	if(ableToReset == false)
	{
		ableToReset = true;
	}
	else
	{
		ableToReset = false;
	}
}

function getZoneDuration()
{
	db.collection(collection_ColorDuration).get().then(
		function(querySnapshot)
		{
			querySnapshot.forEach(
				function(doc) 
				{
					greenCustomTime = doc.data().greenZoneDuration;
					yellowCustomTime = doc.data().yellowZoneDuration;
					orangeCustomTime = doc.data().orangeZoneDuration;
					//console.log(greenCustomTime + " " + yellowCustomTime + " " + orangeCustomTime);
					greenTime = greenCustomTime;
					yellowTime = greenCustomTime + yellowCustomTime;
					orangeTime = greenCustomTime + yellowCustomTime + orangeCustomTime;
					//console.log(greenTime + " " + yellowTime + " " + orangeTime);
				});
			setZoneColor();
			setDurationArray();
		});
}

function setGreenInterval()
{
	var testValue = document.getElementsByName("greenInterval");
	if(testValue[0].value <= 0)
	{
		alert("Error: Please enter a number greater than 0.");
		
	}
	else
	{
		//console.log(parseInt(testValue[0].value, 10) * 5);
		db.collection(collection_ColorDuration).get().then(
		function(querySnapshot)
		{
		querySnapshot.forEach(
			function(doc) 
			{
				//console.log(doc.id);
				db.collection(collection_ColorDuration).doc(doc.id).set(
				{
					greenZoneDuration: parseInt(testValue[0].value, 10),
					yellowZoneDuration: doc.data().yellowZoneDuration,
					orangeZoneDuration: doc.data().orangeZoneDuration,
					lastZoneUpdate: doc.data().lastZoneUpdate
				})
				.then(
					function() 
					{
						//alert("greenZoneDuration has been changed!");
					})
				.catch(
					function(error)
					{
						console.error("Error writing document: ", error);
					});
				greenCustomTime = doc.data().greenZoneDuration;
				yellowCustomTime = doc.data().yellowZoneDuration;
				orangeCustomTime = doc.data().orangeZoneDuration;
				console.log(greenCustomTime + " " + yellowCustomTime + " " + orangeCustomTime);
				greenTime = greenCustomTime;
				yellowTime = greenCustomTime + yellowCustomTime;
				orangeTime = greenCustomTime + yellowCustomTime + orangeCustomTime;
				console.log(greenTime + " " + yellowTime + " " + orangeTime);
			});
			//setZoneColor(); //Needs a refreshZoneColor(); function.
		});
		setDurationArray();
	}
}

function setYellowInterval()
{
	var testValue = document.getElementsByName("yellowInterval");
	if(testValue[0].value <= 0)
	{
		alert("Error: Please enter a number greater than 0.");
		
	}
	else
	{
		//console.log(parseInt(testValue[0].value, 10) * 5);
		db.collection(collection_ColorDuration).get().then(
		function(querySnapshot)
		{
		querySnapshot.forEach(
			function(doc) 
			{
				//console.log(doc.id);
				db.collection(collection_ColorDuration).doc(doc.id).set(
				{
					greenZoneDuration: doc.data().greenZoneDuration,
					yellowZoneDuration: parseInt(testValue[0].value, 10),
					orangeZoneDuration: doc.data().orangeZoneDuration,
					lastZoneUpdate: doc.data().lastZoneUpdate
				})
				.then(
					function() 
					{
						//alert("yellowZoneDuration has been changed!");
					})
				.catch(
					function(error)
					{
						console.error("Error writing document: ", error);
					});
				greenCustomTime = doc.data().greenZoneDuration;
				yellowCustomTime = doc.data().yellowZoneDuration;
				orangeCustomTime = doc.data().orangeZoneDuration;
				console.log(greenCustomTime + " " + yellowCustomTime + " " + orangeCustomTime);
				greenTime = greenCustomTime;
				yellowTime = greenCustomTime + yellowCustomTime;
				orangeTime = greenCustomTime + yellowCustomTime + orangeCustomTime;
				console.log(greenTime + " " + yellowTime + " " + orangeTime);
			});
			//setZoneColor(); //Needs a refreshZoneColor(); function.
		});
		setDurationArray();
	}
}
function setOrangeInterval()
{
	var testValue = document.getElementsByName("orangeInterval");
	if(testValue[0].value <= 0)
	{
		alert("Error: Please enter a number greater than 0.");
	}
	else
	{
		//console.log(parseInt(testValue[0].value, 10) * 5);
		db.collection(collection_ColorDuration).get().then(
			function(querySnapshot)
			{
			querySnapshot.forEach(
				function(doc) 
				{
					//console.log(doc.id);
					db.collection(collection_ColorDuration).doc(doc.id).set(
					{
						greenZoneDuration: doc.data().greenZoneDuration,
						yellowZoneDuration: doc.data().yellowZoneDuration,
						orangeZoneDuration: parseInt(testValue[0].value, 10),
						lastZoneUpdate: doc.data().lastZoneUpdate
					})
					.then(
						function() 
						{
							//alert("orangeZoneDuration has been changed!");
						})
					.catch(
						function(error)
						{
							console.error("Error writing document: ", error);
						});
					greenCustomTime = doc.data().greenZoneDuration;
					yellowCustomTime = doc.data().yellowZoneDuration;
					orangeCustomTime = doc.data().orangeZoneDuration;
					console.log(greenCustomTime + " " + yellowCustomTime + " " + orangeCustomTime);
					greenTime = greenCustomTime;
					yellowTime = greenCustomTime + yellowCustomTime;
					orangeTime = greenCustomTime + yellowCustomTime + orangeCustomTime;
					console.log(greenTime + " " + yellowTime + " " + orangeTime);
				});
				//setZoneColor(); //Needs a refreshZoneColor(); function.
			});
		setDurationArray();
	}
}

var arrayOfDurations = [];
function setDurationArray()
{
	db.collection(collection_ColorDuration).onSnapshot(
		function(querySnapshot) 
		{
			querySnapshot.docChanges().forEach(
				function(change)
				{
					//console.log("TEST :" + change.doc.data().greenZoneDuration);
					arrayOfDurations[0] = change.doc.data().greenZoneDuration;
					arrayOfDurations[1] = change.doc.data().yellowZoneDuration;
					arrayOfDurations[2] = change.doc.data().orangeZoneDuration;
					arrayOfDurations[3] = change.doc.data().lastZoneUpdate;
				});
				//console.log("TEST :" + arrayOfDurations);
				displayEditorArray();
		});
}

function displayEditorArray()
{
	duration_list_div.innerHTML = ""
	duration_list_div.innerHTML += "Last Manual Update: " + new Date(arrayOfDurations[3] * 1000) + "<br>"
	duration_list_div.innerHTML += "Current G Timer: " + "[" + arrayOfDurations[0] + "] " + "1 - " + arrayOfDurations[0] + " days<br>"
	duration_list_div.innerHTML += "Current Y Timer: " + "[" + arrayOfDurations[1] + "] " + (arrayOfDurations[0] + 1) + " - " + (arrayOfDurations[0] + arrayOfDurations[1]) + " days<br>"
	duration_list_div.innerHTML += "Current O Timer: " + "[" + arrayOfDurations[2] + "] " + (arrayOfDurations[0] + arrayOfDurations[1] + 1) + " - " + (arrayOfDurations[0] + arrayOfDurations[1] + arrayOfDurations[2]) + " days<br>"
	duration_list_div.innerHTML += "Current R Timer: " + (arrayOfDurations[0] + arrayOfDurations[1] + arrayOfDurations[2] + 1) + "+ days"
}

function updateLastManualUpdate()
{
	db.collection(collection_ColorDuration).get().then(
		function(querySnapshot)
		{
		querySnapshot.forEach(
			function(doc) 
			{
				//console.log(doc.id);
				db.collection(collection_ColorDuration).doc(doc.id).set(
				{
					greenZoneDuration: doc.data().greenZoneDuration,
					yellowZoneDuration: doc.data().yellowZoneDuration,
					orangeZoneDuration: doc.data().orangeZoneDuration,
					lastZoneUpdate: Math.floor(Date.now()/1000)
				})
				.then(
					function() 
					{
						//alert("orangeZoneDuration has been changed!");
					})
				.catch(
					function(error)
					{
						console.error("Error writing document: ", error);
					});
			});
		});
	displayEditorArray();
}

function saveTaskTimeChanges()
{
	var testPoint;
	var tempDOCID;
	for(var i = 0; i < polygonArray.length; i++)
	{
		for(var j = 0; j < iconList.length; j++)
		{
			tempDOCID = polygonArray[i].docID;
			testPoint = new google.maps.LatLng(iconList[j][0].lat(), iconList[j][0].lng());
			if(google.maps.geometry.poly.containsLocation(testPoint, polygonArray[i]))
			{
				console.log(google.maps.geometry.poly.containsLocation(testPoint, polygonArray[i]) + " " + polygonArray[i].docID + " " + iconList[j][1]);
			}
		}
	}
}
// END MapEditor Functions.