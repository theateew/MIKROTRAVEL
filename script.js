// Animasi muncul saat scroll
const elements = document.querySelectorAll('.animate-fade');

function showOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  elements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', showOnScroll);
showOnScroll();

// Menu toggle untuk versi mobile
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.navbar ul');

toggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
// Efek transisi antar halaman
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");

  // Tambahkan efek keluar saat klik link
  const links = document.querySelectorAll("a");

  links.forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href && !href.startsWith("#") && !href.startsWith("mailto:")) {
        e.preventDefault();
        document.body.style.opacity = 0;
        setTimeout(() => {
          window.location.href = href;
        }, 500);
      }
    });
  });
});
// Tombol Scroll to Top
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
// ================================
// ✉️ Form Kontak (Offline Simulation)
// ================================
const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Ubah teks tombol sementara
    const button = form.querySelector("button");
    button.disabled = true;
    button.textContent = "Mengirim...";

    // Simulasi loading (2 detik)
    setTimeout(() => {
      button.disabled = false;
      button.textContent = "Kirim Pesan";
      statusMsg.textContent = "✅ Pesan berhasil dikirim! Terima kasih.";
      statusMsg.classList.add("visible");

      // Hapus pesan status setelah 4 detik
      setTimeout(() => {
        statusMsg.classList.remove("visible");
      }, 4000);

      form.reset();
    }, 2000);
  });
}
