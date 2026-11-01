
const donors = JSON.parse(
    localStorage.getItem("donors") || "[]"
);

const requests = JSON.parse(
    localStorage.getItem("requests") || "[]"
);

const donorCount = document.getElementById("donorCount");
const requestCount = document.getElementById("requestCount");

if (donorCount) {
    donorCount.textContent = donors.length;
}

if (requestCount) {
    requestCount.textContent = requests.length;
}
const donorForm = document.getElementById("donorForm");

if (donorForm) {

    donorForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const donor = {
            name: document.getElementById("donorName").value,
            age: document.getElementById("donorAge").value,
            blood: document.getElementById("bloodGroup").value,
            mobile: document.getElementById("mobile").value,
            password: document.getElementById("donorPassword").value,
            city: document.getElementById("city").value
        };

        let donors = JSON.parse(
            localStorage.getItem("donors") || "[]"
        );

        donors.push(donor);

        localStorage.setItem("donors", JSON.stringify(donors));

        alert("Registration Successful!");

        donorForm.reset();
    });
}
// Login Functionality

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const mobile = document.getElementById("loginMobile").value;
        const password = document.getElementById("loginPassword").value;

        const donors = JSON.parse(
            localStorage.getItem("donors") || "[]"
        );

        const user = donors.find(function(donor) {
            return donor.mobile === mobile &&
                   donor.password === password;
        });

        if (user) {
            alert("Login Successful! Welcome " + user.name);
        } else {
            alert("Invalid Mobile Number or Password!");
        }

    });
}
// Search Donor Functionality

const searchForm = document.getElementById("searchForm");

if (searchForm) {

    searchForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const blood = document.getElementById("searchBlood").value;
        const city = document.getElementById("searchCity").value.trim().toLowerCase();

        const donors = JSON.parse(
            localStorage.getItem("donors") || "[]"
        );

        const results = donors.filter(function(donor) {
            return donor.blood === blood &&
                   donor.city.trim().toLowerCase() === city;
        });

        const resultBox = document.getElementById("searchResults");

        if (results.length === 0) {
            resultBox.innerHTML = "<p>No matching donors found.</p>";
            return;
        }

        resultBox.innerHTML = "<h2>Available Donors</h2>";

        results.forEach(function(donor) {
            resultBox.innerHTML += `
                <div class="donor-card">
                    <h3>${donor.name}</h3>
                    <p>Blood Group: ${donor.blood}</p>
                    <p>City: ${donor.city}</p>
                </div>
            `;
        });

    });
}
// Donor Profile Functionality

const profileForm = document.getElementById("profileForm");

if (profileForm) {

    profileForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const mobile = document.getElementById("profileMobile").value;

        const donors = JSON.parse(
            localStorage.getItem("donors") || "[]"
        );

        const donor = donors.find(function(item) {
            return item.mobile === mobile;
        });

        const result = document.getElementById("profileResult");

        if (donor) {

            result.innerHTML = `
                <div class="profile-card">
                    <h2>${donor.name}</h2>
                    <p>Age: ${donor.age}</p>
                    <p>Blood Group: ${donor.blood}</p>
                    <p>City: ${donor.city}</p>
                </div>
            `;

        } else {
            result.innerHTML = "<p>Donor not found!</p>";
        }

    });
}
// Blood Request Form
const requestForm = document.getElementById("requestForm");

if (requestForm) {
    requestForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const request = {
            id: "LS" + Date.now(),
            patientName: document.getElementById("patientName").value,
            blood: document.getElementById("requestBlood").value,
            units: document.getElementById("bloodUnits").value,
            hospital: document.getElementById("hospital").value,
            city: document.getElementById("requestCity").value,
            mobile: document.getElementById("requestMobile").value,
            status: "Pending"
        };

        let requests = JSON.parse(
            localStorage.getItem("requests") || "[]"
        );

        requests.push(request);

        localStorage.setItem("requests", JSON.stringify(requests));

        alert("Blood Request Submitted Successfully!\nRequest ID: " + request.id);

        requestForm.reset();
    });
}
// Track Blood Request
const trackForm = document.getElementById("trackForm");

if (trackForm) {
    trackForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const id = document.getElementById("requestId").value.trim();

        const requests = JSON.parse(
            localStorage.getItem("requests") || "[]"
        );

        const found = requests.find(
            request => request.id === id
        );

        const result = document.getElementById("trackResult");

        if (found) {
            result.innerHTML = `
                <h3>Request Found!</h3>
                <p>Patient: ${found.patientName}</p>
                <p>Blood Group: ${found.blood}</p>
                <p>Hospital: ${found.hospital}</p>
                <p>Status: ${found.status}</p>
            `;
        } else {
            result.innerHTML = "<p>Invalid Request ID!</p>";
        }
    });
}
// Blood Availability
const availabilityList = document.getElementById("availabilityList");

if (availabilityList) {
    const donors = JSON.parse(
        localStorage.getItem("donors") || "[]"
    );

    const groups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

    availabilityList.innerHTML = groups.map(group => {
        const count = donors.filter(
            donor => donor.blood === group
        ).length;

        return `
            <div class="availability-card">
                <h3>${group}</h3>
                <p>${count} Registered Donor(s)</p>
            </div>
        `;
    }).join("");
}
// Admin Dashboard
const adminDonors = document.getElementById("adminDonors");
const adminRequests = document.getElementById("adminRequests");
const adminRequestList = document.getElementById("adminRequestList");

if (adminDonors && adminRequests && adminRequestList) {
    const donors = JSON.parse(localStorage.getItem("donors") || "[]");
    const requests = JSON.parse(localStorage.getItem("requests") || "[]");

    adminDonors.textContent = donors.length;
    adminRequests.textContent = requests.length;

    if (requests.length > 0) {
        adminRequestList.innerHTML = requests.map(request => `
            <div class="availability-card">
                <h3>${request.patientName}</h3>
                <p>Request ID: ${request.id}</p>
                <p>Blood Group: ${request.blood}</p>
                <p>Status: ${request.status}</p>
            </div>
        `).join("");
    } else {
        adminRequestList.innerHTML = "<p>No blood requests found.</p>";
    }
}
// Contact Form
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const message = {
            name: document.getElementById("contactName").value,
            email: document.getElementById("contactEmail").value,
            subject: document.getElementById("contactSubject").value,
            message: document.getElementById("contactMessage").value
        };

        let messages = JSON.parse(
            localStorage.getItem("messages") || "[]"
        );

        messages.push(message);
        localStorage.setItem("messages", JSON.stringify(messages));

        document.getElementById("contactResult").textContent =
            "Thank you! Your message has been saved successfully.";

        contactForm.reset();
    });
}