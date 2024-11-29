document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "http://localhost:3000/api/admin/dashboard/statistics";

    // Fetch Dashboard Statistics
    fetch(API_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`
        }
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("statPatients").querySelector("p").innerText = data.totalPatients;
            document.getElementById("statCaregivers").querySelector("p").innerText = data.totalCaregivers;
        })
        .catch(error => console.error("Error fetching stats:", error));
});
  // Handle logout functionality


document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "http://localhost:3000/api/admin/dashboard/counts"; // Ensure this is correct
    const adminToken = localStorage.getItem("admin_token"); // Get admin token from local storage
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('authToken');
            window.location.href = 'login.html'; // Redirect to login page
        });
    }
    // Check if admin token exists
    if (!adminToken) {
        alert("Unauthorized access. Redirecting to login.");
        window.location.href = "/login.html";
        return;
    }

    // Fetch statistics from the server
    fetch(API_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            // Update statistics in the UI
            document.getElementById("statPatients").querySelector("p").innerText = data.totalPatients || 0;
            document.getElementById("statCaregivers").querySelector("p").innerText = data.totalCaregivers || 0;
            document.getElementById("statAssignedPatients").querySelector("p").innerText = data.totalAssignedPatients || 0;
            document.getElementById("statAppointments").querySelector("p").innerText = data.totalAppointments || 0;
        })
        .catch((error) => {
            console.error("Failed to fetch dashboard statistics:", error);
            alert("Failed to load dashboard statistics.");
        });

    // Logout functionality
    document.getElementById("logoutButton").addEventListener("click", () => {
        localStorage.removeItem("admin_token");
        window.location.href = "/login.html";
    });
});
