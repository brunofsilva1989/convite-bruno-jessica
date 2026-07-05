// Menu mobile
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Fade-in ao rolar
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// Contagem regressiva até o casamento
const WEDDING_DATE = new Date('2026-08-08T09:40:00');

function updateCountdown() {
  const now = new Date();
  const diff = WEDDING_DATE - now;

  const els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    min: document.getElementById('cd-min'),
    sec: document.getElementById('cd-sec'),
  };

  if (diff <= 0) {
    els.days.textContent = '00';
    els.hours.textContent = '00';
    els.min.textContent = '00';
    els.sec.textContent = '00';
    return;
  }

  const pad = (n) => String(n).padStart(2, '0');
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const min = Math.floor((diff / (1000 * 60)) % 60);
  const sec = Math.floor((diff / 1000) % 60);

  els.days.textContent = pad(days);
  els.hours.textContent = pad(hours);
  els.min.textContent = pad(min);
  els.sec.textContent = pad(sec);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// RSVP: envia via WhatsApp com os dados preenchidos
const rsvpForm = document.getElementById('rsvpForm');
const rsvpFeedback = document.getElementById('rsvpFeedback');
const WHATSAPP_NUMBER = '5511953413049';

rsvpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(rsvpForm);
  const nome = data.get('nome');
  const acompanhantes = data.get('acompanhantes');
  const presenca = data.get('presenca') === 'sim' ? 'Sim, estarei presente' : 'Não poderei comparecer';
  const restricoes = data.get('restricoes') || 'Nenhuma';

  const message = [
    'Confirmação de presença - Casamento Jessica & Bruno',
    `Nome: ${nome}`,
    `Acompanhantes: ${acompanhantes}`,
    `Presença: ${presenca}`,
    `Restrições alimentares: ${restricoes}`,
  ].join('\n');

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');

  rsvpFeedback.textContent = 'Obrigado! Abrindo o WhatsApp para confirmar sua presença.';
  rsvpForm.reset();
});

// Navbar: sombra ao rolar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 10 ? '0 2px 10px rgba(27,42,74,0.08)' : 'none';
});

// Modal do Pix copia-e-cola
const PIX_CODE = '00020126540014BR.GOV.BCB.PIX0132jessica.bruno.08082026@gmail.com5204000053039865802BR5923Bruno Ferreira Da Silva6009Sao Paulo62290525REC6A499FE3B1B5E74487938263047C58';

const pixModal = document.getElementById('pixModal');
const pixOpenBtn = document.getElementById('pixOpenBtn');
const pixCode = document.getElementById('pixCode');
const pixCopyBtn = document.getElementById('pixCopyBtn');
const pixCopyFeedback = document.getElementById('pixCopyFeedback');

function openPixModal() {
  pixCode.value = PIX_CODE;
  pixCopyFeedback.textContent = '';
  pixModal.classList.add('is-open');
  pixModal.setAttribute('aria-hidden', 'false');
}

function closePixModal() {
  pixModal.classList.remove('is-open');
  pixModal.setAttribute('aria-hidden', 'true');
}

pixOpenBtn.addEventListener('click', openPixModal);

pixModal.querySelectorAll('[data-pix-close]').forEach((el) => {
  el.addEventListener('click', closePixModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && pixModal.classList.contains('is-open')) {
    closePixModal();
  }
});

pixCopyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(PIX_CODE);
  } catch (err) {
    pixCode.select();
    document.execCommand('copy');
  }
  pixCopyFeedback.textContent = 'Código copiado!';
});
