// Таймер обратного отсчета
function updateCountdown() {
  const weddingDate = new Date('June 15, 2028 00:00:00').getTime();
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// "База данных" в localStorage
let guests = JSON.parse(localStorage.getItem('guests')) || [];
let wishes = JSON.parse(localStorage.getItem('wishes')) || [];

function saveGuests() {
  localStorage.setItem('guests', JSON.stringify(guests));
}

function saveWishes() {
  localStorage.setItem('wishes', JSON.stringify(wishes));
}

// Регистрация
const registrationForm = document.getElementById('registrationForm');
registrationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const phone = document.getElementById('phone').value;
  const guest = { firstName, lastName, phone };
  guests.push(guest);
  saveGuests();
  renderGuests(); // Обновляем список гостей после регистрации
  alert(`Thank you, ${firstName} ${lastName}, for confirming your attendance!`);
  registrationForm.reset();
});

// Список гостей
const guestsList = document.getElementById('guestsList');
const guestsCount = document.getElementById('guestsCount');
const guestsToggle = document.getElementById('guestsToggle');
let isGuestsHidden = false;

function renderGuests() {
  guestsList.innerHTML = '';
  guests.forEach(guest => {
    const li = document.createElement('li');
    li.textContent = `${guest.firstName} ${guest.lastName}`;
    guestsList.appendChild(li);
  });
  guestsCount.textContent = `Total Guests: ${guests.length}`;
}


guestsToggle.addEventListener('click', () => {
  isGuestsHidden = !isGuestsHidden;
  guestsList.classList.toggle('hidden', isGuestsHidden);
  guestsToggle.textContent = isGuestsHidden ? 'Show Guests' : 'Hide Guests';
});


// Загрузка карты после загрузки DOM
document.addEventListener('DOMContentLoaded', initMap);


// Пожелания
const wishForm = document.getElementById('wishForm');
const wishesList = document.getElementById('wishesList');

function renderWishes() {
  wishesList.innerHTML = '';
  wishes.forEach(wish => {
    const wishItem = document.createElement('div');
    wishItem.classList.add('wishes__item');
    wishItem.innerHTML = `
      <div class="wishes__item-name">${wish.name}</div>
      <div class="wishes__item-text">${wish.text}</div>
    `;
    wishesList.appendChild(wishItem);
  });
}

wishForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const wishText = document.getElementById('wishText').value;
  const lastGuest = guests[guests.length - 1];
  if (!lastGuest) {
    alert('Please confirm your attendance in RSVP before leaving a wish!');
    return;
  }
  const wish = {
    name: `${lastGuest.firstName} ${lastGuest.lastName}`,
    text: wishText
  };
  wishes.push(wish);
  saveWishes();
  renderWishes();
  wishForm.reset();
});

// Карта
function initMap() {
  const location = [40.7829, -73.9654];
  const map = L.map('map').setView(location, 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  L.marker(location).addTo(map).bindPopup('Green Garden Restaurant').openPopup();
}

document.addEventListener('DOMContentLoaded', () => {
  setInterval(updateCountdown, 1000);
  initMap();
  renderGuests(); // Отображаем список гостей при загрузке
  renderWishes(); // Отображаем существующие пожелания при загрузке
});