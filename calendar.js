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
  document.getElementById("changebody").innerHTML = "<ul id='showEvents'></ul>";
  showAllEvents();
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
          $("#formStart").datetimepicker({format:'Y-m-d H:i'}); 
          $("#formEnd").datetimepicker({format:'Y-m-d H:i'});
        </script>
        <li>Start time: <input id='formStart' type='datetime-local' name='formStart' class='eventinput'></li>
        <li>End time: <input id='formEnd' type='datetime-local' name='formEnd' class='eventinput'</li> 
        <li>All day event? <select id='allday' class='eventinput'>
          <option value="false">false</option>
          <option value="true">true</option>
      </select></li>
        <li><select id='status' class='eventinput'>
              <option>Busy</option>
              <option>Free</option>
          </select></li>
        <li><input id='webpage' type='text' placeholder='Webpage' class='eventinput'></li>
        <li><button id='formSubmit' class='eventinput' >Submit</button></li>
    </ul>
    </form>`;

  $(function () {
    $('#formSubmit').on('click', function (event) {
      event.preventDefault();
      var Domain = "https://dhbw.cheekbyte.de/calendar/test"
      URL = Domain + "/events"
      var $events = $('#showEvents');

      var $Title = $('#title').val();
      var $Location = $('#location').val();
      var $Organizer = $('#organizer').val();
      var $Start = $('input[name="formStart"]').val().replace(' ', 'T');
      var $End = $('input[name="formEnd"]').val().replace(' ', 'T');
      var $Status = $('#status').val();
      var $Allday = $('#allday').val();
      var $Webpage = $('#webpage').val();

      console.log(eventData);

      if($Allday == "true"){
        $Start = $Start.substring(0, 11) + "00:00";
        $End = $End.substring(0, 11) + "23:59";
      }

      if($Start > $End || $Organizer.indexOf("@") <= 0){
        if($Start > $End){ alert("Start date must be before End date"); }
        if($Organizer.indexOf("@") <= 0 )	{ alert("Organizer must be an e-mail-address - please include @"); }
      } else {
        var eventData = {
          title: $Title,
          location:  $Location,
          organizer: $Organizer,
          start: $Start,
          end: $End,
          status: $Status,
          allday: false,
          webpage: $Webpage,
          extra: null
        }
        $.ajax({
          type: 'POST',
          url: URL,
          dataType: "json",
          data: JSON.stringify(eventData),
          success: function (event) {
            alert("Event added successfully :)")
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
            alert("Some error has occured")
          }
        });
      }
    });
  })
}
