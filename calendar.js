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
    listel[i].style.backgroundColor = "rgb(255,232,232);";
  }
  document.getElementById(day).style.backgroundColor = "rgb(132,89,107)";

  document.getElementById("chheading").innerHTML = "Events on " + month + " " + day + ", " + year + ":";
  document.getElementById("changebtns").innerHTML = "<button id='changeback' onclick='changebackall()' class='fas fa-angle-left'></button>";
  document.getElementById("changebody").innerHTML = "<div id='changebtns'><button id='addevent' onclick='addevent()'>Add new Event</button></div>";
}

function changebackall() {
  var listel = document.getElementById("days").getElementsByTagName("LI");
  for (var i = 0; i < listel.length; i++) {
    listel[i].style.backgroundColor = "rgb(255,232,232);";
  }
  document.getElementById("chheading").innerHTML = "Future Events";
  document.getElementById("changeback").style.visibility = "hidden";
  document.getElementById("changebody").innerHTML = "<ul id='allevents'><li>new Event 1</li></ul>"
}

function addevent() {
  document.getElementById("changebody").innerHTML = `
    <form id="eventForm">
    <ul id='neweventform'>
        <li>
            <input type='text' placeholder='Event Title' class='eventinput'>
        </li>
        <li>
            <input type='text' placeholder='Location' class='eventinput'>
        </li>
        <li><input type='text' placeholder='Organizer' class='eventinput'></li>
        <li>Start time: <input type='time' class='eventinput' value='08:00'></li>
        <li>End time: <input type='time' class='eventinput' value='09:00' </li> <li>All day event? <input
                type='checkbox'></li>
        <li><select class='eventinput'>
                <option>Busy</option>
                <option>Free</option>
            </select></li>
        <li><input type='text' placeholder='Webpage' class='eventinput'></li>
        <li><input type='text' placeholder='Image-url' class='eventinput'></li><button
            id='addeventsubmit'>Submit</button>
    </ul>
    </form>`;
}