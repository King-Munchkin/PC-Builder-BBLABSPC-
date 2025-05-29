const storedAccountId = localStorage.getItem("account_id");
console.log("Stored account ID:", storedAccountId);

document.addEventListener("DOMContentLoaded", () => {
  const totalPriceStr = localStorage.getItem("totalPrice");
  console.log("Retrieved total price string:", totalPriceStr);

  const totalPrice = totalPriceStr ? parseFloat(totalPriceStr).toFixed(2) : "0.00";
  console.log("Parsed total price:", totalPrice);

  const subtotalElement = document.querySelector("#subtotal span:last-child");
  const totalElement = document.querySelector("#total span:last-child");

  if (subtotalElement && totalElement) {
    subtotalElement.textContent = `Php ${totalPrice}`;
    totalElement.textContent = `Php ${totalPrice}`;
  } else {
    console.warn("Subtotal or total element not found.");
  }

  const submitBtn = document.getElementById("checkout__submit");
  if (!submitBtn) {
    console.warn("Submit button not found.");
    return;
  }

  submitBtn.addEventListener("click", () => {
    console.log("Submit button clicked");

    const firstName = document.getElementById("first_name")?.value || "";
    const companyName = document.getElementById("company_name")?.value || "";
    const streetAddress = document.getElementById("street_address")?.value || "";
    const apartment = document.getElementById("apartment")?.value || "";
    const city = document.getElementById("city")?.value || "";
    const phoneNumber = document.getElementById("phone_number")?.value || "";
    const email = document.getElementById("email")?.value || "";
    const saveInfo = document.getElementById("save_info")?.checked || false;
    const paymentMethod = document.querySelector('input[name="payment_method"]:checked')?.value || "";
    const couponCode = document.getElementById("coupon_code")?.value || "";

    console.log("Collected form values:", {
      firstName, companyName, streetAddress, apartment, city,
      phoneNumber, email, saveInfo, paymentMethod, couponCode
    });

    if (!firstName || !streetAddress || !city || !phoneNumber || !email) {
      alert("Please fill in all required fields!");
      console.warn("Missing required fields");
      return;
    }

    const buildJSON = localStorage.getItem("build");
    let buildArray = [];

    try {
  const buildObj = buildJSON ? JSON.parse(buildJSON) : {};
  console.log("Parsed build object:", buildObj);

  for (const [partType, part] of Object.entries(buildObj)) {
    console.log(`Processing part: ${partType}`, part);

    // Skip null parts (like casefan: null)
    if (!part) {
      console.warn(`Skipped null part: ${partType}`);
      continue;
    }

    if (!part.name || part.price == null) {
      alert(`Missing name or price for ${partType}`);
      return;
    }

    buildArray.push({
      part_type: partType,
      name: part.name,
      price: parseFloat(part.price).toFixed(2),
      tdp: part.tdp ?? 0
    });
  }
} catch (parseErr) {
  console.error("Failed to parse build JSON:", parseErr);
  alert("Error reading selected PC parts.");
  return;
}

    console.log("Build array ready for submission:", buildArray);

    const formData = {
      first_name: firstName,
      company_name: companyName,
      street_address: streetAddress,
      apartment,
      city,
      phone_number: phoneNumber,
      email,
      save_info: saveInfo,
      subtotal: totalPrice,
      shipping_fee: "0.00",
      total: totalPrice,
      payment_method: paymentMethod,
      coupon_code: couponCode,
      account_id: storedAccountId,
      build: buildArray
    };

    console.log("Submitting form data:", formData);

    fetch("http://localhost:3000/checkout/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
    .then(res => {
      console.log("Received response:", res);
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log("Server returned data:", data);

      if (!data.order_id) {
        throw new Error("Missing order_id from server response.");
      }

      localStorage.setItem("order_id", data.order_id);
      console.log("Order ID saved:", data.order_id);

      window.location.href = "tracking.html";
    })
    .catch(err => {
      console.error("Submit error:", err);
      alert("Failed to place order.");
    });
  });
});