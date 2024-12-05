// Initialize EmailJS
emailjs.init("cw0kLURlCkrTpbHn0");

$(function () {
    console.log("Script loaded");

    // Validate form fields
    function validateForm() {
        const userName = $("#name").val().trim();
        const email = $("#email").val().trim();
        const testimonial = $("#testimonial").val().trim();

        // Regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        console.log("Validating fields:", { userName, email, testimonial });

        // Check if all fields are filled and email is valid
        if (userName && emailRegex.test(email) && testimonial) {
            console.log("All fields are valid. Showing the submit button.");
            $("#submit-button").fadeIn().prop("disabled", false);
        } else {
            console.log("Fields are invalid or missing. Hiding the submit button.");
            $("#submit-button").fadeOut().prop("disabled", true);
        }
    }

    // Add event listeners to validate the form whenever inputs change
    $("#name, #email, #testimonial").on("input change", validateForm);

    // Handle form submission
    $("#testimonial-form").on("submit", function (event) {
        event.preventDefault();

        const userName = $("#name").val();
        const email = $("#email").val();
        const testimonial = $("#testimonial").val();

        console.log("Form submitted with data:", { userName, email, testimonial });

        $("#form-response").text("Sending...").css("color", "blue").fadeIn();

        emailjs.send("service_f34896c", "template_xsmka8t", {
            user_name: userName,
            user_email: email,
            user_testimonial: testimonial,
        })
        .then(function () {
            $("#form-response")
                .text("Your testimonial has been submitted. Thank you!")
                .css("color", "green")
                .fadeIn();

            $("#testimonial-form")[0].reset();
            $("#submit-button").fadeOut().prop("disabled", true);
        })
        .catch(function (error) {
            console.error("EmailJS Error:", error);
            $("#form-response")
                .text("Failed to submit your testimonial. Please try again later.")
                .css("color", "red")
                .fadeIn();
        });
    });
});
