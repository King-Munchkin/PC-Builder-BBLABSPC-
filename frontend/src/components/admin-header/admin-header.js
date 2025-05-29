document.addEventListener("DOMContentLoaded", () => {
	fetch("/frontend/src/components/admin-header/admin-header.html")
		.then((res) => res.text())
		.then((data) => {
			document.getElementById("header-placeholder").innerHTML = data;

			const logouBtn = document.getElementById("logout-btn");

			function logout() {
				localStorage.removeItem("loggedIn");
				window.location.replace("/frontend/public/admin.html");
			}

			logouBtn.addEventListener("click", logout);
		});
});
