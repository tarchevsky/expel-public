const tabsTabs = document.querySelectorAll('.product__tabheader');
const tabsContent = document.querySelectorAll('.product__about');
const tabsPapa = document.querySelector('.product');

function tabHide() {
   tabsContent.forEach(item => {
      item.style.display = 'none';
   });

   tabsTabs.forEach(item => {
      item.classList.remove('product__about--active');
   });
}
function tabShow(i = 0) {
   tabsContent[i].style.display = 'flex';
   tabsTabs[i].classList.add('product__about--active');
}
tabHide();
tabShow();

const tabsClick = tabsPapa.addEventListener('click', (event) => {
   const target = event.target;

   if (target && target.classList.contains('product__tabheader')) {
      tabsTabs.forEach((item, i) => {
         if (target == item) {
            tabHide();
            tabShow(i);
         }
      });
   }
});

const swup = new Swup();
let swupClick = document.querySelector('.swup-click');
let swupNone = document.querySelector('.swup-none');

swupClick.addEventListener('click', () => {
   // let swupOpened = swupAbs.style.display = 'block';
   // swupOpened.addEventListener('click', function () {
   //    document.querySelector('.transition-fade').click();
   // });
   swupNone.style.overflowY = 'hidden';
});

// swup.off('contentReplaced', tabHide);
// swup.off('contentReplaced', tabShow);
// swup.off('willReplaceContent', tabShow);
// swup.off('willReplaceContent', tabHide);
// swup.off('willReplaceContent', tabsClick);
// swup.off('contentReplaced', tabsClick);