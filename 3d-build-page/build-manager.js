const storedAccountId = localStorage.getItem("account_id");

export const build = {
  cpu:    null,
  mobo:   null,
  gpu:    null,
  ram:    null,
  cooler: null,
  storage:null,
  psu:    null,
  case:   null,
  casefan:null,
};

window.windowbuild = {
  cpu:    null,
  mobo:   null,
  gpu:    null,
  ram:    null,
  cooler: null,
  storage:null,
  psu:    null,
  case:   null,
  casefan:null,
};

window.selectedBuild = build; 


function updateBuildSummary() {
  windowbuild = build;
  if (!window.location.pathname.endsWith("build.html")) return;

  let totalTdp = 0;
  window.totalPrice = 0;

  Object.entries(build).forEach(([part, p]) => {
    if (p) {
      window.totalPrice += p.price;
      totalTdp += p.tdp;
    }
  });

  localStorage.setItem("totalPrice", window.totalPrice.toFixed(2)); 
  console.log("Total price set in build-manager.js:", window.totalPrice);
  build.casefan = build.fans;

  Object.entries(build).forEach(([part, p]) => {
    if (p) {
      console.log(`${part} TDP:`, p.tdp); 
    }
  });

  let compat = "Compatible";
  if (build.cpu && build.mobo) {
    compat = (build.cpu.socket === build.mobo.socket_type)
      ? "Compatible"
      : "Incompatible";
  }

  if (build.psu && build.psu.ptdp && totalTdp > build.psu.ptdp) {
    compat = "Incompatible (TDP exceeds PSU capacity)";
  }

  if (document.getElementById("caseCompatibilityCheck")?.checked) {
    if (build.mobo && build.case) {
      const requiredFormFactor = build.mobo.form_factor;

      if (build.case && build.case.form_factor !== requiredFormFactor) {
        compat = "Incompatible (Motherboard doesn't match case)";
      }

      if (build.psu && build.psu.form_factor !== requiredFormFactor) {
        compat = "Incompatible (PSU doesn't match case)";
      }
    }
  }

  document.querySelector(".build-cost-value").textContent      = `₱${window.totalPrice.toFixed(2)}`;
  document.querySelector(".power-usage-value").textContent     = `${totalTdp} W`;
  document.querySelector(".compatibility-status").textContent  = compat;

  console.log("Total Price:", window.totalPrice); 
  console.log("Total TDP:", totalTdp);  
}

window.addEventListener("partAdded", e => {
  console.log("Part added:", e.detail.partType, e.detail.product);
  build[e.detail.partType] = e.detail.product;
  console.log(build);
  
  window.selectedBuild = build;
  localStorage.setItem("build", JSON.stringify(window.selectedBuild));

  updateBuildSummary();
});

window.addEventListener("partRemoved", e => {
  console.log("Part removed:", e.detail.partType);
  build[e.detail.partType] = null;
  
  window.selectedBuild = build;
  localStorage.setItem("build", JSON.stringify(window.selectedBuild));

  updateBuildSummary();
});

updateBuildSummary();
