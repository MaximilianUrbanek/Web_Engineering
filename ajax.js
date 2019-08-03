

var Domain = 'https://dhbw.cheekbyte.de/calendar/test';
var Appointments = null;

URL = Domain + "/events";
var getAllEvents = $.ajax({
  method: "GET",
  url: URL
});


getAllEvents.done(function (done) {
  console.log(done);
});

getAllEvents.fail(function (fail) {
  console.log(fail);
});



$ ("#eventForm").submit(function(eventData){
  alert("Handler for .submit() called.");
  eventData.preventDefault()
  
  var evtID = parseInt($('input[name="formID"]').val());
  var evtTitle = $('input[name="formTitle"]').val();
  var evtLocation = $('input[name="formLocation"]').val();
  var evtOrganizer = $('input[name="formOrganizer"]').val();
  var evtStart = $('input[name="formStart"]').val();
  var evtEnd = $('input[name="formEnd"]').val();
  var evtStatus = $('select[name="formStatus"]').val();
  var evtAllday = $('input[name="formAllday"]').val();
  var evtWebpage = $('input[name="formWeb"]').val();
  var evtIMAGE = $('input[name="formImage"]').val();

  
  
  
  var eventData = {
    "title": evtTitle,
    "location": evtLocation,
    "organizer": evtOrganizer,
    "start": evtStart,
    "end": evtEnd,
    "status": evtStatus,
    "allday": evtAllday,
    "webpage": evtWebpage,
    "imageurl": evtIMAGE,
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
