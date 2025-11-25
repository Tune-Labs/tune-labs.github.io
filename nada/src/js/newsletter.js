// Fill these with your actual ConvertKit values
const CK_FORM_ID = "8808255";
const CK_API_KEY = "fUAXwS2qQ9yQwx846IYMBQ";

const form = document.getElementById("newsletter-form");
const emailInput = document.getElementById("newsletter-email");
const submitBtn = document.getElementById("newsletter-submit");
const messageEl = document.getElementById("newsletter-message");

async function subscribeToConvertKit(email) {
    const endpoint = `https://api.convertkit.com/v3/forms/${CK_FORM_ID}/subscribe`;

    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            api_key: CK_API_KEY,
            email: email
        }),
    });

    if (!res.ok) {
        throw new Error("Request failed: " + res.status);
    }

    return res.json();
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    if (!email) return;

    messageEl.textContent = "";
    submitBtn.disabled = true;
    submitBtn.textContent = "SUBSCRIBING...";

    try {
        await subscribeToConvertKit(email);
        messageEl.textContent = "Thanks! Check your inbox to confirm.";
        form.reset();
    } catch (err) {
        console.error(err);
        messageEl.textContent = "Something went wrong. Please try again.";
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "SUBSCRIBE";
    }
});