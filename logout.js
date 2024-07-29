document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logout-button');

    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            // Remove the currentUser from localStorage to log out
            localStorage.removeItem('currentUser');
            
            // Optionally, you can clear other session-related data here if needed

            // Redirect to the login page
            window.location.href = 'index.html';
        });
    }
});
