// Countdown Timer for Special Days
function updateCountdown() {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Reset time to midnight to avoid partial-day miscalculations

    const timerList = document.getElementById("timer-list");
    if (!timerList) {
        console.error("Error: #timer-list not found!");
        return;
    }

    const events = [
        { name: "Monthsary", date: new Date(now.getFullYear(), now.getMonth(), 21) },
        { name: "Anniversary", date: new Date(now.getFullYear(), 9, 21) },  // October 21
        { name: "Earl's Birthday", date: new Date(now.getFullYear(), 5, 22) }, // June 22
        { name: "Jane's Birthday", date: new Date(now.getFullYear(), 9, 21) }  // October 21
    ];

    // Adjust for past Monthsary (move to next month if today is after the 21st)
    if (now.getDate() > 21) {
        events[0].date.setMonth(events[0].date.getMonth() + 1);
        if (events[0].date.getMonth() === 0) {
            events[0].date.setFullYear(events[0].date.getFullYear() + 1);
        }
    }

    // Adjust for past events by moving them to next year
    events.forEach(event => {
        if (now > event.date) {
            event.date.setFullYear(event.date.getFullYear() + 1);
        }
    });

    // Clear previous content
    timerList.innerHTML = "";

    // Display countdowns
    events.forEach(event => {
        const diff = event.date.getTime() - now.getTime();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Round up to prevent off-by-one errors

        let displayText = days === 0
            ? `${event.name}: Today! <333`
            : `${event.name}: ${days} day${days !== 1 ? "s" : ""} left`;

        let countdownItem = document.createElement("li");
        countdownItem.innerHTML = displayText;

        // Highlight today's special event
        if (days === 0) {
            Object.assign(countdownItem.style, {
                backgroundColor: "#FFD700",
                color: "#8B0000",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0px 0px 10px rgba(255, 215, 0, 0.8)"
            });
        }

        timerList.appendChild(countdownItem);
    });

    console.log("Countdown updated successfully!");
}

// Run countdown update every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Floating Hearts & Fireflies Animation
function createFloatingElements(type, count) {
    const container = document.getElementById("animation-container");
    if (!container) {
        console.error("Error: #animation-container not found!");
        return;
    }

    for (let i = 0; i < count; i++) {
        let element = document.createElement("div");
        element.classList.add(type);

        // Random position & animation settings
        Object.assign(element.style, {
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            animationDuration: `${3 + Math.random() * 5}s`,
            animationDelay: `${Math.random() * 3}s`
        });

        container.appendChild(element);
    }
}

// Ensure floating elements appear separately
document.addEventListener("DOMContentLoaded", () => {
    createFloatingElements("floating-heart", 10);
    createFloatingElements("firefly", 10);
});

// Background Music Toggle
function toggleMusic() {
    var music = document.getElementById("bgMusic");
    var button = document.getElementById("musicControl");

    if (!music || !button) return;

    if (music.paused) {
        music.play();
        button.innerHTML = "🎶";
        button.classList.add("playing");
    } else {
        music.pause();
        button.innerHTML = "🎵";
        button.classList.remove("playing");
    }
}

// Dynamic Sky Mode (Day/Night)
function updateSky() {
    let currentHour = new Date().getHours();
    document.body.classList.toggle("daytime", currentHour >= 6 && currentHour < 18);
    document.body.classList.toggle("nighttime", currentHour < 6 || currentHour >= 18);
}

// Run function on page load
window.onload = updateSky;
