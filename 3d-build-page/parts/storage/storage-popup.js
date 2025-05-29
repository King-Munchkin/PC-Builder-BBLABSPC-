function loadStorageStylesheet() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "parts/popup-style.css";
  document.head.appendChild(link);
}
loadStorageStylesheet();

window.selectedStorage = null;

(async function () {
  // ── Fetch storage data ONCE ────────────────────────────────────────
  if (!window.dataset) window.dataset = {};
  if (!window.dataset.storageInitialized) {
    try {
      const res = await fetch("http://localhost:3000/Storages");
      if (!res.ok) throw new Error(res.statusText);
      const json = await res.json();
      const raw = Array.isArray(json.storages) ? json.storages : [];
      window.storageProducts = raw.map(p => ({
        storage_id:   p.storage_id,
        name:         p.name,
        price:        parseFloat(p.price) || 0,
        rpm:          p.rpm,
        formFactor:   p.form_factor,
        interface:    p.interface,
        nvme:         p.nvme,
        capacity:     parseFloat(p.capacity) || 0,
        stock: p.stock,
        image:        p.nvme === "Yes" 
                        ? "parts/Images/nvme.png" 
                        : "parts/Images/sata.png"
      }));
      window.dataset.storageInitialized = true;
    } catch (err) {
      console.error("Failed to load Storages:", err);
      document.getElementById("storageProductList").innerHTML =
        "<p class='no-products-message'>Error loading storages.</p>";
      return;
    }
  }

  // ── Element refs ──────────────────────────────────────────────────
  const products       = window.storageProducts;
  const listEl         = document.getElementById("storageProductList");
  const rpmCont        = document.getElementById("rpmFilters");
  const formFactorCont = document.getElementById("formFactorFilters");
  const intfCont       = document.getElementById("interfaceFilters");
  const nvmeCont       = document.getElementById("nvmeFilters");

  const priceSlider    = document.getElementById("priceRange");
  const capSlider      = document.getElementById("capacityRange");

  const priceLabel     = document.getElementById("priceLabel");
  const capLabel       = document.getElementById("capacityLabel");

  const searchInput    = document.getElementById("searchInput");


  const uniq = arr => [...new Set(arr)];

  // ── Render ─────────────────────────────────────────────────────────
  function render(list) {
    listEl.innerHTML = "";
    if (!list.length) {
      listEl.innerHTML = "<p class='no-products-message'>No matching products.</p>";
      return;
    }
    list.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.dataset.capacity  = p.capacity;
      card.dataset.interface = p.interface;
      card.dataset.nvme      = p.nvme;
      card.dataset.rpm       = p.rpm;
      card.dataset.stock =p.stock;
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="product-image"
             onerror="this.src='https://placehold.co/150x150?text=No+Image'" />
        <h3 class="product-title">${p.name}</h3>
        
        <p class="product-price">₱${p.price.toFixed(2)}</p>
        <p class="product-detail">Stock: ${p.stock}</p>
        <p class="product-detail">Capacity: ${p.capacity} TB</p>
        <p class="product-detail">Interface: ${p.interface}</p>

        <p class="product-detail">NVMe: ${p.nvme}</p>
        <p class="product-detail">RPM: ${p.rpm}</p>
        <button class="add-to-build-button">Add to Build</button>
      `;
      listEl.appendChild(card);
    });
    bindAddButtons();
  }

  // ── Filters ────────────────────────────────────────────────────────
  function generateFilters() {
    rpmCont.innerHTML        = "";
    formFactorCont.innerHTML = "";
    intfCont.innerHTML       = "";
    nvmeCont.innerHTML       = "";

    uniq(products.map(p => p.rpm)).forEach(v => {
      const lbl = document.createElement("label");
      lbl.innerHTML = `<input type="checkbox" value="${v}" checked /> ${v}`;
      rpmCont.appendChild(lbl);
    });
    uniq(products.map(p => p.formFactor)).forEach(v => {
      const lbl = document.createElement("label");
      lbl.innerHTML = `<input type="checkbox" value="${v}" checked /> ${v}`;
      formFactorCont.appendChild(lbl);
    });
    uniq(products.map(p => p.interface)).forEach(v => {
      const lbl = document.createElement("label");
      lbl.innerHTML = `<input type="checkbox" value="${v}" checked /> ${v}`;
      intfCont.appendChild(lbl);
    });
    uniq(products.map(p => p.nvme)).forEach(v => {
      const lbl = document.createElement("label");
      lbl.innerHTML = `<input type="checkbox" value="${v}" checked /> ${v}`;
      nvmeCont.appendChild(lbl);
    });
  }

  function getChecked(container) {
    return Array.from(container.querySelectorAll("input:checked"))
                .map(cb => cb.value);
  }

  function applyFilters() {
    const selR = getChecked(rpmCont);
    const selF = getChecked(formFactorCont);
    const selI = getChecked(intfCont);
    const selN = getChecked(nvmeCont);

    const maxP = +priceSlider.value;
    const maxC = +capSlider.value;
    const term = searchInput.value.toLowerCase();

    const filtered = products.filter(p =>
      selR.includes(p.rpm) &&
      selF.includes(p.formFactor) &&
      selI.includes(p.interface) &&
      selN.includes(p.nvme) &&
      p.price   <= maxP &&
      p.capacity<= maxC &&
      p.name.toLowerCase().includes(term)
    );
    render(filtered);
  }

  function bindFilterEvents() {
    [rpmCont, formFactorCont, intfCont, nvmeCont]
      .forEach(c => c.addEventListener("change", applyFilters));

    [[priceSlider, priceLabel],
     [capSlider,   capLabel]]
      .forEach(([s,l]) => s.addEventListener("input", () => {
        l.textContent = s.value;
        applyFilters();
      }));

    searchInput.addEventListener("input", applyFilters);
  }

  // ── Add to build ────────────────────────────────────────────────────
  function bindAddButtons() {
    document.querySelectorAll(".add-to-build-button").forEach(btn =>
      btn.addEventListener("click", e => {
        const card = e.target.closest(".product-card");
        const product = {
          name:      card.querySelector(".product-title").textContent,
          price:     parseFloat(card.querySelector(".product-price").textContent.replace('₱','')),
          image:     card.querySelector(".product-image").src,
          capacity:  parseFloat(card.dataset.capacity),
          interface: card.dataset.interface,
          nvme:      card.dataset.nvme,
          tdp         : parseInt(card.dataset.power_consumption) || 0,
          rpm:       card.dataset.rpm,
          stock: card.dataset.stock 

        };

        setSelectedStorage(product);

        window.dispatchEvent(new CustomEvent("partAdded", {
          detail: { partType: "storage", product }
        }));

        document.getElementById("modalContainer").classList.add("hidden");
      })
    );
  }

  // ── Selected card UI + remove ──────────────────────────────────────
  function setSelectedStorage(p) {
    window.selectedStorage = p;
    document.getElementById("selectedStorageCard").innerHTML = `
      <div class="product-card" style="display:flex;align-items:center;gap:1rem;background:var(--tertiary-color);
                                       padding:1rem;border-radius:.5rem;">
        <img src="${p.image}" alt="${p.name}" style="width:50px;height:50px;object-fit:cover;" />
        <div style="min-width:0;">
          <div style="font-weight:bold;color:white;">${p.name}</div>
          <div style="color:#48bb78;">₱${p.price.toFixed(2)}</div>
          <div style="color: ${p.stock === 0 ? 'red' : 'var(--accent-white)'};">
            Stock: ${p.stock === 0 ? '0' : p.stock}
          </div>
        </div>
        <button onclick="removeStorage()" style="margin-left:auto;background:#e53e3e;color:white;
                border:none;padding:.25rem .5rem;border-radius:4px;">✖</button>
      </div>`;

    document.querySelector(".part-add-button[data-part='storage']").style.display = "none";
  }

  window.removeStorage = function() {
    if (window.selectedStorage) {
      window.dispatchEvent(new CustomEvent("partRemoved", {
        detail: { partType: "storage", product: window.selectedStorage }
      }));
      window.selectedStorage = null;
    }
    document.getElementById("selectedStorageCard").innerHTML = "";
    document.querySelector(".part-add-button[data-part='storage']").style.display = "inline-block";
  };

  // ── Initialize sliders & filters ────────────────────────────────────
  const prices    = products.map(p=>p.price);
  priceSlider.min = Math.floor(Math.min(...prices));
  priceSlider.max = Math.ceil(Math.max(...prices));
  priceSlider.value = priceSlider.max;
  priceLabel.textContent = priceSlider.value;

  const caps      = products.map(p=>p.capacity);
  capSlider.min  = Math.floor(Math.min(...caps));
  capSlider.max  = Math.ceil(Math.max(...caps));
  capSlider.value = capSlider.max;
  capLabel.textContent = capSlider.value;

  generateFilters();
  bindFilterEvents();
  applyFilters();

})();
