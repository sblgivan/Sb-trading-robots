document.addEventListener('DOMContentLoaded', () => {
  // Show/hide sidebar
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  sidebarToggle.addEventListener('click', () => {
    sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
  });

  // Dynamic greeting
  const greetingElement = document.getElementById('dynamic-greeting');
  const userName = localStorage.getItem('username') || 'Guest';
  const hours = new Date().getHours();
  let timeOfDay;

  if (hours < 12) {
    timeOfDay = 'Good morning';
  } else if (hours < 18) {
    timeOfDay = 'Good afternoon';
  } else {
    timeOfDay = 'Good evening';
  }

  greetingElement.textContent = `${timeOfDay}, ${userName}`;

  // Terms and Conditions Modal
  const loginForm = document.getElementById('login-form');
  const termsModal = document.getElementById('terms-modal');
  const continueBtn = document.getElementById('continue-btn');
  const acceptTerms = document.getElementById('accept-terms');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    termsModal.style.display = 'block';
  });

  acceptTerms.addEventListener('change', (e) => {
    continueBtn.disabled = !e.target.checked;
  });

  continueBtn.addEventListener('click', () => {
    const phoneNumber = document.getElementById('phone-number').value;
    if (phoneNumber === '0740035058') {
      window.location.href = 'admindata.html';
    } else {
      localStorage.setItem('username', phoneNumber); // Assuming phone number as username for now
      window.location.href = 'homepage.html';
    }
  });

  // Persist admin content (simulate with local storage)
  const uploadForm = document.getElementById('upload-form');
  const uploadedContent = document.getElementById('uploaded-content');

  if (uploadForm) {
    uploadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const imageFile = document.getElementById('image-upload').files[0];
      const description = document.getElementById('image-description').value;

      if (imageFile && description) {
        const contentList = JSON.parse(localStorage.getItem('uploadedContent')) || [];
        const newContent = {
          imageSrc: URL.createObjectURL(imageFile),
          description,
        };
        contentList.push(newContent);
        localStorage.setItem('uploadedContent', JSON.stringify(contentList));
        displayUploadedContent();
      }
    });
  }

  const displayUploadedContent = () => {
    const contentList = JSON.parse(localStorage.getItem('uploadedContent')) || [];
    uploadedContent.innerHTML = '';
    contentList.forEach(content => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<img src="${content.imageSrc}" alt="Uploaded Image" width="200"><p>${content.description}</p>`;
      uploadedContent.appendChild(listItem);
    });
  };

  displayUploadedContent();
});
    
