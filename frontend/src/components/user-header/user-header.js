const userHeader = document.getElementById("user-header");
if (userHeader) {
	userHeader.innerHTML = accountId;
}
document.addEventListener("DOMContentLoaded", () => {
	fetch("/frontend/src/components/user-header/user-header.html")
		.then((res) => res.text())
		.then((data) => {
			document.getElementById("header-placeholder").innerHTML = data;
			console.log("✅ Header loaded");

			// Open and close the form
			const authContainer = document.getElementById("auth-container");
			const modalBox = document.querySelector(".modal-box");
			const openBtnLogin = document.getElementById("open-btn-login");
			const openBtnSignup = document.getElementById("open-btn-signup");
			const closeBtnLogin = document.getElementById("btn-close-login");
			const closeBtnSignup = document.getElementById("btn-close-signup");

			//for toggle buttons inside the login/signup form
			const toggleSignup = document.querySelector(".btn-toggle-signup");
			const toggleLogin = document.querySelector(".btn-toggle-login");

			// Form elements
			const signupForm = document.getElementById("signup-form");
			const loginForm = document.getElementById("login-form");

			// User profile menu
			const userProfile = document.getElementById("profile-menu");
			const userIcon = document.querySelector(".profile-icon");

			// Navigation when logged in or not
			const authButtons = document.getElementById("auth-buttons");
			const userNav = document.getElementById("user-nav");

			// Function to show or hide elements
			function showElement(element) {
				element.style.display = "flex";
			}

			function hideElement(element) {
				element.style.display = "none";
			}

			function resetForms() {
				loginForm.reset();
				signupForm.reset();
			}

			function logout() {
				console.log("🔒 Logging out...");

				// Clear localStorage and reset auth buttons
				localStorage.removeItem("authToken");
				localStorage.removeItem("account_id");
				window.account_id = null;
				delete window.account_id;
  

				// Reset auth buttons back to login and signup
				showElement(authButtons);
				hideElement(userNav);

				userProfile.classList.remove("open-menu");
				// Redirect the user to landing page once logged out
				window.location.href = "/frontend/public/user.html";
			}

			// Show login modal
			openBtnLogin.addEventListener("click", () => {
				showElement(authContainer);
				modalBox.classList.remove("active");
			});

			// Show signup modal
			openBtnSignup.addEventListener("click", () => {
				showElement(authContainer);
				modalBox.classList.add("active");
			});

			// Close login modal
			closeBtnLogin.addEventListener("click", () => {
				hideElement(authContainer);
				resetForms();
			});

			// Close signup modal
			closeBtnSignup.addEventListener("click", () => {
				hideElement(authContainer);
				resetForms();
			});

			// User profile dropdown menu
			userIcon.addEventListener("click", () => {
				userProfile.classList.toggle("open-menu");
			});

			toggleSignup.addEventListener("click", () => {
				modalBox.classList.add("active");
				loginForm.reset();
				signupForm.reset();
			});
			toggleLogin.addEventListener("click", () => {
				modalBox.classList.remove("active");
				loginForm.reset();
				signupForm.reset();
			});
            // Close modals when clicking outside
			window.addEventListener("click", (e) => {
				if (e.target === authContainer) {
					hideElement(authContainer);
					loginForm.reset();
					signupForm.reset();
				}
			});

			// Handle signup form submission
			signupForm.addEventListener("submit", (e) => {
				e.preventDefault(); // Prevent form from reloading page

				const signupUsername = document.getElementById("signup-username").value;
				const signupEmail = document.getElementById("signup-email").value;
				const signupPassword = document.getElementById("signup-password").value;

				// Send POST request to register the user
				fetch("http://localhost:3000/register", {
					// Updated URL
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: signupUsername,
						email: signupEmail,
						password: signupPassword,
					}),
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.status === "success") {
							alert("Sign up successful! You can now log in.");
							hideElement(authContainer); // Close the modal after signup
						} else {
							alert(data.message || "Something went wrong during signup.");
						}
					})
					.catch((error) => {
						console.error("Error during signup:", error);
						alert("An error occurred during signup.");
					});
			});

			// Handle login form submission
			loginForm.addEventListener("submit", (e) => {
				e.preventDefault();

				const loginUsername = document.getElementById("login-username").value;
				const loginPassword = document.getElementById("login-password").value;

				// Send POST request to login the user
				fetch("http://localhost:3000/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: loginUsername,
						password: loginPassword,
					}),
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.status === "success") {
							alert("Login successful!");

							// Store username and JWT token in localStorage
							localStorage.setItem("authToken", data.token);
							localStorage.setItem("username", loginUsername); // Store username
							localStorage.setItem("account_id", data.account_id);

							// Update user display name
							document.getElementById("user-display-name").textContent = loginUsername;

							// Change auth buttons to show logged-in state
							showElement(userNav);
							hideElement(authButtons);

							// Add event listener to logout button
							const userLogoutBtn = document.querySelectorAll(".logout-btn");
							userLogoutBtn.forEach((button) => {
								button.addEventListener("click", logout);
							});

							hideElement(authContainer);
							window.location.href = "/frontend/public/user.html"; // Redirect to user page
						} else {
							alert(data.message || "Incorrect username or password.");
						}
					})
					.catch((error) => {
						console.error("Error during login:", error);
						alert("An error occurred during login.");
					});
			});

			// Maintain logged-in state
			const storedToken = localStorage.getItem("authToken");
			const storedUsername = localStorage.getItem("username");
			const storedAccountId = localStorage.getItem("account_id");

			const accountId = window.accountId;
			console.log("Initial accountId:", accountId);

			window.accountId = storedAccountId;
			console.log("Updated accountId:", window.accountId);

			if (storedToken) {
				showElement(userNav);
				hideElement(authButtons);

				// Update user display name if username exists
				if (storedUsername) {
					document.getElementById("user-display-name").textContent = storedUsername;
				}

				// Add event listener to logout button
				const userLogoutBtn = document.querySelectorAll(".logout-btn");
				userLogoutBtn.forEach((button) => {
					button.addEventListener("click", logout);
				});
			}
		});
});