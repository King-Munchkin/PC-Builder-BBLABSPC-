function loadGPUStylesheet() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "parts/popup-style.css";
  document.head.appendChild(link);
}
loadGPUStylesheet();

compatibility = document.getElementById('compatibility').checked;

(async function () {
  const gpuProductList = document.getElementById("gpuProductList");
  if (gpuProductList?.dataset.initialized === "true") return;
  gpuProductList.dataset.initialized = "true";

  const gpuChipsetContainer = document.getElementById("chipsetFilters");
  const gpuMemoryTypeContainer = document.getElementById("memoryTypeFilters");
  const gpuInterfaceContainer = document.getElementById("interfaceFilters");
  const gpuMemorySizeContainer = document.getElementById("memorySizeFilters");

  const gpuPriceSlider = document.getElementById("priceRange");
  const gpuTdpSlider = document.getElementById("tdpRange");

  const gpuPriceLabel = document.getElementById("priceLabel");
  const gpuTdpLabel = document.getElementById("tdpLabel");

  const gpuSearchInput = document.getElementById("searchInput");


  let gpuProducts = [];



  async function fetchGPUProducts() {
    try {
      const res = await fetch("http://localhost:3000/GPUs");
      const data = await res.json();
  
      gpuProducts = (data.gpus || []).map(p => ({
        name: p.name,
        price: parseFloat(p.price),
        chipset: p.chipset || "Unknown",         
        memoryType: p.memory_type || "GDDR6",    
        interface: p.interface,
        memorySize: parseInt(p.memory_size) || 8, 
        tdp: parseInt(p.tdp || p.power_draw),
        stock: parseInt(p.stock),
        image: (function() {
          if (p.interface === "PCIe 3.0") return "parts/Images/PCIe3.png";
          if (p.interface === "PCIe 4.0") return "parts/Images/PCIe4.png";
          if (p.interface === "PCIe 5.0") return "parts/Images/PCIe5.png";
          return "https://placehold.co/150x150?text=No+Image";
        })()
        
      }));
          gpuPriceSlider.min = Math.min(...gpuProducts.map(p => Number(p.price)));
  gpuPriceSlider.max = Math.max(...gpuProducts.map(p => Number(p.price)));
  gpuPriceSlider.value = gpuPriceSlider.max; // Start with max selected
  gpuPriceLabel.textContent = gpuPriceSlider.value;
      generateFilters();
      setupFilterEvents();
      applyFilters();
    } catch (err) {
      console.error("Failed to fetch GPU data:", err);
    }
  }
  

  function renderProducts(list) {
    gpuProductList.innerHTML = "";

    if (list.length === 0) {
      gpuProductList.innerHTML = "<p class='no-products-message'>No matching products.</p>";
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
        <p class="product-detail">Chipset: ${p.chipset}</p>
        <p class="product-detail">Memory: ${p.memorySize} GB ${p.memoryType}</p>
        <p class="product-detail1">Interface: ${p.interface}</p>
        <p class="product-detail">TDP: ${p.tdp}W</p>
        <button class="add-to-build-button">Add to Build</button>
      `;
      gpuProductList.appendChild(card);
    });

    setupAddToBuildButtons();
  }

  function generateFilters() {
    const chipsets = [...new Set(gpuProducts.map(p => p.chipset))];
    const memoryTypes = [...new Set(gpuProducts.map(p => p.memoryType))];
    const interfaces = [...new Set(gpuProducts.map(p => p.interface))];
    const memorySizes = [...new Set(gpuProducts.map(p => p.memorySize))];

    chipsets.forEach(value => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" value="${value}" checked /> ${value}`;
      gpuChipsetContainer.appendChild(label);
    });

    memoryTypes.forEach(value => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" value="${value}" checked /> ${value}`;
      gpuMemoryTypeContainer.appendChild(label);
    });

    interfaces.forEach(value => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" value="${value}" checked /> ${value}`;
      gpuInterfaceContainer.appendChild(label);
    });

    memorySizes.forEach(value => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" value="${value}" checked /> ${value} GB`;
      gpuMemorySizeContainer.appendChild(label);
    });
  }

  function getSelectedValues(container) {
    return Array.from(container.querySelectorAll("input[type='checkbox']:checked")).map(cb => cb.value);
  }

  function applyFilters() {
    const selectedChipsets = getSelectedValues(gpuChipsetContainer);
    const selectedMemoryTypes = getSelectedValues(gpuMemoryTypeContainer);
    const selectedInterfaces = getSelectedValues(gpuInterfaceContainer);
    const selectedMemorySizes = getSelectedValues(gpuMemorySizeContainer).map(Number);
    const maxPrice = parseFloat(gpuPriceSlider.value);
    const maxTDP = parseInt(gpuTdpSlider.value);
    const searchTerm = gpuSearchInput.value.toLowerCase();
    const selectedmobo = window.windowbuild.mobo?.pcie_version || null;
    const compatibility = document.getElementById('compatibility').checked;

    const filtered = gpuProducts.filter(p => {
      return selectedChipsets.includes(p.chipset) &&
             selectedMemoryTypes.includes(p.memoryType) &&
             selectedInterfaces.includes(p.interface) &&
             selectedMemorySizes.includes(p.memorySize) &&
             (!compatibility || !selectedmobo || selectedmobo === p.interface) &&
             p.price <= maxPrice &&
             p.tdp <= maxTDP &&
             p.name.toLowerCase().includes(searchTerm);
    });

    renderProducts(filtered);
  }

  function setupFilterEvents() {
    [gpuChipsetContainer, gpuMemoryTypeContainer, gpuInterfaceContainer, gpuMemorySizeContainer].forEach(container => {
      container.addEventListener("change", applyFilters);
    });

    [gpuPriceSlider, gpuTdpSlider].forEach(slider => {
      slider.addEventListener("input", () => {
        if (slider === gpuPriceSlider) gpuPriceLabel.textContent = slider.value;
        if (slider === gpuTdpSlider) gpuTdpLabel.textContent = slider.value;
        applyFilters();
      });
    });
    document.getElementById('compatibility').addEventListener('change', applyFilters);

    gpuSearchInput.addEventListener("input", applyFilters);
  }

  function setupAddToBuildButtons() {
    document.querySelectorAll(".add-to-build-button").forEach(btn => {
      btn.addEventListener("click", e => {
        const card = e.target.closest(".product-card");
  
       
        const detailEls = card.querySelectorAll(".product-detail");
        const tdpText = detailEls[detailEls.length - 1].textContent; 
        console.log("Raw TDP Text (should be last detail):", tdpText);
  
        
        const tdp = parseInt(tdpText.replace(/\D/g, ''), 10) || 0;
        console.log("Parsed TDP:", tdp);
  
      
        const priceText = card.querySelector(".product-price").textContent;
        const price = parseFloat(priceText.replace('₱', '').replace(/,/g, ''));
        console.log("Parsed Price:", price);
        const formFactorText = card.querySelector(".product-detail1")?.textContent || "";
        const formFactor = formFactorText.replace("Interface: ", "").trim();
  
        const selectedProduct = {
          name:  card.querySelector(".product-title").textContent,
          price,
          image: card.querySelector(".product-image").src,
          tdp,
          pcie_version: formFactor,
          stock: parseInt(card.querySelector(".product-detail").textContent.replace('Stock: ', ''))
        };
        console.log("Selected Product:", selectedProduct);
  
        setSelectedGPU(selectedProduct);

        window.dispatchEvent(new CustomEvent("partAdded", {
          detail: { partType: "gpu", product: selectedProduct }
        }));
  
        document.getElementById("modalContainer").classList.add("hidden");
      });
    });
  }
  



  function setSelectedGPU(product) {
    const slot = document.getElementById("selectedGpuCard");
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
        Stock: ${product.stock ?? 'N/A'}
      </div>
    </div>
    <button onclick="removeGPU()" style="
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

    const addButton = document.querySelector(".part-add-button[data-part='gpu']");
    if (addButton) addButton.style.display = "none";

    window.dispatchEvent(new CustomEvent("addPartToBuild", {
      detail: { part: 'gpu' }
    }));
  }

  window.removeGPU = function () {
    const slot = document.getElementById("selectedGpuCard");
    slot.innerHTML = "";

    const addButton = document.querySelector(".part-add-button[data-part='gpu']");
    if (addButton) addButton.style.display = "inline-block";

    window.dispatchEvent(new CustomEvent('removePartFromBuild', {
      detail: { part: 'gpu' }
    }));

    console.log("gpu removed from build.");
  };

  
  await fetchGPUProducts();
})();
