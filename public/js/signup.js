const signupFormHandler = async function(event) {
  event.preventDefault();

  const usernameEl = document.querySelector('#username-input-signup');
  const passwordEl = document.querySelector('#password-input-signup');

  const response = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  console.log ("*******************done with fetch from signup");
  if (response.ok) {
    console.log ("*********************got a good responsefrom signup");
    document.location.replace('/dashboard');
    console.log ("************************************replaced page with dashboard");
  } else {
    alert('Failed to sign up');
  }
};

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
