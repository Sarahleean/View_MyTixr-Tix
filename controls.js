const App = document.getElementById('app-box');

document.querySelectorAll('.nav_icons')[1].classList.add('activeNav');

// open input
const maincontextDivTap = document.getElementById('main-container');
const inputWindow = document.getElementById('inputiDAccess-window');

const inputField = document.getElementById('input-field');
const buttonsHideFirst = document.getElementById('buttonsHideFirst');
const faLock = document.querySelector('.fa-lock');
const checkbox = document.getElementById('checkboxiD');
const continueBTN = document.getElementById('continueBTN');

// Set the correct login info
const correctInfo = '1234'; // Replace with your desired code

// over lay
const overlay = document.createElement('div');
overlay.id = 'overlay';
document.getElementById('app-box').appendChild(overlay);

let isLoggedIn = false;

function updateOverlay() {
    if (isLoggedIn) {
        overlay.classList.add('hidden');
    } else {
        overlay.classList.remove('hidden');
    }
}

maincontextDivTap.addEventListener('click', () => {
    if (!isLoggedIn) {
        inputWindow.classList.toggle('openInput');
    }
});

overlay.addEventListener('click', () => {
    if (!isLoggedIn) {
        inputWindow.classList.toggle('openInput');
    }
});

function updateLockMode() {
    console.log('updateLockMode called');
    if (!isLoggedIn) {
        console.log('Applying lock-mode class');
        document.querySelectorAll('#app-box > *:not(#Js-PopupsAndCo):not(#overlay)').forEach(element => {
            if (!element.classList.contains('lock-mode')) {
                element.classList.add('lock-mode');
                console.log('Added lock-mode class to', element);
            }
        });
    } else {
        console.log('Removing lock-mode class');
        document.querySelectorAll('.lock-mode').forEach(element => {
            element.classList.remove('lock-mode');
            console.log('Removed lock-mode class from', element);
        });
    }
}

updateLockMode();

continueBTN.addEventListener('click', () => {
    const inputValue = inputField.value.trim();
    if (inputValue === correctInfo) {
        // Show buttonsHideFirst and hide fa-lock
        buttonsHideFirst.style.display = 'flex';
        buttonsHideFirst.style.opacity = 1;
        buttonsHideFirst.style.transition = 'opacity 0.3s ease-in-out';
        faLock.style.opacity = 0;
        faLock.style.transition = 'opacity 0.3s ease-in-out';
        setTimeout(() => {
            faLock.style.display = 'none';
        }, 300);
        inputWindow.classList.remove('openInput');
        isLoggedIn = true; // Set the flag to true after login
        updateLockMode();
        updateOverlay(); // Call updateOverlay after setting isLoggedIn to true
    } else {
        // Show error message
        document.getElementById('status').style.display = 'block';
        document.getElementById('status').style.opacity = 1;
        document.getElementById('status').style.transition = 'opacity 0.3s ease-in-out';
        inputField.style.border = '3px solid hsl(0, 100%, 50%)';
        inputField.style.boxShadow = '0px 0px 6px hsl(0, 100%, 70%)';
        inputWindow.classList.add('VibrateShakeInputWindow');
        setTimeout(() => {
            inputWindow.classList.remove('VibrateShakeInputWindow');
        }, 1000);
    }
});

// Function to check input and checkbox states
function checkInputStates() {
    const inputValue = inputField.value.trim();
    const isChecked = checkbox.checked;

    if (inputValue !== '' && isChecked) {
        // Enable continue button
        continueBTN.style.background = 'rgb(0, 132, 255)'; // Initial blue color
        continueBTN.style.cursor = 'pointer';
        continueBTN.style.pointerEvents = 'auto';
    } else {
        // Disable continue button
        continueBTN.style.background = 'rgba(0, 132, 255, 0.5)'; // Lighter blue color
        continueBTN.style.cursor = 'not-allowed';
        continueBTN.style.pointerEvents = 'none';
    }
}

// Add event listeners to input and checkbox
inputField.addEventListener('input', checkInputStates);
checkbox.addEventListener('change', checkInputStates);

// Initialize continue button state
checkInputStates();

document.getElementById('birthday-display').addEventListener('click', function() {
    document.getElementById('birthday').showPicker();
});

// document.getElementById('birthday').addEventListener('change', function() {
//     var date = new Date(this.value);
//     var options = { year: 'numeric', month: 'long', day: 'numeric' };
//     document.getElementById('birthday-display').value = date.toLocaleDateString('en-GB', options);
//     saveValues();
// });

document.getElementById('birthday-display').addEventListener('click', function() {
    document.getElementById('birthday').focus();
});

document.getElementById('birthday').addEventListener('change', function() {
    var date = new Date(this.value);
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('birthday-display').value = date.toLocaleDateString('en-GB', options);
    saveValues();
});

// Get the input fields
const birthdayDisplay = document.getElementById('birthday-display');
const postalCodeInput = document.getElementById('postal-code');
const phoneNumberInput = document.getElementById('phone-number');
const countrySelect = document.getElementById('country-or-region');

// Function to save values to local storage
function saveValues() {
    localStorage.setItem('birthday', birthdayDisplay.value);
    localStorage.setItem('postalCode', postalCodeInput.value);
    localStorage.setItem('phoneNumber', phoneNumberInput.value);
    localStorage.setItem('country', countrySelect.value);
}

// Add event listeners to input fields
birthdayDisplay.addEventListener('change', saveValues);
postalCodeInput.addEventListener('input', saveValues);
phoneNumberInput.addEventListener('input', saveValues);
countrySelect.addEventListener('change', saveValues);

// Load saved values from local storage
if (localStorage.getItem('birthday')) {
    birthdayDisplay.value = localStorage.getItem('birthday');
}
if (localStorage.getItem('postalCode')) {
    postalCodeInput.value = localStorage.getItem('postalCode');
}
if (localStorage.getItem('phoneNumber')) {
    phoneNumberInput.value = localStorage.getItem('phoneNumber');
}
if (localStorage.getItem('country')) {
    countrySelect.value = localStorage.getItem('country');
}

// Function to remove saved value
function removeSavedValue(key, inputField) {
    localStorage.removeItem(key);
    inputField.value = '';
}

// Function to handle hold event
function handleHoldEvent(inputField, key) {
    let holdTimeout = null;
    inputField.addEventListener('touchstart', function(e) {
        holdTimeout = setTimeout(function() {
            removeSavedValue(key, inputField);
        }, 3000);
    });
    inputField.addEventListener('touchend', function(e) {
        clearTimeout(holdTimeout);
    });
}

// Add event listeners to input fields
handleHoldEvent(birthdayDisplay, 'birthday');
handleHoldEvent(postalCodeInput, 'postalCode');
handleHoldEvent(phoneNumberInput, 'phoneNumber');
handleHoldEvent(countrySelect, 'country');

// open profile
const profile = document.getElementById('profile-container');
const MeTouch = document.getElementById('Me');
const CloseProfile = document.querySelector('.closeProfilePage');

MeTouch.addEventListener('click', () => {
    profile.classList.add('showProfileContainer');
    document.body.classList.add('backGblack');
});
CloseProfile.addEventListener('click', () => {
    profile.classList.remove('showProfileContainer');
    document.body.classList.remove('backGblack');
});