import { build } from './build-manager.js';
let selectedBuildId = null;

const storedAccountId = localStorage.getItem("account_id");
console.log("Account_Id ",storedAccountId);

const saveButton = document.querySelector('.save-build-button');

// For CREATE NEW BUILD
document.querySelector(".create-build-button").addEventListener("click", () => {
  console.log("Create New Build clicked!");

  for (const partType in build) {
    if (build.hasOwnProperty(partType)) {
      removePart(partType);
      build[partType] = null; 
    }
  }
});

function removePart(partType) {
  if(partType == "casefan"){
  partType = "Fans";
}
  const slot = document.getElementById(`selected${capitalize(partType)}Card`);
  if (slot) slot.innerHTML = "";

  

  window.dispatchEvent(new CustomEvent('removePartFromBuild', {
    detail: { part: partType }  
  }));

  window.dispatchEvent(new CustomEvent("partRemoved", {
    detail: { partType: partType }
  }));
  
  if(partType == "Fans"){
  partType = "fans";
}
  const addButton = document.querySelector(`.part-add-button[data-part='${partType}']`);
  if (addButton) addButton.style.display = "inline-block";
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}








// FOR SAVE/LOAD
if(storedAccountId == null){
  saveButton.addEventListener('click', () => {
        if (saveButton) {
      console.log("Save button clicked, NULL Account!");

    }
  })
}
else{


const partApiRoutes = {
  cpu: 'CPUs',
  gpu: 'GPUs',
  ram: 'RAMs',
  storage: 'Storages',
  psu: 'PSUs',
  cooler: 'Coolers',
  mobo: 'Motherboards',
  case: 'Cases',
  fans: 'Fans'
};

async function fetchSavedBuilds() {
  try {
    const response = await fetch('http://localhost:3000/builds');
    const data = await response.json();
    savedBuilds = data.builds || [];
    return savedBuilds;
  } catch (err) {
    console.error("Failed to fetch builds:", err);
    return [];
  }
}
let savedBuilds = [];

async function initializeBuilds() {
  savedBuilds = await fetchSavedBuilds();

  const filteredBuilds = savedBuilds.filter(build => build.account_id === parseInt(storedAccountId));

  savedBuilds = filteredBuilds.map(build => {
    const {
      id,
      name,
      account_id,
      cpu,
      gpu,
      ram,
      storage,
      posu,
      cooler,
      mobo,
      case: caseName,
      fan
    } = build;

    return {
      id,
      name,
      account_id,
      parts: {
        cpu,
        gpu,
        ram,
        storage,
        psu: posu,
        cooler,
        mobo,
        case: caseName,
        fans: fan
      }
    };
  });

  populateSavedBuilds();
}

window.addEventListener("DOMContentLoaded", initializeBuilds);

function populateSavedBuilds() {
  const dropdown = document.getElementById('saved-builds-dropdown');
  dropdown.innerHTML = '';

  savedBuilds.forEach(build => {
    const listItem = document.createElement('li');
    listItem.textContent = build.name;
    listItem.setAttribute('data-id', build.id);
    listItem.classList.add('build-dropdown-item');
    dropdown.appendChild(listItem);
  });
}

document.querySelector('.build-title-button').addEventListener('click', function () {
  const dropdown = document.getElementById('saved-builds-dropdown');
  dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('saved-builds-dropdown').addEventListener('click', async function (event) {
  const selectedItem = event.target;
  if (selectedItem && selectedItem.classList.contains('build-dropdown-item')) {
    const buildId = selectedItem.getAttribute('data-id');
    const selectedBuild = savedBuilds.find(build => build.id === parseInt(buildId));

    if (selectedBuild) {
      document.querySelector('.build-title-text').textContent = selectedBuild.name;
      await displayBuildParts(selectedBuild);
      document.getElementById('saved-builds-dropdown').style.display = 'none';
    }
  }
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function setSelectedPart(partType, product) {
  const slot = document.getElementById(`selected${capitalize(partType)}Card`);
  if (!slot) return;

  if(partType === "case"){
    product.image = "parts/Images/ATXcase.png"
  }
  if(partType === "cooler"){
    product.image = "parts/Images/CoolerFan.png"
  }
  if(partType === "cpu"){
    product.image = "parts/Images/AMD.png"
  }
  if(partType === "fans"){
    product.image = "parts/Images/Fan.png"

  }
  if(partType === "gpu"){
    product.image = "parts/Images/PCIe5.png"
  }
  if(partType === "mobo"){
    product.image = "parts/Images/ATX.png"
  }
  if(partType === "psu"){
    product.image = "parts/Images/psu.png"
  }
  if(partType === "ram"){
    product.image = "parts/Images/ram.png"
  }
  if(partType === "storage"){
    product.image = "parts/Images/nvme.png"
  }

  const price = typeof product.price === 'number' && !isNaN(product.price) ? product.price : 0;

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
        <div style="color: #48bb78;">₱${product.price}</div>
        <div style="color: ${product.stock === 0 ? 'red' : 'var(--accent-white)'};">
          Stock: ${product.stock === 0 ? '0' : product.stock}
        </div>
      </div>
      <button class="remove-button"data-part="${partType}" style="
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
  const addButton = document.querySelector(`.part-add-button[data-part='${partType}']`);
  if (addButton) addButton.style.display = "none";

  const removeButton = slot.querySelector(".remove-button");
  if (removeButton) {
    removeButton.addEventListener("click", () => removePart(partType));
  }

  if(partType === "Fans"){
    partType = "casefan";
  }
  window.dispatchEvent(new CustomEvent("partAdded", {
    detail: {
      partType: partType,
      product: {
        name: product.name,
        price: parseFloat(product.price) || 0,
        tdp: parseInt(product.tdp, 10) || 0,
        stock: parseInt(product.stock),
      }
    }
  }));
  if(partType == "case" || partType == "mobo" || partType == "gpu" || partType == "ram"|| partType == "cooler"){
    const event = new CustomEvent("addPartToBuild", {
      detail: { part: partType }
    });
    window.dispatchEvent(event);
  }
}

function removePart(partType) {
  
  const slot = document.getElementById(`selected${capitalize(partType)}Card`);
  if (slot) slot.innerHTML = "";

  const addButton = document.querySelector(`.part-add-button[data-part='${partType}']`);
  if (addButton) addButton.style.display = "inline-block";

  window.dispatchEvent(new CustomEvent('removePartFromBuild', {
    detail: { part: partType }  
  }));
  window.dispatchEvent(new CustomEvent("partRemoved", {
    detail: { partType: partType }
  }));
}

async function fetchPartDetails(partType, partName) {
  let url = "";

  if (partType === "cpu") url = "http://localhost:3000/CPUs";
  else if (partType === "gpu") url = "http://localhost:3000/GPUs";
  else if (partType === "ram") url = "http://localhost:3000/Rams";
  else if (partType === "storage") url = "http://localhost:3000/Storages";
  else if (partType === "psu") url = "http://localhost:3000/Powersupplies";
  else if (partType === "cooler") url = "http://localhost:3000/CpuCoolers";
  else if (partType === "mobo") url = "http://localhost:3000/Motherboards";
  else if (partType === "case") url = "http://localhost:3000/ComputerCases";
  else if (partType === "fans") url = "http://localhost:3000/CaseFans";
  else return null;

  try {
    const res = await fetch(url);
    const text = await res.text();
    const json = JSON.parse(text);

    const keyMap = {
      cpu: 'processors',
      gpu: 'gpus',
      ram: 'Ram',
      storage: 'storages',
      psu: 'power_supplies',
      cooler: 'cpu_coolers',
      mobo: 'motherboards',
      case: 'computer_cases',
      fans: 'case_fans'
    };

    const key = keyMap[partType];
    const parts = Array.isArray(json) ? json :
                  Array.isArray(json[key]) ? json[key] :
                  [];

    const found = parts.find(p => {
      const apiName = (p.name || '').trim().toLowerCase();
      const targetName = (partName || '').trim().toLowerCase();

     
      console.log(`API Name: "${apiName}" | Target Name: "${targetName}"`);

      return apiName === targetName || apiName.replace(/\s+/g, '') === targetName.replace(/\s+/g, '');
    });

    if (found) {
      
      let tdp = 0;
      let ptdp = 0;
      let stock = 0;

      switch (partType) {
        case 'cpu':
          stock = parseFloat(found.stock || 0);
          tdp = parseFloat(found.tdp || 0);
        case 'cooler':
          stock = parseFloat(found.stock || 0);
          tdp = parseFloat(found.tdp || 0);
          break;
        case 'gpu':
          stock = parseFloat(found.stock || 0);
          tdp = parseFloat(found.power_draw || 0);
          break;
        case 'mobo':
          stock = parseFloat(found.stock || 0);
          tdp = parseFloat(found.power_consumption || 0);
          break;
        case 'fans':
          stock = parseFloat(found.stock || 0);
          tdp = 5;
          break;
        case 'storage':
          stock = parseFloat(found.stock || 0);
        case 'ram':
          stock = parseFloat(found.stock || 0);
        case 'case':
          stock = parseFloat(found.stock || 0);
          tdp = 0;
          break;
        case 'psu':
          stock = parseFloat(found.stock || 0);
          ptdp = parseFloat(found.wattage || 0);
          break;
      }

      return {
        name: found.name || partName,
        price: parseFloat(found.price || 0).toFixed(2),
        tdp,
        ptdp,
        stock,
        image: found.image || "https://placehold.co/100x100"
      };
    } else {
      console.warn(`⚠️ No match found for "${partName}"`);
      return {
        name: partName,
        price: 0,
        tdp: 0,
        image: "https://placehold.co/100x100"
      };
    }
  } catch (err) {
    console.error(`Error fetching ${partType}s:`, err);
    return {
      name: partName,
      price: 0,
      tdp: 0,
      image: "https://placehold.co/100x100"
    };
  }
}


async function displayBuildParts(savedBuild) {
  const parts = savedBuild.parts;
  for (const [partType, partName] of Object.entries(parts)) {
    if (!partName) continue;

    const product = await fetchPartDetails(partType, partName);
    if (product) {
      setSelectedPart(partType, product);
    }
  }
}

if (saveButton) {
  saveButton.addEventListener('click', async () => {
    const buildTitle = prompt("Enter a name for your build:");
    if (!buildTitle || !buildTitle.trim()) return;

    const buildPayload = {
      build_name: buildTitle.trim(),
      cpu: build.cpu?.name || '',
      gpu: build.gpu?.name || '',
      ram: build.ram?.name || '',
      storage: build.storage?.name || '',
      powersupply: build.psu?.name || '',
      cpucooler: build.cooler?.name || '',
      motherboard: build.mobo?.name || '',
      case_name: build.case?.name || '',
      casefan: build.casefan?.name || '',
      account_id: storedAccountId || 0
    };

    try {
      const res = await fetch('http://localhost:3000/api/builds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error ${res.status}: ${errorText}`);
      }

      const result = await res.json();
      console.log("✅ Build saved:", result);

      alert("✅ Build saved successfully!");
      await initializeBuilds(); 
    } catch (err) {
      console.error("❌ Failed to save build:", err);
      alert("❌ Failed to save build. Check console for details.");
    }
  });
}
}