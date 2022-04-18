document.addEventListener('DOMContentLoaded', () => {
   const expelBg = new Swiper('.expel-slider1', {
      slidesPerView: 1,
      parallax: true,
      loop: true,
      speed: 1000,
   });
   const expelText = new Swiper('.expel-slider2', {
      slidesPerView: 1,
      parallax: true,
      loop: true,
      speed: 1000,
      pagination: {
         el: '.swiper-pagination',
         type: 'bullets',
         clickable: true,
         spaceBetween: 100,
      },
   });
   const swipeAllSliders = (index) => {
      expelBg.slideToLoop(index);
      expelText.slideToLoop(index);
   };

   expelBg.on('slideChange', () => swipeAllSliders(expelBg.realIndex));
   expelText.on('slideChange', () => swipeAllSliders(expelText.realIndex));
   const recommendations = new Swiper('.recommendations__slider', {
      slidesPerView: 4,
      // navigation: {
      //    nextEl: '.swiper-button-next',
      //    prevEl: '.swiper-button-prev',
      // },
      spaceBetween: 30,
      loop: true,
      pagination: {
         el: ".swiper-pagination",
         type: "fraction",
         formatFractionCurrent: addZero,
         formatFractionTotal: addZero
      },
      breakpoints: {
         320: {
            slidesPerView: 1,
         },
         425: {
            slidesPerView: 2,
         },
         768: {
            slidesPerView: 3,
         },
         1024: {
            slidesPerView: 4,
         },

      }
   });

   function addZero(num) {
      return (num > 9) ? num : '0' + num;
   }

   let tabs = document.querySelectorAll('.faq-tab__heading'),
      tabOpen = document.querySelectorAll('.faq-tab__open'),
      tabsParent = document.querySelector('.faq__wrapper');

   function hideTabContent() {
      tabOpen.forEach(item => {
         item.style.display = 'none';
      });
      tabs.forEach(item => {
         item.classList.remove('faq-tab__heading--active');
      });
   }

   function showTabContent(i = 0) {
      tabOpen[i].style.display = 'block';
      tabs[i].classList.add('faq-tab__heading--active');
   }
   hideTabContent();
   showTabContent();

   tabsParent.addEventListener('click', (event) => {
      let target = event.target;
      if (target && target.classList.contains('faq-tab__heading')) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });
});