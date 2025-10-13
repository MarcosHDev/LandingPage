// ===== CALCULADORA DE JUROS =====
document.getElementById("calcForm").addEventListener("submit", function(e){
    e.preventDefault();
    const capital = parseFloat(document.getElementById("capital").value);
    const taxa = parseFloat(document.getElementById("taxa").value)/100;
    const tempo = parseInt(document.getElementById("tempo").value);

    if(isNaN(capital) || isNaN(taxa) || isNaN(tempo)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const montante = capital * Math.pow(1 + taxa, tempo);
    const juros = montante - capital;

    document.getElementById("resultado").innerHTML = `
        💰 Montante Final: <strong>R$ ${montante.toFixed(2)}</strong><br>
        📈 Juros Ganhos: <strong>R$ ${juros.toFixed(2)}</strong>
    `;
});

// ===== FORMULÁRIO DE CONTATO =====
document.getElementById("contatoForm").addEventListener("submit", function(e){
    e.preventDefault();
    alert("Mensagem enviada! ✅ Em breve entraremos em contato.");
    this.reset();
});

// ===== ANIMAÇÕES SLIDE-IN AO SCROLL =====
const slideElements = document.querySelectorAll('.slide-in-left, .slide-in-right');
function checkSlide() {
    const triggerBottom = window.innerHeight * 0.85;
    slideElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if(elementTop < triggerBottom) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}
window.addEventListener('scroll', checkSlide);
window.addEventListener('load', checkSlide);

// ===== SLIDER AUTOMÁTICO DE DEPOIMENTOS =====
let currentSlide = 0;
const slides = document.querySelectorAll('#depoimentosSlider .slide');
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - index)}%)`;
    });
}
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}
showSlide(currentSlide);
setInterval(nextSlide, 5000);

// ===== CHAT WHATSAPP POPUP =====
const whatsappChat = document.querySelector('.whatsapp-chat');
whatsappChat.addEventListener('click', function(e){
    e.preventDefault();
    alert("Você será redirecionado para o WhatsApp!");
    window.open(this.href, "_blank");
});
