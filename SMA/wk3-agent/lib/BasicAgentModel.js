var WINDOWBORDERSIZE = 10;
var HUGE = 999999; //Sometimes useful when testing for big or small numbers
var animationDelay = 200; //controls simulation and transition speed
var isRunning = false; // used in simStep and toggleSimStep
var surface; // Set in the redrawWindow function. It is the D3 selection of the svg drawing surface
var simTimer; // Set in the initialization function

//The drawing surface will be divided into logical cells
var maxCols = 40;
var cellWidth; //cellWidth is calculated in the redrawWindow function
var cellHeight; //cellHeight is calculated in the redrawWindow function

//You are free to change images to suit your purpose. These images came from icons-land.com. 
// The copyright rules for icons-land.com require a backlink on any page where they appear. 
// See the credits element on the html page for an example of how to comply with this rule.
const urlPatientA = "images/People-Patient-Female-icon.png";
const urlPatientB = "images/People-Patient-Male-icon.png";
const urlDoctor1 = "images/Doctor_Female.png";
const urlDoctor2 = "images/Doctor_Male.png";
const urlReceptionist ="images/receptionist-icon.png"

var doctorRow = 10;
var doctorCol = 20;
var receptionistRow = 1;
var receptionistCol = 20;

//a patient enters the hospital UNTREATED; he or she then is QUEUEING to be treated by a doctor; 
// then INTREATMENT with the doctor; then TREATED;
// When the patient is DISCHARGED he or she leaves the clinic immediately at that point.
const UNTREATED=0;
const WAITING=1;
const STAGING=2; 
const INTREATMENT =3;
const TREATED=4;
const DISCHARGED=5;
const EXITED = 6;

// The doctor can be either BUSY treating a patient, or IDLE, waiting for a patient 
const IDLE = 0;
const BUSY = 1;

// There are two types of caregivers in our system: doctors and receptionists
const DOCTOR = 0;
const RECEPTIONIST = 1;

// patients is a dynamic list, initially empty
var patients = [];
// caregivers is a static list, populated with a receptionist and a doctor	
var caregivers = [
    {"type":DOCTOR,"label":"Doctor","location":{"row":doctorRow,"col":doctorCol},"state":IDLE},
	{"type":RECEPTIONIST,"label":"Receptionist","location":{"row":receptionistRow,"col":receptionistCol},"state":IDLE}
];
var doctor = caregivers[0]; // the doctor is the first element of the caregivers list.

// We can section our screen into different areas. In this model, the waiting area and the staging area are separate.
var areas =[
 {"label":"Waiting Area","startRow":4,"numRows":5,"startCol":15,"numCols":11,"color":"pink"},
 {"label":"Staging Area","startRow":doctorRow-1,"numRows":1,"startCol":doctorCol-2,"numCols":5,"color":"red"}	
]
var waitingRoom = areas[0]; // the waiting room is the first element of the areas array

var currentTime = 0;
var statistics = [
{"name":"Average time in clinic, Type A: ","location":{"row":doctorRow+3,"col":doctorCol-4},"cumulativeValue":0,"count":0},
{"name":"Average time in clinic, Type B: ","location":{"row":doctorRow+4,"col":doctorCol-4},"cumulativeValue":0,"count":0}
];

// The probability of a patient arrival needs to be less than the probability of a departure, else an infinite queue will build.
// You also need to allow travel time for patients to move from their seat in the waiting room to get close to the doctor.
// So don't set probDeparture too close to probArrival.
var probArrival = 0.25;
var probDeparture = 0.4;

// We can have different types of patients (A and B) according to a probability, probTypeA.
// This version of the simulation makes no difference between A and B patients except for the display image
// Later assignments can build on this basic structure.
var probTypeA = 0.5;

