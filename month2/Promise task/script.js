const loadBtn = document.getElementById("loadBtn");
const result = document.getElementById("result");

// Simulated API call using Promise
function fetchUser() {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            const success = true;

            if (success) {
                resolve({
                    id: 1,
                    name: "Surya",
                    email: "surya@example.com"
                });
            } else {
                reject("Failed to fetch user data");
            }

        }, 2000);

    });
}

loadBtn.addEventListener("click", () => {

    result.innerHTML = "<p>Loading...</p>";

    fetchUser()
        .then(user => {
            result.innerHTML = `
                <h3>User Details</h3>
                <p>ID: ${user.id}</p>
                <p>Name: ${user.name}</p>
                <p>Email: ${user.email}</p>
            `;
        })
        .catch(error => {
            result.innerHTML = `<p style="color:red">${error}</p>`;
        });

});