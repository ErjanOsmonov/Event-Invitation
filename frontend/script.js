const API_URL = 'http://localhost:3000/api';

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

// Регистрация
const registrationForm = document.getElementById('registrationForm');
registrationForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const phone = document.getElementById('phone').value;

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, phone }),
      credentials: 'include' // Для отправки и получения cookies
    });
    const data = await response.json();
    if (response.ok) {
      document.getElementById('registrationMessage').textContent = `${data.message} (Your ID: ${data.id})`;
      localStorage.setItem('userId', data.id); // Сохраняем ID для пожеланий
      fetchGuests();
      registrationForm.reset();
    } else {
      document.getElementById('registrationMessage').textContent = data.error || 'Registration failed';
    }
  } catch (error) {
    document.getElementById('registrationMessage').textContent = 'Error connecting to server';
    console.error('Registration error:', error);
  }
});

// Список гостей
const guestsList = document.getElementById('guestsList');
const guestsCount = document.getElementById('guestsCount');
const guestsToggle = document.getElementById('guestsToggle');
let isGuestsHidden = false;

async function fetchGuests() {
  try {
    const response = await fetch(`${API_URL}/guests`, {
      method: 'GET',
      credentials: 'include' // Для отправки cookies, если нужно
    });
    const guests = await response.json();
    guestsList.innerHTML = '';
    guests.forEach(guest => {
      const li = document.createElement('li');
      li.textContent = `${guest.firstName} ${guest.lastName}`;
      guestsList.appendChild(li);
    });
    guestsCount.textContent = `Total Guests: ${guests.length}`;
  } catch (error) {
    console.error('Error fetching guests:', error);
    guestsCount.textContent = 'Error loading guests';
  }
}

guestsToggle.addEventListener('click', () => {
  isGuestsHidden = !isGuestsHidden;
  guestsList.classList.toggle('hidden', isGuestsHidden);
  guestsToggle.textContent = isGuestsHidden ? 'Show Guests' : 'Hide Guests';
});

// Пожелания
const wishForm = document.getElementById('wishForm');
const wishesList = document.getElementById('wishesList');

async function fetchWishes() {
  try {
    const response = await fetch(`${API_URL}/wishes`, {
      method: 'GET',
      credentials: 'include' // Для отправки cookies, если нужно
    });
    const wishes = await response.json();
    wishesList.innerHTML = '';
    wishes.forEach(wish => {
      const wishItem = document.createElement('div');
      wishItem.classList.add('wishes__item');
      wishItem.innerHTML = `
        <div class="wishes__item-name">${wish.firstName} ${wish.lastName}</div>
        <div class="wishes__item-text">${wish.text}</div>
      `;
      wishesList.appendChild(wishItem);
    });
  } catch (error) {
    console.error('Error fetching wishes:', error);
    wishesList.innerHTML = '<p>Error loading wishes</p>';
  }
}

wishForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const wishText = document.getElementById('wishText').value;
  const userId = localStorage.getItem('userId');

  if (!userId) {
    document.getElementById('registrationMessage').textContent = 'Please register first!';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/wishes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: parseInt(userId), text: wishText }),
      credentials: 'include' // Для отправки токена в cookies
    });
    const data = await response.json();
    if (response.ok) {
      fetchWishes();
      wishForm.reset();
    } else {
      alert(data.error || 'Failed to add wish');
    }
  } catch (error) {
    alert('Error connecting to server');
    console.error('Wish error:', error);
  }
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  setInterval(updateCountdown, 1000);
  fetchGuests();
  fetchWishes();
});