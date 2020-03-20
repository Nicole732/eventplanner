$(document).ready(function() {
  //will edit based on event form ids
  //planevent??
  const deleteForm = $("form.event-form");
  const eventTitle = $("input#title-input");
  const eventCategory = $("input#category-input");
  //const eventDate = $("input#eventdate-input");
  const eventLink = $("#eventlink-input");
  const eventDescription = $("input#description-input");
  const eventLocation = $("input#location-input");
  //not sure we need it with userId through the association
  //const eventUploader = $("input#uploader-input");
  const deletedEvent = {
    title: eventTitle.val().trim(),
    category: eventCategory.val().trim(),
    //eventDate: eventDate.val().trim(),
    eventLink: eventLink.val(),
    description: eventDescription.val(),
    location: eventLocation.val().trim()
    //uploader: eventUploader.val().trim()
  };
  //handle the button to submit an event
  deleteForm.on("click", function(deletedEvent) {
    event.preventDefault();

    if (!deletedEvent.title || !deletedEvent.location) {
      return;
    }
    var id = $(this).data("id");

    // Send the DELETE request.
    $.delete("/api/events/" + id)
      .then(() => {
        console.log("deleted id ", id);
        // Reload the page to get the updated list
        location.reload();
      })
      .catch(handleLoginErr);
  });
  //reset form fields
  eventTitle.val("");
  eventCategory.val("");
  //eventDate.val("");
  eventLink.val("");
  eventDescription.val("");
  eventLocation.val("");
  //eventUploader.val("");

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
  // login to delete an event

  //delete an event
});
