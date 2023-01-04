const toggleForm = document.querySelector('#toggleForm');
const closeBtn = document.querySelector('#closeCreate');
const addNoteBtn = document.querySelector('#addNote');
const clearBtn = document.querySelector('#clearBtn');

addNoteBtn.addEventListener('click', () => {
  toggleForm.classList.toggle('hidden');
});

closeBtn.addEventListener('click', () => {
  toggleForm.classList.toggle('hidden');
});

clearBtn.addEventListener('click', () => {
  document.getElementById('addForm').reset();
});

document.addEventListener('click', (event) => {
  // Check if the clicked element is a "read more" button
  if (event.target.classList && event.target.classList.contains('getclass')) {
    // Get the ID of the clicked button
    const buttonId = event.target.id;
    // Use the ID to select the corresponding paragraph element
    let expand = document.getElementById(buttonId);
    // Toggle the "truncate" class on the paragraph element
    expand.classList.toggle('truncate');
    expand.classList.toggle('mb-2');

    if (expand.classList.contains('truncate')) {
      // If the paragraph is truncated, change the button text to "Read more"
      event.target.textContent = 'Read more';
    } else {
      // If the paragraph is not truncated, change the button text to "View less"
      event.target.textContent = 'View less';
    }
  }
});
