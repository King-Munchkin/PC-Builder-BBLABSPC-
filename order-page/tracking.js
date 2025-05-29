document.addEventListener("DOMContentLoaded", () => {
  const orderId = Number(localStorage.getItem("order_id"));
  console.log("[Tracking] Order ID from localStorage:", orderId);

  if (!orderId) {
    document.getElementById("order-id").textContent = "No order ID found";
    return;
  }

  document.getElementById("order-id").textContent = orderId;

  fetch("http://localhost:3000/order/status")
    .then(res => {
      console.log("[Tracking] Fetch response status:", res.status);
      if (!res.ok) throw new Error("Failed to fetch order data");
      return res.json();
    })
    .then(response => {
      console.log("[Tracking] Raw response data:", response);
      
      const orders = Array.isArray(response) ? response : response.orders;
      if (!Array.isArray(orders)) {
        console.error("[Tracking] Response format error: expected an array of orders");
        throw new Error("Invalid response format: expected array of orders");
      }

      console.log("[Tracking] Total orders received:", orders.length);

      orders.forEach((order, i) => {
          console.log(`[Tracking] Order[${i}] ID:`, order.order_id);
        });

      const order = orders.find(o => o.order_id == orderId);
      if (!order) {
        console.warn("[Tracking] Order ID not found in the list");
        document.getElementById("order-id").textContent = "Order not found";
        return;
      }

      console.log("[Tracking] Matching order found:", order);


 
      document.getElementById("order-date").textContent = order.order_date;
      const orderDate = new Date(order.order_date);

      // Format date to "Sun, 04th May"
      function formatDate(date) {
        const options = { weekday: 'short', day: '2-digit', month: 'short' };
        const formattedDate = new Date(date).toLocaleDateString('en-GB', options).replace(/,/g, '');
        return formattedDate;
      }


      const currentDate = new Date();

      const nextMonthDate = new Date(currentDate);
      nextMonthDate.setMonth(currentDate.getMonth() + 1);


      document.getElementById("order-confirmed-date").textContent = formatDate(currentDate);
      document.getElementById("shipped-date").textContent = formatDate(currentDate); 
      document.getElementById("out-for-delivery-date").textContent = formatDate(currentDate);
      document.getElementById("delivered-date").textContent = `Expected by, ${formatDate(nextMonthDate)}`;

      orderDate.setMonth(orderDate.getMonth()+1);
      const deliveryDate = orderDate.toISOString().split('T')[0];
      document.getElementById("delivery-date").textContent = ("  ", deliveryDate);

      const addressElement = document.querySelector("address");
      addressElement.innerHTML = `
        ${order.street_address}<br>
        ${order.apartment}, ${order.city}<br>
        Apartment/House Number: ${order.apartment}
      `;

      const paymentSection = document.querySelector(".left-col .section:nth-child(1) p");
      paymentSection.innerHTML = `${order.payment_method}`;

   
      function safeToFixed(value) {
        return value && !isNaN(value) ? value.toFixed(2) : "N/A";
      }


      document.getElementById("totallol").querySelectorAll("span")[1].textContent = `$${order.total.toFixed(2)}`;
      document.getElementById("subtotalh").querySelectorAll("span")[1].textContent = `$${order.subtotal.toFixed(2)}`;

      
      const productsContainer = document.querySelector(".products");
      productsContainer.innerHTML = "";

      const items = Object.values(order.items);

      Object.entries(order.items).forEach(([key, item]) => {
  if (!item || item.price === 0) {
    // Skip empty/null items or items with price 0
    return;
  }

  if (key === "case") {
    item.image = "../3d-build-page/parts/Images/ATXcase.png";
  } else if (key === "cooler") {
    item.image = "../3d-build-page/parts/Images/CoolerFan.png";
  } else if (key === "cpu") {
    item.image = "../3d-build-page/parts/Images/AMD.png";
  } else if (key === "casefan") {
    item.image = "../3d-build-page/parts/Images/Fan.png";
  } else if (key === "gpu") {
    item.image = "../3d-build-page/parts/Images/PCIe5.png";
  } else if (key === "mobo") {
    item.image = "../3d-build-page/parts/Images/ATX.png";
  } else if (key === "psu") {
    item.image = "../3d-build-page/parts/Images/psu.png";
  } else if (key === "ram") {
    item.image = "../3d-build-page/parts/Images/ram.png";
  } else if (key === "storage") {
    item.image = "../3d-build-page/parts/Images/nvme.png";
  }

  const product = document.createElement("div");
  product.className = "product";
  product.innerHTML = `
    <img src="${item.image}" alt="${item.name}" />
    <div class="info">
      <div class="name">${item.name}</div>
      <div class="details">${item.description || ''}</div>
    </div>
    <div class="price">
      <div>₱${item.price.toFixed(2)}</div>
      <div class="qty">Qty: ${item.quantity || 1}</div>
    </div>
  `;
  productsContainer.appendChild(product);
});

      console.log("[Tracking] Order data displayed successfully.");
    })
    .catch(err => {
      console.error("[Tracking] Error:", err);
    });
});
