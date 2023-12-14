function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();

    const timeDisplay = document.getElementById('timeDisplay');
    timeDisplay.textContent = timeString;
}

// Call updateTime() to initially display the time
updateTime();

// Call updateTime() periodically to update the time
setInterval(updateTime, 1000); // Update every 1 second
