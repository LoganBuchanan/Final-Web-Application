// Initialize EmailJS
emailjs.init("cw0kLURlCkrTpbHn0"); // Replace with your actual EmailJS user ID

$(function () {
    // Validate form fields
    function validateForm() {
        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const testimonial = $("#testimonial").val().trim();

        // If all fields are filled, show and enable the submit button
        if (name && email && testimonial) {
          $("#submit-button").fadeIn().prop("disabled", false); // Show and enable button
        } else {
            $("#submit-button").fadeOut().prop("disabled", true); // Hide and disable button
        }
    }

    // Add event listeners to validate the form whenever inputs change
    $("#name, #email, #testimonial").on("input change", validateForm);

    // Handle form submission
    $("#testimonial-form").on("submit", function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Collect form data
        const name = $("#name").val();
        const email = $("#email").val();
        const testimonial = $("#testimonial").val();

        // Display a loading message
        $("#form-response").text("Sending...").css("color", "blue").fadeIn();

        // Send email using EmailJS
        emailjs.send("service_f34896c", "template_xsmka8t", {
            user_name: name,
            user_email: email,
            user_testimonial: testimonial,
        })
        .then(function () {
            $("#form-response")
                .text("Thank you! Your testimonial has been submitted.")
                .css("color", "green")
                .fadeIn();

            // Reset the form and hide the submit button
            $("#testimonial-form")[0].reset();
            $("#submit-button").fadeOut().prop("disabled", true);
        })
        .catch(function (error) {
            $("#form-response")
                .text("Failed to submit your testimonial. Please try again later.")
                .css("color", "red")
                .fadeIn();
            console.error("EmailJS Error:", error);
        });
    });
});
