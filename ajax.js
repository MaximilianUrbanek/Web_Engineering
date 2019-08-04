var Domain = "https://dhbw.cheekbyte.de/calendar/test"
  URL = Domain + "/events"
  var $events = $('#showEvents');
  
$(function () {
  
  $.ajax({
    type: "GET",
    url: URL,
    success: function(events) {
      $.each(events, function(i, event){
        $events.append(`
          <li><ul>
            <li>Title: `+ event.title +`</li>
            <li>Location: `+ event.location +`</li>
            <li>Organizer: `+ event.organizer +`</li>
            <li>Start: `+ event.start +`</li>
            <li>End: `+ event.end +`</li>
          </ul></li>
        `)
      });
      AllEventList = events;
    }
  });
})

function showDayEvents() {
  
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


function createEvent(){
  console.log("create aufgerufen");
  var eventData = {
    title: $title.val(),
    location: $location.val(),
    organizer: $organizer.val(),
    start: $formStart.val(),
    end: $formEnd.val(),
    status: $status.val(),
    allday: $allday.val(),
    webpage: $webpage.val(),
    imageurl: $imageurl.val(),
  }

  $.ajax ({
    type : 'POST',
    url : URL,
    data: eventData,
    success: function(event) {
      $events.append(`
      <li><ul>
        <li>Title: `+ event.title +`</li>
        <li>Location: `+ event.location +`</li>
        <li>Organizer: `+ event.organizer +`</li>
        <li>Start: `+ event.start +`</li>
        <li>End: `+ event.end +`</li>
      </ul></li>
    `)
    },
    error: function(){
      alert("Irgendein Fehler")
    }
  })
}
 

/*
getAllEvents.done(function (done) {
  console.log(done);
});

getAllEvents.fail(function (fail) {
  console.log(fail);
});

$ ("#eventForm").submit(function(eventData){
  alert("Handler for .submit() called.");
  eventData.preventDefault()

  var Title = $(Title"]')
  var Location = $(Location"]')
  var Organizer = $(Organizer"]')
  var Start = $(Start"]')
  var End = $(End"]')
  var Status = $('select[name="formStatus"]')
  var Allday = $(Allday"]')
  var Webpage = $(Web"]')
  var IMAGE = $(Image"]')

  
  
  
  var eventData = {
    "title": Title,
    "location": Location,
    "organizer": Organizer,
    "start": Start,
    "end": End,
    "status": Status,
    "allday": Allday,
    "webpage": Webpage,
    "imageurl": IMAGE,
  }
  
  $.ajax({
    url: URL,
    method: "POST",
    contentType: false,
    data: JSON.stringify(eventData),
    dataType: "json"
  })
  .done(function (done) {
    console.log("DONE: ");
    console.log(done);
  })
  .fail(function (fail) {
    console.log("FAIL: ");
    console.log(fail);
  });
});
*/

