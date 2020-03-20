//pending front-end feedback
$(document).ready(function() {
  //will edit based on event form ids
  //planevent??
  const eventForm = $("form.event-form");
  const eventTitle = $("input#title-input");
  const eventCategory = $("input#category-input");
  //const eventDate = $("input#eventdate-input");
  const eventLink = $("#eventlink-input");
  const eventDescription = $("input#description-input");
  const eventLocation = $("input#location-input");
  //not sure we need it with userId through the association
  //const eventUploader = $("input#uploader-input");

  //handle the button to submit an event
  eventForm.on("submit", function(event) {
    event.preventDefault();
    //store  information received into a new event object
    //userId??
    console.log($("#eventlink-input").val());
    var newEvent = {
      title: eventTitle.val().trim(),
      category: eventCategory.val().trim(),
      //eventDate: eventDate.val().trim(),
      eventLink: eventLink.val(),
      description: eventDescription.val(),
      location: eventLocation.val().trim()
      //uploader: eventUploader.val().trim()
    };
    //validate newEvent attributes - title,location and uploader - to not null as per the model specifications
    if (!newEvent.title || !newEvent.location) {
      return;
    }
    //once not Null fields are validated
    //run the function addNewEvent
    addNewEvent(newEvent);

    //reset form fields
    eventTitle.val("");
    eventCategory.val("");
    //eventDate.val("");
    eventLink.val("");
    eventDescription.val("");
    eventLocation.val("");
    //eventUploader.val("");
  });

  function addNewEvent(newEvent) {
    $.post("/api/events", newEvent)
      .then(() => {
        console.log(newEvent);
        //retrieve events
        location.reload("/events");
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
  // login to delete an event

  //delete an event

  // $(".delevent").on("click", function(event) {
  //   var id = $(this).data("id");

  //   // Send the DELETE request.
  //   $.delete("/api/events/" + id).then(
  //     () => {
  //       console.log("deleted id ", id);
  //       // Reload the page to get the updated list
  //       location.reload();
  //     }
  //   );
  // });
});