// To manage the queues, we need to keep track of patientIDs.
var nextPatientID_A = 0; // increment this and assign it to the next admitted patient of type A
var nextPatientID_B = 0; // increment this and assign it to the next admitted patient of type B
var nextTreatedPatientID_A =1; //this is the id of the next patient of type A to be treated by the doctor
var nextTreatedPatientID_B =1; //this is the id of the next patient of type B to be treated by the doctor

// This next function is executed when the script is loaded. It contains the page initialization code.
(function() {
	// Your page initialization code goes here
	// All elements of the DOM will be available here
	window.addEventListener("resize", redrawWindow); //Redraw whenever the window is resized
	simTimer = window.setInterval(simStep, animationDelay); // call the function simStep every animationDelay milliseconds
	redrawWindow();
})();

// We need a function to start and pause the the simulation.
function toggleSimStep(){ 
	//this function is called by a click event on the html page. 
	// Search BasicAgentModel.html to find where it is called.
	isRunning = !isRunning;
	console.log("isRunning: "+isRunning);
}

function redrawWindow(){
	isRunning = false; // used by simStep
	window.clearInterval(simTimer); // clear the Timer
	animationDelay = 550 - document.getElementById("slider1").value;
	simTimer = window.setInterval(simStep, animationDelay); // call the function simStep every animationDelay milliseconds
	
	// Re-initialize simulation variables
	
	nextPatientID_A = 0; // increment this and assign it to the next entering patient of type A
	nextPatientID_B = 0; // increment this and assign it to the next entering patient of type B
	nextTreatedPatientID_A =1; //this is the id of the next patient of type A to be treated by the doctor
	nextTreatedPatientID_B =1; //this is the id of the next patient of type B to be treated by the doctor
	currentTime = 0;
	doctor.state=IDLE;
	statistics[0].cumulativeValue=0;
	statistics[0].count=0;
	statistics[1].cumulativeValue=0;
	statistics[1].count=0;
	patients = [];

	
	//resize the drawing surface; remove all its contents; 
	var drawsurface = document.getElementById("surface");
	var creditselement = document.getElementById("credits");
	var w = window.innerWidth;
	var h = window.innerHeight;
	var surfaceWidth =(w - 3*WINDOWBORDERSIZE);
	var surfaceHeight= (h-creditselement.offsetHeight - 3*WINDOWBORDERSIZE);
	
	drawsurface.style.width = surfaceWidth+"px";
	drawsurface.style.height = surfaceHeight+"px";
	drawsurface.style.left = WINDOWBORDERSIZE/2+'px';
	drawsurface.style.top = WINDOWBORDERSIZE/2+'px';
	drawsurface.style.border = "thick solid #0000FF"; //The border is mainly for debugging; okay to remove it
	drawsurface.innerHTML = ''; //This empties the contents of the drawing surface, like jQuery erase().
	
	// Compute the cellWidth and cellHeight, given the size of the drawing surface
	numCols = maxCols;
	cellWidth = surfaceWidth/numCols;
	numRows = Math.ceil(surfaceHeight/cellWidth);
	cellHeight = surfaceHeight/numRows;
	
	// In other functions we will access the drawing surface using the d3 library. 
	//Here we set the global variable, surface, equal to the d3 selection of the drawing surface
	surface = d3.select('#surface');
	surface.selectAll('*').remove(); // we added this because setting the inner html to blank may not remove all svg elements
	surface.style("font-size","100%");
	// rebuild contents of the drawing surface
	updateSurface();	
};

// The window is resizable, so we need to translate row and column coordinates into screen coordinates x and y
function getLocationCell(location){
	var row = location.row;
	var col = location.col;
	var x = (col-1)*cellWidth; //cellWidth is set in the redrawWindow function
	var y = (row-1)*cellHeight; //cellHeight is set in the redrawWindow function
	return {"x":x,"y":y};
}

