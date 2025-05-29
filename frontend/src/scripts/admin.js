const adminAccount = [
	{
		username: "1",
		password: "1",
	},
];

document.addEventListener("DOMContentLoaded", () => {
	if (localStorage.getItem("loggedIn") === "true") {
		window.location.replace("/frontend/src/pages/admin-dashboard.html");
		return; 
	}

	const form = document.getElementById("login-form");
	const errorMessage = document.getElementById("error-message");

	function clearErrorMessage() {
		errorMessage.textContent = "";
	}

	function login(e) {
		e.preventDefault();

		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;

		const admin = adminAccount.find((account) => account.username === username);

		if (!admin) {
			errorMessage.textContent = "Username not found";
			return;
		}

		if (admin.password === password) {
			/*sessionStorage.setItem("adminLoggedIn", true); // store login state in session*/
			localStorage.setItem("loggedIn", "true");
			window.location.href = "/frontend/src/pages/admin-dashboard.html";
		} else {
			errorMessage.textContent = "Incorrect password!";
		}
	}

	form.addEventListener("submit", login);

	const usernameInput = document.getElementById("username");
	const passwordInput = document.getElementById("password");

	//clear error message when user started to input details
	usernameInput.addEventListener("input", clearErrorMessage);
	passwordInput.addEventListener("input", clearErrorMessage);

	window.addEventListener("pageshow", (event) => {
		if (event.persisted || window.performance.getEntriesByType("navigation")[0].type === "back_forward") {
			setTimeout(() => {

				if (usernameInput && passwordInput) {
					usernameInput.value = "";
					passwordInput.value = "";
				}
			}, 0);
		}
	});
});
