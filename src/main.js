import './style.css';
import './responsive.css'
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



const toggleButton = document.getElementById("btnToggleRoulant");
const navMenuRoulant = document.getElementById("navBarRoulant");
const body = document.querySelector("body");

toggleButton.addEventListener("click", (e) => {
  e.stopPropagation();
  navMenuRoulant.classList.toggle("active");
  toggleButton.classList.toggle("active"); // <-- gère aussi l'icône
});

const subLinks = document.querySelectorAll(".link_roulant");
subLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenuRoulant.classList.remove("active");
    toggleButton.classList.remove("active");
  });
});

body.addEventListener("click", () => {
  navMenuRoulant.classList.remove("active");
  toggleButton.classList.remove("active");
});





document.addEventListener("DOMContentLoaded", () => {

  const texts = Array.from({ length: 300 }, (_, i) => (i + 1).toString());
  const delay = 1;
  let index = 0;

  function showText() {
    
    const conteur = document.querySelector('#counter');
    conteur.innerHTML = 'Plus de ' + texts[index] + ' Etudiants';
    index++;

    if (index < texts.length) {
      setTimeout(showText, delay);
    }

   
  } const contentVisteurs = document.querySelector('.content_counter');
    contentVisteurs.innerText = 'Plus de 400 visiteurs ';

  showText();

  const swiper1 = new Swiper('.mySwiper', {
    modules: [Navigation, Pagination, Autoplay],
    loop: true,
    autoplay: { delay: 7000, disableOnInteraction: false },
    speed: 1000,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  });

  function animateTitle() {

    document.querySelectorAll('.slide-content h2').forEach(title => {
      title.classList.remove('animate');
    });

    const activeTitle = document.querySelector('.swiper-slide-active .slide-content h2');
    if (activeTitle) {
      setTimeout(() => {
        activeTitle.classList.add('animate');
      }, 20);
    }
  }

  animateTitle();

  swiper1.on('slideChangeTransitionEnd', animateTitle);





  const swiper2 = new Swiper('.slider-wrapper', {

    modules: [Navigation, Pagination, Autoplay],
    loop: true,
    grabCursor: true,
    spaceBetween: 20,
    slidesPerView: 3,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },

    pagination: {
      el: '.slider-wrapper .swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.slider-wrapper .swiper-button-next',
      prevEl: '.slider-wrapper .swiper-button-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      620: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  });

  const navbar = document.querySelector(".nav_items");
  const navMenuRoulant = document.querySelector(".list_roulant");
  const sticky = navbar.offsetTop;
  const stamisi = navMenuRoulant.offsetTop;

  window.addEventListener("scroll", () => {
    if (window.scrollY >= sticky) {
      navbar.classList.add("fixed");
    } else {
      navbar.classList.remove("fixed");
    }
  });
  window.addEventListener("scroll", () => {
    if (window.scrollY >= sticky) {
      navMenuRoulant.classList.add("fixed");
    } else {
      navMenuRoulant.classList.remove("fixed");
    }
  });

  const contactForm = document.getElementById("contactForm");
  const messageInput = document.getElementById("message");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = messageInput.value.trim();

    if (!message) {
      alert("Veuillez entrer un message.");
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/manbneka", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        alert(" Message envoyé avec succès !");
        contactForm.reset();
      } else {
        alert(" Une erreur est survenue.");
      }
    } catch (error) {
      alert("Erreur réseau. Réessayez.");
    }
  });


  const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 100,
    // reset: true
  });




  // Titres
  sr.reveal(' .uou_title, .uou_description', { delay: 200, origin: 'top' });
  sr.reveal('.faq', { delay: 300, origin: 'left' });
  sr.reveal('.team_container_div', {delay:300, origin: 'right'});
  // Sections
  sr.reveal('.flexible-programs, .adapted-programs, .achieve-dreams-section', {
    interval: 100,
    origin: 'bottom'
  });

  // Nombres / éléments numérotés
  sr.reveal('.n1, .n2, .n3, .n4', {
    interval: 200,
    origin: 'bottom'
  });

  // Éléments "e"
  sr.reveal('.e1, .e2, .e3, .e4', {
    interval: 100,
    distance: '100px',
    origin: 'bottom'
  });

  // Compteurs


  // Divers (d1 → d6)
  sr.reveal('.d1, .d2, .d3, .d4, .d5, .d6', {
    delay: 200,
    interval: 200,
    origin: 'bottom'
  });



});


// ___________________________________ TOGGLE BLOCS DOMAINES ___________________________________
const toggleButtons = document.querySelectorAll(".btn-toggle");
const retourButtons = document.querySelectorAll(".btn-retour");

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.target;
    const currentBlock = button.closest(".description_faculty");
    const allDescriptions = document.querySelectorAll(".description_faculty");

    allDescriptions.forEach((desc) => {
      if (desc !== currentBlock) desc.classList.add("hidden");
    });

    currentBlock.classList.add("fullscreen");
    const details = currentBlock.querySelector(`.${target}-details`);
    if (details) details.classList.remove("hidden");
    button.style.display = "none";
  });
});

retourButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const currentBlock = button.closest(".description_faculty");
    document
      .querySelectorAll(".description_faculty")
      .forEach((desc) => desc.classList.remove("hidden"));
    currentBlock.classList.remove("fullscreen");

    const detail = currentBlock.querySelector(".domain-detail");
    if (detail) detail.classList.add("hidden");

    const toggleBtn = currentBlock.querySelector(".btn-toggle");
    if (toggleBtn) toggleBtn.style.display = "inline-block";
  });
});

document.querySelectorAll('.faq_question').forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    answer.classList.toggle('active');
  });

});


