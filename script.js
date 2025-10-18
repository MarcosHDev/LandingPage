document.addEventListener("DOMContentLoaded", () => {
  // ano automático
  document.getElementById("ano").textContent = new Date().getFullYear();

  // menu mobile
  const menuIcon = document.getElementById("menuIcon");
  const navLinks = document.getElementById("navLinks");
  menuIcon.addEventListener("click", () => navLinks.classList.toggle("active"));

  // animações de entrada
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("active");
    });
  }, { threshold: 0.2 });
  document.querySelectorAll(".slide-in").forEach(el => observer.observe(el));

  // ===== SLIDERS COM FADE SUAVE =====
  function initFadeSlider(id) {
    const slides = document.querySelectorAll(`#${id} .slide`);
    if (!slides.length) return;

    let current = 0;

    // Define estilo base para fade
    slides.forEach((s, i) => {
      s.style.position = "absolute";
      s.style.top = 0;
      s.style.left = 0;
      s.style.width = "100%";
      s.style.transition = "opacity 1.2s ease-in-out";
      s.style.opacity = i === 0 ? 1 : 0;
    });

    // Troca automática de slides
    setInterval(() => {
      slides[current].style.opacity = 0;
      current = (current + 1) % slides.length;
      slides[current].style.opacity = 1;
    }, 4000);
  }

  // aplica aos dois sliders
  initFadeSlider("portfolioSlider");
  initFadeSlider("depoimentosSlider");

  // ===== FORMULÁRIO DE CONTATO VIA WHATSAPP =====
  document.getElementById("contatoForm").addEventListener("submit", e => {
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    const texto = encodeURIComponent(
      `Olá! 👋\n\nNome: ${nome}\nE-mail: ${email}\nMensagem: ${mensagem}`
    );
    window.open(`https://wa.me/5511999999999?text=${texto}`, "_blank");
  });
});
