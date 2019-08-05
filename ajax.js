$(function () {
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
    organizer: /*document.getElementById(selected).innerHTML+*/$Organizer.val(),
    start: /*document.getElementById(selected).innerHTML+*/$Start.val(),
    end: $End.val(),
    status: $Status.val(),
    allday: $Allday.val(),
    webpage: $Webpage.val(),
    imageurl: $IMAGE.val(),
  }

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
    }
  });
/*
  $.ajax({
    type: "POST",
    url: URL,

  })
  */
}
)
 

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