function updateSurface(){
	// This function is used to create or update most of the svg elements on the drawing surface.
	// See the function removeDynamicAgents() for how we remove svg elements
	
	//Select all svg elements of class "patient" and map it to the data list called patients
	var allpatients = surface.selectAll(".patient").data(patients);
	
	// If the list of svg elements is longer than the data list, the excess elements are in the .exit() list
	// Excess elements need to be removed:
	allpatients.exit().remove(); //remove all svg elements associated with entries that are no longer in the data list
	// (This remove function is needed when we resize the window and re-initialize the patients array)
	 
	// If the list of svg elements is shorter than the data list, the new elements are in the .enter() list.
	// The first time this is called, all the elements of data will be in the .enter() list.
	// Create an svg group ("g") for each new entry in the data list; give it class "patient"
	var newpatients = allpatients.enter().append("g").attr("class","patient"); 
	//Append an image element to each new patient svg group, position it according to the location data, and size it to fill a cell
	// Also note that we can choose a different image to represent the patient based on the patient type
	newpatients.append("svg:image")
	 .attr("x",function(d){var cell= getLocationCell(d.location); return cell.x+"px";})
	 .attr("y",function(d){var cell= getLocationCell(d.location); return cell.y+"px";})
	 .attr("width", Math.min(cellWidth,cellHeight)+"px")
	 .attr("height", Math.min(cellWidth,cellHeight)+"px")
	 .attr("xlink:href",function(d){if (d.type=="A") return urlPatientA; else return urlPatientB;});
	
	// For the existing patients, we want to update their location on the screen 
	// but we would like to do it with a smooth transition from their previous position.
	// D3 provides a very nice transition function allowing us to animate transformations of our svg elements.
	
	//First, we select the image elements in the allpatients list
	var images = allpatients.selectAll("image");
	// Next we define a transition for each of these image elements.
	// Note that we only need to update the attributes of the image element which change
	images.transition()
	 .attr("x",function(d){var cell= getLocationCell(d.location); return cell.x+"px";})
	 .attr("y",function(d){var cell= getLocationCell(d.location); return cell.y+"px";})
	 .duration(animationDelay).ease('linear'); // This specifies the speed and type of transition we want.
 
	// Patients will leave the clinic when they have been discharged. 
	// That will be handled by a different function: removeDynamicAgents
 
	//Select all svg elements of class "caregiver" and map it to the data list called caregivers
	var allcaregivers = surface.selectAll(".caregiver").data(caregivers);
	//This is not a dynamic class of agents so we only need to set the svg elements for the entering data elements.
	// We don't need to worry about updating these agents or removing them
	// Create an svg group ("g") for each new entry in the data list; give it class "caregiver"
	var newcaregivers = allcaregivers.enter().append("g").attr("class","caregiver");
	newcaregivers.append("svg:image")
	 .attr("x",function(d){var cell= getLocationCell(d.location); return cell.x+"px";})
	 .attr("y",function(d){var cell= getLocationCell(d.location); return cell.y+"px";})
	 .attr("width", Math.min(cellWidth,cellHeight)+"px")
	 .attr("height", Math.min(cellWidth,cellHeight)+"px")
	 .attr("xlink:href",function(d){if (d.type==DOCTOR) return urlDoctor1; else return urlReceptionist;});
	
	// It would be nice to label the caregivers, so we add a text element to each new caregiver group
	newcaregivers.append("text")
    .attr("x", function(d) { var cell= getLocationCell(d.location); return (cell.x+cellWidth)+"px"; })
    .attr("y", function(d) { var cell= getLocationCell(d.location); return (cell.y+cellHeight/2)+"px"; })
    .attr("dy", ".35em")
    .text(function(d) { return d.label; });
	
	// The simulation should serve some purpose 
	// so we will compute and display the average length of stay of each patient type.
	// We created the array "statistics" for this purpose.
	// Here we will create a group for each element of the statistics array (two elements)
	var allstatistics = surface.selectAll(".statistics").data(statistics);
	var newstatistics = allstatistics.enter().append("g").attr("class","statistics");
	// For each new statistic group created we append a text label
	newstatistics.append("text")
	.attr("x", function(d) { var cell= getLocationCell(d.location); return (cell.x+cellWidth)+"px"; })
    .attr("y", function(d) { var cell= getLocationCell(d.location); return (cell.y+cellHeight/2)+"px"; })
    .attr("dy", ".35em")
    .text(""); 
	
	// The data in the statistics array are always being updated.
	// So, here we update the text in the labels with the updated information.
	allstatistics.selectAll("text").text(function(d) {
		var avgLengthOfStay = d.cumulativeValue/(Math.max(1,d.count)); // cumulativeValue and count for each statistic are always changing
		return d.name+avgLengthOfStay.toFixed(1); }); //The toFixed() function sets the number of decimal places to display

	// Finally, we would like to draw boxes around the different areas of our system. We can use d3 to do that too.
	var allareas = surface.selectAll(".areas").data(areas);
	var newareas = allareas.enter().append("g").attr("class","areas");
	// For each new area, append a rectangle to the group
	newareas.append("rect")
	.attr("x", function(d){return (d.startCol-1)*cellWidth;})
	.attr("y",  function(d){return (d.startRow-1)*cellHeight;})
	.attr("width",  function(d){return d.numCols*cellWidth;})
	.attr("height",  function(d){return d.numRows*cellWidth;})
	.style("fill", function(d) { return d.color; })
	.style("stroke","black")
	.style("stroke-width",1);
	
}
	

