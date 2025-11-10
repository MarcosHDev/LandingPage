document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("ano").textContent = new Date().getFullYear();

  const menuIcon = document.getElementById("menuIcon");
  const navLinks = document.getElementById("navLinks");
  menuIcon.addEventListener("click", () => navLinks.classList.toggle("active"));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("active");
    });
  }, { threshold: 0.2 });
  document.querySelectorAll(".slide-in").forEach(el => observer.observe(el));

  function initFadeSlider(id, prevBtnId, nextBtnId) {
    const slider = document.getElementById(id);
    const slides = slider.querySelectorAll('.slide');
    if (!slides.length) return;

    let current = 0;
    let interval = null;

    function setSliderHeight() {
      const activeSlide = slides[current];
      if (activeSlide && slider) {
        slider.style.height = activeSlide.offsetHeight + 'px';
      }
    }

    function showSlide(idx) {
      slides.forEach((s, i) => {
        s.style.position = "absolute";
        s.style.top = 0;
        s.style.left = 0;
        s.style.width = "100%";
        s.style.transition = "opacity 1.2s ease-in-out";
        s.style.opacity = i === idx ? 1 : 0;
        s.style.pointerEvents = i === idx ? 'auto' : 'none';
      });
      setSliderHeight();
    }

    function nextSlide() {
      current = (current + 1) % slides.length;
      showSlide(current);
    }

    function prevSlide() {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    }

    showSlide(current);

    function startAuto() {
      if (interval) clearInterval(interval);
      interval = setInterval(nextSlide, 4000);
    }
    startAuto();

    if (prevBtnId && nextBtnId) {
      const prevBtn = document.getElementById(prevBtnId);
      const nextBtn = document.getElementById(nextBtnId);
      if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
          prevSlide();
          startAuto();
        });
        nextBtn.addEventListener('click', () => {
          nextSlide();
          startAuto();
        });
      }
    }

    window.addEventListener('resize', setSliderHeight);
  }

  initFadeSlider("portfolioSlider", "portfolioPrev", "portfolioNext");
  initFadeSlider("depoimentosSlider", "depoimentosPrev", "depoimentosNext");

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
