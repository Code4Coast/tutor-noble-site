/* ── Shared HTML components ── */
/* Call injectLayout(basePath) at top of each page's <script> before DOMContentLoaded */

function injectLayout(base) {
  base = base || '';

  // NAV
  const navEl = document.getElementById('site-nav');
  if (navEl) navEl.innerHTML = `
    <a href="${base}index.html" class="logo">Tutor<span>Noble</span></a>
    <ul class="nav-links">
      <li><a href="${base}index.html">Home</a></li>
      <li><a href="${base}pages/subjects.html">Subjects</a></li>
      <li><a href="${base}pages/pricing.html">Pricing</a></li>
      <li><a href="${base}pages/tutor.html">About Tutor</a></li>
      <li><a href="${base}pages/location.html">In-person</a></li>
      <li><a href="${base}pages/contact.html">Contact</a></li>
    </ul>
    <button class="mobile-menu-btn" onclick="toggleMobileMenu()" aria-label="Menu">
      <span id="menu-icon">☰</span>
    </button>
    <a href="#" class="nav-cta" onclick="openModal();return false">Book a session</a>
  `;

  // FOOTER
  const footerEl = document.getElementById('site-footer');
  if (footerEl) footerEl.innerHTML = `
    <div class="footer-top">
      <div>
        <a href="${base}index.html" class="footer-logo">Tutor<span>Noble</span></a>
        <p class="footer-desc">Expert English and Science tutoring for JHS 1–3 students across Ghana. Online everywhere. In-person in Sunyani.</p>
        <div style="margin-top:1.25rem;font-size:13px;display:flex;flex-direction:column;gap:6px">
          <a href="tel:+233535544354" style="color:rgba(255,255,255,0.5);text-decoration:none">📞 +233 53 554 4354</a>
          <a href="mailto:hello@tutornoble.gh" style="color:rgba(255,255,255,0.5);text-decoration:none">✉️ nobleokyere36@gmail.com</a>
          <a href="https://wa.me/233535544354" style="color:rgba(255,255,255,0.5);text-decoration:none">💬 WhatsApp us</a>
        </div>
      </div>
      <div>
        <div class="footer-heading">Pages</div>
        <ul class="footer-links">
          <li><a href="${base}index.html">Home</a></li>
          <li><a href="${base}pages/subjects.html">Subjects</a></li>
          <li><a href="${base}pages/pricing.html">Pricing</a></li>
          <li><a href="${base}pages/location.html">In-person (Sunyani)</a></li>
          <li><a href="${base}pages/contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-heading">Payment</div>
        <ul class="footer-links">
          <li><a href="${base}index.html#payment-options">MTN Mobile Money</a></li>
          <li><a href="${base}index.html#payment-options">Bank Transfer</a></li>
          <li><a href="${base}index.html#payment-options">Pay during class</a></li>
        </ul>
        <div class="footer-heading" style="margin-top:1.5rem">Hours</div>
        <ul class="footer-links">
          <li>Mon – Fri: 10am – 6pm</li>
          <li>Sat – Sun: 9am – 5pm</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 TutorNoble Tutoring · Sunyani, Ghana</span>
    </div>
  `;

  // MODAL
  const modalEl = document.getElementById('site-modal');
  if (modalEl) modalEl.innerHTML = `
    <div class="modal-bg" id="modal" onclick="closeOnBg(event)">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-title">Book your session</div>
          <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="form-group">
          <label class="form-label">Student's full name</label>
          <input class="form-input" type="text" data-field="name" placeholder="e.g. Ama Mensah">
        </div>
        <div class="form-group">
          <label class="form-label">Student location</label>
          <select class="form-select" id="student-location" onchange="updatePaymentDetails()">
            <option value="">Choose location</option>
            <option value="ghana">Ghana (cedis)</option>
            <option value="international">International (dollars)</option>
          </select>
        </div>
        <div class="row-2">
          <div class="form-group">
            <label class="form-label">Phone number</label>
            <input class="form-input" type="tel" data-field="phone" placeholder="024 XXX XXXX">
          </div>
          <div class="form-group">
            <label class="form-label">Email address</label>
            <input class="form-input" type="email" data-field="email" placeholder="ama@gmail.com">
          </div>
        </div>
        <div class="row-2">
          <div class="form-group">
            <label class="form-label">Subject</label>
            <select class="form-select" data-field="subject">
              <option value="">Choose subject</option>
              <option>English Language</option>
              <option>Integrated Science</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Grade level</label>
            <select class="form-select" data-field="grade">
              <option value="">Choose grade</option>
              <option>JHS 1 (Grade 7)</option>
              <option>JHS 2 (Grade 8)</option>
              <option>JHS 3 (Grade 9)</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Session format</label>
          <select class="form-select" data-field="format" onchange="handleFormatChange(this.value)">
            <option value="">Choose format</option>
            <option value="online">Online (Google Meet) — available everywhere</option>
            <option value="inperson">In-person — Sunyani only</option>
          </select>
        </div>
        <div class="notice-amber notice-hidden" id="inperson-notice">
          📍 <strong>In-person sessions are only available in Sunyani, Bono Region.</strong> If you're outside Sunyani, please select online — same great tutoring!
        </div>
        <div class="row-2">
          <div class="form-group">
            <label class="form-label">Session length</label>
            <select class="form-select" id="session-length" onchange="updatePrice()">
              <option value="">Choose length</option>
              <option value="0.5">30 minutes</option>
              <option value="1">1 hour</option>
              <option value="1.5">1.5 hours</option>
              <option value="2">2 hours</option>
              <option value="3">3 hours</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Preferred date</label>
            <input class="form-input" type="date" data-field="date">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">How would you like to pay?</label>
          <div class="pay-choice-row">
            <div class="pay-choice sel" id="pc-momo" onclick="selectPayChoice('momo')">
              <span class="pay-choice-icon">📱</span>
              <div class="pay-choice-label">MTN MoMo</div>
            </div>
            <div class="pay-choice" id="pc-bank" onclick="selectPayChoice('bank')">
              <span class="pay-choice-icon">🏦</span>
              <div class="pay-choice-label">Bank transfer</div>
            </div>
            <div class="pay-choice" id="pc-during" onclick="selectPayChoice('during')">
              <span class="pay-choice-icon">🤝</span>
              <div class="pay-choice-label">Pay during class</div>
            </div>
          </div>
          <div class="notice-green notice-hidden" id="during-notice">
            ✅ Your session is reserved. Pay your tutor directly at the start of class — cash or MoMo both welcome.
          </div>
        </div>
        <button class="submit-btn" onclick="submitBooking()">Confirm booking →</button>
      </div>
    </div>
  `;

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
}