function addDynamicAgents(){
	// Patients are dynamic agents: they enter the clinic, wait, get treated, and then leave
	// We have entering patients of two types "A" and "B"
	// We could specify their probabilities of arrival in any simulation step separately
	// Or we could specify a probability of arrival of all patients and then specify the probability of a Type A arrival.
	// We have done the latter. probArrival is probability of arrival a patient and probTypeA is the probability of a type A patient who arrives.
	// First see if a patient arrives in this sim step.
	if (Math.random()< probArrival){
		var newpatient = {"id":1,"type":"A","location":{"row":1,"col":1},
		"target":{"row":receptionistRow,"col":receptionistCol},"state":UNTREATED,"timeAdmitted":0};
		if (Math.random()<probTypeA) newpatient.type = "A";
		else newpatient.type = "B";			
		patients.push(newpatient);
	}
	
}

function updatePatient(patientIndex){
	//patientIndex is an index into the patients data array
	patientIndex = Number(patientIndex); //it seems patientIndex was coming in as a string
	var patient = patients[patientIndex];
	// get the current location of the patient
	var row = patient.location.row;
	var col = patient.location.col;
	var type = patient.type;
	var state = patient.state;
	
	
	// determine if patient has arrived at destination
	var hasArrived = (Math.abs(patient.target.row-row)+Math.abs(patient.target.col-col))==0;
	
	// Behavior of patient depends on his or her state
	switch(state){
		case UNTREATED:
			if (hasArrived){
				patient.timeAdmitted = currentTime;
				patient.state = WAITING;
				// pick a random spot in the waiting area to queue
				patient.target.row = waitingRoom.startRow+Math.floor(Math.random()*waitingRoom.numRows);
				patient.target.col = waitingRoom.startCol+Math.floor(Math.random()*waitingRoom.numCols);
				// receptionist assigns a sequence number to each patient to govern order of treatment
				if (patient.type=="A") patient.id = ++nextPatientID_A;
				else patient.id = ++nextPatientID_B;
			}
		break;
		case WAITING:
			switch (type){
				case "A":
					if (patient.id == nextTreatedPatientID_A){
						patient.target.row = doctorRow-1;
						patient.target.col = doctorCol-1;
						patient.state = STAGING;
					}
					if (patient.id == nextTreatedPatientID_A+1){
						patient.target.row = doctorRow-1;
						patient.target.col = doctorCol-2;
					}
				break;
				case "B":
					if (patient.id == nextTreatedPatientID_B){
						patient.target.row = doctorRow-1;
						patient.target.col = doctorCol+1;
						patient.state = STAGING;
					}
					if (patient.id == nextTreatedPatientID_B+1){
						patient.target.row = doctorRow-1;
						patient.target.col = doctorCol+2;
					}
				break;
			}
		break;
		case STAGING:
			// Queueing behavior depends on the patient priority
			// For this model we will give access to the doctor on a first come, first served basis
			if (hasArrived){
				//The patient is staged right next to the doctor
				if (doctor.state == IDLE){
					// the doctor is IDLE so this patient is the first to get access
					doctor.state = BUSY;
					patient.state = INTREATMENT;
					patient.target.row = doctorRow;
					patient.target.col = doctorCol;
					if (patient.type == "A") nextTreatedPatientID_A++; else nextTreatedPatientID_B++;
				}
			}
		break;
		case INTREATMENT:
			// Complete treatment randomly according to the probability of departure
			if (Math.random()< probDeparture){
				patient.state = TREATED;
				doctor.state = IDLE;
				patient.target.row = receptionistRow;
				patient.target.col = receptionistCol;
			}
		break;
		case TREATED:
			if (hasArrived){
				patient.state = DISCHARGED;
				patient.target.row = 1;
				patient.target.col = maxCols;
				// compute statistics for discharged patient
				var timeInClinic = currentTime - patient.timeAdmitted;
				var stats;
				if (patient.type=="A"){
					stats = statistics[0];
				}else{
					stats = statistics[1];
				}
				stats.cumulativeValue = stats.cumulativeValue+timeInClinic;
				stats.count = stats.count + 1;
			}
		break;
		case DISCHARGED:
			if (hasArrived){
				patient.state = EXITED;
			}
		break;
		default:
		break;
	}
	// set the destination row and column
	var targetRow = patient.target.row;
	var targetCol = patient.target.col;
	// compute the distance to the target destination
	var rowsToGo = targetRow - row;
	var colsToGo = targetCol - col;
	// set the speed
	var cellsPerStep = 1;
	// compute the cell to move to
	var newRow = row + Math.min(Math.abs(rowsToGo),cellsPerStep)*Math.sign(rowsToGo);
	var newCol = col + Math.min(Math.abs(colsToGo),cellsPerStep)*Math.sign(colsToGo);
	// update the location of the patient
	patient.location.row = newRow;
	patient.location.col = newCol;
	
}

