//pending front-end feedback
$(document).ready(function() {
  //will edit based on event form ids
  const eventForm = $("form.eventsignup");
  const eventTitle = $("input#title-input");
  const eventCategory = $("input#category-input");
  const eventDate = $("input#eventdate-input");
  const eventLink = $("input#eventlink-input");
  const eventDescription = $("input#description-input");
  const eventLocation = $("input#location-input");
  //not sure we need it with userId through the association
  //const eventUploader = $("input#uploader-input");

  //handle the button to submit an event
  eventForm.on("Submit", function(event){
    event.preventDefault();
    //store  information received into a new event object
    //userId??
    var newEvent = {
      title: eventTitle.val().trim(),
      category: eventCategory.val().trim(),
      eventDate: eventDate.val().trim(),
      eventLink: eventLink.val().trim(),
      description: eventDescription.val().trim(),
      location: eventLocation.val().trim(),
      //uploader: eventUploader.val().trim()
    };
    //validate newEvent attributes - title,location and uploader - to not null as per the model specifications
    if (!newEvent.title || !newEvent.location || !newEvent.uploader) {
      return;
    }
    //once not Null fields are validated
    //run the function addNewEvent
    addNewEvent(newEvent);

    //reset form fields
    eventTitle.val("");
    eventCategory.val("");
    eventDate.val("");
    eventLink.val("");
    eventDescription.val("");
    eventLocation.val("");
    //eventUploader.val("");
  });

  function addNewEvent(newEvent) {
    $.post("/api/events", newEvent)
      .then(
        console.log(newEvent);
        //retrieve events
        location.reload("/events")
      )
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  //handle the button to delete an event

});
