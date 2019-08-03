$(document).ready(function() {
  $('#btnShowAll').click(function(){
    listEventsSidebar();
  });
});

function updateView() {
  var month = document.getElementById("months").value;
  var year = document.getElementById("years").value;
  if (month == "January" || month == "March" || month == "May" || month == "July" || month == "August" || month == "October" || month == "December") {
    document.getElementById("31").style.visibility = "visible";
    document.getElementById("30").style.visibility = "visible";
    document.getElementById("29").style.visibility = "visible";
  } else {
    document.getElementById("31").style.visibility = "hidden";
    if (month == "February") {
      document.getElementById("30").style.visibility = "hidden";
      if (year == "2020" || year == "2024" || year == "2028") {
        document.getElementById("29").style.visibility = "visible";
      } else {
        document.getElementById("29").style.visibility = "hidden";
      }
    } else {
      document.getElementById("30").style.visibility = "visible";
    }
  }
}

function dayclick(day) {
  var month = document.getElementById("months").value;
  var year = document.getElementById("years").value;
  var listel = document.getElementById("days").getElementsByTagName("LI");
  for (var i = 0; i < listel.length; i++) {
    listel[i].style.backgroundColor = "rgb(255,232,232)";
  }
  document.getElementById(day).style.backgroundColor = "rgb(132,89,107)";

  document.getElementById("chheading").innerHTML = "Events on " + month + " " + day + ", " + year + ":";
  document.getElementById("changebtns").innerHTML = `
    <button id='changeback' onclick='changebackall()' class='fas fa-angle-left'></button>
    <button id='btnShowAll' class='far fa-eye'></button>
    <button id='addevent' onclick='addevent()' class='fas fa-calendar-plus'></button></div>`;
  document.getElementById("changebody").innerHTML = "";
}

function changebackall() {
  var listel = document.getElementById("days").getElementsByTagName("LI");
  for (var i = 0; i < listel.length; i++) {
    listel[i].style.backgroundColor = "rgb(255,232,232);";
  }
  document.getElementById("chheading").innerHTML = "Future Events";
  document.getElementById("changebtns").innerHTML = "<button id='btnShowAll' class='fas fa-eye'></button>";
  document.getElementById("changebody").innerHTML = "<ul id='allevents'><li>new Event 1</li></ul>"
}

function addevent() {
  document.getElementById("changebody").innerHTML = `
    <form id="eventForm">
    <ul id='neweventform'>
        <li>
            <input name='formTitle' type='text' placeholder='Event Title' required class='eventinput'>
        </li>
        <li>
            <input name='formLocation' type='text' placeholder='Location' required class='eventinput'>
        </li>
        <li><input name='formOrganizer' type='text' placeholder='Organizer' required class='eventinput'></li>
        <li>Start time: <input id='formStart' type='time' class='eventinput' value='08:00'></li>
        <li>End time: <input id='formEnd' type='time' class='eventinput' value='09:00' 
        </li> <li>All day event? <input name='formAllday' type='checkbox'></li>
        <li><select name='formStatus' class='eventinput'>
                <option>Busy</option>
                <option>Free</option>
            </select></li>
        <li><input name='formWeb' type='text' placeholder='Webpage' class='eventinput'></li>
        <li><input name='formImage' type='text' placeholder='Image-url' class='eventinput'></li>
        <li><button id='formSubmit' class='eventinput' type='button'>Submit</button></li>
    </ul>
    </form>`;
}

function listEvents(){
	if(Appointments != null)
	{
		for(var i = 0 ; i < Appointments.length ; i++)
		{
			if(Appointments[i] != null)
			{
				addEventToList(Appointments[i],i);
			}
		}
	}
	else{
		console.log("no events stored");
	}
}

function addEventToList(ev,iAppointments)
{
	// Check if element is already displayed
	if($("#EP"+ev["id"]).length == 0)
	{
		
		var img = "";
		if(ev["imageurl"] != null)
		{
			img = "<img src='"+ev["imageurl"]+"'><br>";
		}
		
		var cats = "";
		for (i = 0; i < ev["categories"].length; i++) { 
			cats += ev["categories"][i].name;
			if(i != ev["categories"].length-1)
			{
				cats += " | ";
			}
		}
		
		
		$("#allevents").append
		('<div class="eventDetails" id="EP'+ev["id"]+'">'
		+'<div title="DELETE EVENT" class="eventDetailsBtnDel" id="EV'+ev["id"]+'">&#x274C;</div>'
		+'<div title="EDIT EVENT" class="eventDetailsBtnEdit" id="EV'+iAppointments+'">⚙️</div><br>'
		+'<div style="text-align:center;margin-top:5px;margin-bottom:5px">'+cats+"</div>"
		+ev["title"]+"<br>"
		+ev["location"]+"<br>"
		+ev["organizer"]+"<br>"
		+ev["webpage"]+"<br>"
		+ev["start"].substr(0,10)+" "+ev["start"].substr(11)+"<br>"
		+ev["end"].substr(0,10)+" "+ev["end"].substr(11)+"<br>"
		+ev["status"]+"<br>"
		+img
		+'</div>');
	}
}