function removeDynamicAgents(){
	// We need to remove patients who have been discharged. 
	//Select all svg elements of class "patient" and map it to the data list called patients
	var allpatients = surface.selectAll(".patient").data(patients);
	//Select all the svg groups of class "patient" whose state is EXITED
	var treatedpatients = allpatients.filter(function(d,i){return d.state==EXITED;});
	// Remove the svg groups of EXITED patients: they will disappear from the screen at this point
	treatedpatients.remove();
	
	// Remove the EXITED patients from the patients list using a filter command
	patients = patients.filter(function(d){return d.state!=EXITED;});
	// At this point the patients list should match the images on the screen one for one 
	// and no patients should have state EXITED
}


function updateDynamicAgents(){
	// loop over all the agents and update their states
	for (var patientIndex in patients){
		updatePatient(patientIndex);
	}
	updateSurface();	
}

function simStep(){
	//This function is called by a timer; if running, it executes one simulation step 
	//The timing interval is set in the page initialization function near the top of this file
	if (isRunning){ //the isRunning variable is toggled by toggleSimStep
		// Increment current time (for computing statistics)
		currentTime++;
		// Sometimes new agents will be created in the following function
		addDynamicAgents();
		// In the next function we update each agent
		updateDynamicAgents();
		// Sometimes agents will be removed in the following function
		removeDynamicAgents();
	}
}
