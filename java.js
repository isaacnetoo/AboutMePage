document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    const statusMessage = form.querySelector('.status-message');
    
    // Function to display status messages
    function setStatusMessage(message, success = true) {
        statusMessage.textContent = message;
        statusMessage.classList.toggle('success', success);
        statusMessage.classList.toggle('error', !success);
    }

    // Function to validate form inputs
    function validateForm() {
        const name = form.querySelector('input[name="name"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();
        const message = form.querySelector('textarea[name="message"]').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !message) {
            setStatusMessage('Please fill in all fields.', false);
            return false;
        }

        if (!emailRegex.test(email)) {
            setStatusMessage('Please enter a valid email address.', false);
            return false;
        }

        return true;
    }

    // Function to handle form submission
    function submitForm(event) {
        event.preventDefault(); // Prevent default form submission

        if (!validateForm()) {
            return;
        }

        // Disable submit button to prevent multiple submissions
        submitButton.disabled = true;
        setStatusMessage('Sending message...', true);

        // Prepare form data for submission
        const formData = new FormData(form);

        // Perform AJAX request to submit form data
        fetch(form.getAttribute('action'), {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                setStatusMessage('Message sent successfully!', true);
            } else {
                setStatusMessage('Failed to send message. Please try again later.', false);
            }
        })
        .catch(error => {
            setStatusMessage('An error occurred. Please try again later.', false);
        })
        .finally(() => {
            // Enable submit button and clear form after submission
            submitButton.disabled = false;
            form.reset();
        });
    }

    // Attach form submission event listener
    form.addEventListener('submit', submitForm);
});
