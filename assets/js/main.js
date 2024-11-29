
document.addEventListener('DOMContentLoaded', function () {
    // Event listener for login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    // Store the JWT token in localStorage for further use
                    localStorage.setItem('authToken', data.token);

                    alert('Login successful!');

                    // Redirect based on the user role
                    if (data.user.role === 'admin') {
                        window.location.href = 'admin-dashboard.html'; // Admin Dashboard
                    } else if (data.user.role === 'caregiver') {
                        window.location.href = 'caregiver-dashboard.html'; // Caregiver Dashboard
                    } else if (data.user.role === 'patient') {
                        window.location.href = 'patient-dashboard.html'; // Patient Dashboard
                    } else {
                        alert('Invalid user role. Please contact support.');
                    }
                } else {
                    alert(`Login failed: ${data.message || 'Invalid credentials either Email or Password !!! '}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during login. Please try again.');
            }
        });
    }

    // Event listener for registration form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const role = document.getElementById('role').value;
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phoneNumber = document.getElementById('phoneNumber').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                return;
            }

            const apiUrl =
                role === 'caregiver'
                    ? 'http://localhost:3000/api/caregivers/register'
                    : 'http://localhost:3000/api/patients/register';

            const requestBody = {
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
                ...(role === 'caregiver' && {
                    specialization: 'General Practice',
                    qualification: 'MBBS, MD',
                    experience: '10',
                    availability: {
                        monday: { start: '09:00', end: '17:00' },
                        tuesday: { start: '09:00', end: '17:00' },
                        wednesday: { start: '09:00', end: '17:00' },
                        thursday: { start: '09:00', end: '17:00' },
                        friday: { start: '09:00', end: '17:00' },
                    },
                    address: '456 Medical Center, London',
                    registrationNumber: 'GMC123456',
                    emergencyContact: {
                        name: 'Jane Smith',
                        relationship: 'Spouse',
                        phoneNumber: '+447987654322',
                    },
                }),
                ...(role === 'patient' && {
                    address: '123 Main St',
                    medical_record: 'Initial checkup',
                }),
            };

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Account created successfully!');
                    window.location.href = 'login.html';
                } else {
                    alert(`Registration failed: ${data.message || 'An error occurred'}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during registration. Please try again.');
            }
        });
    }
});
