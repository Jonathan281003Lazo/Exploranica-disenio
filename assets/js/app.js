// ---------- SLIDER PRINCIPAL ----------
let currentIndex1 = 0;

const mainSlider = document.querySelector('.slides');
const mainSlides = document.querySelectorAll('.slide');
const totalSlides = mainSlides.length;
const navDots = document.querySelectorAll('.nav-dot');

function showSlide1(index) {
    mainSlider.style.transform = `translateX(${-100 * index}%)`;
    navDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide1() {
    currentIndex1 = (currentIndex1 + 1) % totalSlides;
    showSlide1(currentIndex1);
}

navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex1 = index;
        showSlide1(currentIndex1);
    });
});

setInterval(nextSlide1, 6000);
showSlide1(currentIndex1);


// ---------- SLIDER TOP DESTINATION ----------
document.addEventListener("DOMContentLoaded", () => {
    const tdSlides = document.querySelectorAll(".slide-TD");

    tdSlides.forEach((slide) => {
        slide.addEventListener("mousemove", () => {
            tdSlides.forEach((s) => s.classList.remove("active-top-destination"));
            slide.classList.add("active-top-destination");
        });
    });
});

// ---------- SLIDER CATEGORÍAS ----------
document.addEventListener("DOMContentLoaded", () => {
  let currentIndex3 = 1; // empezamos en 1 por el clon
  const categoriesSlider = document.querySelector(".card-container");
  const originalSlides = Array.from(document.querySelectorAll(".card_article"));
  const dotsContainer3 = document.querySelector(".card-dots");

  if (!categoriesSlider || originalSlides.length === 0 || !dotsContainer3) return;

  // --- calcular ancho dinámico (card + gap) ---
  const getSlideWidth = () => {
    const gap = parseFloat(getComputedStyle(categoriesSlider).gap) || 0;
    return originalSlides[0].offsetWidth + gap;
  };

  // --- clonar primer y último slide ---
  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);
  categoriesSlider.appendChild(firstClone);
  categoriesSlider.insertBefore(lastClone, originalSlides[0]);

  let allSlides = document.querySelectorAll(".card_article");

  // --- posición inicial ---
  categoriesSlider.style.transform = `translateX(-${getSlideWidth() * currentIndex3}px)`;

  // --- crear dots debajo ---
  dotsContainer3.innerHTML = "";
  originalSlides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide3(i + 1)); // +1 por el clon inicial
    dotsContainer3.appendChild(dot);
  });
  const dots3 = dotsContainer3.querySelectorAll(".dot");

  function updateDots() {
    dots3.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex3 - 1);
    });
  }

  function goToSlide3(index) {
    currentIndex3 = index;
    categoriesSlider.style.transition = "transform 0.5s ease-in-out";
    categoriesSlider.style.transform = `translateX(-${getSlideWidth() * currentIndex3}px)`;
    updateDots();
  }

  function nextSlide3() {
    currentIndex3++;
    categoriesSlider.style.transition = "transform 0.5s ease-in-out";
    categoriesSlider.style.transform = `translateX(-${getSlideWidth() * currentIndex3}px)`;
    updateDots();
  }

  function prevSlide3() {
    currentIndex3--;
    categoriesSlider.style.transition = "transform 0.5s ease-in-out";
    categoriesSlider.style.transform = `translateX(-${getSlideWidth() * currentIndex3}px)`;
    updateDots();
  }

  // --- reset al llegar a clones (infinite loop real) ---
  categoriesSlider.addEventListener("transitionend", () => {
    if (allSlides[currentIndex3].isSameNode(firstClone)) {
      categoriesSlider.style.transition = "none";
      currentIndex3 = 1;
      categoriesSlider.style.transform = `translateX(-${getSlideWidth() * currentIndex3}px)`;
    }
    if (allSlides[currentIndex3].isSameNode(lastClone)) {
      categoriesSlider.style.transition = "none";
      currentIndex3 = originalSlides.length;
      categoriesSlider.style.transform = `translateX(-${getSlideWidth() * currentIndex3}px)`;
    }
  });

  // --- autoplay con pausa en hover ---
  let autoSlide3 = setInterval(nextSlide3, 4000);
  categoriesSlider.addEventListener("mouseenter", () => clearInterval(autoSlide3));
  categoriesSlider.addEventListener("mouseleave", () => autoSlide3 = setInterval(nextSlide3, 4000));

  // --- responsive: recalcular ancho ---
  window.addEventListener("resize", () => {
    categoriesSlider.style.transition = "none";
    categoriesSlider.style.transform = `translateX(-${getSlideWidth() * currentIndex3}px)`;
  });
});