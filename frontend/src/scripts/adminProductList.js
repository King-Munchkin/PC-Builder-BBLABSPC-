
window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.replace("/frontend/public/admin.html");
    }

    let filteredData = [];

    document.querySelectorAll(".component-checkbox").forEach((checkbox) => {
        checkbox.addEventListener("change", filterProducts);
    });

    async function fetchProducts(filters = [], maxPrice = 10000) {
    try {
        if (filters.length === 0) {
            filteredData = [];
            renderTable();
            return;
        }

        const baseUrl = "http://localhost:3000";
        const filterMap = {
            "case": { url: "/ComputerCases", key: "computer_cases" },
            "cpu": { url: "/CPUs", key: "processors" },
            "mobo": { url: "/Motherboards", key: "motherboards" },
            "memory": { url: "/Rams", key: "Ram" },
            "storage": { url: "/Storages", key: "storages" },
            "gpu": { url: "/GPUs", key: "gpus" },
            "case-fans": { url: "/CaseFans", key: "case_fans" },
            "cooler": { url: "/CpuCoolers", key: "cpu_coolers" },
            "psu": { url: "/Powersupplies", key: "power_supplies" },
        };

        let allProducts = [];

        // Fetch products for each selected filter
        for (const type of filters) {
            if (!filterMap[type]) continue;

            const { url, key } = filterMap[type];
            const response = await fetch(`${baseUrl}${url}`);
            const data = await response.json();
            const products = data[key] || [];

            // Add only products within max price to allProducts
            const filtered = products.filter(product => parseFloat(product.price) <= maxPrice);

            allProducts = allProducts.concat(filtered);
        }

        filteredData = allProducts;
        renderTable();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

    function filterProducts() {
        const checkboxes = document.querySelectorAll(".component-checkbox");
        const selectedTypes = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
        const maxPrice = document.getElementById("price-range").value;
        fetchProducts(selectedTypes, maxPrice);
    }

    function renderTable() {
        const tbody = document.getElementById("product-table-body");
        tbody.innerHTML = "";

        filteredData.forEach((product) => {
            const type = getProductType(product);
            const id = getProductId(product);

            const row = document.createElement("tr");
            row.setAttribute("data-type", type);
            row.setAttribute("data-id", id);

            row.innerHTML = `
                <td><input type="checkbox" class="product-checkbox" value="${id}" /></td>
                <td>${product.name}</td>
                <td>
                    <span class="stock-text">${product.stock}</span>
                    <input class="stock-input" type="number" value="${product.stock}" style="display: none;" />
                </td>
                <td>
                    <span class="price-text">${product.price}</span>
                    <input class="price-input" type="number" value="${product.price}" style="display: none;" />
                </td>
                <td><button class="edit-btn">Edit</button></td>
            `;
            tbody.appendChild(row);

            const editBtn = row.querySelector(".edit-btn");
            editBtn.addEventListener("click", async () => {
				const isEditing = editBtn.textContent === "Save";
				const stockText = row.querySelector(".stock-text");
				const priceText = row.querySelector(".price-text");
				const stockInput = row.querySelector(".stock-input");
				const priceInput = row.querySelector(".price-input");
			
				if (!isEditing) {
					stockText.style.display = "none";
					priceText.style.display = "none";
					stockInput.style.display = "inline";
					priceInput.style.display = "inline";
					editBtn.textContent = "Save";
				} else {
					const newStock = stockInput.value;
					const newPrice = priceInput.value;
			
					stockText.textContent = newStock;
					priceText.textContent = newPrice;
			
					stockText.style.display = "inline";
					priceText.style.display = "inline";
					stockInput.style.display = "none";
					priceInput.style.display = "none";
					editBtn.textContent = "Edit";
			
					const type = row.dataset.type;
					const id = row.dataset.id;
					const baseUrl = "http://localhost:3000";
					const name = row.querySelector("td:nth-child(2)").textContent.trim();
			
					let updateUrl = "";
					let updateBody = {};
					let method = "POST";
			
					switch (type) {
						case "cpu":
							updateUrl = `${baseUrl}/cpu/update`;
							updateBody = { name, stocks: parseInt(newStock), price: parseFloat(newPrice) };
							break;
						case "mobo":
							updateUrl = `${baseUrl}/mobo/update`;
							updateBody = { name, stocks: parseInt(newStock), price: parseFloat(newPrice) };
							break;
						case "memory":
							updateUrl = `${baseUrl}/ram/update`;
							updateBody = { name, stocks: parseInt(newStock), price: parseFloat(newPrice) };
							break;
						case "gpu":
							updateUrl = `${baseUrl}/gpu/update`;
							updateBody = { name, stocks: parseInt(newStock), price: parseFloat(newPrice) };
							break;
						case "storage":
							updateUrl = `${baseUrl}/storage/update`;
							updateBody = { name, stocks: parseInt(newStock), price: parseFloat(newPrice) };
							break;
						case "psu":
						updateUrl = `${baseUrl}/psu/update`;
						updateBody = { name, stocks: parseInt(newStock), price: parseFloat(newPrice) };
						break;
						case "case-fans":
						updateUrl = `${baseUrl}/casefan/update`;
						updateBody = { name, stocks: parseInt(newStock), price: parseFloat(newPrice) };
						break;
						case "cooler":
						updateUrl = `${baseUrl}/cooler/update`;
						updateBody = { name, stocks: parseInt(newStock), price: parseFloat(newPrice) };
						break;
						case "case":
						updateUrl = `${baseUrl}/case/update`;
						updateBody = { name, stocks: parseInt(newStock), price: parseFloat(newPrice) };
						break;
						default:
							updateUrl = `${baseUrl}/${type}s/${id}`;
							updateBody = { stock: parseInt(newStock), price: parseFloat(newPrice) };
							break;
					}
			
					await fetch(updateUrl, {
						method,
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(updateBody),
					});
				}
			});
        });
    }

	

    function getProductType(product) {
		if (product.processor_id) return "cpu";
		if (product.case_id) return "case";
		if (product.motherboard_id) return "mobo";
		if (product.ram_id) return "memory";
		if (product.storage_id) return "storage";
		if (product.gpu_id) return "gpu";
		if (product.fan_id) return "case-fans";
		if (product.cooler_id) return "cooler";
		if (product.id) return "psu";
		return "unknown";
	}
	
	
	function getProductId(product) {
		return (
			product.processor_id ||
			product.computer_case_id ||
			product.motherboard_id ||
			product.RAM_id ||
			product.storage_id ||
			product.GPU_id ||
			product.case_fan_id ||
			product.cooler_id ||
			product.psu_id ||
			""
		);
	}

    const deleteBtn = document.querySelector(".btn-delete");
    

deleteBtn.addEventListener("click", async () => {
    const checkboxes = document.querySelectorAll(".product-checkbox:checked");
    const baseUrl = "http://localhost:3000";

    for (const cb of checkboxes) {
        const row = cb.closest("tr");
        const type = row.dataset.type;
        const name = row.querySelector("td:nth-child(2)").textContent.trim();

        let deleteUrl = "";
        let body = { name }; // using name instead of id

        switch (type) {
            case "cpu":
                deleteUrl = `${baseUrl}/cpu/delete`;
                break;
            case "mobo":
                deleteUrl = `${baseUrl}/mobo/delete`;
                break;
            case "memory":
                deleteUrl = `${baseUrl}/ram/delete`;
                break;
            case "gpu":
                deleteUrl = `${baseUrl}/gpu/delete`;
                break;
            case "storage":
                deleteUrl = `${baseUrl}/storage/delete`;
                break;
            case "psu":
                deleteUrl = `${baseUrl}/psu/delete`;
                break;
            case "case-fans":
                deleteUrl = `${baseUrl}/case-fans/delete`;
                break;
            case "cooler":
                deleteUrl = `${baseUrl}/cooler/delete`;
                break;
            case "case":
                deleteUrl = `${baseUrl}/case/delete`;
                break;
            default:
                console.error(`Unknown product type: ${type}`);
                continue;
        }

        try {
            const res = await fetch(deleteUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                row.remove();
                filteredData = filteredData.filter(p => {
                    const prodName = p.name?.trim?.();
                    return prodName !== name;
                });
                console.log(`Deleted ${type}: ${name}`);
            } else {
                console.error(`Failed to delete ${type}: ${name}`, await res.text());
            }
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    }
});

// Navigate to product list

const viewProdList = document.querySelector(".add-product");
viewProdList.addEventListener("click", () => {
    window.location.href = "../pages/admin-addProduct.html";
});
});
