

// ── Shared stylesheet ────────────────────────────────────────────────
function loadMoboStylesheet() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "parts/popup-style.css";
  document.head.appendChild(link);
}
loadMoboStylesheet();

compatibility = document.getElementById('compatibility').checked;

(async function() {
  // ── Fetch motherboard data ONCE ────────────────────────────────────
  if (!window.moboProducts) {
    try {
      const res  = await fetch("http://localhost:3000/Motherboards");
      if (!res.ok) throw new Error(res.statusText);
      const json = await res.json();
      window.moboProducts = Array.isArray(json.motherboards)
        ? json.motherboards
        : [];
    } catch (err) {
      console.error("Failed to load motherboards:", err);
      document.getElementById("moboProductList").innerHTML =
        "<p class='no-products-message'>Error loading motherboards.</p>";
      return;
    }
  }

  // ── Element refs ──────────────────────────────────────────────────
  const products       = window.moboProducts;
  const listEl         = document.getElementById("moboProductList");
  const socketCont     = document.getElementById("socket");
  const chipsetCont    = document.getElementById("chipset");
  const formFactorCont = document.getElementById("formFactor");
  const ramTypeCont    = document.getElementById("ramType");
  const pcieCont       = document.getElementById("pcieVersion"); // ← PCIe filter container

  const priceSlider    = document.getElementById("priceRange");
  const memorySlider   = document.getElementById("maxMemoryRange");
  const sataSlider     = document.getElementById("sataRange");
  const slotsSlider    = document.getElementById("ramSlotRange");

  const priceLabel     = document.getElementById("priceLabel");
  const memoryLabel    = document.getElementById("maxMemoryLabel");
  const sataLabel      = document.getElementById("sataLabel");
  const slotsLabel     = document.getElementById("slotLabel");

  const searchInput    = document.getElementById("searchInput");
  const uniq = arr => [...new Set(arr)];

  function render(list) {
    listEl.innerHTML = "";
    if (!list.length) {
      listEl.innerHTML = "<p class='no-products-message'>No matching products.</p>";
      return;
    }
    list.forEach(p => {
      
      if (p.form_factor === "ATX"){
        p.image = "parts/Images/ATX.png";
      } else if (p.form_factor === "E-ATX") {
        p.image = "parts/Images/EATX.png";
      }else if (p.form_factor === "Micro-ATX") {
        p.image = "parts/Images/MicroATX.png";
      }
      const price = Number(p.price) || 0;
      const card = document.createElement("div");
      card.className = "product-card";
      card.dataset.socket_type       = p.socket_type;
      card.dataset.power_consumption = p.power_consumption;
      card.dataset.pcie_version      = p.pcie_version;
      card.dataset.stock = p.stock;
      card.dataset.Type = p.memory_type;
      card.dataset.form = p.form_factor;
      card.innerHTML = `
        <img src="${p.image||''}" alt="${p.name}" class="product-image"
             onerror="this.src='https://placehold.co/150x150?text=No+Image'" />
        <h3 class="product-title">${p.name}</h3>
        <p class="product-price">₱${price.toFixed(2)}</p>
        <p class="product-detail">Stock: ${p.stock}</p>
        <p class="product-detail">Socket: ${p.socket_type}</p>
        <p class="product-detail">Chipset: ${p.chipset}</p>
        <p class="product-detail">Form Factor: ${p.form_factor}</p>
        <p class="product-detail">RAM Type: ${p.memory_type}</p>
        <p class="product-detail">Interface: ${p.pcie_version}</p>    <!-- ← display PCIE -->
        <button class="add-to-build-button">Add to Build</button>
      `;
      listEl.appendChild(card);
    });
    bindAddButtons();
  }

  function generateFilters() {
    socketCont.innerHTML      = "";
    chipsetCont.innerHTML     = "";
    formFactorCont.innerHTML  = "";
    ramTypeCont.innerHTML     = "";
    pcieCont.innerHTML        = ""; 

    uniq(products.map(p => p.socket_type))
      .forEach(v => {
        const lbl = document.createElement("label");
        lbl.innerHTML = `<input type="checkbox" value="${v}" checked /> ${v}`;
        socketCont.appendChild(lbl);
      });
    uniq(products.map(p => p.chipset))
      .forEach(v => {
        const lbl = document.createElement("label");
        lbl.innerHTML = `<input type="checkbox" value="${v}" checked /> ${v}`;
        chipsetCont.appendChild(lbl);
      });
    uniq(products.map(p => p.form_factor))
      .forEach(v => {
        const lbl = document.createElement("label");
        lbl.innerHTML = `<input type="checkbox" value="${v}" checked /> ${v}`;
        formFactorCont.appendChild(lbl);
      });
    uniq(products.map(p => p.memory_type))
      .forEach(v => {
        const lbl = document.createElement("label");
        lbl.innerHTML = `<input type="checkbox" value="${v}" checked /> ${v}`;
        ramTypeCont.appendChild(lbl);
      });
    uniq(products.map(p => p.pcie_version))           
      .forEach(v => {
        const lbl = document.createElement("label");
        lbl.innerHTML = `<input type="checkbox" value="${v}" checked /> ${v}`;
        pcieCont.appendChild(lbl);
      });
  }

  function getChecked(container) {
    return Array.from(container.querySelectorAll("input:checked"))
      .map(cb => cb.value);
  }

  function applyFilters() {
    const selectedCase = window.windowbuild.case?.form || null;
    const selectedPSU = window.windowbuild.psu?.form || null;
    const selectedRAM = window.windowbuild.ram?.memory || null;
    const selectedGPU = window.windowbuild.gpu?.pcie_version || null;
    const selectedCPU = window.windowbuild.cpu?.socket || null;
    const selS = getChecked(socketCont);
    const selC = getChecked(chipsetCont);
    const selF = getChecked(formFactorCont);
    const selR = getChecked(ramTypeCont);
    const selP = getChecked(pcieCont);

    const maxP = +priceSlider.value;
    const maxM = +memorySlider.value;
    const maxS = +sataSlider.value;
    const maxL = +slotsSlider.value;
    const term = searchInput.value.toLowerCase();
    const compatibility = document.getElementById('compatibility').checked;

    const filtered = products.filter(p =>
      selS.includes(p.socket_type) &&
      selC.includes(p.chipset) &&
      selF.includes(p.form_factor) &&
      selR.includes(p.memory_type) &&
      selP.includes(p.pcie_version) &&
      (!compatibility || !selectedCase || selectedCase === p.form_factor) &&
      (!compatibility || !selectedRAM || selectedRAM === p.memory_type) &&
      (!compatibility || !selectedPSU || selectedPSU === p.form_factor) &&
      (!compatibility || !selectedGPU || selectedGPU === p.pcie_version) &&
      (!compatibility || !selectedCPU || selectedCPU === p.socket_type) && 
      (Number(p.price) || 0) <= maxP &&
      p.max_memory <= maxM &&
      p.sata_ports <= maxS &&
      p.memory_slots <= maxL &&
      p.name.toLowerCase().includes(term)
    );
    render(filtered);
  }

  function bindFilterEvents() {
    [socketCont, chipsetCont, formFactorCont, ramTypeCont, pcieCont] 
      .forEach(c => c.addEventListener("change", applyFilters));

    [[priceSlider, priceLabel],
     [memorySlider, memoryLabel],
     [sataSlider, sataLabel],
     [slotsSlider, slotsLabel]]
      .forEach(([s, lbl]) => {
        s.addEventListener("input", () => {
          lbl.textContent = s.value;
          applyFilters();
        });
      });
      
    searchInput.addEventListener("input", applyFilters);
    document.getElementById('compatibility').addEventListener('change', applyFilters);
    
  }

  function bindAddButtons() {
    document.querySelectorAll(".add-to-build-button").forEach(btn => {
      btn.addEventListener("click", e => {
        const card = e.target.closest(".product-card");
        const prod = {
          name        : card.querySelector(".product-title").textContent,
          price       : parseFloat(card.querySelector(".product-price").textContent.slice(1)),
          socket : card.dataset.socket_type,
          tdp         : parseInt(card.dataset.power_consumption) || 0,
          pcie_version: card.dataset.pcie_version,     
          image       : card.querySelector(".product-image").src,
          form: card.dataset.form,
          memory: card.dataset.Type,
          stock: parseInt(card.querySelector(".product-detail").textContent.replace('Stock: ', ''))
        };
        setSelectedMobo(prod);
        document.getElementById("modalContainer").classList.add("hidden");
      });
    });
  }

  function setSelectedMobo(product) {
    window.selectedMobo = product;
    const slot = document.getElementById("selectedMoboCard");
    slot.innerHTML = `
    <div class="product-card" style="
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      background: var(--tertiary-color);
      padding: 1rem;
      border-radius: 0.5rem;
      width: 190px;
      box-sizing: border-box;
      overflow: hidden;
      flex-wrap: nowrap;
    ">
      <img src="${product.image}" alt="${product.name}" style="
        width: 50px;
        height: 50px;
        object-fit: cover;
        flex-shrink: 0;
        margin-top: 2px;
      ">
      <div style="flex: 1; overflow: hidden;">
        <div style="
          font-weight: bold;
          color: var(--accent-white);
          word-wrap: break-word;
          overflow-wrap: break-word;
          white-space: normal;
        ">${product.name}</div>
        <div style="color: #48bb78;">₱${product.price.toFixed(2)}</div>
        <div style="color: #a0aec0; font-size: 0.85rem;">
          Stock: ${product.stock}
        </div>
      </div>
      <button onclick="removeMobo()" style="
        background: var(--accent-purple);
        color: var(--text-color);
        border: none;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        white-space: nowrap;
        flex-shrink: 0;
        align-self: start;
      ">✖</button>
    </div>
  `;
    document.querySelector(".part-add-button[data-part='mobo']").style.display = "none";

    window.dispatchEvent(new CustomEvent("partAdded", {
      detail: { partType: "mobo", product: product }
    }));
    window.dispatchEvent(new CustomEvent('removePartFromBuild', {
      detail: { part: 'mobo' }  
    }));
    const moboAddButton = document.querySelector(".part-add-button[data-part='mobo']");
    if (moboAddButton) moboAddButton.style.display = "none";

    const event = new CustomEvent("addPartToBuild", {
      detail: { part: 'mobo' }
    });
    window.dispatchEvent(event);
  }

  window.removeMobo = function() {
    if (window.selectedMobo) {
      window.dispatchEvent(new CustomEvent("partRemoved", {
        detail: { partType: "mobo", product: window.selectedMobo }
      }));
      window.selectedMobo = null;
    }
    window.dispatchEvent(new CustomEvent('removePartFromBuild', {
      detail: { part: 'mobo' }  
    }));
    document.getElementById("selectedMoboCard").innerHTML = "";
    document.querySelector(".part-add-button[data-part='mobo']").style.display = "inline-block";
  };

window.addEventListener("loadPart", async (e) => {
  const { partType, partName } = e.detail;
  if (partType !== "mobo") return;

  if (!window.moboProducts) {
    try {
      const res = await fetch("http://localhost:3000/Motherboards");
      if (!res.ok) throw new Error(res.statusText);
      const json = await res.json();
      window.moboProducts = Array.isArray(json.motherboards) ? json.motherboards : [];
    } catch (err) {
      console.error("Failed to load motherboards:", err);
      return;
    }
  }

  const product = window.moboProducts.find(p => p.name === partName);
  if (product) {
    const prod = {
      name: product.name,
      price: parseFloat(product.price),
      socket_type: product.socket_type,
      tdp: parseInt(product.power_consumption) || 0,
      pcie_version: product.pcie_version,
      image: product.image || 'https://placehold.co/150x150?text=No+Image'
    };
    setSelectedMobo(prod);
  } else {
    console.warn(`Motherboard "${partName}" not found in product list.`);
  }
});

  // ── Initialize UI ──────────────────────────────────────────────────────
  priceSlider.max  = Math.max(...products.map(p=>p.price));
  memorySlider.max = Math.max(...products.map(p=>p.max_memory));
  sataSlider.max   = Math.max(...products.map(p=>p.sata_ports));
  slotsSlider.max  = Math.max(...products.map(p=>p.memory_slots));
  priceSlider.value  = priceSlider.max;
  memorySlider.value = memorySlider.max;
  sataSlider.value   = sataSlider.max;
  slotsSlider.value  = slotsSlider.max;

  generateFilters();
  bindFilterEvents();
  applyFilters();
})();
