function getExpirationDate() {
  const currentYear = new Date().getFullYear();
  let expirationDate = new Date(`May 28, ${currentYear} 23:59:59`);

  // If the current date is past the expiration date, set it to the next year
  if (new Date() > expirationDate) {
    expirationDate = new Date(`May 28, ${currentYear + 1} 23:59:59`);
  }

  return expirationDate;
}

// The next 2 lines is for the countdown
//const expirationDate = 'May 28, 2024 23:59:59'; // Define or get your date
//let deadlineTime = new Date(expirationDate);

// Next line only for test on Codepen
let deadlineTime = getExpirationDate();

deadlineTime.setDate(deadlineTime.getDate());
let deadline = deadlineTime.getTime();

// Function to update countdown timer
function updateCountdown() {
  if (countdownInterval !== null) {
    // Getting current time in required format
    let now = new Date().getTime();
    let timeToLive = deadline - now;

    // Getting value of days, hours, minutes, seconds
    let days = Math.floor(timeToLive / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (timeToLive % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((timeToLive % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeToLive % (1000 * 60)) / 1000);

    let daysElements = document.getElementsByClassName("days");
    let hoursElements = document.getElementsByClassName("hours");
    let minutesElements = document.getElementsByClassName("minutes");
    let secondsElements = document.getElementsByClassName("seconds");

 
    // If you have many countdowns, you could fill all the tags using the classname
    Array.from(daysElements).forEach((el) => (el.innerHTML = days));
    Array.from(hoursElements).forEach((el) => (el.innerHTML = hours));
    Array.from(minutesElements).forEach((el) => (el.innerHTML = minutes));
    Array.from(secondsElements).forEach((el) => (el.innerHTML = seconds));

    // Output for over time
    if (timeToLive < 0) {
      countdownInterval && clearInterval(countdownInterval);
      Array.from(daysElements).forEach((el) => (el.innerHTML = 0));
      Array.from(hoursElements).forEach((el) => (el.innerHTML = 0));
      Array.from(minutesElements).forEach((el) => (el.innerHTML = 0));
      Array.from(secondsElements).forEach((el) => (el.innerHTML = 0));
    }
  }
}

// To call defined function every second
let countdownInterval = null;
updateCountdown();
countdownInterval = setInterval(updateCountdown, 1000);

// Mostrar el deadline formateado en el span .date
const dateElements = document.getElementsByClassName('date');
const deadlineDate = new Date(deadline);
const options = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
const formattedDeadline = deadlineDate.toLocaleString('en-US', options).replace(',', '');
Array.from(dateElements).forEach(el => {
  el.innerText = formattedDeadline;
});