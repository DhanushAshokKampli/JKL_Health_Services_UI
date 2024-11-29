document.addEventListener('DOMContentLoaded', async () => {
    const adminToken = localStorage.getItem('adminToken'); // Retrieve token from localStorage

    if (!adminToken) {
        alert('Please log in as admin.');
        window.location.href = 'index.html';
        return;
    }

    const headers = {
        Authorization: `Bearer ${adminToken}`,
    };

    // Fetch and populate dashboard stats
    async function fetchDashboardStats() {
        try {
            const response = await fetch('http://localhost:3000/api/admin/dashboard/statistics', {
                headers,
            });
            const data = await response.json();

            document.getElementById('totalPatients').textContent = data.totalPatients || 0;
            document.getElementById('totalCaregivers').textContent = data.totalCaregivers || 0;
            document.getElementById('activeAppointments').textContent = data.activeAppointments || 0;
            document.getElementById('todayAppointments').textContent = data.todayAppointments || 0;
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        }
    }

    // Fetch patients and caregivers for assignment
    async function populateAssignmentDropdowns() {
        try {
            const patientsResponse = await fetch('http://localhost:3000/api/admin/patients', { headers });
            const caregiversResponse = await fetch('http://localhost:3000/api/admin/caregivers', { headers });

            const patientsData = await patientsResponse.json();
            const caregiversData = await caregiversResponse.json();

            const patientSelect = document.getElementById('patientSelect');
            const caregiverSelect = document.getElementById('caregiverSelect');

            patientsData.patients.forEach(patient => {
                const option = document.createElement('option');
                option.value = patient.id;
                option.textContent = patient.name;
                patientSelect.appendChild(option);
            });

            caregiversData.caregivers.forEach(caregiver => {
                const option = document.createElement('option');
                option.value = caregiver.id;
                option.textContent = caregiver.name;
                caregiverSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error populating dropdowns:', error);
        }
    }

    // Assign caregiver to patient
    document.getElementById('assignForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const patientId = document.getElementById('patientSelect').value;
        const caregiverId = document.getElementById('caregiverSelect').value;

        try {
            const response = await fetch(`http://localhost:3000/api/admin/assignments`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ patientId, caregiverId }),
            });

            if (response.ok) {
                alert('Caregiver assigned successfully!');
            } else {
                alert('Failed to assign caregiver.');
            }
        } catch (error) {
            console.error('Error assigning caregiver:', error);
        }
    });

    // Fetch recent activities
    async function fetchRecentActivities() {
        try {
            const response = await fetch('http://localhost:3000/api/admin/dashboard/activities', { headers });
            const data = await response.json();

            const activityList = document.getElementById('activityList');
            activityList.innerHTML = '';

            data.activities.forEach(activity => {
                const li = document.createElement('li');
                li.textContent = `${activity.type} - ${activity.name || activity.patient} - ${new Date(
                    activity.timestamp
                ).toLocaleString()}`;
                activityList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    }

    await fetchDashboardStats();
    await populateAssignmentDropdowns();
    await fetchRecentActivities();
});
