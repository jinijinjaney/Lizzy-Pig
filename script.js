// Countdown Timer for Special Days
function updateCountdown() {
    const now = new Date();
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

    // Adjust for past monthsary (move to next month if already passed)
    if (now.getDate() > 21) {
        events[0].date.setMonth(now.getMonth() + 1);
        if (events[0].date.getMonth() > 11) {
            events[0].date.setFullYear(now.getFullYear() + 1);
            events[0].date.setMonth(0);
        }
    }

    // Adjust for past events by setting them to next year
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
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        let displayText = days === 0 ? `${event.name}: Today! <333` : `${event.name}: ${days} day${days !== 1 ? "s" : ""} left`;

        let countdownItem = document.createElement("li");
        countdownItem.innerHTML = displayText;

        // Apply yellow background if today is the special day
        if (days === 0) {
            countdownItem.style.backgroundColor = '#FFD700';
            countdownItem.style.color = '#8B0000'; // Improve text readability
            countdownItem.style.padding = "10px";
            countdownItem.style.borderRadius = "8px";
            countdownItem.style.boxShadow = "0px 0px 10px rgba(255, 215, 0, 0.8)"; // Glowing gold effect
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
        element.style.left = `${Math.random() * 100}vw`;
        element.style.top = `${Math.random() * 100}vh`;
        element.style.animationDuration = `${3 + Math.random() * 5}s`; // Adjusting speed for variance
        element.style.animationDelay = `${Math.random() * 3}s`;

        container.appendChild(element);
    }
}

// Ensure floating elements appear separately
document.addEventListener("DOMContentLoaded", () => {
    createFloatingElements("floating-heart", 10);  // 10 hearts floating independently
    createFloatingElements("firefly", 10);         // 10 fireflies floating separately
});

function toggleMusic() {
    var music = document.getElementById("bgMusic");
    var button = document.getElementById("musicControl");

    if (music.paused) {
        music.play();
        button.innerHTML = "🎶"; // Music note when playing
        button.classList.add("playing"); // Add glowing effect
    } else {
        music.pause();
        button.innerHTML = "🎵"; // Different note when paused
        button.classList.remove("playing"); // Remove glow effect
    }
}

function updateSky() {
    let currentHour = new Date().getHours();
    let body = document.body;

    if (currentHour >= 6 && currentHour < 18) {
        // Day Mode
        body.classList.remove("nighttime");
        body.classList.add("daytime");
    } else {
        // Night Mode
        body.classList.remove("daytime");
        body.classList.add("nighttime");
    }
}

// Run function on page load
window.onload = updateSky;
