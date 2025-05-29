document.addEventListener("DOMContentLoaded", () => {
	const saveBtn = document.getElementById("saveBuildButton");
	const orderBtn = document.getElementById("floatingOrderButton");

	if (!saveBtn) {
		console.warn("⚠️ Could not find #saveBuildButton in DOM.");
		return;
	}
	if(orderBtn){
		orderBtn.addEventListener("click", () =>{
			if(localStorage.getItem("account_id") != null){
				if (Object.values(window.windowbuild).some(part => part && part.stock <= 0)) {
						const outOfStockParts = Object.entries(window.windowbuild)
							.filter(([key, part]) => part && part.stock <= 0)
							.map(([key]) => key.toUpperCase());
						alert(`The following parts are out of stock:\n- ${outOfStockParts.join("\n- ")}`);
					}
				else{
					window.location.href = "/order-page/index.html";
				}
				
			}
			else{
				// Not logged in — show login modal
		const placeholder = document.getElementById("login-modal-placeholder");

		const existingAuthContainer = document.getElementById("auth-container");
		if (existingAuthContainer) {
			existingAuthContainer.style.display = "flex";
			existingAuthContainer.querySelector(".modal-box").classList.add("active");
			return;
		}

		// Load login modal
		fetch("login-modal.html")
			.then((res) => res.text())
			.then((html) => {
				placeholder.innerHTML = html;

				const authContainer = document.getElementById("auth-container");
				const modalBox = authContainer?.querySelector(".modal-box");

				if (!authContainer || !modalBox) {
					console.error("Modal structure not found in login-modal.html");
					return;
				}

				authContainer.style.display = "flex";
				modalBox.classList.add("active");

				// Get modal elements after injection
				const closeBtnLogin = document.getElementById("btn-close-login");
				const closeBtnSignup = document.getElementById("btn-close-signup");
				const loginForm = document.getElementById("login-form");
				const signupForm = document.getElementById("signup-form");
				const toggleSignup = document.querySelector(".btn-toggle-signup");
				const toggleLogin = document.querySelector(".btn-toggle-login");
				const openBtnLogin = document.querySelector(".btn-toggle-login");
				const openBtnSignup = document.querySelector(".btn-toggle-signup");

				function hideElement(element) {
					element.style.display = "none";
				}

				function resetForms() {
					loginForm?.reset();
					signupForm?.reset();
				}

				// Event Listeners
				closeBtnLogin?.addEventListener("click", () => {
					hideElement(authContainer);
					resetForms();
				});

				closeBtnSignup?.addEventListener("click", () => {
					hideElement(authContainer);
					resetForms();
				});

				window.addEventListener("click", (e) => {
					if (e.target === authContainer) {
						hideElement(authContainer);
						resetForms();
					}
				});

				toggleSignup?.addEventListener("click", () => {
					modalBox.classList.add("active"); // Switch to signup
					resetForms();
				});

				toggleLogin?.addEventListener("click", () => {
					modalBox.classList.remove("active"); // Switch to login
					resetForms();
				});
				//signupForm on click
				signupForm?.addEventListener("submit", (e) => {
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
							alert("Sign up successful! Will now attempt to log in.");
							const user = signupUsername;
							const pass = signupPassword;
							fetch("http://localhost:3000/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: user,
						password: pass,
					}),
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.status === "success") {
							alert("Login successful!");
							localStorage.setItem("authToken", data.token);
							localStorage.setItem("username", user); // Store username
							localStorage.setItem("account_id", data.account_id);

							hideElement(authContainer);
							const storedToken = localStorage.getItem("authToken");
							const storedUsername = localStorage.getItem("username");
							const storedAccountId = localStorage.getItem("account_id");

							const accountId = window.accountId;
							console.log("Initial accountId:", accountId);

							window.accountId = storedAccountId;
							console.log("Updated accountId:", window.accountId);
							window.location.href = "/order-page/index.html";
						}
					})
						} else {
							alert(data.message || "Something went wrong during signup.");
						}
					})
					.catch((error) => {
						console.error("Error during signup:", error);
						alert("An error occurred during signup.");
					});
			});

				//loginForm on Click
				loginForm?.addEventListener("submit", async (e) => {
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
							localStorage.setItem("authToken", data.token);
							localStorage.setItem("username", loginUsername); // Store username
							localStorage.setItem("account_id", data.account_id);

					

							hideElement(authContainer);
							const storedToken = localStorage.getItem("authToken");
							const storedUsername = localStorage.getItem("username");
							const storedAccountId = localStorage.getItem("account_id");

							const accountId = window.accountId;
							console.log("Initial accountId:", accountId);

							window.accountId = storedAccountId;
							console.log("Updated accountId:", window.accountId);
							window.location.href = "/order-page/index.html";
							
						} else {
							alert(data.message || "Incorrect username or password.");
						}
					})
					.catch((error) => {
						console.error("Error during login:", error);
						alert("An error occurred during login.");
					});
			});
							
			})
			.catch((err) => {
				console.error("Failed to load login modal:", err);
			});
			}
		})
	}

	saveBtn.addEventListener("click", () => {


		if (localStorage.getItem("account_id") != null) {
			console.log("✅ User authenticated. Saving build...");
			if (typeof saveBuild === "function") saveBuild();
			return;
		}

		// Not logged in — show login modal
		const placeholder = document.getElementById("login-modal-placeholder");

		const existingAuthContainer = document.getElementById("auth-container");
		if (existingAuthContainer) {
			existingAuthContainer.style.display = "flex";
			existingAuthContainer.querySelector(".modal-box").classList.add("active");
			return;
		}

		// Load login modal
		fetch("login-modal.html")
			.then((res) => res.text())
			.then((html) => {
				placeholder.innerHTML = html;

				const authContainer = document.getElementById("auth-container");
				const modalBox = authContainer?.querySelector(".modal-box");

				if (!authContainer || !modalBox) {
					console.error("Modal structure not found in login-modal.html");
					return;
				}

				authContainer.style.display = "flex";
				modalBox.classList.add("active");

				// Get modal elements after injection
				const closeBtnLogin = document.getElementById("btn-close-login");
				const closeBtnSignup = document.getElementById("btn-close-signup");
				const loginForm = document.getElementById("login-form");
				const signupForm = document.getElementById("signup-form");
				const toggleSignup = document.querySelector(".btn-toggle-signup");
				const toggleLogin = document.querySelector(".btn-toggle-login");
				const openBtnLogin = document.querySelector(".btn-toggle-login");
				const openBtnSignup = document.querySelector(".btn-toggle-signup");

				function hideElement(element) {
					element.style.display = "none";
				}

				function resetForms() {
					loginForm?.reset();
					signupForm?.reset();
				}

				// Event Listeners
				closeBtnLogin?.addEventListener("click", () => {
					hideElement(authContainer);
					resetForms();
				});

				closeBtnSignup?.addEventListener("click", () => {
					hideElement(authContainer);
					resetForms();
				});

				window.addEventListener("click", (e) => {
					if (e.target === authContainer) {
						hideElement(authContainer);
						resetForms();
					}
				});

				toggleSignup?.addEventListener("click", () => {
					modalBox.classList.add("active"); // Switch to signup
					resetForms();
				});

				toggleLogin?.addEventListener("click", () => {
					modalBox.classList.remove("active"); // Switch to login
					resetForms();
				});
				//signupForm on click
				signupForm?.addEventListener("submit", (e) => {
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
							alert("Sign up successful! Will now attempt to log in.");
							const user = signupUsername;
							const pass = signupPassword;
							fetch("http://localhost:3000/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: user,
						password: pass,
					}),
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.status === "success") {
							alert("Login successful!");
							localStorage.setItem("authToken", data.token);
							localStorage.setItem("username", user); // Store username
							localStorage.setItem("account_id", data.account_id);

							hideElement(authContainer);
							const storedToken = localStorage.getItem("authToken");
							const storedUsername = localStorage.getItem("username");
							const storedAccountId = localStorage.getItem("account_id");

							const accountId = window.accountId;
							console.log("Initial accountId:", accountId);

							window.accountId = storedAccountId;
							console.log("Updated accountId:", window.accountId);
							reloadModuleScript('saved.js', 'savedScript');
							reloadModuleScript('login-modal.js', 'loginModalScript');
						}
					})
						} else {
							alert(data.message || "Something went wrong during signup.");
						}
					})
					.catch((error) => {
						console.error("Error during signup:", error);
						alert("An error occurred during signup.");
					});
			});

				//loginForm on Click
				loginForm?.addEventListener("submit", async (e) => {
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
							localStorage.setItem("authToken", data.token);
							localStorage.setItem("username", loginUsername); // Store username
							localStorage.setItem("account_id", data.account_id);

					

							hideElement(authContainer);
							const storedToken = localStorage.getItem("authToken");
							const storedUsername = localStorage.getItem("username");
							const storedAccountId = localStorage.getItem("account_id");

							const accountId = window.accountId;
							console.log("Initial accountId:", accountId);

							window.accountId = storedAccountId;
							console.log("Updated accountId:", window.accountId);
							reloadModuleScript('saved.js', 'savedScript');
							reloadModuleScript('login-modal.js', 'loginModalScript');
						} else {
							alert(data.message || "Incorrect username or password.");
						}
					})
					.catch((error) => {
						console.error("Error during login:", error);
						alert("An error occurred during login.");
					});
			});
							
			})
			.catch((err) => {
				console.error("Failed to load login modal:", err);
			});
	});
});

function reloadModuleScript(src, id) {
  const oldScript = document.getElementById(id);
  if (oldScript) oldScript.remove();

  const newScript = document.createElement('script');
  newScript.type = 'module';
  newScript.src = src + '?v=' + new Date().getTime(); // prevent caching
  newScript.id = id;

  document.body.appendChild(newScript);
}

