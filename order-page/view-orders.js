document.addEventListener("DOMContentLoaded", () => {
  fetchOrders();
});

async function fetchOrders() {
  try {
    const accountId = parseInt(localStorage.getItem("account_id")); // get account_id from localStorage

    const response = await fetch("http://localhost:3000/order/status");
    const data = await response.json();
    const orders = data.orders;

    // Filter orders by matching account_id
    const userOrders = orders.filter(order => order.account_id === accountId);

    const tabsContainer = document.querySelector(".order-tabs");
    const detailsContainer = document.querySelector(".order-details");

    tabsContainer.innerHTML = "";
    detailsContainer.innerHTML = "";

    if (userOrders.length === 0) {
      tabsContainer.innerHTML = "<p>No orders found.</p>";
      return;
    }

    const partImages = {
      casefan: "../3d-build-page/parts/Images/Fan.png",
      cooler: "../3d-build-page/parts/Images/CoolerFan.png",
      case: "../3d-build-page/parts/Images/ATXcase.png",
      psu: "../3d-build-page/parts/Images/psu.png",
      storage: "../3d-build-page/parts/Images/nvme.png",
      ram: "../3d-build-page/parts/Images/ram.png",
      mobo: "../3d-build-page/parts/Images/ATX.png",
      gpu: "../3d-build-page/parts/Images/PCIe4.png",
      cpu: "../3d-build-page/parts/Images/AMD.png"
    };

    userOrders.forEach((order, index) => {
      const orderId = `order${index + 1}`;
      const button = document.createElement("button");
      button.className = `order-tab ${index === 0 ? "active" : ""}`;
      button.dataset.id = orderId;
      button.textContent = `Order #${index + 1}`; // Auto-increment label
      tabsContainer.appendChild(button);

      const orderDiv = document.createElement("div");
      orderDiv.className = `order-content ${index === 0 ? "active" : ""}`;
      orderDiv.id = orderId;

      const orderDate = new Date(order.order_date);
      const formattedDate = orderDate.toDateString();

      // Format date to "Sun, 04th May"
      function formatDate(date) {
        const options = { weekday: 'short', day: '2-digit', month: 'short' };
        const formattedDate = new Date(date).toLocaleDateString('en-GB', options).replace(/,/g, '');
        return formattedDate;
      }


      const currentDate = new Date();

      const nextMonthDate = new Date(currentDate);
      nextMonthDate.setMonth(currentDate.getMonth() + 1);

      const validItems = Object.entries(order.items)
        .filter(([partType, item]) => item && item.price > 0);

      orderDiv.innerHTML = `
        <div class="order-summary">
          <h2>Order ID# ${order.order_id}</h2>
          <p><strong>Order Date:</strong> ${formattedDate}</p>
          <p><strong>Payment Method:</strong> ${order.payment_method}</p>

          <div class="status-bar">
            <div class="status-step active">
              <span class="label">Order Confirmed</span>
              <div class="status-dot green"></div>
              <span class="date">${formatDate(formattedDate)}</span>
            </div>
            <div class="status-step">
              <span class="label">Shipped</span>
              <div class="status-dot gray"></div>
              <span class="date">${formatDate(nextMonthDate)}</span>
            </div>
            <div class="status-step">
              <span class="label">Out For Delivery</span>
              <div class="status-dot gray"></div>
              <span class="date">${formatDate(nextMonthDate)}</span>
            </div>
            <div class="status-step">
              <span class="label">Delivered</span>
              <div class="status-dot gray"></div>
              <span class="date">${formatDate(nextMonthDate)}</span>
            </div>
          </div>
        </div>

        <div class="order-items">
          ${validItems.map(([partType, item]) => `
            <div class="order-item">
              <img src="${partImages[partType] || 'images/default.png'}" alt="${item.name}" style="width:60px;height:60px;margin-right:10px;" />
              <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-meta">Qty: 1</div>
                <div class="item-price">₱${item.price.toFixed(2)}</div>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="delivery-container">
          <p><strong>Delivery:</strong> ${order.street_address}, ${order.apartment}, ${order.city}</p>
        </div>
        <div class="total-container">
          <p><strong>Total:</strong> ₱${order.total.toFixed(2)}</p>
        </div>
      `;

      detailsContainer.appendChild(orderDiv);
    });

    // Tab switching
    document.querySelectorAll(".order-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".order-tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".order-content").forEach(c => c.classList.remove("active"));

        tab.classList.add("active");
        document.getElementById(tab.dataset.id).classList.add("active");
      });
    });

  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}