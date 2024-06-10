document.addEventListener('DOMContentLoaded', () => {
    const addItemInput = document.getElementById('addItemInput');
    const fruitRadio = document.getElementById('fruitRadio');
    const legumeRadio = document.getElementById('legumeRadio');
    const addSpecificBtn = document.getElementById('addSpecificBtn');
    const addGeneralBtn = document.getElementById('addGeneralBtn');
    const itemInput = document.getElementById('itemInput');
    const searchBtn = document.getElementById('searchBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const fruitsList = document.getElementById('fruitsList');
    const mixedList = document.getElementById('mixedList');
    const legumesList = document.getElementById('legumesList');

    addSpecificBtn.addEventListener('click', () => {
      const item = addItemInput.value.trim();
      if (item === '') {
        alert('Please enter an item.');
        return;
      }
      if (!fruitRadio.checked && !legumeRadio.checked) {
        alert('Please check Fruits or Legumes.');
        return;
      }
      if (fruitRadio.checked) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item fruit';
        listItem.textContent = `Fruits! - ${item}`;
        fruitsList.appendChild(listItem);
      } else if (legumeRadio.checked) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item legume';
        listItem.textContent = `Legumes! - ${item}`;
        legumesList.appendChild(listItem);
      }
      addItemInput.value = '';
    });

    addGeneralBtn.addEventListener('click', () => {
      const item = addItemInput.value.trim();
      if (item === '') {
        alert('Please enter an item.');
        return;
      }
      if (!fruitRadio.checked && !legumeRadio.checked) {
        alert('Please check Fruits or Legumes.');
        return;
      }
      const listItem = document.createElement('li');
      listItem.className = fruitRadio.checked ? 'list-group-item mixed' : 'list-group-item mixed legume';
      listItem.textContent = fruitRadio.checked ? `Fruits! - ${item}` : `Legumes! - ${item}`;
      mixedList.appendChild(listItem);
      addItemInput.value = '';
    });

    searchBtn.addEventListener('click', () => {
      const searchTerm = itemInput.value.toLowerCase();
      if (searchTerm === '') {
        alert('Please enter an item to search.');
        return;
      }
      highlightItems(searchTerm);
    });

    deleteBtn.addEventListener('click', () => {
      const itemToDelete = itemInput.value.toLowerCase();
      if (itemToDelete === '') {
        alert('Please enter an item to delete.');
        return;
      }
      deleteItem(itemToDelete);
    });

    mixedList.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('list-group-item')) {
        if (target.textContent.startsWith('Legumes! -')) {
          target.classList.remove('mixed');
          target.classList.add('legume');
          legumesList.appendChild(target);
        } else if (target.textContent.startsWith('Fruits! -')) {
          target.classList.remove('mixed');
          target.classList.add('fruit');
          fruitsList.appendChild(target);
        }
      }
    });

    function highlightItems(searchTerm) {
      const items = document.querySelectorAll('.list-group-item');
      items.forEach(item => {
        if (item.textContent.toLowerCase().includes(searchTerm)) {
          item.classList.add('highlighted');
        } else {
          item.classList.remove('highlighted');
        }
      });
    }

    function deleteItem(itemToDelete) {
      const items = document.querySelectorAll('.list-group-item');
      let deleted = false;
      items.forEach(item => {
        if (item.textContent.toLowerCase().includes(itemToDelete)) {
          item.parentElement.removeChild(item);
          deleted = true;
        }
      });
      if (!deleted) {
        alert('Item not found to delete.');
      }
    }
  });