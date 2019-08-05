  
$(function () {
  showAllEvents();
})

//sends a get request and shows all the retrieved events
function showAllEvents() {
  var Domain = "https://dhbw.cheekbyte.de/calendar/test"
  URL = Domain + "/events"
  var $events = $('#showEvents');
  $.ajax({
    type: "GET",
    url: URL,
    success: function(events) {
      $.each(events, function(i, event){
        $events.append(`
          <li class="shownEvents" id=`+event.id+ `><ul>
            <li>Title: `+ event.title +`</li>
            <li>Location: `+ event.location +`</li>
            <li>Organizer: `+ event.organizer +`</li>
            <li>Start: `+ event.start.replace("T", ", ") +`</li>
            <li>End: `+ event.end.replace("T", ", ") +`</li>
          </ul>
          <div>
            <button id="btnUpdateEvent" class="far fa-edit" onclick=updateEvent(`+event.id+`)></button>
            <button id="btnDeleteEvent" class="fas fa-calendar-times" onclick=deleteEvent(`+event.id+`)></button>
          </div>
          </li>
        `)
      });
    },
    error: function () {
      alert("Some error with loading the events has occured")
    }
  });
}

//sends a get request and shows all events starting on the selected day
function showDayEvents() {
  var Domain = "https://dhbw.cheekbyte.de/calendar/test"
  URL = Domain + "/events"
  var $events = $('#showEvents');
  $.ajax({
    type: "GET",
    url: URL,
    success: function(events) {
      $.each(events, function(i, event){
        if(event.start.includes(document.getElementById("selected").innerHTML)){
          $events.append(`
            <li class="shownEvents"><ul>
              <li>Title: `+ event.title +`</li>
              <li>Location: `+ event.location +`</li>
              <li>Organizer: `+ event.organizer +`</li>
              <li>Start: `+ event.start +`</li>
              <li>End: `+ event.end +`</li>
            </ul>
            <div>
              <button id="btnUpdateEvent" class="far fa-edit" onclick=updateEvent(`+event.id+`)></button>
              <button id="btnDeleteEvent" class="fas fa-calendar-times" onclick=deleteEvent(`+event.id+`)></button>
            </div>
            </li>
          `)
        }
      });
      if(document.getElementById("showEvents").innerHTML == ""){
        document.getElementById("changebody").innerHTML = "No Events starting today"
      }
    },
    error: function () {
      alert("Some error with loading the events has occured")
    }
  });
}

//deleting the selected event
function deleteEvent(id) {
  var Domain = "https://dhbw.cheekbyte.de/calendar/test";
  URL = Domain + "/events/" + id;
  $.ajax({
    type:"DELETE",
    url: URL,
    success: function(){
      alert("successfully deleted");
      location.reload();
    },
    error: function () {
      alert("Some error with deleting the event has occured")
    }
  });
}

//updates the selected by sending a put-request with new/modified data
function updateEvent(id){
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
        <li><button id='updateSubmit' class='eventinput' >Submit</button></li>
    </ul>
    </form>`;

  $(function () {
    $('#updateSubmit').on('click', function (event) {
      event.preventDefault();
      var Domain = "https://dhbw.cheekbyte.de/calendar/test"
      URL = Domain + "/events/" + id
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
        if($Allday == "true") { $Allday = true; }
		    if($Allday == "false") { $Allday = false; }

        var eventData = {
          title: $Title,
          location:  $Location,
          organizer: $Organizer,
          start: $Start,
          end: $End,
          status: $Status,
          allday: $Allday,
          webpage: $Webpage,
          extra: null
        }
        $.ajax({
          type: 'PUT',
          url: URL,
          dataType: "json",
          data: JSON.stringify(eventData),
          success: function (event) {
            alert("Event updated successfully :)")
          },
          error: function () {
            alert("Some error with updating the data has occured")
          }
        });
      }
    });
  })
}

function addevent() {
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
        if($Allday == "true") { $Allday = true; }
		    if($Allday == "false") { $Allday = false; }

        var eventData = {
          title: $Title,
          location:  $Location,
          organizer: $Organizer,
          start: $Start,
          end: $End,
          status: $Status,
          allday: $Allday,
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
          },
          error: function () {
            alert("Some error with posting the data has occured")
          }
        });
      }
    });
  })
}