document.addEventListener("DOMContentLoaded", () => {
	fetch("/frontend/src/components/footer/footer.html")
		.then((res) => res.text())
		.then((data) => {
			document.getElementById("footer-placeholder").innerHTML = data;
		});
});
