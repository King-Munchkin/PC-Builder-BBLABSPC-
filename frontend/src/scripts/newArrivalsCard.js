const products = [
	{
		name: "AMD Ryzen 7 9800X3D",
		price: 479.0,
		socket: "AM5",
		cores: 8,
		boost: "5.2 GHz",
		tdp: 120,
		microarch: "Zen 4",
		igpu: "Intel HD Graphics 630",
		image: "https://placehold.co/150x150",
	},
	{
		name: "AMD Ryzen 7 7800X3D",
		price: 408.6,
		socket: "AM5",
		cores: 8,
		boost: "5.0 GHz",
		tdp: 105,
		microarch: "Zen 4",
		igpu: "Intel HD Graphics 530",
		image: "https://placehold.co/150x150",
	},
	{
		name: "AMD Ryzen 5 7600X",
		price: 209.0,
		socket: "AM5",
		cores: 6,
		boost: "5.3 GHz",
		tdp: 95,
		microarch: "Zen 4",
		igpu: "Intel HD Graphics 4000",
		image: "https://placehold.co/150x150",
	},
	{
		name: "AMD Ryzen 7 9700X",
		price: 329.0,
		socket: "AM5",
		cores: 8,
		boost: "5.5 GHz",
		tdp: 120,
		microarch: "Zen 4",
		igpu: "Intel HD Graphics 2500",
		image: "https://placehold.co/150x150",
	},
];

document.addEventListener("DOMContentLoaded", () => {
	const productList = document.getElementById("product-list");
	productList.innerHTML = "";

	products.forEach((product) => {
		const card = document.createElement("li");
		card.className = "product-card swiper-slide";
		card.innerHTML = `
      <a href="#" class="product-link">
        <img src="${product.image}" alt="${product.name}" class="product-image" 
           onerror="this.src='https://placehold.co/150x150?text=No+Image'" />
        <h3 class="product-title">${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <p>Socket: ${product.socket}</p>
        <p>Cores: ${product.cores}</p>
        <p>Boost: ${product.boost}</p>
        <p>TDP: ${product.tdp}W</p>
      </a>
    `;
		productList.appendChild(card);
	});
});
