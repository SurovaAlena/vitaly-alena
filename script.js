
const weddingDate = new Date('2026-11-07T15:00:00+07:00');
const pad = n => String(Math.max(0, n)).padStart(2, '0');
function updateCountdown(){
  const diff = weddingDate - new Date();
  const total = Math.max(0, Math.floor(diff / 1000));
  document.querySelector('#days').textContent = String(Math.floor(total / 86400)).padStart(3,'0');
  document.querySelector('#hours').textContent = pad(Math.floor((total % 86400) / 3600));
  document.querySelector('#minutes').textContent = pad(Math.floor((total % 3600) / 60));
  document.querySelector('#seconds').textContent = pad(total % 60);
}
updateCountdown(); setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if(entry.isIntersecting) entry.target.classList.add('visible');
}), {threshold:.14});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.menu');
menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

const form = document.querySelector('#rsvp-form');
const status = document.querySelector('#form-status');
form.addEventListener('submit', async event => {
  event.preventDefault();
  const data = new FormData(form);
  const message = `Ответ на свадебное приглашение\nИмя: ${data.get('name')}\nКоличество гостей: ${data.get('guests')}\nПрисутствие: ${data.get('attendance')}\nКомментарий: ${data.get('comment') || '—'}`;
  try {
    await navigator.clipboard.writeText(message);
    status.textContent = 'Спасибо! Ответ скопирован — его можно отправить молодожёнам.';
  } catch {
    status.textContent = 'Спасибо! Ваш ответ заполнен. Подключение автоматической отправки добавим позже.';
  }
});

