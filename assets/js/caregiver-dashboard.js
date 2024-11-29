document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('You are not logged in!');
        window.location.href = 'login.html';
        return;
    }

    // API endpoints
    const statsUrl = 'http://localhost:3000/api/caregiver/dashboard/stats';
    const assignedPatientsUrl = 'http://localhost:3000/api/caregiver/patients/assigned';
    const scheduleAppointmentUrl = 'http://localhost:3000/api/caregiver/appointments/schedule';
    const getScheduleUrl = 'http://localhost:3000/api/caregiver/appointments/schedule/get';

    // Fetch and display dashboard stats
    async function loadDashboardStats() {
        try {
            const response = await fetch(statsUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ email: 'dr.smith@example.com', password: 'Care123!' }),
            });
            const data = await response.json();
            document.getElementById('totalPatients').textContent = data.totalAssignedPatients || 0;
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    }

    // Fetch and display assigned patients
    async function loadAssignedPatients() {
        try {
            const response = await fetch(assignedPatientsUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ email: 'dr.smith@example.com', password: 'Care123!' }),
            });
            const data = await response.json();
            const patientsList = document.getElementById('assignedPatients');
            const patientSelect = document.getElementById('patientSelect');
            patientsList.innerHTML = '';
            patientSelect.innerHTML = '<option value="">Select Patient</option>';

            data.assignedPatients.forEach((patient) => {
                patientsList.innerHTML += `<div>${patient.name} (${patient.email})</div>`;
                patientSelect.innerHTML += `<option value="${patient.id}">${patient.name}</option>`;
            });
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    }
  // Handle logout functionality

    // Schedule appointment
    document.getElementById('scheduleForm').addEventListener('submit', async function (e) {
        e.preventDefault();
        const patientId = document.getElementById('patientSelect').value;
        const appointmentDate = document.getElementById('appointmentDate').value;
        const notes = document.getElementById('notes').value;

        try {
            const logoutButton = document.getElementById('logoutButton');
            if (logoutButton) {
                logoutButton.addEventListener('click', function () {
                    localStorage.removeItem('authToken');
                    window.location.href = 'login.html'; // Redirect to login page
                });
            }
          
            const response = await fetch(scheduleAppointmentUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    email: 'dr.smith@example.com',
                    password: 'Care123!',
                    appointmentData: { patientId, appointmentDate, notes },
                }),
            });
            const data = await response.json();
            alert('Appointment scheduled successfully!');
            loadAssignedPatients(); // Refresh assigned patients
        } catch (error) {
            console.error('Error scheduling appointment:', error);
        }
    });

    // Fetch and display schedule
    document.getElementById('viewScheduleForm').addEventListener('submit', async function (e) {
        e.preventDefault();
        const date = document.getElementById('scheduleDate').value;

        try {
            const response = await fetch(getScheduleUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ email: 'dr.smith@example.com', password: 'Care123!', date }),
            });
            const data = await response.json();
            const scheduleList = document.getElementById('scheduleList');
            scheduleList.innerHTML = '';

            data.appointments.forEach((appointment) => {
                scheduleList.innerHTML += `<div>${appointment.patientName} - ${appointment.date}</div>`;
            });
        } catch (error) {
            console.error('Error fetching schedule:', error);
        }
    });

    // Initial load
    loadDashboardStats();
    loadAssignedPatients();
});
