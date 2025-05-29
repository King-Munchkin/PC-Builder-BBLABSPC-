const formTemplates = {
	case: [
		{ label: "Case Name", class: "name", placeholder: "Name", type: "text" },
		{ label: "Form Factor", class: "form_factor", placeholder: "Type", type: "text" },
		{ label: "Product Cost", class: "price", placeholder: "$", type: "number" },
		{ label: "Color", class: "color", placeholder: "Color", type: "text" },
		{ label: "Weight", class: "weight", placeholder: "Weight", type: "number" },
		{ label: "Stock", class: "stocks", placeholder: "Stock", type: "number" }
	],
	cpu: [
		{ label: "Model", class: "name", placeholder: "Name", type: "text" },
		{ label: "boost", class: "boost", placeholder: "Type", type: "text" },
		{ label: "Manufacturer", class: "microarch", placeholder: "Name", type: "text" },
		{ label: "Product Cost", class: "price", placeholder: "$", type: "number" },
		{ label: "Socket", class: "socket", placeholder: "Socket Type", type: "text" },
		{ label: "Stock", class: "stocks", placeholder: "Stock", type: "number" },
		{ label: "TDP", class: "tdp", placeholder: "TDP", type: "number" },
		{ label: "Cores", class: "cores", placeholder: "Cores", type: "number" },
		{ label: "Integrated GPU", class: "igpu", placeholder: "Integrated GPU", type: "text" }
	],
	mobo: [
		{ label: "Name", class: "name", placeholder: "Model Name", type: "text" },
		{ label: "Manufacturer", class: "manufacturer", placeholder: "Brand", type: "text" },
		{ label: "Socket Type", class: "socket_type", placeholder: "e.g. LGA1200", type: "text" },
		{ label: "Chipset", class: "chipset", placeholder: "e.g. B550", type: "text" },
		{ label: "Memory Type", class: "memory_type", placeholder: "e.g. DDR4", type: "text" },
		{ label: "Memory Slots", class: "memory_slots", placeholder: "e.g. 4", type: "number" },
		{ label: "Max Memory (GB)", class: "max_memory", placeholder: "e.g. 128", type: "number" },
		{ label: "PCIe Version", class: "pcie_version", placeholder: "e.g. 4.0", type: "text" },
		{ label: "Form Factor", class: "form_factor", placeholder: "e.g. ATX", type: "text" },
		{ label: "SATA Ports", class: "sata_ports", placeholder: "e.g. 6", type: "number" },
		{ label: "Product Cost", class: "price", placeholder: "$", type: "number" },
		{ label: "Power Consumption (W)", class: "power_consumption", placeholder: "e.g. 65", type: "number" },
		{ label: "Stock", class: "stocks", placeholder: "Available stock", type: "number" }
	],
	memory: [
		{ label: "Model", class: "name", placeholder: "Name", type: "text" },
		{ label: "DDR", class: "ram_type", placeholder: "Type", type: "text" },
		{ label: "Capacity", class: "capacity", placeholder: "Capacity (GB)", type: "number" },
		{ label: "Form Factor", class: "form_factor", placeholder: "Name", type: "text" },
		{ label: "Product Cost", class: "price", placeholder: "$", type: "number" },
		{ label: "Stock", class: "stocks", placeholder: "Stock", type: "number" },
		{ label: "Speed", class: "speed", placeholder: "MHz", type: "number" }
	],
	storage: [
		{ label: "Name", class: "name", placeholder: "Storage Name", type: "text" },
		{ label: "RPM", class: "rpm", placeholder: "e.g. 7200", type: "number" },
		{ label: "Form Factor", class: "form_factor", placeholder: "e.g. 2.5\"", type: "text" },
		{ label: "Interface", class: "interface", placeholder: "e.g. SATA", type: "text" },
		{ label: "NVMe", class: "nvme", placeholder: "Yes or No", type: "text" },
		{ label: "Capacity (GB)", class: "capacity", placeholder: "e.g. 512", type: "number" },
		{ label: "Price", class: "price", placeholder: "$", type: "number" },
		{ label: "Stocks", class: "stocks", placeholder: "Stock", type: "number" }
	],
	gpu: [
		{ label: "Model", class: "name", placeholder: "Name", type: "text" },
		{ label: "Watts", class: "power_draw", placeholder: "W", type: "number" },
		{ label: "Memory Size", class: "memory_size", placeholder: "4 (GB)", type: "number" },
		{ label: "Memory Type", class: "memory_type", placeholder: "Memory Type", type: "text" },
		{ label: "Interface", class: "interface", placeholder: "PCIe no.", type: "text" },
		{ label: "Product Cost", class: "price", placeholder: "$", type: "number" },
		{ label: "Stock", class: "stocks", placeholder: "Stock", type: "number" },
		{ label: "Chipset", class: "chipset", placeholder: "Chipset", type: "text" }
	],
	"case-fans": [
	{ label: "Name", class: "name", placeholder: "Fan Name", type: "text" },
	{ label: "Fan Type", class: "fan_type", placeholder: "Type (e.g. PWM, DC)", type: "text" },
	{ label: "Size (mm)", class: "size", placeholder: "Size (e.g. 120)", type: "number" },
	{ label: "RPM Range", class: "rpm_range", placeholder: "e.g. 500-1500", type: "text" },
	{ label: "Airflow", class: "airflow", placeholder: "e.g. 50 CFM", type: "text" },
	{ label: "TDP", class: "tdp", placeholder: "Thermal Design Power", type: "number" },
	{ label: "Noise Level", class: "noise_level", placeholder: "e.g. 25 dBA", type: "text" },
	{ label: "RGB", class: "rgb", placeholder: "0 = No, 1 = Yes", type: "number" },
	{ label: "Quantity", class: "quantity", placeholder: "Fans per Pack", type: "number" },
	{ label: "Product Cost", class: "price", placeholder: "$", type: "number" },
	{ label: "Stock", class: "stocks", placeholder: "Stock", type: "number" }
],
	cooler: [
	{ label: "Name", class: "name", placeholder: "Cooler Name", type: "text" },
	{ label: "Type", class: "type", placeholder: "Air, Liquid, etc.", type: "text" },
	{ label: "Supported Sockets", class: "supported_sockets", placeholder: "e.g. AM4, LGA1700", type: "text" },
	{ label: "Fan RPM Range", class: "fan_rpm_range", placeholder: "e.g. 500-2000", type: "text" },
	{ label: "TDP", class: "tdp", placeholder: "Thermal Design Power", type: "number" },
	{ label: "Product Cost", class: "price", placeholder: "$", type: "number" },
	{ label: "Stock", class: "stocks", placeholder: "Stock", type: "number" }
],
psu: [
    { label: "Name", class: "name", placeholder: "e.g. Corsair RM750x", type: "text" },
    { label: "Form Factor", class: "form-factor", placeholder: "e.g. ATX", type: "text" },
    { label: "Efficiency Rating", class: "efficiency", placeholder: "e.g. 80+ Gold", type: "text" },
    { label: "Modularity", class: "modularity", placeholder: "e.g. Fully Modular", type: "text" },
    { label: "Fanless", class: "fanless", placeholder: "Yes or No", type: "text" },
    { label: "Wattage", class: "wattage", placeholder: "e.g. 750", type: "number" },
    { label: "Price", class: "price", placeholder: "$", type: "number" },
    { label: "Stock", class: "stocks", placeholder: "Stock", type: "number" }
]
};

	document.addEventListener("DOMContentLoaded", () => {
		if (localStorage.getItem("loggedIn") !== "true") {
			window.location.replace("/frontend/public/admin.html");
		}
	
		const formWrapper = document.getElementById("form-wrapper");
	
	const checkboxes = document.querySelectorAll(".component-checkbox");
	checkboxes.forEach((cb) => {
		cb.addEventListener("change", () => {
			const type = cb.value;
			if (cb.checked) {
				createForm(type);
			} else {
				removeForm(type);
			}
		});
	});

	function createForm(type) {
		if (!formTemplates[type]) {
			console.error(`Form template for type "${type}" not found.`);
			return;
		}
	
		if (document.getElementById(`${type}-form`)) return;
	
		const container = document.createElement("div");
		container.id = `${type}-form`;
		container.className = "form";
	
		const title = document.createElement("h5");
		title.textContent = `Add ${capitalize(type)}`;
		container.appendChild(title);
	
		const hr = document.createElement("hr");
		container.appendChild(hr);
	
		const form = document.createElement("form");
	
		formTemplates[type].forEach((field) => {
			const label = document.createElement("label");
			const p = document.createElement("p");
			p.textContent = field.label;
	
			const input = document.createElement("input");
			input.type = field.type;
			input.placeholder = field.placeholder;
			input.required = true;
			input.className = field.class;
	
			// Enhanced validation
			if (field.pattern) input.pattern = field.pattern;
			if (field.title) input.title = field.title;
	
			label.appendChild(p);
			label.appendChild(input);
			form.appendChild(label);
		});
	
		container.appendChild(form);
		formWrapper.appendChild(container);
	}

	function removeForm(type) {
		const form = document.getElementById(`${type}-form`);
		if (form) form.remove();
	}

	function capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	// This function will send form data to the backend
	async function sendToBackend(type, data) {
		let endpoint = "";

		if (type === "cpu") {
			endpoint = "http://localhost:3000/cpu/add";
			if (data.price) data.price = parseInt(data.price, 10);
			if (data.stocks) data.stocks = parseInt(data.stocks, 10);
			if (data.tdp) data.tdp = parseInt(data.tdp, 10);
			if (data.cores) data.cores = parseInt(data.cores, 10);
		} else if (type === "gpu") {
			endpoint = "http://localhost:3000/gpu/add";
			if (data.price) data.price = parseInt(data.price, 10);
			if (data.stocks) data.stocks = parseInt(data.stocks, 10);
			if (data.memory_size) data.memory_size = parseInt(data.memory_size, 10);
			if (data.power_draw) data.power_draw = parseInt(data.power_draw, 10);
		} else if (type === "mobo") {
			endpoint = "http://localhost:3000/motherboard/add";
			if (data.price) data.price = parseInt(data.price, 10);
			if (data.stocks) data.stocks = parseInt(data.stocks, 10);
			if (data.memory_slots) data.memory_slots = parseInt(data.memory_slots, 10);
			if (data.max_memory) data.max_memory = parseInt(data.max_memory, 10);
			if (data.sata_ports) data.sata_ports = parseInt(data.sata_ports, 10);
			if (data.power_consumption) data.power_consumption = parseInt(data.power_consumption, 10);
		} else if (type === "memory") {
			endpoint = "http://localhost:3000/ram/add";
			if (data.price) data.price = parseInt(data.price, 10);
			if (data.stocks) data.stocks = parseInt(data.stocks, 10);
			if (data.speed) data.speed = parseInt(data.speed, 10);
			if (data.capacity) data.capacity = parseInt(data.capacity, 10);
		} else if (type === "storage") {
			endpoint = "http://localhost:3000/storage/add";
			if (data.price) data.price = parseInt(data.price, 10);
			if (data.stocks) data.stocks = parseInt(data.stocks, 10);
			if (data.capacity) data.capacity = parseInt(data.capacity, 10);
			data.image = data.image || null;  // Default to null if image is not provided
		} else if (type === "psu") {
			endpoint = "http://localhost:3000/psu/add";
			if (data.price) data.price = parseInt(data.price, 10);
			if (data.stocks) data.stocks = parseInt(data.stocks, 10);
			if (data.wattage) data.wattage = parseInt(data.wattage, 10);
		} else if (type === "case") {
			endpoint = "http://localhost:3000/case/add";
			if (data.price) data.price = parseInt(data.price, 10);
			if (data.stocks) data.stocks = parseInt(data.stocks, 10);
			if (data.weight) data.weight = parseInt(data.weight, 10);
		} else if (type === "cooler") {
			endpoint = "http://localhost:3000/cooler/add";
			if (data.price) data.price = parseInt(data.price, 10);
			if (data.stocks) data.stocks = parseInt(data.stocks, 10);
			if (data.tdp) data.tdp = parseInt(data.tdp, 10);
		} else if (type === "case-fans") {
			endpoint = "http://localhost:3000/casefan/add";
			if (data.price) data.price = parseInt(data.price, 10);
			if (data.stocks) data.stocks = parseInt(data.stocks, 10);
			if (data.size) data.size = parseInt(data.size, 10);
			if (data.tdp) data.tdp = parseInt(data.tdp, 10);
			if (data.quantity) data.quantity = parseInt(data.quantity, 10);
		} else {
			alert("Unknown component type: " + type);
			return;
		}
	
		try {
			console.log(`Sending ${type} data:`, data);
			const response = await fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			});
	
			if (response.ok) {
				const jsonResponse = await response.json();
				alert(`${type.toUpperCase()} added successfully: ${jsonResponse.message}`);
			} else {
				const errorResponse = await response.text();
				alert(`Error adding ${type.toUpperCase()}: ${errorResponse}`);
			}
		} catch (error) {
			alert(`Error sending ${type.toUpperCase()} data to backend: ${error.message}`);
		}
	}

	const addProductBtn = document.querySelector(".add-product");
	if (addProductBtn) {
		addProductBtn.addEventListener("click", () => {
			const formData = {};

			checkboxes.forEach((checkbox) => {
				if (checkbox.checked) {
					const type = checkbox.value;
					const form = document.querySelector(`#${type}-form form`);
					if (!form) return;

					const inputs = form.querySelectorAll("input");
					const data = {};
					inputs.forEach((input) => {
						data[input.className] = input.value;
					});

					formData[type] = data;
				}
			});
			if (Object.keys(formData).length === 0) {
				alert("Please fill out at least one component.");
				return;
			}

			// Send to backend
			Object.keys(formData).forEach(type => {
				const data = formData[type];
				sendToBackend(type, data);
			});

			// Optionally clear forms and checkboxes
			checkboxes.forEach((checkbox) => {
				if (checkbox.checked) {
					checkbox.checked = false;
					removeForm(checkbox.value);
				}
			});
		});
	}

	const viewProdList = document.querySelector(".view-product-list");
if (viewProdList) {
	viewProdList.addEventListener("click", () => {
		window.location.href = "../pages/admin-dashboard.html";
	});
}
});