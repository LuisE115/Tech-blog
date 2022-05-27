const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#emaillogin').value.trim();
  const password = document.querySelector('#passwordlogin').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#usernamesignup').value.trim();
  const email = document.querySelector('#emailsignup').value.trim();
  const password = document.querySelector('#passwordsignup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

document.querySelector('.loginform').addEventListener('submit', loginFormHandler);

document.querySelector('.signupform').addEventListener('submit', signupFormHandler);
