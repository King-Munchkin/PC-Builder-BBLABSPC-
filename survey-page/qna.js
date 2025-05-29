const form = document.getElementById('pcForm');
const recommendationBox = document.getElementById("recommendationBox");
const backArrow = document.getElementById("backArrow");
const goBuild = document.getElementById("goBuild");

const builds = {
  "Gaming": { CPU: "Intel i5 / Ryzen 5", GPU: "RTX 3060 / RX 6700 XT", RAM: 16, Storage: "512GB SSD", Notes: "High refresh rate monitor recommended." },
  "Work": { CPU: "Intel i5 / Ryzen 5", GPU: "Integrated or low-end GPU", RAM: 8, Storage: "256GB SSD", Notes: "Reliable and quiet build for productivity." },
  "Personal": { CPU: "Intel i3 / Ryzen 3", GPU: "Integrated", RAM: 8, Storage: "256GB SSD", Notes: "Budget-friendly and efficient for daily tasks." },
  "Video Editing": { CPU: "Intel i7 / Ryzen 7", GPU: "RTX 4070 / RX 6800", RAM: 32, Storage: "1TB NVMe SSD", Notes: "High core count and fast storage are essential." },
  "Entertainment": { CPU: "Intel i5 / Ryzen 5", GPU: "GTX 1650 / RX 6500 XT", RAM: 16, Storage: "512GB SSD", Notes: "Good media playback and multitasking." }
};

const pixelElements = [];

// Create a larger number of pixel elements (50 pixels)
for (let i = 0; i < 50; i++) {
const pixel = document.createElement('div');
pixel.classList.add('pixel');

const size = 5 + Math.random() * 20; // random sizes from 5px to 25px
pixel.style.width = `${size}px`;
pixel.style.height = `${size}px`;

// Randomize blur effect (applies only to a fraction of pixels)
if (Math.random() < 0.2) {
pixel.style.filter = 'blur(3px)';
}

pixel.style.left = `${Math.random() * window.innerWidth}px`;
pixel.style.top = `${Math.random() * window.innerHeight}px`;

// Randomize flicker effect speed
pixel.style.animationDuration = `${Math.random() * 10 + 5}s`;
document.body.appendChild(pixel);
pixelElements.push(pixel);
}

document.addEventListener('mousemove', (e) => {
const { clientX, clientY } = e;

pixelElements.forEach((pixel, i) => {
const speed = 0.02 + i * 0.003; // Reduced speed of movement (parallax effect is weaker)
const offsetX = (clientX - window.innerWidth / 2) * speed;
const offsetY = (clientY - window.innerHeight / 2) * speed;

pixel.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const checked = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(cb => cb.value);
  if (checked.length === 0) return alert("Please select at least one usage type!");

  const combined = { CPU: new Set(), GPU: new Set(), RAM: 0, Storage: new Set(), Notes: new Set() };

  checked.forEach(type => {
    const b = builds[type];
    if (b) {
      b.CPU.split(" / ").forEach(cpu => combined.CPU.add(cpu));
      b.GPU.split(" / ").forEach(gpu => combined.GPU.add(gpu));
      combined.RAM = Math.max(combined.RAM, b.RAM);
      b.Storage.split(" / ").forEach(s => combined.Storage.add(s));
      combined.Notes.add(b.Notes);
    }
  });

  const html = `
    <h3>Recommended Build for: ${checked.join(" + ")}</h3>
    <p><strong>CPU:</strong> ${Array.from(combined.CPU).join(" / ")}</p>
    <p><strong>GPU:</strong> ${Array.from(combined.GPU).join(" / ")}</p>
    <p><strong>RAM:</strong> ${combined.RAM} GB</p>
    <p><strong>Storage:</strong> ${Array.from(combined.Storage).join(" / ")}</p>
    <p><strong>Notes:</strong> ${Array.from(combined.Notes).join(" ")}</p>
  `;

  recommendationBox.innerHTML = html;
  recommendationBox.appendChild(goBuild);
  form.style.display = 'none';
  recommendationBox.style.display = 'block';
  backArrow.style.display = 'block';
  goBuild.style.display = 'inline-block';
});

backArrow.addEventListener('click', () => {
  form.reset();
  form.style.display = 'block';
  recommendationBox.style.display = 'none';
  backArrow.style.display = 'none';
  goBuild.style.display = 'none';

  const goBuild = document.getElementById("goBuild");




});

goBuild.addEventListener('click', function() {
    window.open("../3d-build-page/build.html", "_blank");

});