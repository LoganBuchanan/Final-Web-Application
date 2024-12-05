// Initialize EmailJS
emailjs.init("cw0kLURlCkrTpbHn0");

$(function () {
    console.log("Script loaded");

    // Load testimonials from local storage
    function loadTestimonials() {
        const testimonials = JSON.parse(localStorage.getItem("testimonials")) || [];
        testimonials.forEach(({ userName, testimonial }) => {
            const testimonialHTML = `
                <div class="testimonial">
                    <p class="quote">"${testimonial}"</p>
                    <p class="client">- ${userName}</p>
                </div>
            `;
            $(".testimonials-section").append(testimonialHTML);
        });
    }

    // Save testimonial to local storage
    function saveTestimonial(userName, testimonial) {
        const testimonials = JSON.parse(localStorage.getItem("testimonials")) || [];
        testimonials.push({ userName, testimonial });
        localStorage.setItem("testimonials", JSON.stringify(testimonials));
    }

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
            // Save testimonial to local storage
            saveTestimonial(userName, testimonial);

            // Add the testimonial to the page
            const newTestimonial = `
                <div class="testimonial">
                    <p class="quote">"${testimonial}"</p>
                    <p class="client">- ${userName}</p>
                </div>
            `;
            $(".testimonials-section").append(newTestimonial);

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

    // Load existing testimonials on page load
    loadTestimonials();
});
