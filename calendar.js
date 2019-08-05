var AllEventList;

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
  AllEventList = document.getElementById("changebody").innerHTML;
  document.getElementById("changebody").innerHTML = "<ul id='showEvents'></ul>";
}

function changebackall() {
  var listel = document.getElementById("days").getElementsByTagName("LI");
  for (var i = 0; i < listel.length; i++) {
    listel[i].style.backgroundColor = "rgb(255,232,232)";
  }
  document.getElementById("chheading").innerHTML = "Future Events";
  document.getElementById("changebtns").innerHTML = "";
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
        <script>
          $("#formStart").datetimepicker({format:'Y-m-d'+"T"+'H:i'}); 
          $("#formEnd").datetimepicker({format:'Y-m-d H:i'});
        </script>
        <li>Start time: <input id='formStart' type='datetime-local' class='eventinput'></li>
        <li>End time: <input id='formEnd' type='datetime-local' class='eventinput'</li> 
        <li>All day event? <input id='allday' type='checkbox'></li>
        <li><select id='status' class='eventinput'>
              <option>Busy</option>
              <option>Free</option>
          </select></li>
        <li><input id='webpage' type='text' placeholder='Webpage' class='eventinput'></li>
        <li><input id='imageurl' type='text' placeholder='Image-url' class='eventinput'></li>
        <li><button id='formSubmit' class='eventinput' >Submit</button></li>
    </ul>
    </form>`;

  $(function () {
    $('#formSubmit').on('click', function () {

      var Domain = "https://dhbw.cheekbyte.de/calendar/test"
      URL = Domain + "/events"
      var $events = $('#showEvents');

      var $Title = $('#title');
      var $Location = $('#location');
      var $Organizer = $('#organizer');
      var $Start = $('#start');
      var $End = $('#end');
      var $Status = $('#status');
      var $Allday = $('#allday');
      var $Webpage = $('#webpage');
      var $IMAGE = $('#imageurl');

      var eventData = {
        title: $Title.val(),
        location: $Location.val(),
        organizer: $Organizer.val(),
        start: $Start.val(),
        end: $End.val(),
        status: $Status.val(),
        allday: $Allday.val(),
        webpage: $Webpage.val(),
        imageurl: $IMAGE.val(),
      }

      document.getElementById("ABCevent").innerHTML = `<ul>
          <li>`+ eventData.title + `</li> 
          <li>`+ eventData.location + `</li>
          <li>`+ eventData.organizer + `</li>
          <li>`+ eventData.start + `</li>
          <li>`+ eventData.end + `</li>
          <li>`+ eventData.status + `</li>
          <li>`+ eventData.webpage + `</li>
          <li>`+ eventData.imageurl + `</li>
        </ul>`;

      $.ajax({
        type: 'POST',
        url: URL,
        data: eventData,
        success: function (event) {
          $events.append(`
            <li><ul>
              <li>Title: `+ event.title + `</li>
              <li>Location: `+ event.location + `</li>
              <li>Organizer: `+ event.organizer + `</li>
              <li>Start: `+ event.start + `</li>
              <li>End: `+ event.end + `</li>
            </ul></li>
          `)
        },
        error: function () {
          alert("Irgendein Fehler")
        }
      });
      alert("def");
    });
  })
}



$(function () {
  
  var eventID = $('#').val();

  $('#').on('click', function (events) {
    URL = DOMAIN + "/events/" + eventID;

    $.ajax({
      method: "DELETE",
      url: URL,
      success: function (xhr) {
        if (xhr.status == 204) {
          information("EVENT SUCCESSFULLY DELETED");
          EVENTS[i] = null;
        }
      },
    }).fail(function(fail) {
      if(fail["status"] == 404)
      {
        information("EVENT COULD NOT BE DELETED - EVENT NOT FOUND / ALREADY DELETED");
      }
      else
      {
        information(fail["responseJSON"]["description"]);
      }
    });
  })
})
