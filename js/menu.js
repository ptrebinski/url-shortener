const hamburger = document.querySelector('#hamburger');
const menu = document.querySelector('#menu');

const toggleMenu = () => {
  menu.classList.toggle('menu--active');
  hamburger.classList.toggle('hamburger--active');
};

hamburger.addEventListener('click', toggleMenu);
