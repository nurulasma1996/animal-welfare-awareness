document.addEventListener("DOMContentLoaded", function () {

    const responseFrame =
        document.getElementById("google-sheet-response");

    const petshopForm =
        document.getElementById("petshop-form");

    const feedbackForm =
        document.getElementById("feedback-form");

    const petshopStatus =
        document.getElementById("petshop-status");

    const feedbackStatus =
        document.getElementById("feedback-status");


    let activeForm = null;
    let activeStatus = null;
    let activeButton = null;
    let originalButtonText = "";
    let submissionStarted = false;


    function prepareFormSubmission(form, statusElement) {

        if (!form || !statusElement) {
            return;
        }


        form.addEventListener("submit", function () {

            activeForm = form;
            activeStatus = statusElement;

            activeButton =
                form.querySelector(
                    'button[type="submit"]'
                );

            if (!activeButton) {
                return;
            }


            originalButtonText =
                activeButton.textContent.trim();


            activeStatus.textContent =
                "Submitting your information...";

            activeStatus.className =
                "form-status form-status-submitting";


            activeButton.disabled = true;
            activeButton.textContent = "Submitting...";


            submissionStarted = true;

        });

    }


    prepareFormSubmission(
        petshopForm,
        petshopStatus
    );


    prepareFormSubmission(
        feedbackForm,
        feedbackStatus
    );


    responseFrame.addEventListener("load", function () {

        /*
            Ignore the iframe's first empty load.
        */

        if (
            !submissionStarted ||
            !activeForm ||
            !activeStatus ||
            !activeButton
        ) {
            return;
        }


        /*
            Clear the submitted form.
        */

        activeForm.reset();


        /*
            Display success message.
        */

        activeStatus.textContent =
            "Your submission has been successfully recorded. Thank you.";

        activeStatus.className =
            "form-status form-status-success";


        /*
            Restore submit button.
        */

        activeButton.disabled = false;
        activeButton.textContent = originalButtonText;


        /*
            Save the completed status element
            before resetting the variables.
        */

        const completedStatus = activeStatus;


        /*
            Remove the message after 7 seconds.
        */

        setTimeout(function () {

            completedStatus.textContent = "";
            completedStatus.className = "form-status";

        }, 7000);


        /*
            Reset submission variables.
        */

        activeForm = null;
        activeStatus = null;
        activeButton = null;
        originalButtonText = "";
        submissionStarted = false;

    });

});