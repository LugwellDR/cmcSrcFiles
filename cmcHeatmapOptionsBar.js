function createHeatmapOptionsPanel()
{
	var divNameOut = "floatingMarkerDisplayPanel";
	
	document.getElementById(divNameOut).innerHTML += "Hide or Show ReportTypes:";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='clearTaskMarkersType(this.name)' name='Litter' type=button value='Hide'>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='showTaskMarkersType(this.name)' name='Litter' type=button value='Show'>";
	document.getElementById(divNameOut).innerHTML += "<img src='./images/Litter_30px.png' height=15px> Litter";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='clearTaskMarkersType(this.name)' name='Trash Can' type=button value='Hide'>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='showTaskMarkersType(this.name)' name='Trash Can' type=button value='Show'>";
	document.getElementById(divNameOut).innerHTML += "<img src='./images/TrashBin_30px.png' height=15px> Trash Can";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='clearTaskMarkersType(this.name)' name='Vandalism' type=button value='Hide'>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='showTaskMarkersType(this.name)' name='Vandalism' type=button value='Show'>";
	document.getElementById(divNameOut).innerHTML += "<img src='./images/Vandalism_30px.png' height=15px> Vandalism";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='clearTaskMarkersType(this.name)' name='Safety Hazard' type=button value='Hide'>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='showTaskMarkersType(this.name)' name='Safety Hazard' type=button value='Show'>";
	document.getElementById(divNameOut).innerHTML += "<img src='./images/Safety_30px.png' height=15px> Safety Hazard";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='clearTaskMarkersType(this.name)' name='Shopping Cart' type=button value='Hide'>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='showTaskMarkersType(this.name)' name='Shopping Cart' type=button value='Show'>";
	document.getElementById(divNameOut).innerHTML += "<img src='./images/ShoppingCart_30px.png' height=15px> Shopping Cart";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='clearTaskMarkersType(this.name)' name='ADA Report' type=button value='Hide'>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='showTaskMarkersType(this.name)' name='ADA Report' type=button value='Show'>";
	document.getElementById(divNameOut).innerHTML += "<img src='./images/ADA_30px.png' height=15px> ADA Report";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='clearTaskMarkersType(this.name)' name='Broken Fixture' type=button value='Hide'>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='showTaskMarkersType(this.name)' name='Broken Fixture' type=button value='Show'>";
	document.getElementById(divNameOut).innerHTML += "<img src='./images/Fixture_30px.png' height=15px> Broken Fixture";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='clearTaskMarkersType(this.name)' name='General Issues' type=button value='Hide'>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='showTaskMarkersType(this.name)' name='General Issues' type=button value='Show'>";
	document.getElementById(divNameOut).innerHTML += "<img src='./images/General_30px.png' height=15px> General Issues";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='clearTaskMarkersType(this.name)' name='Repair' type=button value='Hide'>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='showTaskMarkersType(this.name)' name='Repair' type=button value='Show'>";
	document.getElementById(divNameOut).innerHTML += "<img src='./images/Repair_30px.png' height=15px> Repair";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='clearAllTaskMarkers()' name='Hide_All' type=button value='Hide'>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='showAllTaskMarkers()' name='Show_All' type=button value='Show'> All Task Markers";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='hideHeatmap()' type=button value='Hide'>";
	document.getElementById(divNameOut).innerHTML += "<input onclick='showHeatmap()' type=button value='Show'> Heatmap";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "Customize Heatmap:";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "Create Heatmap ";
	document.getElementById(divNameOut).innerHTML += "<input type=button onclick='createHeatmap()' value='Generate'>";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<select id='heatMapRadiusSelection'>\
														<option value=5>5 (Small)</option>\
														<option value=10 >10</option>\
														<option value=15>15</option>\
														<option value=20 selected='selected'>20 (Default)</option>\
														<option value=25>25</option>\
														<option value=30>30</option>\
														<option value=35>35</option>\
														<option value=40>40 (Large)</option>";
	document.getElementById(divNameOut).innerHTML += "</select>";
	document.getElementById(divNameOut).innerHTML += "<button onclick='setHeatMapRadius()'>Set Radius</button><br>";
	document.getElementById(divNameOut).innerHTML += "<select id='heatMapIntensitySelection'>\
														<option value=40>40 (Weak)</option>\
														<option value=35>35</option>\
														<option value=30>30</option>\
														<option value=25>25</option>\
														<option value=20 selected='selected'>20 (Default)</option>\
														<option value=15>15</option>\
														<option value=10 >10</option>\
														<option value=5>5 (Strong)</option>";
	document.getElementById(divNameOut).innerHTML += "</select>";
	document.getElementById(divNameOut).innerHTML += "<button onclick='setHeatMapIntensity()'>Set Intensity</button>";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "Filter:";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "Task Type:";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<select id='markerTaskTypeSelected'>\
														<option value='All'>All</option>\
														<option value='HeatMap'>Heat Map (InProgress)</option>\
														<option value='Litter'>Litter</option>\
														<option value='Trash Can'>Trash Can</option>\
														<option value='Vandalism'>Vandalism</option>\
														<option value='Safety Hazard'>Safety Hazard</option>\
														<option value='Shopping Cart'>Shopping Cart</option>\
														<option value='ADA Report'>ADA Report</option>\
														<option value='Broken Fixture'>Broken Fixture</option>\
														<option value='General Issues'>General Issues</option>\
														<option value='Repair'>Repair</option>";
	document.getElementById(divNameOut).innerHTML += "</select>";
	document.getElementById(divNameOut).innerHTML += "<button onclick='selectTaskTypesToShow()'>Select</button>";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "Task Status:";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<select id='isCompletedSelected'>\
														<option value='All' selected='selected'>All Tasks (Default)</option>\
														<option value='t'>Completed Tasks(InProgress)</option>\
														<option value='f'>Pending Tasks(InProgress)</option>";
	document.getElementById(divNameOut).innerHTML += "</select>";
	document.getElementById(divNameOut).innerHTML += "<button onclick='selectShowTasksWithStatus()'>Select</button>";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "Time Range:";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<select id='firstMon'>\
														<option value='Jan'>Jan</option>\
														<option value='Feb'>Feb</option>\
														<option value='Mar'>Mar</option>\
														<option value='Apr'>Apr</option>\
														<option value='May'>May</option>\
														<option value='Jun'>Jun</option>\
														<option value='Jul'>Jul</option>\
														<option value='Aug'>Aug</option>\
														<option value='Sep'>Sep</option>\
														<option value='Oct'>Oct</option>\
														<option value='Nov'>Nov</option>\
														<option value='Dec'>Dec</option>";
	document.getElementById(divNameOut).innerHTML += "</select>";
	document.getElementById(divNameOut).innerHTML += "<select id='firstDay'>\
														<option value='1'>1</option>\
														<option value='2'>2</option>\
														<option value='3'>3</option>\
														<option value='4'>4</option>\
														<option value='5'>5</option>\
														<option value='6'>6</option>\
														<option value='7'>7</option>\
														<option value='8'>8</option>\
														<option value='9'>9</option>\
														<option value='10'>10</option>\
														<option value='11'>11</option>\
														<option value='12'>12</option>\
														<option value='13'>13</option>\
														<option value='14'>14</option>\
														<option value='15'>15</option>\
														<option value='16'>16</option>\
														<option value='17'>17</option>\
														<option value='18'>18</option>\
														<option value='19'>19</option>\
														<option value='20'>20</option>\
														<option value='21'>21</option>\
														<option value='22'>22</option>\
														<option value='23'>23</option>\
														<option value='24'>24</option>\
														<option value='25'>25</option>\
														<option value='26'>26</option>\
														<option value='27'>27</option>\
														<option value='28'>28</option>\
														<option value='29'>29</option>\
														<option value='30'>30</option>\
														<option value='31'>31</option>";
	document.getElementById(divNameOut).innerHTML += "</select>";
	document.getElementById(divNameOut).innerHTML += "<select id='firstYear'>\
														<option value='2019'>2019</option>\
														<option value='2020'>2020</option>\
														<option value='2021'>2021</option>\
														<option value='2022'>2022</option>";
	document.getElementById(divNameOut).innerHTML += "</select>";
	document.getElementById(divNameOut).innerHTML += " to";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<select id='secondMon'>\
														<option value='Jan'>Jan</option>\
														<option value='Feb'>Feb</option>\
														<option value='Mar'>Mar</option>\
														<option value='Apr'>Apr</option>\
														<option value='May'>May</option>\
														<option value='Jun'>Jun</option>\
														<option value='Jul'>Jul</option>\
														<option value='Aug'>Aug</option>\
														<option value='Sep'>Sep</option>\
														<option value='Oct'>Oct</option>\
														<option value='Nov'>Nov</option>\
														<option value='Dec'>Dec</option>";
	document.getElementById(divNameOut).innerHTML += "</select>";
	document.getElementById(divNameOut).innerHTML += "<select id='secondDay'>\
														<option value='1'>1</option>\
														<option value='2'>2</option>\
														<option value='3'>3</option>\
														<option value='4'>4</option>\
														<option value='5'>5</option>\
														<option value='6'>6</option>\
														<option value='7'>7</option>\
														<option value='8'>8</option>\
														<option value='9'>9</option>\
														<option value='10'>10</option>\
														<option value='11'>11</option>\
														<option value='12'>12</option>\
														<option value='13'>13</option>\
														<option value='14'>14</option>\
														<option value='15'>15</option>\
														<option value='16'>16</option>\
														<option value='17'>17</option>\
														<option value='18'>18</option>\
														<option value='19'>19</option>\
														<option value='20'>20</option>\
														<option value='21'>21</option>\
														<option value='22'>22</option>\
														<option value='23'>23</option>\
														<option value='24'>24</option>\
														<option value='25'>25</option>\
														<option value='26'>26</option>\
														<option value='27'>27</option>\
														<option value='28'>28</option>\
														<option value='29'>29</option>\
														<option value='30'>30</option>\
														<option value='31'>31</option>";
	document.getElementById(divNameOut).innerHTML += "</select>";
	document.getElementById(divNameOut).innerHTML += "<select id='secondYear'>\
														<option value='2019'>2019</option>\
														<option value='2020'>2020</option>\
														<option value='2021'>2021</option>\
														<option value='2022'>2022</option>";
	document.getElementById(divNameOut).innerHTML += "</select>";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<button onclick='selectTasksMarkersFromTimeRange()'>Select</button>";
}
