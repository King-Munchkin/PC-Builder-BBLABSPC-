const modalContainer = document.getElementById('modalContainer');
const modalClose = document.getElementById('modalClose');
const modalContent = document.getElementById('modal-inner-content');



function openPartModal(partType) {

  fetch(`parts/${partType}/${partType}-popup.html`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${partType}-popup.html`);
      }
      return response.text();
    })
    .then(data => {
      console.log("Loaded popup HTML:", data);  
      modalContent.innerHTML = data;  
      modalContainer.classList.remove('hidden');  

      loadPopupLogic(partType);
    })
    .catch(error => {
      console.error("Error loading part popup:", error);
      modalContent.innerHTML = "<p>Error loading content.</p>";  
    });
}


function loadPopupLogic(partType) {
  const existingScript = document.getElementById('popup-logic');
  if (existingScript) existingScript.remove(); 

  const script = document.createElement('script');
  script.src = `parts/${partType}/${partType}-popup.js`;  
  script.id = 'popup-logic';
  script.defer = true;
  document.body.appendChild(script);
}

const partButtons = document.querySelectorAll('.part-add-button');
partButtons.forEach(button => {
  button.addEventListener('click', () => { 
    const partType = button.getAttribute('data-part');  
    openPartModal(partType);
  });
});

modalClose.addEventListener('click', () => {
  modalContainer.classList.add('hidden'); 
});

window.addEventListener('click', (e) => {
  if (e.target === modalContainer) {
    modalContainer.classList.add('hidden');  
  }
});
