document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://web-project-backend-6yfh.onrender.com/api/'; 

    const signupForm = document.querySelector('#signup-form');
    const signinForm = document.querySelector('#signin-form');
    const messageContainer = document.querySelector('#message-container');

    const showMessage = (message, type = 'error') => {
        if (messageContainer) {
            messageContainer.textContent = message;
            messageContainer.className = `message ${type}`;
            messageContainer.style.display = 'block';
        }
    };

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.querySelector('#full-name').value;
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;

            if (!name || !email || !password) {
                showMessage('Please fill in all fields.');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    showMessage('Sign-up successful! Redirecting to sign-in...', 'success');
                    setTimeout(() => {
                        window.location.href = 'signin.html';
                    }, 2000);
                } else {
                    showMessage(data.message || 'An error occurred during sign-up.');
                }
            } catch (error) {
                showMessage('Could not connect to the server. Please try again later.');
                console.error('Sign-up Error:', error);
            }
        });
    }

    if (signinForm) {
        signinForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;

            if (!email || !password) {
                showMessage('Please enter both email and password.');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user)); // Store user info

                    showMessage('Sign-in successful! Redirecting to the homepage...', 'success');

                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1500);
                } else {
                    showMessage(data.message || 'Invalid email or password.');
                }
            } catch (error) {
                showMessage('Could not connect to the server. Please try again later.');
                console.error('Sign-in Error:', error);
            }
        });
    }

    const logoutButton = document.querySelector('#logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href = 'signin.html';
        });
    }
});

function isAuthenticated() {
    return localStorage.getItem('authToken') !== null;
}
