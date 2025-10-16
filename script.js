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

  // sliders (depoimentos e portfolio)
  function initSlider(id) {
    const slides = document.querySelectorAll(`#${id} .slide`);
    if (!slides.length) return;
    let i = 0;
    const show = idx => slides.forEach((s, j) => s.style.transform = `translateX(${100 * (j - idx)}%)`);
    show(i);
    setInterval(() => { i = (i + 1) % slides.length; show(i); }, 4000);
  }
  initSlider("depoimentosSlider");
  initSlider("portfolioSlider");

  // calculadora
  document.getElementById("btnCalcular").addEventListener("click", () => {
    const valor = parseFloat(document.getElementById("valorPrincipal").value);
    const taxa = parseFloat(document.getElementById("juros").value) / 100;
    const periodo = parseInt(document.getElementById("periodo").value) || 0;
    if (isNaN(valor) || isNaN(taxa)) { alert("Preencha os campos corretamente."); return; }
    const montante = valor * Math.pow(1 + taxa, periodo);
    const diff = montante - valor;
    const res = document.getElementById("resultado");
    res.innerHTML = `💰 Valor Final: <strong>R$ ${montante.toFixed(2)}</strong><br>📈 Diferença: <strong>R$ ${diff.toFixed(2)}</strong>`;
  });

  // envio do formulário de contato via WhatsApp
  document.getElementById("contatoForm").addEventListener("submit", e => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;
    const texto = encodeURIComponent(`Olá! 👋\n\nNome: ${nome}\nE-mail: ${email}\nMensagem: ${mensagem}`);
    window.open(`https://wa.me/5511999999999?text=${texto}`, "_blank");
  });
});
