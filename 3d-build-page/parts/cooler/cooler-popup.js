// ── Shared stylesheet ────────────────────────────────────────────────
function loadCoolerStylesheet() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "parts/popup-style.css";
  document.head.appendChild(link);
}
loadCoolerStylesheet();

(async function () {
  // ── Fetch cooler data ONCE ──────────────────────────────────────────
  if (!window.coolerProducts) {
    try {
      const res  = await fetch("http://localhost:3000/CpuCoolers");
      if (!res.ok) throw new Error(res.statusText);
      const json = await res.json();
      // backend returns { cpu_coolers: [...] }
      window.coolerProducts = Array.isArray(json.cpu_coolers)
        ? json.cpu_coolers.map(c => {
            // parse rpm range into a max
            let maxRpm = 0;
            if (c.fan_rpm_range) {
              const parts = c.fan_rpm_range.split("-");
              maxRpm = parseInt(parts[1], 10) || parseInt(parts[0], 10) || 0;
            }
            // determine cooling type
            const isLiquid = /liquid/i.test(c.type);
            const isFanless = /fanless/i.test(c.type);
            // pick image
            let img = "parts/Images/CoolerNoLiquid.png";
            if (isFanless) img = "parts/Images/CoolerFanless.png";
            else if (isLiquid) img = "parts/Images/CoolerFan.png";
            return {
              name        : c.name,
              price       : parseFloat(c.price) || 0,
              tdp         : parseInt(c.tdp, 10) || 0,
              waterCooled : isLiquid,
              fanless     : isFanless,
              rpm         : maxRpm,
              image       : img,
              stock : c.stock
            };
          })
        : [];
    } catch (err) {
      console.error("Failed to load coolers:", err);
      document.getElementById("coolerProductList").innerHTML =
        "<p class='no-products-message'>Error loading coolers.</p>";
      return;
    }
  }

  // ── DOM refs & init guard ──────────────────────────────────────────
  const coolerProducts         = window.coolerProducts;
  const coolerProductList      = document.getElementById("coolerProductList");
  const coolerPriceSlider      = document.getElementById("priceRange");
  const coolerRpmSlider        = document.getElementById("rpmRange");
  const coolerWaterCooledCheckbox = document.getElementById("waterCooled");
  const coolerFanlessCheckbox  = document.getElementById("fanless");
  const coolerSearchInput      = document.getElementById("searchInput");
  const coolerPriceLabel       = document.getElementById("priceLabel");
  const coolerRpmLabel         = document.getElementById("rpmLabel");
  coolerPriceSlider.min = 0;
  coolerPriceSlider.max = Math.max(...coolerProducts.map(p => p.price));
  coolerPriceSlider.value = coolerPriceSlider.max;
  coolerPriceLabel.textContent = coolerPriceSlider.value;

  if (coolerProductList.dataset.initialized === "true") return;
  coolerProductList.dataset.initialized = "true";

  // ──  Render ─────────────────────────────────────────────────────────
  function renderCoolerProducts(list) {
    coolerProductList.innerHTML = "";
    if (list.length === 0) {
      coolerProductList.innerHTML = "<p class='no-products-message'>No matching products.</p>";
      return;
    }
    list.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="product-image"
             onerror="this.src='https://placehold.co/150x150?text=No+Image'" />
        <h3 class="product-title">${p.name}</h3>
        <p class="product-price">₱${p.price.toFixed(2)}</p>
        <p class="product-detail">Stock: ${p.stock}</p>
        <p class="product-detail">Water Cooled: ${p.waterCooled ? "Yes" : "No"}</p>
        <p class="product-detail">Fanless: ${p.fanless ? "Yes" : "No"}</p>
        <p class="product-detail">Max RPM: ${p.rpm}</p>
        <p class="product-detail2">TDP: ${p.tdp}W</p>
        <button class="add-to-build-button">Add to Build</button>
      `;
      coolerProductList.appendChild(card);
    });
    setupCoolerAddToBuildButtons();
  }

  // ── Filters ────────────────────────────────────────────────────────
  function applyCoolerFilters() {
    const maxPrice     = parseFloat(coolerPriceSlider.value);
    const maxRpm       = parseInt(coolerRpmSlider.value, 10);
    const wantWater    = coolerWaterCooledCheckbox.checked;
    const wantFanless  = coolerFanlessCheckbox.checked;
    const term         = coolerSearchInput.value.toLowerCase();

    const filtered = coolerProducts.filter(p => {
      return p.price       <= maxPrice
          && p.rpm         <= maxRpm
          && (!wantWater   || p.waterCooled)
          && (!wantFanless || p.fanless)
          && p.name.toLowerCase().includes(term);
    });

    renderCoolerProducts(filtered);
  }

  function setupCoolerFilterEvents() {
    [coolerPriceSlider, coolerRpmSlider].forEach(slider =>
      slider.addEventListener("input", () => {
        if (slider === coolerPriceSlider) coolerPriceLabel.textContent = slider.value;
        if (slider === coolerRpmSlider)   coolerRpmLabel.textContent   = slider.value;
        applyCoolerFilters();
      })
    );
    [coolerWaterCooledCheckbox, coolerFanlessCheckbox].forEach(cb =>
      cb.addEventListener("change", applyCoolerFilters)
    );
    coolerSearchInput.addEventListener("input", applyCoolerFilters);
  }

  // ── Add to build ───────────────────────────────────────────────────
  function setupCoolerAddToBuildButtons() {
    document.querySelectorAll(".add-to-build-button").forEach(button =>
      button.addEventListener("click", e => {
        const card = e.target.closest(".product-card");
        const selectedProduct = {
          name        : card.querySelector(".product-title").textContent,
          price       : parseFloat(card.querySelector(".product-price").textContent.replace('₱','')) || 0,
          tdp         : parseInt(card.querySelector(".product-detail2").textContent.replace(/\D/g,''), 10) || 0,
          image       : card.querySelector(".product-image").src,
          stock: parseInt(card.querySelector(".product-detail").textContent.replace('Stock: ', ''))
        };

        setSelectedCooler(selectedProduct);

        const modalContainer = document.getElementById("modalContainer");
        if (modalContainer) modalContainer.classList.add("hidden");
      })
    );
  }

  function setSelectedCooler(product) {
    const slot = document.getElementById("selectedCoolerCard");
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
          Stock: ${product.stock}
        </div>
      </div>
      <button onclick="removeCooler()" style="
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

    document.querySelector(".part-add-button[data-part='cooler']")
      .style.display = "none";

    // inform build-manager of both price & tdp
    window.dispatchEvent(new CustomEvent("partAdded", {
      detail: { partType: 'cooler', product }
    }));
    const event = new CustomEvent("addPartToBuild", {
      detail: { part: 'cooler' }
    });
    window.dispatchEvent(event);

  }

  window.removeCooler = function () {
    document.getElementById("selectedCoolerCard").innerHTML = "";
    document.querySelector(".part-add-button[data-part='cooler']")
      .style.display = "inline-block";

    window.dispatchEvent(new CustomEvent("partRemoved", {
      detail: { partType: 'cooler' }
    }));
    window.dispatchEvent(new CustomEvent('removePartFromBuild', {
      detail: { part: 'cooler' }  
    }));
  };

  setupCoolerFilterEvents();
  applyCoolerFilters();

})();
