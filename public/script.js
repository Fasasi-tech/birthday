const form = document.getElementById('birthdayForm');
const messageBox = document.getElementById('message');
const spinner = document.getElementById('spinner');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const dob = document.getElementById('dob').value;
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;

  // Start loading animation
  spinner.classList.remove('hidden');
  messageBox.classList.remove('show', 'success', 'error');
  submitBtn.disabled = true;

  try {
    const res = await fetch('http://localhost:3000/api/v1/birthday-reminder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dob, username, email })
    });

    const data = await res.json();

    if (res.ok) {
      showMessage('🎉 ' + data.message, 'success');
      form.reset();
    } else {
      showMessage('⚠️ ' + (data.message || 'Something went wrong!'), 'error');
    }
  } catch (err) {
    showMessage('❌ Could not connect to server', 'error');
  } finally {
    spinner.classList.add('hidden');
    submitBtn.disabled = false;
  }
});

function showMessage(text, type) {
  messageBox.textContent = text;
  messageBox.classList.add('show', type);

  // Hide message after 4 seconds
  setTimeout(() => {
    messageBox.classList.remove('show', type);
  }, 4000);
}
