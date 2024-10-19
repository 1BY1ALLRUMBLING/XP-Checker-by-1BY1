let userData = {};

// Load data from JSON file when the page loads
fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        data.forEach(user => {
            const key = user.username.trim().toLowerCase();
            userData[key] = user.xp;
        });
    })
    .catch(error => {
        console.error('Error loading JSON data:', error);
    });

function checkXP() {
    const usernameInput = document.getElementById('username').value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');

    // Remove any existing classes
    resultDiv.classList.remove('show', 'text-danger', 'text-success', 'text-warning');

    if (usernameInput === "") {
        resultDiv.innerHTML = "Please enter a username.";
        resultDiv.classList.add('show', 'text-warning'); // Optional: use a warning color
        return;
    }

    const xp = userData[usernameInput];

    if (xp) {
        resultDiv.innerHTML = `Username: <strong>${usernameInput}</strong><br>XP: <strong>${xp}</strong>`;
        resultDiv.classList.add('show', 'text-success'); // Green color for success
    } else {
        resultDiv.innerHTML = "Username not found.";
        resultDiv.classList.add('show', 'text-danger'); // Red color for error
    }
}
