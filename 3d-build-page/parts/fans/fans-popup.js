function loadFansStylesheet() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "parts/popup-style.css"; 
  document.head.appendChild(link);
}

loadFansStylesheet();

(function () {
  if (!window.fansProducts) {
    window.fansProducts = [];
  }

  const fansProductList = document.getElementById("fansProductList");
  if (fansProductList?.dataset.initialized === "true") return;
  fansProductList.dataset.initialized = "true";

  const fansQuantitySlider = document.getElementById("quantityRange");
  const fansQuantityLabel = document.getElementById("quantityLabel");
  const fansPriceSlider = document.getElementById("priceRange");
  const fansPriceLabel = document.getElementById("priceLabel");
  const fansSearchInput = document.getElementById("searchInput");

  function fetchFansData() {
    fetch('http://localhost:3000/CaseFans') 
      .then(response => response.json())
      .then(data => {
        if (data.case_fans) {
          window.fansProducts = data.case_fans.map(fan => ({
            name: fan.name,
            price: parseFloat(fan.price),
            quantity: fan.quantity,
            rpm: fan.rpm,
            rgb: fan.rgb, 
            tdp: fan.tdp, 
            image: fan.rgb ? "parts/Images/RGBfan.png" : "parts/Images/Fan.png",
            stock: fan.stock 
          }));
          setFansSliderRanges();
          applyFansFilters(); 
        }
      })
      .catch(error => {
        console.error("Error fetching fans data:", error);
      });
  }

  fetchFansData(); 

  function renderFansProducts(list) {
    fansProductList.innerHTML = "";

    if (list.length === 0) {
      fansProductList.innerHTML = "<p class='no-products-message'>No matching products.</p>";
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
        <p class="product-detail">Quantity: ${p.quantity} fan(s)</p>
        <p class="product-detail">TDP: ${5}W</p> <!-- Displaying TDP -->
        <button class="add-to-build-button">Add to Build</button>
      `;
      fansProductList.appendChild(card);
    });

    setupFansAddToBuildButtons();
  }

  function applyFansFilters() {
    const minQuantity = parseInt(fansQuantitySlider.value);
    const maxPrice = parseFloat(fansPriceSlider.value);
    const searchTerm = fansSearchInput.value.toLowerCase();

    const filtered = window.fansProducts.filter(p =>
      p.quantity >= minQuantity &&
      p.price <= maxPrice &&
      p.name.toLowerCase().includes(searchTerm)
    );

    renderFansProducts(filtered);
  }

  function setupFansFilterEvents() {
    fansQuantitySlider.addEventListener("input", () => {
      fansQuantityLabel.textContent = fansQuantitySlider.value;
      applyFansFilters();
    });

    fansPriceSlider.addEventListener("input", () => {
      fansPriceLabel.textContent = `${fansPriceSlider.value}`;
      applyFansFilters();
    });

    fansSearchInput.addEventListener("input", applyFansFilters);
  }

  function setupFansAddToBuildButtons() {
    document.querySelectorAll(".add-to-build-button").forEach(btn => {
      btn.addEventListener("click", e => {
        const card = e.target.closest(".product-card");

        const priceText = card.querySelector(".product-price").textContent;
        const price = parseFloat(priceText.replace(/[^0-9.]+/g, "")) || 0;

        const tdpText = card.querySelector(".product-detail")?.textContent;
        let tdp = 0; 
        if (tdpText) {
          tdp = parseInt(tdpText.replace('TDP: ', '').replace('W', '').trim());

          if (isNaN(tdp)) {
            tdp = 5;
          }
        }
  

        const rpmText = card.querySelector(".product-detail")?.textContent;
        let rpm = undefined; 
        if (rpmText) {
          rpm = rpmText.match(/RPM:\s*(\d+)/)?.[1];
        }
  
        const product = {
          name: card.querySelector(".product-title").textContent,
          price,
          tdp,
          rpm, 
          image: card.querySelector(".product-image").src, 
          stock: parseInt(card.querySelector(".product-detail").textContent.replace('Stock: ', ''))
        };
 
        setSelectedFans(product);
  
  
        window.dispatchEvent(new CustomEvent("partAdded", {
          detail: { partType: "fans", product }
        }));
  
        window.dispatchEvent(new CustomEvent("add-to-build", {
          detail: { product }
        }));
  

        const modalContainer = document.getElementById("modalContainer");
        if (modalContainer) {
          modalContainer.classList.add("hidden");
        }
      });
    });
  }
  
  
  

  function setSelectedFans(product) {

    const slot = document.getElementById("selectedFansCard");
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
        <div style="min-width: 0;">
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
        <button onclick="removeFans()" style="
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
  

    const addButton = document.querySelector(".part-add-button[data-part='fans']");
    if (addButton) addButton.style.display = "none";

    window.dispatchEvent(new CustomEvent("partAdded", {
      detail: {
        partType: "casefan",
        product: {
          price: product.price,
          tdp: parseInt(product.tdp, 10), 
        }
      }
    }));
  }
  

  window.removeFans = function() {
    const slot = document.getElementById("selectedFansCard");
    slot.innerHTML = "";

    const addButton = document.querySelector(".part-add-button[data-part='fans']");
    if (addButton) addButton.style.display = "inline-block";

    window.dispatchEvent(new CustomEvent("partRemoved", {
      detail:{ partType:"casefan", product:{ price:0,tdp:0 }}
    }));
  }

  function setFansSliderRanges() {

    const maxPrice = Math.max(...window.fansProducts.map(p => p.price));
    const maxQuantity = Math.max(...window.fansProducts.map(p => p.quantity));
    const minQuantity = Math.min(...window.fansProducts.map(p => p.quantity)); 

    fansPriceSlider.max = maxPrice;
    fansQuantitySlider.max = maxQuantity;

    fansPriceSlider.value = maxPrice;
    fansQuantitySlider.value = minQuantity;


    fansPriceLabel.textContent = `${maxPrice.toFixed(2)}`;
    fansQuantityLabel.textContent = minQuantity;
  }

  setFansSliderRanges();
  setupFansFilterEvents();
  applyFansFilters();
})();
