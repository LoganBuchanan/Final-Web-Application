// Initialize EmailJS
emailjs.init("cw0kLURlCkrTpbHn0");

$(function () {
    console.log("Script loaded");

    // Initialize the jQuery UI datepicker
    $("#datepicker").datepicker({
        dateFormat: "mm/dd/yy", // Format the date
        minDate: 0,            // Disable past dates
        showAnim: "slideDown", // Animation effect
    });
    console.log("Datepicker initialized");

    // Check if all fields are filled
    function validateForm() {
        const date = $("#datepicker").val().trim();
        const userName = $("#user-name").val().trim();
        const reason = $("#reason").val().trim();
        const contactInfo = $("#contact-info").val().trim();

        console.log("Validating fields: ", { date, userName, reason, contactInfo });

        // If all fields are filled, show and enable the submit button
        if (date && userName && reason && contactInfo) {
            $("#submit-button").fadeIn().prop("disabled", false); // Show and enable button
        } else {
            $("#submit-button").fadeOut().prop("disabled", true); // Hide and disable button
        }
    }

    // Add event listeners to validate the form whenever inputs change
    $("#datepicker, #user-name, #reason, #contact-info").on("input change", validateForm);

    // Handle form submission
    $("#contact-form").on("submit", function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Collect form data
        const date = $("#datepicker").val();
        const userName = $("#user-name").val();
        const reason = $("#reason").val();
        const contactInfo = $("#contact-info").val();

        console.log("Form submitted with data: ", { date, userName, reason, contactInfo });

        // Display a loading message
        $("#form-response").text("Sending...").css("color", "blue").fadeIn();

        // Send email using EmailJS
        emailjs.send("service_f34896c", "template_eto37nf", {
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

            // Reset the form and hide the submit button
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


console.log("Script loaded");
$("#datepicker").datepicker({
    dateFormat: "mm/dd/yy",
    minDate: 0,
    showAnim: "slideDown",
});
console.log("Datepicker initialized");
