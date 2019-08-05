  
$(function () {
  showAllEvents();
})

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
          <li><ul>
            <li>Title: `+ event.title +`<button id="btnDeleteEvent" class="fas fa-calendar-times"></button></li>
            <li>Location: `+ event.location +`</li>
            <li>Organizer: `+ event.organizer +`</li>
            <li>Start: `+ event.start +`</li>
            <li>End: `+ event.end +`</li>
          </ul></li>
        `)
      });
    }
  });
}

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
            <li><ul>
              <li>Title: `+ event.title +`</li>
              <li>Location: `+ event.location +`</li>
              <li>Organizer: `+ event.organizer +`</li>
              <li>Start: `+ event.start +`</li>
              <li>End: `+ event.end +`</li>
            </ul></li>
          `)
        }
      });
      if(document.getElementById("showEvents").innerHTML == ""){
        document.getElementById("changebody").innerHTML = "No Events starting today"
      }
    }
  });
}

