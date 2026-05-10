/* ── TutorNoble shared JS ── */

// Fade-up scroll animation
function initFadeUp() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
}

// Copy to clipboard
function copyText(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
  });
}

// Highlight active nav link
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    a.classList.toggle('active', href === path);
  });
}

// Booking modal (shared across pages)
function openModal() { document.getElementById('modal')?.classList.add('open'); }
function closeModal() { document.getElementById('modal')?.classList.remove('open'); }
function closeOnBg(e) { if (e.target === document.getElementById('modal')) closeModal(); }

// Price calculation for booking form
function updatePrice() {
  const sessionLength = parseFloat(document.getElementById('session-length').value) || 1;
  const momoPrice = document.getElementById('momo-price');
  const bankPrice = document.getElementById('bank-price');
  const duringPrice = document.getElementById('during-price');
  const priceSummary = document.getElementById('price-summary');
  
  // Calculate prices (₵15 per 30min, ₵30 per hour)
  const cediPrice = sessionLength * 30;
  const usdPrice = sessionLength * 3;
  
  // Format prices with bold cedis and regular dollars
  const formattedCedis = `<strong>₵${cediPrice.toFixed(2)}</strong>`;
  const formattedUsd = `US$${usdPrice.toFixed(2)}`;
  
  // Update all price displays
  [momoPrice, bankPrice, duringPrice].forEach(el => {
    if (el) el.innerHTML = `${formattedCedis}/${formattedUsd}`;
  });
  
  // Show calculation summary with duration and total
  if (priceSummary && sessionLength > 0) {
    const durationText = sessionLength === 1 ? '1 hour' : `${sessionLength} hours`;
    const rateText = `₵${cediPrice.toFixed(2)}/US$${usdPrice.toFixed(2)}`;
    
    priceSummary.innerHTML = `
      <div style="font-size: 12px; color: var(--text-soft); margin-bottom: 0.5rem;"><strong>Selected:</strong> <span id="selected-duration">${durationText}</span> × <span id="selected-rate">${rateText}</span> = <span id="selected-total"><strong>₵${cediPrice.toFixed(2)}/US$${usdPrice.toFixed(2)}</strong></span></div>
    `;
    priceSummary.style.display = 'block';
  } else {
    priceSummary.style.display = 'none';
  }
}

// Update payment details based on student location
function updatePaymentDetails() {
  const studentLocation = document.getElementById('student-location').value;
  const momoPrice = document.getElementById('momo-price');
  const bankPrice = document.getElementById('bank-price');
  const duringPrice = document.getElementById('during-price');
  
  // Ghana student details
  if (studentLocation === 'ghana') {
    const ghanaDetails = {
      bank: 'GCB (Ghana Commercial Bank)',
      accountName: 'Noble Okyere-Kusi',
      accountNumber: '2011250076009',
      momo: '0553118403'
    };
    
    // Update payment displays with Ghana details
    momoPrice.innerHTML = `📱<span class="pay-choice-icon"></span><div class="pay-choice-label">MTN MoMo</div><div class="pay-choice-price">₵30/US$3.00</div>`;
    bankPrice.innerHTML = `🏦<span class="pay-choice-icon"></span><div class="pay-choice-label">${ghanaDetails.bank}</div><div class="pay-choice-price">₵30/US$3.00</div>`;
    duringPrice.innerHTML = `🤝<span class="pay-choice-icon"></span><div class="pay-choice-label">Pay during class</div><div class="pay-choice-price">₵30/US$3.00</div>`;
  } else {
    // International student details (show USD as primary)
    const internationalDetails = {
      bank: 'Bank Transfer',
      accountName: 'Noble Okyere-Kusi',
      accountNumber: '2011250076009',
      momo: 'N/A'
    };
    
    // Update payment displays with International details
    momoPrice.innerHTML = `📱<span class="pay-choice-icon"></span><div class="pay-choice-label">MTN MoMo</div><div class="pay-choice-price">US$${(sessionLength * 3).toFixed(2)}</div>`;
    bankPrice.innerHTML = `🏦<span class="pay-choice-icon"></span><div class="pay-choice-label">${internationalDetails.bank}</div><div class="pay-choice-price">US$${(sessionLength * 3).toFixed(2)}</div>`;
    duringPrice.innerHTML = `🤝<span class="pay-choice-icon"></span><div class="pay-choice-label">Pay during class</div><div class="pay-choice-price">US$${(sessionLength * 3).toFixed(2)}</div>`;
  }
}

// Mobile menu toggle
function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const menuIcon = document.getElementById('menu-icon');
  
  if (navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    menuBtn.classList.remove('active');
    menuIcon.textContent = '☰';
  } else {
    navLinks.classList.add('active');
    menuBtn.classList.add('active');
    menuIcon.textContent = '✕';
  }
}

function selectPayChoice(type) {
  ['momo', 'bank', 'during'].forEach(t => {
    document.getElementById('pc-' + t)?.classList.toggle('sel', t === type);
  });
  const dn = document.getElementById('during-notice');
  if (dn) dn.className = 'notice-green' + (type === 'during' ? ' notice-visible' : ' notice-hidden');
}

function handleFormatChange(val) {
  const el = document.getElementById('inperson-notice');
  if (el) el.className = 'notice-amber' + (val === 'inperson' ? ' notice-visible' : ' notice-hidden');
}

function submitBooking() {
  const name = document.querySelector('#modal [data-field="name"]')?.value?.trim();
  const phone = document.querySelector('#modal [data-field="phone"]')?.value?.trim();
  const email = document.querySelector('#modal [data-field="email"]')?.value?.trim();
  const sessionLength = document.getElementById('session-length')?.value || '1';
  const subject = document.querySelector('#modal [data-field="subject"]')?.value || 'English';
  const grade = document.querySelector('#modal [data-field="grade"]')?.value || 'JHS 1';
  const format = document.querySelector('#modal [data-field="format"]')?.value || 'online';
  const location = document.getElementById('student-location')?.value || 'ghana';
  
  if (!name || !phone || !email) {
    alert('Please fill in your name, phone, and email to continue.');
    return;
  }
  
  // Check which payment method is selected
  const selectedPayChoice = document.querySelector('.pay-choice.sel')?.id?.replace('pc-', '');
  
  if (selectedPayChoice === 'during') {
    // Pay during class - go directly to WhatsApp
    const whatsappMessage = `Hello TutorNoble! 📚\n\nI would like to book a tutoring session:\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📧 Email: ${email}\n📚 Subject: ${subject}\n📈 Grade: ${grade}\n⏱ Duration: ${sessionLength === '1' ? '1 hour' : sessionLength === '0.5' ? '30 minutes' : `${sessionLength} hours`}\n🌐 Format: ${format === 'online' ? 'Online' : 'In-person'}\n📍 Location: ${location === 'ghana' ? 'Ghana' : 'International'}\n💳 Payment: Pay during class\n\nPlease let me know the next steps. Thank you!`;
    
    const whatsappUrl = `https://wa.me/233535544354?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  } else {
    // MoMo or Bank payment - go to payment page
    const paymentUrl = `pages/payment.html?method=${selectedPayChoice}&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}&subject=${encodeURIComponent(subject)}&grade=${encodeURIComponent(grade)}&format=${encodeURIComponent(format)}&location=${encodeURIComponent(location)}&hours=${encodeURIComponent(sessionLength)}`;
    window.location.href = paymentUrl;
  }
}

// Run on every page
document.addEventListener('DOMContentLoaded', () => {
  initFadeUp();
  setActiveNav();
});
