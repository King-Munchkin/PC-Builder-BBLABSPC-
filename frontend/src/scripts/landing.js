const list = document.querySelector(".slider-wrapper .slider");
const items = document.querySelectorAll(".slider-wrapper .slider .item");
const dots = document.querySelectorAll(".slider-wrapper .bullets li");

let active = 0;
const lengthItems = items.length;
let autoSlide;

function startAutoSlide() {
	autoSlide = setInterval(() => {
		active = (active + 1) % lengthItems;
		reloadSlider();
	}, 2500);
}

function reloadSlider() {
	const checkLeft = items[active].offsetLeft;
	list.style.left = -checkLeft + "px";

	const lastActiveDot = document.querySelector(".slider-wrapper .bullets li.active");
	lastActiveDot.classList.remove("active");
	dots[active].classList.add("active");
}

dots.forEach((li, key) => {
	li.addEventListener("click", function () {
		active = key;
		reloadSlider();
    clearInterval(autoSlide);
	});
	li.addEventListener("mouseenter", () => clearInterval(autoSlide));
	li.addEventListener("mouseleave", () => startAutoSlide());
});

items.forEach((item) => {
	item.addEventListener("mouseenter", () => clearInterval(autoSlide));
	item.addEventListener("mouseleave", () => startAutoSlide());
});

startAutoSlide();