emailjs.init("cw0kLURlCkrTpbHn0"); // Replace with your actual EmailJS user ID

$(function () {
  console.log("Script loaded");

  // Initialize the jQuery UI datepicker
  $("#datepicker").datepicker({
    dateFormat: "mm/dd/yy",
    minDate: 0,
    showAnim: "slideDown",
  });

  console.log("Datepicker initialized");

  function isValidContact(contact) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?[1-9]\d{1,14}$/;
    return emailPattern.test(contact) || phonePattern.test(contact);
  }

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

  $("#datepicker, #user-name, #reason, #contact-info").on("input change", validateForm);

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
        $("#form-response")
          .text("Your message has been sent successfully!")
          .css("color", "green")
          .fadeIn();

        $("#contact-form")[0].reset();
        $("#submit-button").fadeOut().prop("disabled", true);
      })
      .catch(function (error) {
        console.error("EmailJS Error:", error);
        $("#form-response")
          .text("Failed to send your message. Please try again later.")
          .css("color", "red")
          .fadeIn();
      });
  });
});
