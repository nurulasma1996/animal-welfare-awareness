document.addEventListener("DOMContentLoaded", function () {

    const shareButton =
        document.getElementById("share-page-button");

    const shareMenu =
        document.getElementById("share-menu");

    const shareStatus =
        document.getElementById("share-status");

    const whatsappButton =
        document.getElementById("share-whatsapp");

    const facebookButton =
        document.getElementById("share-facebook");

    const emailButton =
        document.getElementById("share-email");

    const copyButton =
        document.getElementById("copy-page-link");


    if (
        !shareButton ||
        !shareMenu ||
        !shareStatus ||
        !whatsappButton ||
        !facebookButton ||
        !emailButton ||
        !copyButton
    ) {
        return;
    }


    const pageTitle = document.title;
    const pageUrl = window.location.href;

    const shareText =
        "Learn more about animal welfare awareness in Malaysia.";


    function showMessage(message) {

        shareStatus.textContent = message;
        shareStatus.classList.add("show");

        setTimeout(function () {

            shareStatus.textContent = "";
            shareStatus.classList.remove("show");

        }, 4000);

    }


    function openShareMenu() {

        shareMenu.classList.add("show");

        shareMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        shareButton.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    function closeShareMenu() {

        shareMenu.classList.remove("show");

        shareMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        shareButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    shareButton.addEventListener("click", function () {

        const menuIsOpen =
            shareMenu.classList.contains("show");

        if (menuIsOpen) {

            closeShareMenu();

        } else {

            openShareMenu();

        }

    });


    whatsappButton.addEventListener("click", function () {

        const whatsappUrl =
            "https://wa.me/?text=" +
            encodeURIComponent(
                shareText + "\n" + pageUrl
            );

        window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
        );

        closeShareMenu();

    });


    facebookButton.addEventListener("click", function () {

        const facebookUrl =
            "https://www.facebook.com/sharer/sharer.php?u=" +
            encodeURIComponent(pageUrl);

        window.open(
            facebookUrl,
            "_blank",
            "width=650,height=500,noopener,noreferrer"
        );

        closeShareMenu();

    });


    emailButton.addEventListener("click", function () {

        const emailUrl =
            "mailto:?subject=" +
            encodeURIComponent(pageTitle) +
            "&body=" +
            encodeURIComponent(
                shareText + "\n\n" + pageUrl
            );

        window.location.href = emailUrl;

        closeShareMenu();

    });


    copyButton.addEventListener("click", async function () {

        try {

            if (
                navigator.clipboard &&
                window.isSecureContext
            ) {

                await navigator.clipboard.writeText(
                    pageUrl
                );

            } else {

                const temporaryInput =
                    document.createElement("textarea");

                temporaryInput.value = pageUrl;

                temporaryInput.style.position =
                    "fixed";

                temporaryInput.style.opacity =
                    "0";

                document.body.appendChild(
                    temporaryInput
                );

                temporaryInput.select();

                document.execCommand("copy");

                document.body.removeChild(
                    temporaryInput
                );

            }

            showMessage(
                "The page link has been copied."
            );

        } catch (error) {

            showMessage(
                "Unable to copy the link."
            );

        }

        closeShareMenu();

    });


    document.addEventListener("click", function (event) {

        if (
            !shareMenu.contains(event.target) &&
            !shareButton.contains(event.target)
        ) {
            closeShareMenu();
        }

    });


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeShareMenu();
        }

    });

});