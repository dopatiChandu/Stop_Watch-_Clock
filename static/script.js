let stopwatchInterval;
let stopwatchTime = 0;
let isRunning = false;

const stopwatchDisplay = document.getElementById('stopwatch');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    ms %= 3600000;
    const minutes = Math.floor(ms / 60000);
    ms %= 60000;
    const seconds = Math.floor(ms / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateStopwatch() {
    stopwatchTime += 1000;
    stopwatchDisplay.textContent = formatTime(stopwatchTime);
}

startButton.addEventListener('click', () => {
    if (!isRunning) {
        stopwatchInterval = setInterval(updateStopwatch, 1000);
        isRunning = true;
    }
});

stopButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(stopwatchInterval);
        isRunning = false;
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    isRunning = false;
    stopwatchTime = 0;
    stopwatchDisplay.textContent = '00:00:00';
});

function updateClock() {
    fetch('/get_time')
        .then(response => response.json())
        .then(data => {
            document.getElementById('clock').textContent = data.time;
        });
}
setInterval(updateClock, 1000);
updateClock();