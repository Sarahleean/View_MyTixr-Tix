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
const correctInfo = ['78206A', '#78206A', 'password1pop'];

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
    if (correctInfo.includes(inputValue)) {
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

// document.getElementById('birthday-display').addEventListener('click', function() {
//     document.getElementById('birthday').showPicker();
// });

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

const tixSlideHolder = document.getElementById('TixSlideHolder');
const dashesCounter = document.getElementById('DashesCounter');
const slides = tixSlideHolder.children;

//view tix butttons
const viewClickBTN = document.querySelectorAll('.view-tickets');

viewClickBTN.forEach((viewClickBTNEach) => {
    viewClickBTNEach.addEventListener('click', () => {
        transfersWindow.classList.remove('showTransfer');
        availableTix.classList.add('ShowTixPage');
    });
});


// Function to update the active dot class
// function updateActiveDot() {
//     const currentScrollLeft = tixSlideHolder.scrollLeft;
//     const slideWidth = slides[0].offsetWidth + 12; // Add gap width
//     const currentIndex = Math.round(currentScrollLeft / slideWidth);
//     const dots = dashesCounter.children;
//     dots.forEach((dot, index) => {
//         if (index === currentIndex) {
//             dot.classList.add('activeWhite');
//         } else {
//             dot.classList.remove('activeWhite');
//         }
//     });
// }

// Generate dashes
for (let i = 0; i < slides.length; i++) {
    const dash = document.createElement('div');
    dash.classList.add('countDashes');
    dashesCounter.appendChild(dash);
}

// Add active class to the first dash
dashesCounter.children[0].classList.add('activeWhite');

function updateActiveDot() {
    const currentScrollLeft = tixSlideHolder.scrollLeft;
    if (slides.length > 0 && slides[0].offsetWidth > 0) {
        const slideWidth = slides[0].offsetWidth + 12; // Add gap width
        const currentIndex = Math.round(currentScrollLeft / slideWidth);
        const dots = Array.from(dashesCounter.children);
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('activeWhite');
            } else {
                dot.classList.remove('activeWhite');
            }
        });
    }
}

// Add event listener to the tixSlideHolder to update the active dot class
tixSlideHolder.addEventListener('scroll', () => {
    updateActiveDot();
});

// open available tix
const availableTix = document.getElementById('viewAvailableTix');
const TicketClick = document.getElementById('TicketClick');
const CloseClick = document.getElementById('CloseClick');

TicketClick.addEventListener('click', () => {
    availableTix.classList.add('ShowTixPage');
});

CloseClick.addEventListener('click', () => {
    availableTix.classList.remove('ShowTixPage');
});

// open transfers window
const transfersWindow = document.getElementById('TransfersPage');
const TransfersClick = document.getElementById('TransferClick');
const CloseClickTwo = document.getElementById('CloseClickTwo');

TransfersClick.addEventListener('click', () => {
    transfersWindow.classList.add('showTransfer');
});

CloseClickTwo.addEventListener('click', () => {
    transfersWindow.classList.remove('showTransfer');
});

// // hotel rooms images
// const hotelRooms = document.querySelectorAll('.TixBox .HotelRoom');

// if (hotelRooms.length > 0) {
//     let currentImageIndex = 0;
//     const prevBtn = hotelRooms[0].querySelector('.prev-btn');
//     const nextBtn = hotelRooms[0].querySelector('.next-btn');
//     const dotsContainer = hotelRooms[0].querySelector('.dots-container');

//     // Create dots
//     for (let i = 0; i < 4; i++) {
//         const dot = document.createElement('div');
//         dot.classList.add('dot');
//         if (i === 0) {
//             dot.classList.add('active');
//         }
//         dotsContainer.appendChild(dot);
//     }

//     // Update image and dots
//     // Update image and dots
// function updateImage() {
//     hotelRooms[0].classList.remove('PicOne', 'PicTwo', 'PicThree', 'PicFour');
//     const picClasses = ['PicOne', 'PicTwo', 'PicThree', 'PicFour'];
//     hotelRooms[0].classList.add(picClasses[currentImageIndex]);
//     hotelRooms[0].style.background = `url(./images/hotel-Images/${currentImageIndex + 1}.jpg) no-repeat center/contain`;
//     const dots = dotsContainer.children;
//     Array.from(dots).forEach((dot, index) => {
//         if (index === currentImageIndex) {
//             dot.classList.add('active');
//         } else {
//             dot.classList.remove('active');
//         }
//     });
// }

//     // Prev button click handler
//     prevBtn.addEventListener('click', () => {
//         currentImageIndex = (currentImageIndex - 1 + 4) % 4;
//         updateImage();
//     });

//     // Next button click handler
//     nextBtn.addEventListener('click', () => {
//         currentImageIndex = (currentImageIndex + 1) % 4;
//         updateImage();
//     });

//     hotelRooms[0].classList.add('PicOne');
//     updateImage();
// }

// // Prev button click handler
// prevBtn.addEventListener('click', () => {
//     currentImageIndex = (currentImageIndex - 1 + 4) % 4;
//     updateImage();
// });

// prevBtn.addEventListener('touchstart', () => {
//     currentImageIndex = (currentImageIndex - 1 + 4) % 4;
//     updateImage();
// });

// // Next button click handler
// nextBtn.addEventListener('click', () => {
//     currentImageIndex = (currentImageIndex + 1) % 4;
//     updateImage();
// });

// nextBtn.addEventListener('touchstart', () => {
//     currentImageIndex = (currentImageIndex + 1) % 4;
//     updateImage();
// });