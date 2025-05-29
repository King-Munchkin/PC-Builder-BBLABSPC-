// cpu-popup.js

function loadCaseStylesheet() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "parts/popup-style.css";
  document.head.appendChild(link);
}
window.selectedCPU = null;

compatibility = document.getElementById('compatibility').checked;

loadCaseStylesheet();

(async function () {
  // ── Fetch CPU data ONCE ─────────────────────────────────────────────
  if (!window.dataset) {
    window.dataset = {}; 
  }

  if (!window.dataset.initialized) {
    try {
      const res = await fetch("http://localhost:3000/CPUs");
      if (!res.ok) throw new Error(res.statusText);
      const json = await res.json();
      window.cpuVariableProducts = Array.isArray(json.processors) ? json.processors : [];
      window.dataset.initialized = true;  
    } catch (err) {
      console.error("Failed to load CPUs from backend:", err);
      document.getElementById("cpuProductList").innerHTML = "<p class='no-products-message'>Error loading CPUs.</p>";
      return;
    }
  }

  const cpuVariableProducts = window.cpuVariableProducts;
  const cpuVariableProductList = document.getElementById("cpuProductList");
  const cpuVariableSocketContainer = document.getElementById("socketFilters");
  const cpuVariableMicroContainer = document.getElementById("microFilters");
  const cpuVariableGraphicsContainer = document.getElementById("graphicsFilters");

  const cpuVariablePriceSlider = document.getElementById("priceRange");
  const cpuVariableTdpSlider = document.getElementById("tdpRange");
  const cpuVariableCoreSlider = document.getElementById("coreRange");

  const cpuVariablePriceLabel = document.getElementById("priceLabel");
  const cpuVariableTdpLabel = document.getElementById("tdpLabel");
  const cpuVariableCoreLabel = document.getElementById("coreLabel");

  const cpuVariableSearchInput = document.getElementById("searchInput");

  cpuVariablePriceSlider.min = 0;
  cpuVariablePriceSlider.max = Math.max(...cpuVariableProducts.map(p => p.price));
  cpuVariablePriceSlider.value = cpuVariablePriceSlider.max;
  cpuVariablePriceLabel.textContent = `${cpuVariablePriceSlider.value}`;

  cpuVariableTdpSlider.min = 0;
cpuVariableTdpSlider.max = Math.max(...cpuVariableProducts.map(p => p.tdp));
cpuVariableTdpSlider.value = cpuVariableTdpSlider.max;
cpuVariableTdpLabel.textContent = `${cpuVariableTdpSlider.value}`;

cpuVariableCoreSlider.min = 0;
cpuVariableCoreSlider.max = Math.max(...cpuVariableProducts.map(p => p.cores));
cpuVariableCoreSlider.value = cpuVariableCoreSlider.max;
cpuVariableCoreLabel.textContent = `${cpuVariableCoreSlider.value}`;


  function renderCpuVariableProducts(list) {
    cpuVariableProductList.innerHTML = "";
    if (list.length === 0) {
      cpuVariableProductList.innerHTML = "<p class='no-products-message'>No matching products.</p>";
      return;
    }
    list.forEach(p => {
      if (p.socket === "AM4" || p.socket === "AM5") {
        p.image = "parts/Images/AMD.png";
      } else if (p.socket?.startsWith("LGA")) {
        p.image = "parts/Images/INTEL.png";
      }
      const price = Number(p.price) || 0;
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="product-image"
             onerror="this.src='https://placehold.co/150x150?text=No+Image'" />
        <h3 class="product-title">${p.name}</h3>
        <p class="product-price">₱${price.toFixed(2)}</p>
        <p class="product-detail">Stock: ${p.stock}</p>
        <p class="product-detail">Socket: ${p.socket}</p>
        <p class="product-detail">Cores: ${p.cores}</p>
        <p class="product-detail">Boost: ${p.boost}</p>
        <p class="product-detail">TDP: ${p.tdp}W</p>
        <button class="add-to-build-button">Add to Build</button>
      `;
      card.dataset.tdp     = p.tdp;      
      card.dataset.socket  = p.socket;   
      card.dataset.cores   = p.cores;
      card.dataset.boost   = p.boost;
      card.dataset.micro   = p.microarch;
      card.dataset.igpu    = p.igpu;
      card.dataset.stock = p.stock;
      cpuVariableProductList.appendChild(card);
    });
    
    setupAddToBuildButtons();
  }

  function generateCpuVariableFilters() {
    cpuVariableSocketContainer.innerHTML = "";
    cpuVariableMicroContainer.innerHTML = "";
    cpuVariableGraphicsContainer.innerHTML = "";

    const sockets = [...new Set(cpuVariableProducts.map(p => p.socket))];
    const micros = [...new Set(cpuVariableProducts.map(p => p.microarch))];
    const gpus = [...new Set(cpuVariableProducts.map(p => p.igpu))];

    sockets.forEach(s => {
      const lbl = document.createElement("label");
      lbl.innerHTML = `<input type="checkbox" value="${s}" checked /> ${s}`;
      cpuVariableSocketContainer.appendChild(lbl);
    });
    micros.forEach(m => {
      const lbl = document.createElement("label");
      lbl.innerHTML = `<input type="checkbox" value="${m}" checked /> ${m}`;
      cpuVariableMicroContainer.appendChild(lbl);
    });
    gpus.forEach(g => {
      const lbl = document.createElement("label");
      lbl.innerHTML = `<input type="checkbox" value="${g}" checked /> ${g}`;
      cpuVariableGraphicsContainer.appendChild(lbl);
    });
  }

  function getCpuVariableSelectedValues(container) {
    return Array.from(container.querySelectorAll("input:checked")).map(cb => cb.value);
  }

  function applyCpuVariableFilters() {
    const selS = getCpuVariableSelectedValues(cpuVariableSocketContainer);
    const selM = getCpuVariableSelectedValues(cpuVariableMicroContainer);
    const selG = getCpuVariableSelectedValues(cpuVariableGraphicsContainer);

    const maxP = +cpuVariablePriceSlider.value;
    const maxT = +cpuVariableTdpSlider.value;
    const maxC = +cpuVariableCoreSlider.value;
    const term = cpuVariableSearchInput.value.toLowerCase();
    const compatibility = document.getElementById('compatibility').checked;
     const selectedmobosocket = window.windowbuild.mobo?.socket || null;

    const filtered = cpuVariableProducts.filter(p =>
      selS.includes(p.socket) &&
      selM.includes(p.microarch) &&
      selG.includes(p.igpu) &&
      Number(p.price) <= maxP &&
      p.tdp <= maxT &&
      p.cores <= maxC &&
      p.name.toLowerCase().includes(term) &&
      (!compatibility || !window.windowbuild.mobo || p.socket === window.windowbuild.mobo.socket)
    );
    

    renderCpuVariableProducts(filtered);
  }

  function setupCpuVariableFilterEvents() {
    [cpuVariableSocketContainer, cpuVariableMicroContainer, cpuVariableGraphicsContainer]
      .forEach(c => c.addEventListener("change", applyCpuVariableFilters));

    [cpuVariablePriceSlider, cpuVariableTdpSlider, cpuVariableCoreSlider]
      .forEach(s => s.addEventListener("input", () => {
        if (s === cpuVariablePriceSlider) cpuVariablePriceLabel.textContent = s.value;
        if (s === cpuVariableTdpSlider) cpuVariableTdpLabel.textContent = s.value;
        if (s === cpuVariableCoreSlider) cpuVariableCoreLabel.textContent = s.value;
        applyCpuVariableFilters();
      }));
      document.getElementById("compatibility").addEventListener("change", applyCpuVariableFilters);
    cpuVariableSearchInput.addEventListener("input", applyCpuVariableFilters);
  }

  function setupAddToBuildButtons() {
    document.querySelectorAll(".add-to-build-button").forEach(btn => {
      btn.addEventListener("click", e => {
        const card = e.target.closest(".product-card");
        const selectedProduct = {
          name   : card.querySelector(".product-title").textContent,
          price  : parseFloat(card.querySelector(".product-price").textContent.replace('₱','')),
          image  : card.querySelector(".product-image").src,
  
          // 
          tdp    : parseInt(card.dataset.tdp, 10) || 0,
          socket : card.dataset.socket,
          cores  : parseInt(card.dataset.cores, 10) || 0,
          boost  : card.dataset.boost,
          micro  : card.dataset.micro,
          igpu   : card.dataset.igpu,
          stock: parseInt(card.querySelector(".product-detail").textContent.replace('Stock: ', ''))
        };
  
        setSelectedCPU(selectedProduct);
        window.dispatchEvent(new CustomEvent("partAdded", {
          detail: { partType: "cpu", product: selectedProduct }
        }));
        document.getElementById("modalContainer").classList.add("hidden");
      });
    });
  }


function setSelectedCPU(product) {
  window.selectedCPU = product;

  
  document.getElementById("selectedCpuCard").innerHTML =  `
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
        Stock: ${product.stock === 0 ? '0' : product.stock}
      </div>
    </div>
    <button onclick="removeCPU()" style="
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
  

  document.querySelector(".part-add-button[data-part='cpu']").style.display = "none";


  window.dispatchEvent(new CustomEvent("partAdded", {
    detail: {
      partType: "cpu",
      product: {
        price : product.price,
        tdp   : parseInt(product.tdp, 10), 
        socket: product.socket
      }
    }
  }));
  const cpuAddButton = document.querySelector(".part-add-button[data-part='cpu']");
    if (cpuAddButton) cpuAddButton.style.display = "none";
}

window.removeCPU = function() {
  if (!window.selectedCPU) return;

  window.dispatchEvent(new CustomEvent("partRemoved", {
    detail: {
      partType: "cpu",
      product: {
        price : window.selectedCPU.price,
        tdp   : parseInt(window.selectedCPU.tdp, 10),
        socket: window.selectedCPU.socket
      }
    }
  }));
  window.selectedCPU = null;

  document.getElementById("selectedCpuCard").innerHTML = "";
  document.querySelector(".part-add-button[data-part='cpu']").style.display = "inline-block";
};

  
  generateCpuVariableFilters();
  setupCpuVariableFilterEvents();
  applyCpuVariableFilters();
})();
