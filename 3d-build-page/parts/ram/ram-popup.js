function loadRAMStylesheet() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "parts/popup-style.css";
  document.head.appendChild(link);
}
loadRAMStylesheet();

compatibility = document.getElementById('compatibility').checked;
(async function () {
  const ramProductList = document.getElementById("ramProductList");
  if (ramProductList?.dataset.initialized === "true") return;
  ramProductList.dataset.initialized = "true";

  const defaultRAMs = [
    {
      name: "Corsair Vengeance LPX 16GB",
      price: 59.99,
      type: "DDR4",
      speed: "3200MHz",
      size: 16,
      sticks: 2
    },
    {
      name: "G.SKILL Trident Z RGB 32GB",
      price: 119.99,
      type: "DDR4",
      speed: "3600MHz",
      size: 32,
      sticks: 2
    },
    {
      name: "Kingston Fury Beast 8GB",
      price: 34.99,
      type: "DDR4",
      speed: "2666MHz",
      size: 8,
      sticks: 1
    }
  ];

  let ramProducts = [];

  try {
    const response = await fetch("http://localhost:3000/Rams");
    const data = await response.json();
  
    if (data.Ram && Array.isArray(data.Ram)) {
      ramProducts = data.Ram.map(ram => ({
        name: ram.name,
        price: ram.price,
        type: ram.ram_type,
        speed: ram.speed,
        size: ram.capacity,
        sticks: 2,
        stock: ram.stock,
        image: "parts/Images/ram.png"
      }));
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (err) {
    console.warn("Using fallback RAM data due to fetch error:", err);
    ramProducts = defaultRAMs.map(ram => ({
      name: ram.name,
      price: ram.price,
      type: ram.type,
      speed: ram.speed,
      size: ram.size,
      sticks: ram.sticks ||2,
      image: "parts/Images/ram.png"
    }));
  }
  

  ramProducts = ramProducts.map(p => ({
    ...p,
    image: "parts/Images/ram.png"
  }));

  const ramSearchInput = document.getElementById("searchInput");
  const ramPriceSlider = document.getElementById("priceRange");
  const ramPriceLabel = document.getElementById("priceLabel");
  const speedRange = document.getElementById("speedRange");
const speedLabel = document.getElementById("speedLabel");

const capacityRange = document.getElementById("totalCapacity");
const capacityLabel = document.getElementById("capacityLabel");

  function renderProducts(list) {
    ramProductList.innerHTML = "";

    if (list.length === 0) {
      ramProductList.innerHTML = "<p class='no-products-message'>No matching products.</p>";
      return;
    }

    list.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="product-image" onerror="this.src='https://placehold.co/150x150?text=No+Image'" />
        <h3 class="product-title">${p.name}</h3>
        <p class="product-price">₱${parseFloat(p.price).toFixed(2)}</p>
        <p class="product-detail">Stock: ${p.stock}</p>
        <p class="product-detail1">Type: ${p.type}</p>
        <p class="product-detail">Speed: ${p.speed}</p>
        <p class="product-detail">Size: ${p.size}GB (${p.sticks}x sticks)</p>
        <button class="add-to-build-button">Add to Build</button>
      `;
      ramProductList.appendChild(card);
    });
    setupAddToBuildButtons();
  }
  function generateRAMTypeFilters(products) {
    const ramTypeContainer = document.getElementById("ramType");
    if (!ramTypeContainer) return;

    const uniqueTypes = [...new Set(products.map(p => p.type))];
    ramTypeContainer.innerHTML = "";

    uniqueTypes.forEach(type => {
      const id = `ram-type-${type}`;
      const label = document.createElement("label");
      label.innerHTML = `
        <input type="checkbox" id="${id}" value="${type}" checked />
        ${type}
      `;
      ramTypeContainer.appendChild(label);
    });

    ramTypeContainer.querySelectorAll("input[type='checkbox']").forEach(cb => {
      cb.addEventListener("change", applyFilters);
    });
}

function applyFilters() {
  const maxPrice = parseFloat(ramPriceSlider.value);
  const maxSpeed = parseInt(speedRange.value);
  const maxCapacity = parseInt(capacityRange.value);
  const searchTerm = ramSearchInput.value.toLowerCase();
  const selectedMobo = window.windowbuild.mobo?.memory || null;
  const compatibility = document.getElementById('compatibility').checked;
  const selectedTypes = Array.from(
    document.querySelectorAll("#ramType input[type='checkbox']:checked")
  ).map(cb => cb.value);

  const filtered = ramProducts.filter(p => {
    const pSpeed = parseInt(p.speed); // Extract MHz number
    const pSize = p.size; // capacity in GB (number)

    return (
      parseFloat(p.price) <= maxPrice &&
      p.name.toLowerCase().includes(searchTerm) &&
      (!compatibility || !selectedMobo || selectedMobo === p.type) &&
      selectedTypes.includes(p.type) &&
      pSpeed <= maxSpeed &&
      pSize <= maxCapacity
    );
  });

  renderProducts(filtered);
}

 
function setupFilterEvents() {
  ramPriceSlider.addEventListener("input", () => {
    ramPriceLabel.textContent = `₱${parseFloat(ramPriceSlider.value).toFixed(2)}`;
    applyFilters();
  });

  ramSearchInput.addEventListener("input", applyFilters);
  document.getElementById('compatibility').addEventListener('change', applyFilters);

  speedRange.addEventListener("input", () => {
    speedLabel.textContent = `${speedRange.value}`;
    applyFilters();
  });

  capacityRange.addEventListener("input", () => {
    capacityLabel.textContent = `${capacityRange.value}`;
    applyFilters();
  });
}
function setSliderRanges() {
  const maxPrice = Math.max(...ramProducts.map(p => parseFloat(p.price)));
  const maxSpeed = Math.max(...ramProducts.map(p => parseInt(p.speed)));
  const maxCapacity = Math.max(...ramProducts.map(p => p.size));

  ramPriceSlider.max = maxPrice;
  ramPriceSlider.value = maxPrice;
  ramPriceLabel.textContent = `${maxPrice.toFixed(2)}`;


  speedRange.max = maxSpeed;
  speedRange.value = maxSpeed;
  speedLabel.textContent = `${maxSpeed}`;

  capacityRange.max = maxCapacity;
  capacityRange.value = maxCapacity;
  capacityLabel.textContent = `${maxCapacity}`;
}
  function setupAddToBuildButtons() {
    document.querySelectorAll(".add-to-build-button").forEach(button => {
      button.addEventListener("click", e => {
        const card = e.target.closest(".product-card");
        const formFactorText = card.querySelector(".product-detail1")?.textContent || "";
        const formFactor = formFactorText.replace("Type: ", "").trim();
        const product = {
          name: card.querySelector(".product-title").textContent,
          price: parseFloat(card.querySelector(".product-price").textContent.replace('₱', '')),
          image: card.querySelector(".product-image").src,
          stock: parseInt(card.querySelector(".product-detail").textContent.replace('Stock: ', '')),
          memorys: formFactor
        };

        setSelectedRAM(product);

        const modalContainer = document.getElementById("modalContainer");
        if (modalContainer) modalContainer.classList.add("hidden");
      });
    });
  }

  function setSelectedRAM(product) {
    window.selectedRAM = product;
    const slot = document.getElementById("selectedRamCard");
    slot.innerHTML = `
    <div class="product-card" style="
      margin-top: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      background: var(--tertiary-color);
      padding: 1rem;
      border-radius: 0.5rem;
      width: 300px;
      height: 100px;
      overflow: hidden;
    ">
      <img src="${product.image}" alt="${product.name}" style="
        width: 50px;
        height: 50px;
        object-fit: cover;
        flex-shrink: 0;
      ">
      <div style="min-width: 0; flex: 1; overflow: hidden;">
        <div style="
          font-weight: bold;
          color: var(--accent-white);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        ">${product.name}</div>
        <div style="color: #48bb78;">₱${product.price.toFixed(2)}</div>
        <div style="color: ${product.stock === 0 ? 'red' : 'var(--accent-white)'};">
          Stock: ${product.stock}
        </div>
      </div>
      <button onclick="removeRAM()" style="
        margin-left: auto;
        background: var(--accent-purple);
        color: var(--text-color);
        border: none;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        white-space: nowrap;
        flex-shrink: 0;
      ">✖</button>
    </div>
  `;
    const addButton = document.querySelector(".part-add-button[data-part='ram']");
    if (addButton) addButton.style.display = "none";

    const event1 = new CustomEvent("addPartToBuild", {
      detail: { part: 'ram' }
    });
    window.dispatchEvent(event1);

    const event = new CustomEvent("partAdded", {
      detail: {
        partType: 'ram',
        product: {
          name: product.name,
          price: product.price,
          tdp: 0,
          memory: product.memorys,
          stock: product.stock
        }
      }
    });
    window.dispatchEvent(event);
  }

  window.removeRAM = function () {
    if (window.selectedRAM) {
      window.dispatchEvent(new CustomEvent("partRemoved", {
        detail: { partType: "ram", product: window.selectedRAM }
      }));
      window.selectedRAM = null;
    }
    const slot = document.getElementById("selectedRamCard");
    slot.innerHTML = "";

    const addButton = document.querySelector(".part-add-button[data-part='ram']");
    if (addButton) addButton.style.display = "inline-block";
  };

  setSliderRanges();
  setupFilterEvents();
  generateRAMTypeFilters(ramProducts);
  applyFilters();
})();
