let savedBuilds = [
	{
		image: "https://placehold.co/150x150",
		buildName: "Build 1 - Ryzen 7 + RTX 3060",
		cpu: { name: "AMD Ryzen 7 5800X", price: 299.99, cores: 8, tdp: 105, socket: "AM4" },
		mobo: { name: "ASUS ROG Strix B550-F", price: 159.99, socket: "AM4", chipset: "B550", memoryType: "DDR4", formFactor: "ATX" },
		ram: { name: "Corsair Vengeance 16GB (2x8GB)", price: 79.99, speed: "3200MHz", type: "DDR4", modules: 2 },
		storage: { name: "Samsung 970 EVO Plus 1TB", price: 89.99, type: "SSD", interface: "NVMe", formFactor: "M.2" },
		gpu: { name: "NVIDIA RTX 3060", price: 329.99, memory: "12GB", tdp: 170, chipset: "NVIDIA" },
	},
	{
		image: "https://placehold.co/150x150",
		buildName: "Build 2 - i7 12700K + RX 6700 XT",
		cpu: { name: "Intel Core i7-12700K", price: 409.99, cores: 12, tdp: 125, socket: "LGA1700" },
		mobo: { name: "MSI MAG Z690 TOMAHAWK WIFI", price: 229.99, socket: "LGA1700", chipset: "Z690", memoryType: "DDR5", formFactor: "ATX" },
		ram: { name: "G.Skill Trident Z RGB 32GB (2x16GB)", price: 149.99, speed: "3600MHz", type: "DDR5", modules: 2 },
		storage: { name: "WD Black SN850X 1TB", price: 139.99, type: "SSD", interface: "NVMe", formFactor: "M.2" },
		gpu: { name: "AMD Radeon RX 6700 XT", price: 479.99, memory: "12GB", tdp: 230, chipset: "AMD" },
	},
];

document.addEventListener("DOMContentLoaded", () => {
	const savedBuild = document.getElementById("build-list");

	function renderBuilds() {
		savedBuild.innerHTML = "";

		savedBuilds.forEach((build, i) => {
			const totalPrice = build.cpu.price + build.mobo.price + build.ram.price + build.storage.price + build.gpu.price;

			const card = document.createElement("li");
			card.className = "build-item";
			card.dataset.index = i;

			card.innerHTML = `
        <a href="#" class="build-link">
				<div class="title-image-container">
					<h3 class="build-title">${build.buildName}</h3>
				 	<img src="${build.image}" alt="${build.buildName}" class="build-image" 
           	onerror="this.src='https://placehold.co/150x150?text=No+Image'" />
				</div>
				<div class="partslist-container"> 
					<h3>Parts List</h3>
					<hr>
					<p>CPU: ${build.cpu.name}</p>
					<p>Motherboard: ${build.mobo.name}</p>
					<p>RAM: ${build.ram.name}</p>
					<p>Storage: ${build.storage.name}</p>
					<p>GPU: ${build.gpu.name}</p>
					<p class="build-price">$${totalPrice.toFixed(2)}</p>	
				</div>
				<div class="buttons"> 
					<button class="btn-edit">Edit</button>
					<button class="btn-delete">Delete</button>
				</div>
        </a>
      `;	

			card.querySelector(".btn-delete").addEventListener("click", (e) => {
				e.preventDefault();
				const index = Number(card.dataset.index);
				savedBuilds.splice(index, 1);
				renderBuilds();
			});

			savedBuild.appendChild(card);
		});
	}
	renderBuilds();
});
