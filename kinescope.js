ecomBanner = document.querySelector('.ecom_banner_wrap');
ecomCloseIcon = document.querySelector('.close_icon');

ecomCloseIcon.addEventListener('click', () => {
   ecomBanner.classList.add('is-closed');
   localStorage.setItem('ecomBannerClosed', 'true');
});


if (localStorage.getItem('ecomBannerClosed') !== 'true') {
   ecomBanner.classList.remove('is-closed');
}



