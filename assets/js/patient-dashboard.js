// Patient Dashboard JavaScript
const apiUrl = 'http://localhost:3000/api/'; // Replace with your actual API endpoint

document.addEventListener("DOMContentLoaded", () => {
    const updateForm = document.getElementById("updateProfileForm");
    const deleteButton = document.getElementById("deleteProfileButton");

    // Handle Profile Update
    updateForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const updates = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            phoneNumber: document.getElementById("phoneNumber").value,
            address: document.getElementById("address").value,
        };

        const response = await fetch("http://localhost:3000/api/patients/profile/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "patient@example.com",
                currentPassword: "Patient123!",
                updates,
            }),
        });

        const result = await response.json();
        alert(result.message || "Profile updated successfully!");
    });

    // Handle Profile Deletion
    deleteButton.addEventListener("click", async () => {
        const confirmDelete = confirm("Are you sure you want to delete your profile?");
        if (!confirmDelete) return;

        const response = await fetch("http://localhost:3000/api/patients/profile/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "patient@example.com",
                password: "Patient123!",
                confirmDelete: "DELETE",
            }),
        });

        const result = await response.json();
        alert(result.message || "Profile deleted successfully!");
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // Assuming that the JWT token is stored in localStorage
    const token = localStorage.getItem('authToken');

    // Fetch patient profile data on page load
    if (token) {
        fetch('http://localhost:3000/api/patients/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            if (response.ok) {
                // Populate the profile display
                document.getElementById('displayFirstName').textContent = data.firstName;
                document.getElementById('displayLastName').textContent = data.lastName;
                document.getElementById('displayPhoneNumber').textContent = data.phoneNumber;
                document.getElementById('displayEmail').textContent = data.email;
                document.getElementById('displayAddress').textContent = data.address;

                // Also populate the form fields for editing
                document.getElementById('firstName').value = data.firstName;
                document.getElementById('lastName').value = data.lastName;
                document.getElementById('phoneNumber').value = data.phoneNumber;
                document.getElementById('email').value = data.email;
                document.getElementById('address').value = data.address;
            } else {
                alert('Failed to load profile data.');
            }
        })
        .catch(error => {
            console.error('Error fetching profile data:', error);
            alert('An error occurred while fetching profile data.');
        });

        // Fetch appointments data
        fetch('http://localhost:3000/api/patients/appointments', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const appointmentsList = document.getElementById('appointmentsList');
                appointmentsList.innerHTML = ''; // Clear loading text

                data.forEach(appointment => {
                    const appointmentDiv = document.createElement('div');
                    appointmentDiv.classList.add('appointment-item');

                    // Create and append appointment details
                    const caregiverInfo = `
                        <p><strong>Caregiver:</strong> ${appointment.caregiver.firstName} ${appointment.caregiver.lastName}</p>
                        <p><strong>Caregiver Contact:</strong> ${appointment.caregiver.phoneNumber}</p>
                        <p><strong>Appointment Date:</strong> ${new Date(appointment.date).toLocaleString()}</p>
                    `;

                    appointmentDiv.innerHTML = caregiverInfo;
                    appointmentsList.appendChild(appointmentDiv);
                });
            } else {
                document.getElementById('appointmentsList').innerHTML = '<p>No appointments scheduled.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching appointments data:', error);
            alert('An error occurred while fetching appointments.');
        });
    } else {
        alert('Please log in to access your profile.');
    }

    // Handle logout functionality
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('authToken');
            window.location.href = 'login.html'; // Redirect to login page
        });
    }

    // Handle profile update form submission
    const updateProfileForm = document.getElementById('updateProfileForm');
    if (updateProfileForm) {
        updateProfileForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const updatedData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                phoneNumber: document.getElementById('phoneNumber').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value,
            };

            fetch('http://localhost:3000/api/patients/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            })
            .then(response => response.json())
            .then(data => {
                if (response.ok) {
                    alert('Profile updated successfully!');
                    location.reload(); // Reload the page to reflect the updated data
                } else {
                    alert('Failed to update profile.');
                }
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                alert('An error occurred while updating the profile.');
            });
        });
    }

    // Handle profile deletion
    const deleteProfileButton = document.getElementById('deleteProfileButton');
    if (deleteProfileButton) {
        deleteProfileButton.addEventListener('click', function () {
            if (confirm('Are you sure you want to delete your profile?')) {
                fetch('http://localhost:3000/api/patients/profile', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                .then(response => response.json())
                .then(data => {
                    if (response.ok) {
                        alert('Profile deleted successfully.');
                        localStorage.removeItem('authToken');
                        window.location.href = 'login.html'; // Redirect to login page
                    } else {
                        alert('Failed to delete profile.');
                    }
                })
                .catch(error => {
                    console.error('Error deleting profile:', error);
                    alert('An error occurred while deleting the profile.');
                });
            }
        });
    }
});
// Assuming you have an API endpoint to fetch patient appointments

// Fetch appointments and display them
function fetchAppointments() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const appointmentsList = document.getElementById('appointmentsList');
            appointmentsList.innerHTML = ''; // Clear existing appointments

            // Check if the patient has any scheduled appointments
            if (data && data.appointments && data.appointments.length > 0) {
                data.appointments.forEach(appointment => {
                    const appointmentItem = document.createElement('div');
                    appointmentItem.classList.add('appointment-item');
                    
                    // Populate appointment details
                    appointmentItem.innerHTML = `
                        <p><strong>Caregiver:</strong> ${appointment.caregiverName}</p>
                        <p><strong>Caregiver Contact:</strong> ${appointment.caregiverContact}</p>
                        <p><strong>Appointment Date:</strong> ${new Date(appointment.date).toLocaleString()}</p>
                    `;
                    
                    // Append the appointment item to the list
                    appointmentsList.appendChild(appointmentItem);
                });
            } else {
                appointmentsList.innerHTML = '<p>No scheduled appointments found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching appointments:', error);
            const appointmentsList = document.getElementById('appointmentsList');
            appointmentsList.innerHTML = '<p>Failed to load appointments. Please try again later.</p>';
        });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchAppointments);
