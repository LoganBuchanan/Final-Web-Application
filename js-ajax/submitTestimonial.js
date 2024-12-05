// Initialize EmailJS
emailjs.init("cw0kLURlCkrTpbHn0");

$(function () {
    console.log("Script loaded");

    // Validate form fields
    function validateForm() {
        const userName = $("#name").val().trim();
        const email = $("#email").val().trim();
        const testimonial = $("#testimonial").val().trim();

        console.log("Validating fields:", { userName, email, testimonial });

        if (userName && email && testimonial) {
            console.log("All fields are filled. Showing the submit button.");
            $("#submit-button").fadeIn().prop("disabled", false); // Show and enable button
        } else {
            console.log("Fields are missing. Hiding the submit button.");
            $("#submit-button").fadeOut().prop("disabled", true); // Hide and disable button
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
