function loadCaseStylesheet() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "parts/popup-style.css";
  document.head.appendChild(link);
}
loadCaseStylesheet();
build = window.build;

compatibility = document.getElementById('compatibility').checked;

(async function () {
  let raw;
  try {
    const res = await fetch("http://localhost:3000/ComputerCases");
    if (!res.ok) throw new Error(res.statusText);
    const json = await res.json();
    raw = Array.isArray(json.computer_cases) ? json.computer_cases : [];
  } catch (err) {
    console.warn("Failed to fetch cases, using fallback:", err);
    raw = [
      { name: "NZXT H510",          price: 79.99,  form_factor: "ATX",     color: "Black", case_id:0, weight: 6.5,  image: "" },
      { name: "Corsair 4000D",      price: 94.99,  form_factor: "ATX",     color: "White", case_id:0, weight: 7.8,  image: "" },
      { name: "Cooler Master NR200",price: 89.99,  form_factor: "Mini-ITX",color: "Black", case_id:0, weight: 4.5,  image: "" },
      { name: "Meshify 2",          price:139.99,  form_factor: "ATX",     color: "Black", case_id:0, weight: 8.6,  image: "" }
    ];
  }

  window.caseProducts = raw.map(c => ({
    caseName:      c.name,
    casePrice:     parseFloat(c.price),
    caseFormFactor:c.form_factor,
    caseColor:     c.color,
    caseWeight:    parseFloat(c.weight),
    caseImage:     c.image || "" ,   
    caseStock: c.stock
  }));

  // ── DOM refs & prevent double init ─────────────────────────────────
  const caseProducts       = window.caseProducts;
  const caseProductList    = document.getElementById("caseProductList");
  const caseFormFactorCont = document.getElementById("formFactor");
  const caseColorCont      = document.getElementById("color");
  const casePriceSlider    = document.getElementById("priceRange");
  const caseWeightSlider   = document.getElementById("weightRange");
  const casePriceLabel     = document.getElementById("priceLabel");
  const caseWeightLabel    = document.getElementById("weightLabel");
  const caseSearchInput    = document.getElementById("searchInput");
  casePriceSlider.min = 0;
  casePriceSlider.max = Math.max(...caseProducts.map(p => p.casePrice));
  casePriceSlider.value = casePriceSlider.max; // Start with max selected
  casePriceLabel.textContent = casePriceSlider.value;

  if (caseProductList.dataset.initialized === "true") return;
  caseProductList.dataset.initialized = "true";

  // ── Render ────────────────────────────────────────────────────────
  function renderCaseProducts(list) {
    caseProductList.innerHTML = "";
    if (!list.length) {
      caseProductList.innerHTML = "<p class='no-products-message'>No matching products.</p>";
      return;
    }
    list.forEach(p => {
      if (p.caseFormFactor === "ATX")      p.caseImage = "parts/Images/ATXcase.png";
      else if (p.caseFormFactor === "E-ATX")p.caseImage = "parts/Images/EATXcase.png";
      else if (p.caseFormFactor === "Micro-ATX") p.caseImage = "parts/Images/miniATX.png";

      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.caseImage}" alt="${p.caseName}" class="product-image"
             onerror="this.src='https://placehold.co/150x150?text=No+Image'" />
        <h3 class="product-title">${p.caseName}</h3>
        <p class="product-price">₱${p.casePrice.toFixed(2)}</p>
        <p class="product-detail">Stock: ${p.caseStock}</p>
        <p class="product-detail1">Form Factor: ${p.caseFormFactor}</p>
        <p class="product-detail">Color: ${p.caseColor}</p>
        <p class="product-detail">Weight: ${p.caseWeight} kg</p>
        <button class="add-to-build-button">Add to Build</button>
      `;
      caseProductList.appendChild(card);
    });
    setupAddToBuildButtons();
  }

  // ── Filters ───────────────────────────────────────────────────────
  function generateCaseFilters() {
    ;[...new Set(caseProducts.map(p => p.caseFormFactor))]
      .forEach(v => {
        const lbl = document.createElement("label");
        lbl.innerHTML = `<input type="checkbox" value="${v}" checked /> ${v}`;
        caseFormFactorCont.appendChild(lbl);
      });
    ;[...new Set(caseProducts.map(p => p.caseColor))]
      .forEach(v => {
        const lbl = document.createElement("label");
        lbl.innerHTML = `<input type="checkbox" value="${v}" checked /> ${v}`;
        caseColorCont.appendChild(lbl);
      });
  }
  function getChecked(container) {
    return Array.from(container.querySelectorAll("input:checked"))
                .map(cb => cb.value);
  }
  function applyCaseFilters() {
  const forms = getChecked(caseFormFactorCont);
  const cols  = getChecked(caseColorCont);
  const maxP  = +casePriceSlider.value;
  const maxW  = +caseWeightSlider.value;
  const term  = caseSearchInput.value.toLowerCase();
  const selectedmoboForm = window.windowbuild.mobo?.form || null;
  const selectedpsuForm = window.windowbuild.psu?.form || null;
  const compatibility = document.getElementById('compatibility').checked;

  if (compatibility && (selectedmoboForm !== null || selectedpsuForm !== null)) {
    if(selectedmoboForm !== null){
      renderCaseProducts(caseProducts.filter(p =>
      (!selectedmoboForm || p.caseFormFactor === selectedmoboForm) &&
      forms.includes(p.caseFormFactor) &&
      cols.includes(p.caseColor) &&
      p.casePrice <= maxP &&
      p.caseWeight <= maxW &&
      p.caseName.toLowerCase().includes(term)
    ));
    }else{
      renderCaseProducts(caseProducts.filter(p =>
      (!selectedpsuForm || p.caseFormFactor === selectedpsuForm) &&
      forms.includes(p.caseFormFactor) &&
      cols.includes(p.caseColor) &&
      p.casePrice <= maxP &&
      p.caseWeight <= maxW &&
      p.caseName.toLowerCase().includes(term)
    ));
    }
    
  } else {
    renderCaseProducts(caseProducts.filter(p =>
      forms.includes(p.caseFormFactor) &&
      cols.includes(p.caseColor) &&
      p.casePrice <= maxP &&
      p.caseWeight <= maxW &&
      p.caseName.toLowerCase().includes(term)
    ));
  }
}

  function setupCaseFilterEvents() {
  [caseFormFactorCont, caseColorCont].forEach(c =>
    c.addEventListener("change", applyCaseFilters)
  );
  [casePriceSlider, caseWeightSlider].forEach(s =>
    s.addEventListener("input", () => {
      if (s === casePriceSlider) casePriceLabel.textContent = s.value;
      else caseWeightLabel.textContent = s.value;
      applyCaseFilters();
    })
  );
  caseSearchInput.addEventListener("input", applyCaseFilters);

  document.getElementById('compatibility').addEventListener('change', applyCaseFilters);
}

  // ── Add to build ─────────────────────────────────────────────────
  function setupAddToBuildButtons() {
    document.querySelectorAll(".add-to-build-button").forEach(btn => {
      btn.addEventListener("click", e => {
        const card = e.target.closest(".product-card");
        const priceText = card.querySelector(".product-price").textContent;
        const price     = parseFloat(priceText.replace(/[^0-9.]+/g, "")) || 0;
        const formFactorText = card.querySelector(".product-detail1")?.textContent || "";
        const formFactor = formFactorText.replace("Form Factor: ", "").trim();

        const product = { 
          name: card.querySelector(".product-title").textContent,
          price: parseFloat(card.querySelector(".product-price").textContent.replace(/[^0-9.]+/g, "")) || 0,
          image: card.querySelector(".product-image").src,
          tdp: 0,
          form: formFactor,
          stock: parseInt(card.querySelector(".product-detail").textContent.replace('Stock: ', ''))
        };
        

        window.dispatchEvent(new CustomEvent("partAdded", {
          detail: { partType: "case", product }
        }));


        window.dispatchEvent(new CustomEvent("updateBuildModel", {
          detail: { partType: "case", product }
        }));
        window.dispatchEvent(new CustomEvent("renderCase3D", {
          detail: { model: product.name }
        }));
        setSelectedCase(product);
        document.getElementById("modalContainer").classList.add("hidden");
      });
    });
  }

  // ── UI update ────────────────────────────────────────────────────────
  function setSelectedCase(product) {
    const slot = document.getElementById("selectedCaseCard");
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
      <button onclick="removeCase()" style="
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
    document.querySelector(".part-add-button[data-part='case']").style.display = "none";


  const addButton = document.querySelector(".part-add-button[data-part='case']");
  if (addButton) addButton.style.display = "none";

  const event = new CustomEvent("addPartToBuild", {
    detail: { part: 'case' }
  });
  window.dispatchEvent(event);

  }

  window.removeCase = function () {

    const caseSlot = document.getElementById("selectedCaseCard");
    caseSlot.innerHTML = "";
  
    const addButton = document.querySelector(".part-add-button[data-part='case']");
    if (addButton) addButton.style.display = "inline-block";
  
    window.dispatchEvent(new CustomEvent('removePartFromBuild', {
      detail: { part: 'case' }  
    }));
  
    console.log("Case removed from build.");
    window.dispatchEvent(new CustomEvent("partRemoved", {
      detail:{ partType:"case", product:{ price:0,tdp:0 }}
    }));
  };

  // ── Sliders & init ────────────────────────────────────────────────
  casePriceSlider.max  = Math.max(...caseProducts.map(p=>p.casePrice));
  caseWeightSlider.max = Math.max(...caseProducts.map(p=>p.caseWeight));
  casePriceSlider.value  = casePriceSlider.max;
  caseWeightSlider.value = caseWeightSlider.max;
  casePriceLabel.textContent = `${parseFloat(casePriceSlider.value).toFixed(2)}`;

  caseWeightLabel.textContent = `${parseFloat(caseWeightSlider.value).toFixed(1)} `;

  generateCaseFilters();
  setupCaseFilterEvents();
  applyCaseFilters();
})();
