var AllEventList = "";

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
  if (month == "October" || month == "November" || month=="December") {
    var monthnumber = document.getElementById("months").selectedIndex + 1;
  } else {
    var monthnumber = document.getElementById("months").selectedIndex + 1;
    monthnumber = "0" + monthnumber;
  }
  var year = document.getElementById("years").value;
  document.getElementById("selected").innerHTML = year+"-"+monthnumber+"-"+day+T;
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
  AllEventList = document.getElementById("changebody").innerHTML;
  document.getElementById("changebody").innerHTML = "";
}

function changebackall() {
  var listel = document.getElementById("days").getElementsByTagName("LI");
  for (var i = 0; i < listel.length; i++) {
    listel[i].style.backgroundColor = "rgb(255,232,232);";
  }
  document.getElementById("chheading").innerHTML = "Future Events";
  document.getElementById("changebtns").innerHTML = "<button id='btnShowAll' class='fas fa-eye'></button>";
  document.getElementById("changebody").innerHTML = AllEventList;
}

function addevent() {
  AllEventList = document.getElementById("changebody").innerHTML;
  document.getElementById("changebody").innerHTML = `
    <form id="eventForm">
    <ul id='neweventform'>
        <li>
            <input id='title' type='text' placeholder='Event Title' required class='eventinput'>
        </li>
        <li>
            <input id='location' type='text' placeholder='Location' required class='eventinput'>
        </li>
        <li><input id='organizer' type='text' placeholder='Organizer' required class='eventinput'></li>
        <li>Start time: <input id='formStart' type='time' class='eventinput' value='08:00'></li>
        <li>End time: <input id='formEnd' type='time' class='eventinput' value='09:00' 
        </li> <li>All day event? <input id='allday' type='checkbox'></li>
        <li><select id='status' class='eventinput'>
                <option>Busy</option>
                <option>Free</option>
            </select></li>
        <li><input id='webpage' type='text' placeholder='Webpage' class='eventinput'></li>
        <li><input id='imageurl' type='text' placeholder='Image-url' class='eventinput'></li>
        <li><button id='formSubmit' class='eventinput' type='button'>Submit</button></li>
    </ul>
    </form>`;
}