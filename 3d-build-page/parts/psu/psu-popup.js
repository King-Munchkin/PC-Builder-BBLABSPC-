function loadPSUStylesheet() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "parts/popup-style.css";
  document.head.appendChild(link);
}
loadPSUStylesheet();

compatibility = document.getElementById('compatibility').checked;

(async function () {
  const psuProductList = document.getElementById("psuProductList");
  if (psuProductList?.dataset.initialized === "true") return;
  psuProductList.dataset.initialized = "true";

  const defaultPSUs = [
    {
      name: "Corsair RM850x",
      price: 129.99,
      form_factor: "ATX",
      efficiency: "80 Plus Gold",
      modularity: "Fully Modular",
      fanless: "No",
      wattage: 850
    },
    {
      name: "EVGA SuperNOVA 750 G5",
      price: 109.99,
      form_factor: "ATX",
      efficiency: "80 Plus Gold",
      modularity: "Fully Modular",
      fanless: "No",
      wattage: 750
    },
    {
      name: "Seasonic PRIME TX-1000",
      price: 239.99,
      form_factor: "ATX",
      efficiency: "80 Plus Titanium",
      modularity: "Fully Modular",
      fanless: "No",
      wattage: 1000
    },
    {
      name: "Cooler Master MWE Gold 650W",
      price: 79.99,
      form_factor: "ATX",
      efficiency: "80 Plus Gold",
      modularity: "Non Modular",
      fanless: "No",
      wattage: 650
    }
  ];

  let psuProducts = [];

  try {
    const response = await fetch("http://localhost:3000/Powersupplies");
    const data = await response.json();
    if (data.power_supplies && Array.isArray(data.power_supplies)) {
      psuProducts = data.power_supplies.map(p => ({
        ...p
      }));
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (err) {
    console.warn("Using fallback PSU data due to fetch error:", err);
    psuProducts = defaultPSUs;
  }

  psuProducts = psuProducts.map(p => {
    let img = "https://placehold.co/150x150";
    if (p.modularity === "Fully Modular") img = "parts/Images/psu.png";
    else if (p.modularity === "Semi Modular") img = "parts/Images/psu1.png";
    else if (p.modularity === "Non Modular") img = "parts/Images/psu2.png";
    return { ...p, image: img };
  });

  const psuFormFactorContainer = document.getElementById("formFactorFilters");
  const psuEfficiencyContainer = document.getElementById("efficiencyFilters");
  const psuModularityContainer = document.getElementById("modularityFilters");
  const psuFanlessContainer = document.getElementById("fanlessFilters");

  const psuWattageSlider = document.getElementById("wattageRange");
  const psuWattageLabel = document.getElementById("wattageLabel");

  const psuPriceSlider = document.getElementById("priceRange");
  const psuPriceLabel = document.getElementById("priceLabel");

  const psuSearchInput = document.getElementById("searchInput");

  function renderProducts(list) {
    psuProductList.innerHTML = "";

    if (list.length === 0) {
      psuProductList.innerHTML = "<p class='no-products-message'>No matching products.</p>";
      return;
    }

    list.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="product-image"
             onerror="this.src='https://placehold.co/150x150?text=No+Image'" />
        <h3 class="product-title">${p.name}</h3>
        <p class="product-price">₱${parseFloat(p.price).toFixed(2)}</p>
        <p class="product-detail">Stock: ${p.stock}</p>
        <p class="product-detail1">Form Factor: ${p.form_factor}</p>
        <p class="product-detail">Efficiency: ${p.efficiency}</p>
        <p class="product-detail">Modularity: ${p.modularity}</p>
        <p class="product-detail">Fanless: ${p.fanless}</p>
        <p class="product-detail2">Wattage: ${p.wattage}</p>
        <button class="add-to-build-button">Add to Build</button>
      `;
      psuProductList.appendChild(card);
    });
    bindAddButtons();
    setupAddToBuildButtons();
  }

  function generateFilters() {
    function addCheckboxes(container, values) {
      const unique = [...new Set(values)];
      container.innerHTML = "";
      unique.forEach(value => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="checkbox" value="${value}" checked /> ${value}`;
        container.appendChild(label);
      });
    }

    addCheckboxes(psuFormFactorContainer, psuProducts.map(p => p.form_factor));
    addCheckboxes(psuEfficiencyContainer, psuProducts.map(p => p.efficiency));
    addCheckboxes(psuModularityContainer, psuProducts.map(p => p.modularity));
    addCheckboxes(psuFanlessContainer, psuProducts.map(p => p.fanless));
  }

  function getSelectedValues(container) {
    return Array.from(container.querySelectorAll("input[type='checkbox']:checked")).map(cb => cb.value);
  }

  function applyFilters() {
    const selectedFormFactors = getSelectedValues(psuFormFactorContainer);
    const selectedEfficiencies = getSelectedValues(psuEfficiencyContainer);
    const selectedModularities = getSelectedValues(psuModularityContainer);
    const selectedFanless = getSelectedValues(psuFanlessContainer);
    const maxWattage = parseInt(psuWattageSlider.value);
    const maxPrice = parseFloat(psuPriceSlider.value);
    const searchTerm = psuSearchInput.value.toLowerCase();
    const compatibility = document.getElementById('compatibility').checked;
    const selectedmobo = window.windowbuild.mobo?.form || null;
    const selectedCase = window.windowbuild.case?.form || null;

    const filtered = psuProducts.filter(p => {
      return selectedFormFactors.includes(p.form_factor) &&
        (!compatibility || !selectedmobo || selectedmobo === p.form_factor) &&
        (!compatibility || !selectedCase || selectedCase === p.form_factor) &&
        selectedEfficiencies.includes(p.efficiency) &&
        selectedModularities.includes(p.modularity) &&
        selectedFanless.includes(p.fanless) &&
        parseInt(p.wattage) <= maxWattage &&
        parseFloat(p.price) <= maxPrice &&
        p.name.toLowerCase().includes(searchTerm);
    });

    renderProducts(filtered);
  }

  function setupFilterEvents() {
    [psuFormFactorContainer, psuEfficiencyContainer, psuModularityContainer, psuFanlessContainer].forEach(container => {
      container.addEventListener("change", applyFilters);
    });

    psuWattageSlider.addEventListener("input", () => {
      psuWattageLabel.textContent = `${psuWattageSlider.value}`;
      applyFilters();
    });

    psuPriceSlider.addEventListener("input", () => {
      psuPriceLabel.textContent = `${psuPriceSlider.value}`;
      applyFilters();
    });

    psuSearchInput.addEventListener("input", applyFilters);

    document.getElementById('compatibility').addEventListener('change', applyFilters);
  }

  function setupAddToBuildButtons() {
    const buttons = document.querySelectorAll(".add-to-build-button");
    buttons.forEach(button => {
      button.addEventListener("click", (e) => {
        const card = e.target.closest(".product-card");
        const formFactorText = card.querySelector(".product-detail1")?.textContent || "";
        const formFactor = formFactorText.replace("Form Factor: ", "").trim();
        const Watttext = card.querySelector(".product-detail2")?.textContent || "";
        const Watt = Watttext.replace("Wattage: ", "").trim();
        const selectedProduct = {
          name: card.querySelector(".product-title").textContent,
          price: parseFloat(card.querySelector(".product-price").textContent.replace('₱', '')),
          image: card.querySelector(".product-image").src,
          stock: parseInt(card.querySelector(".product-detail").textContent.replace('Stock: ', '')),
          lol: Watt,
          formse: formFactor
        };

        setSelectedPSU(selectedProduct);

        const modalContainer = document.getElementById("modalContainer");
        if (modalContainer) modalContainer.classList.add("hidden");
      });
    });
  }

  function setSelectedPSU(product) {
    window.selectedPSU = product;
    const slot = document.getElementById("selectedPsuCard");
    slot.innerHTML = `
    <div class="product-card" style="
      margin-top: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      background: var(--tertiary-color);
      padding: 1rem;
      border-radius: 0.5rem;
      max-width: 100%;
      overflow: visible;
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
          word-wrap: break-word;
          overflow-wrap: break-word;
        ">${product.name}</div>
        <div style="color: #48bb78;">₱${product.price.toFixed(2)}</div>
        <div style="color: ${product.stock === 0 ? 'red' : 'var(--accent-white)'};">
          Stock: ${product.stock === 0 ? '0' : product.stock}
        </div>
      </div>
      <button onclick="removePSU()" style="
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

    const addButton = document.querySelector(".part-add-button[data-part='psu']");
    if (addButton) addButton.style.display = "none";

    const event = new CustomEvent("partAdded", {
      detail: {
        partType: 'psu',
        product: {
          name: product.name,
          price: product.price,
          tdp: 0,
          ptdp: product.lol,
          form: product.formse,
          stock: product.stock,
        }
      }
    });
    window.dispatchEvent(event);
    
  }

  window.removePSU = function () {
    if (window.selectedPSU) {
      window.dispatchEvent(new CustomEvent("partRemoved", {
        detail: { partType: "psu", product: window.selectedPSU }
      }));
      window.selectedPSU = null;
    }
    const slot = document.getElementById("selectedPsuCard");
    slot.innerHTML = "";

    const addButton = document.querySelector(".part-add-button[data-part='psu']");
    if (addButton) addButton.style.display = "inline-block";
  };

  function setSliderRanges() {
    const maxWattage = Math.max(...psuProducts.map(p => parseInt(p.wattage)));
    psuWattageSlider.max = maxWattage;
    psuWattageSlider.value = maxWattage;
    psuWattageLabel.textContent = `${psuWattageSlider.value}`;

    const maxPrice = Math.max(...psuProducts.map(p => parseFloat(p.price)));
    psuPriceSlider.max = maxPrice;
    psuPriceSlider.value = maxPrice;
    psuPriceLabel.textContent = `${psuPriceSlider.value}`;
  }
  function bindAddButtons() {
    document.querySelectorAll(".add-to-build-button").forEach(btn =>
      btn.addEventListener("click", e => {
        const card = e.target.closest(".product-card");
        const product = {
          name:      card.querySelector(".product-title").textContent,
          price:     parseFloat(card.querySelector(".product-price").textContent.replace('$','')),
          image:     card.querySelector(".product-image").src,
        };

        setSelectedPSU(product);

        window.dispatchEvent(new CustomEvent("partAdded", {
          detail: { partType: "psu", product }
        }));

        document.getElementById("modalContainer").classList.add("hidden");
      })
    );
  }

  generateFilters();
  setSliderRanges();
  setupFilterEvents();
  applyFilters();
})();
