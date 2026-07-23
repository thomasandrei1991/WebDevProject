document.addEventListener('DOMContentLoaded', () => {
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");

    const btn = document.getElementById("btn");

    const messageBox = document.getElementById("messageBox");
    const message = document.getElementById("message");
    const closeBtn = document.getElementById("closeBtn");

    function showMessage() {
        message.textContent = firstName.value + " " + lastName.value;
        messageBox.classList.remove("hidden");
        if (closeBtn) closeBtn.focus();
    }

    function hideMessage() {
        messageBox.classList.add("hidden");
    }

    if (btn) btn.addEventListener("click", showMessage);

    if (closeBtn) {
        closeBtn.type = 'button';
        closeBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            hideMessage();
        });
    }

    // Close when clicking the overlay (outside the .box)
    if (messageBox) {
        messageBox.addEventListener('click', function (e) {
            if (e.target === messageBox) hideMessage();
        });
        // allow pressing Escape to close
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !messageBox.classList.contains('hidden')) {
                hideMessage();
            }
        });
    }
});