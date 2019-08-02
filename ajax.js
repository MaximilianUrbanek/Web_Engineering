const Domain='https://dhbw.cheekbyte.de/calendar/testUser1';

URL = Domain+"/events";
var getAllEvents = $.ajax ({
    method: "GET",
    url: URL    
});

getAllEvents.done(function(done){
    console.log(done);
    console.log(eventData);
});

getAllEvents.fail(function(fail){
    console.log(fail);
});

/*
"id": 1,
        "title": " Christmas Feast",
        "location": "Stuttgart",
        "organizer": "danny@dxc.com",
        "start": "2014-12-24T18:00",
        "end": "2014-12-24T23:00",
        "status": "Busy",
        "allday": false,
        "webpage": "http://www.dxc.com/",
        "imageurl": "http://www.dcx.com/logo.png",
        "categories": [
            {
                "id": 1,
                "name": "Private"
            },
            {
                "id": 5,
                "name": "DXC"
            }
        ],
        "extra": null
*/

var evtTitle = $('input[name="formTitle"]').val();
var evtLocation = $('input[name="formLocation"]').val();
var evtOrganizer = $('input[name="formOrganizer"]').val();
var evtStart = $('input[name="formStart"]').val();
var evtEnd = $('input[name="formEnd"]').val();
var evtStatus= $('input[name=formStatus]').val();
var evtAllday= $('input[name=formAllday]').val();
var evtWebpage= $('select[name=formStatus]').val();
var evtIMAGE= $('[name=formImage]').val();



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


    

    var createEvent = $.ajax({
        url : URL,
        method: "POST",
        contentType: false,
        data: JSON.stringify(eventData),
        success: function(){console.log("SUCCC");},
        error: function(){console.log("ERRR");},
        dataType: "json"
        }
    );
    
    createEvent.done(function( done ) {
            console.log("DONE: ");
            console.log(done);
    });

    createEvent.fail(function( fail ) {
            console.log("FAIL: ");
            console.log(fail);
    });
    var deleteEvent = $.ajax({
        url : URL,
        method:"DELETE"
    });
    
    deleteEvent.done(function(done){
        console.log("Event deleted at Index:"+i);
        console.log(done);
    });

    deleteEvent.fail(function(fail){
        console.log("Failed to delete Event");
        console.log(fail);
    });
    /*
    //Function to add an event to the remote-database !!!TODO!!! (Fix image-Data and categories)
    function addEvent(
      title,
      location,
      organizer, //Mandatory
      start, //Mandatory
      end, //Mandatory
      status, //Mandatory
      allday, //Mandatory
      webpage,
      imageData,
      categories,
      extra
    ) {
      $.ajax({
        url: Domain + "events",
        type: "POST",
        dataType: "json",
        data:
          '{"title":"' +
          title +
          '",' +
          '"location": "' +
          location +
          '",' +
          '"organizer": "' +
          organizer +
          '",' +
          '"start": "' +
          start + //Format: 2014-12-24T18:00
          '",' +
          '"end": "' +
          end + //Format: 2014-12-24T23:30
          '",' +
          '"status": "' +
          status +
          '",' +
          '"allday":' +
          allday +
          "," +
          '"webpage": "' +
          webpage +
          '",' +
          '"image data": null,' +
          '"categories": [],' +
          '"extra":"' +
          extra +
          '"}',
        success: function(data) {
          return true;
        },
        error: function(error) {
          alert(
            "Could not add event: " + error.status + " " + error.statusText
          );
          return false;
        }
      });
    }*/
