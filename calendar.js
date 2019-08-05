//updates the calendar view so that number of days in the month are correct
function updateView() {
  var events = AllEventList;
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

//selects a day by highlighting it in calendar view and makes specific functions possible
function dayclick(day) {
  var month = document.getElementById("months").value;
  if (month == "October" || month == "November" || month == "December") {
    var monthnumber = document.getElementById("months").selectedIndex + 1;
  } else {
    var monthnumber = document.getElementById("months").selectedIndex + 1;
    monthnumber = "0" + monthnumber;
  }
  var year = document.getElementById("years").value;
  document.getElementById("selected").innerHTML = year + "-" + monthnumber + "-" + day + "T";

  var listel = document.getElementById("days").getElementsByTagName("LI");
  for (var a = 0; a < listel.length; a++) {
    listel[a].style.backgroundColor = "rgb(255,232,232)";
  }
  document.getElementById(day).style.backgroundColor = "rgb(132,89,107)";

  document.getElementById("chheading").innerHTML = "Events on " + month + " " + day + ", " + year + ":";
  document.getElementById("changebtns").innerHTML = `
    <button id='changeback' onclick='changebackall()' class='fas fa-angle-left'></button>
    <button id='btnShow' class='far fa-eye' onclick='showDayEvents()'></button>
    <button id='addevent' onclick='addevent()' class='fas fa-calendar-plus'></button></div>`;
  document.getElementById("changebody").innerHTML = "<ul id='showEvents'></ul>";
}

//changes back to overview without reloading the page
function changebackall() {
  var listel = document.getElementById("days").getElementsByTagName("LI");
  for (var i = 0; i < listel.length; i++) {
    listel[i].style.backgroundColor = "rgb(255,232,232)";
  }
  document.getElementById("chheading").innerHTML = "Future Events";
  document.getElementById("changebtns").innerHTML = "";
  document.getElementById("changebody").innerHTML = "<ul id='showEvents'></ul>";
  showAllEvents();
}
