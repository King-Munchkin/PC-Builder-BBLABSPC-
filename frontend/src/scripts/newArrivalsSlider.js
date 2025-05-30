document.addEventListener("DOMContentLoaded", () => {
	new Swiper(".product-wrapper", {
		loop: true,
		spaceBetween: 35,

		// Pagination bullets
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
			dynamicBullets: true,
		},

		// Navigation arrows
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},

		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			768: {
				slidesPerView: 2,
			},
			1280: {
				slidesPerView: 3,
			},
		},
	});
});
