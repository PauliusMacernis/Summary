const loadingBar = document.querySelector('.loading-bar');
const dropdown = document.getElementById('breathingTechnique');
const breathingText = document.querySelector('.breathing-text');

let breatheInTime = 4000;
let holdAfterInhaleTime = 4000;
let breatheOutTime = 4000;
let holdAfterExhaleTime = 4000;

function updateBreathing() {
    if (dropdown.value === 'wimhof') {
        breatheInTime = 2000;
        holdAfterInhaleTime = 0; // No hold in Wim Hofman Technique after inhale
        breatheOutTime = 4000;
        holdAfterExhaleTime = 0; // No hold in Wim Hofman Technique after exhale
    } else {
        breatheInTime = 4000;
        holdAfterInhaleTime = 4000;
        breatheOutTime = 4000;
        holdAfterExhaleTime = 4000;
    }
    breathe();
}

function breathe() {
    breathingText.innerText = 'Inhale';
    loadingBar.style.transition = `width ${breatheInTime}ms linear`;
    loadingBar.style.width = '100%';

    setTimeout(() => {
        breathingText.innerText = 'Hold';
        loadingBar.style.transition = 'none'; // No change in width during hold
    }, breatheInTime);

    setTimeout(() => {
        breathingText.innerText = 'Exhale';
        loadingBar.style.transition = `width ${breatheOutTime}ms linear`;
        loadingBar.style.width = '0%';
    }, breatheInTime + holdAfterInhaleTime);

    setTimeout(() => {
        breathingText.innerText = 'Hold';
        loadingBar.style.transition = 'none'; // No change in width during hold
    }, breatheInTime + holdAfterInhaleTime + breatheOutTime);

    setTimeout(breathe, breatheInTime + holdAfterInhaleTime + breatheOutTime + holdAfterExhaleTime);
}


dropdown.addEventListener('change', updateBreathing);

const VILNIUS_LAT = 54.6872;
const VILNIUS_LNG = 25.2797;

function adjustBackgroundColor() {
    const times = SunCalc.getTimes(new Date(), 54.6872, 25.2797);
    const now = new Date();

    if (now >= times.sunrise && now <= times.sunset) {
        // Calculate percentage of the day that has passed
        const dayDuration = times.sunset - times.sunrise;
        const timePassed = now - times.sunrise;
        const percentageOfDay = timePassed / dayDuration;

        // Gradually change the background color from light to dark
        const currentColor = 255 - Math.round(percentageOfDay * 255);
        document.body.style.backgroundColor = `rgb(${currentColor},${currentColor},${currentColor})`;
    } else {
        // It's night
        document.body.style.backgroundColor = '#000';
    }
}


function lerpColor(a, b, amount) {
    const ar = parseInt(a.slice(1, 3), 16),
        ag = parseInt(a.slice(3, 5), 16),
        ab = parseInt(a.slice(5, 7), 16),
        br = parseInt(b.slice(1, 3), 16),
        bg = parseInt(b.slice(3, 5), 16),
        bb = parseInt(b.slice(5, 7), 16),
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + Math.round(rr).toString(16) + Math.round(rg).toString(16) + Math.round(rb).toString(16);
}

function updateCurrentTime() {
    const vilniusTime = new Date().toLocaleTimeString('en-US', {timeZone: 'Europe/Vilnius', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'});

    // Adjust the hour if it's "24"
    let [hour, minute, second] = vilniusTime.split(":");
    if (hour === "24") {
        hour = "00";
    }

    document.getElementById('current-time').innerText = `${hour}:${minute}:${second}`;
}

setInterval(updateCurrentTime, 1000); // Update the time every second

adjustBackgroundColor();
updateBreathing();

