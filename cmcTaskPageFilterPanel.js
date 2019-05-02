function createTaskPageFilterPanel()
{
	var divNameOut = "floatingTaskFilterPanel";
	document.getElementById(divNameOut).innerHTML = "";
	document.getElementById(divNameOut).innerHTML += "Filter:";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "Task Type:";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<select id='tastTypeSelected'>\
														<option value='All'>All</option>\
														<option value='Litter'>Litter</option>\
														<option value='Trash Can'>Trash Can</option>\
														<option value='Vandalism'>Vandalism</option>\
														<option value='Repair'>Repair</option>\
														<option value='Safety Hazard'>Safety Hazard</option>\
														<option value='Shopping Cart'>Shopping Cart</option>\
														<option value='ADA Report'>ADA</option>\
														<option value='Broken Fixture'>Broken Fixture</option>\
														<option value='General Issues'>General Issues</option>";
	document.getElementById(divNameOut).innerHTML += "</select>";
	document.getElementById(divNameOut).innerHTML += "<button onclick='selectTasksFromTaskTypes()'>Select</button>";
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
	document.getElementById(divNameOut).innerHTML += "<button onclick='selectTasksFromTimeRange()'>Select</button>";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<button onclick='sortTimeStampFunction()'>Sort By Timestamp</button>";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<button onclick='sortTaskTypeFunction()'>Sort By TaskType</button>";
	document.getElementById(divNameOut).innerHTML += "<br>";
	document.getElementById(divNameOut).innerHTML += "<button onclick='showCompletedTasks()' id='toggleCompleted'>Show Completed Tasks</button>";
	document.getElementById(divNameOut).innerHTML += "<button onclick='showCurrentTasks()' id='toggleCurrent'>Show Current Tasks</button>";
	document.getElementById(divNameOut).innerHTML += "<button onclick='groupDuplicateTasks()'>Group Duplicates</button>";
}








