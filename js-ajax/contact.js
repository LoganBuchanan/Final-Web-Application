// Initialize EmailJS with your user ID.
emailjs.init("cw0kLURlCkrTpbHn0");

$(function () {
  console.log("Script loaded"); // Confirm script loaded successfully.

  // Initializes the jQuery UI datepicker with specific options like date format, animation, and disabling past dates.
  $("#datepicker").datepicker({
    dateFormat: "mm/dd/yy",
    minDate: 0,
    showAnim: "slideDown",
  });

  console.log("Datepicker initialized");

  // Function to validate the contact information. 
  // Ensures the contact info is either a valid email address or a valid phone number using regular expressions.
  function isValidContact(contact) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?[1-9]\d{1,14}$/;
    return emailPattern.test(contact) || phonePattern.test(contact);
  }

  // Validates the entire form by checking if all fields are filled 
  // and if the contact information passes the `isValidContact` check. 
  // If valid, the submit button is shown and enabled; otherwise, it remains hidden and disabled.
  function validateForm() {
    const date = $("#datepicker").val().trim();
    const userName = $("#user-name").val().trim();
    const reason = $("#reason").val().trim();
    const contactInfo = $("#contact-info").val().trim();

    console.log("Validating fields:", { date, userName, reason, contactInfo });

    if (date && userName && reason && isValidContact(contactInfo)) {
      $("#submit-button").fadeIn().prop("disabled", false);
    } else {
      $("#submit-button").fadeOut().prop("disabled", true);
    }
  }

  // Adds event listeners to form fields, triggering validation whenever the input values change.
  $("#datepicker, #user-name, #reason, #contact-info").on("input change", validateForm);

  // Handles form submission by collecting form data, displaying a loading message, 
  // sending the data using EmailJS, and providing success or error feedback to the user.
  $("#contact-form").on("submit", function (event) {
    event.preventDefault();

    const date = $("#datepicker").val();
    const userName = $("#user-name").val();
    const reason = $("#reason").val();
    const contactInfo = $("#contact-info").val();

    console.log("Form submitted with data:", { date, userName, reason, contactInfo });

    $("#form-response").text("Sending...").css("color", "blue").fadeIn();

    emailjs
      .send("service_f34896c", "template_eto37nf", {
        appointment_date: date,
        user_name: userName,
        reason: reason,
        contact_info: contactInfo,
      })
      .then(function () {
        // On success, show a success message, reset the form, and hide the submit button.
        $("#form-response")
          .text("Your message has been sent successfully!")
          .css("color", "green")
          .fadeIn();

        $("#contact-form")[0].reset();
        $("#submit-button").fadeOut().prop("disabled", true);
      })
      .catch(function (error) {
        // On error, show an error message and log the error details.
        console.error("EmailJS Error:", error);
        $("#form-response")
          .text("Failed to send your message. Please try again later.")
          .css("color", "red")
          .fadeIn();
      });
  });
});
