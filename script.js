// -------------------------------
// ADMISSION NUMBER SYSTEM
// -------------------------------

// Get last admission number from localStorage
function getLastAdmissionNumber() {
    const raw = localStorage.getItem("lastAdmissionNumber");
    return raw ? parseInt(raw, 10) : 1000; // default starting point
}

// Save new admission number
function saveAdmissionNumber(num) {
    localStorage.setItem("lastAdmissionNumber", num);
}

// -------------------------------
// PAGE: ADMISSION FORM
// -------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("admissionForm");
    const submitBtn = document.getElementById("submitBtn");

    if (form && submitBtn) {
        submitBtn.addEventListener("click", function (event) {
            event.preventDefault();

            const formData = new FormData(form);

            // Validate required fields
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const age = document.getElementById("age").value.trim();
            const gender = document.querySelector('input[name="gender"]:checked');

            if (!name || !email || !phone || !age || !gender) {
                alert("Please fill in all required fields before submitting.");
                return;
            }

            // Generate admission number
            const last = getLastAdmissionNumber();
            const newNumber = last + 1;
            saveAdmissionNumber(newNumber);

            // Attach admission number to form submission
            formData.append("admissionNumber", `FF-${newNumber}`);

            // Submit to Google Apps Script
            fetch("https://script.google.com/macros/s/AKfycbwnSJ9FoCsYTrGZko3sQEVVllEQ-SmA1UIREyLgemqQjKczQ5uDmu1OB1ZoxjQYUbDX/exec", {
                method: "POST",
                body: formData
            })
            .then(res => res.text())
            .then(data => {
                window.location.href = "thanks.html";
            })
            .catch(err => {
                console.error("Error:", err);
                alert("There was an issue submitting your form. Please try again.");
            });
        });
    }

    // -------------------------------
    // PAGE: THANK YOU PAGE
    // -------------------------------

    const admissionNoElement = document.getElementById("admissionNo");

    if (admissionNoElement) {
        const last = getLastAdmissionNumber();
        admissionNoElement.textContent = `FF-${last}`;
    }
});




function doPost(e) {
  var sheet = SpreadsheetApp.openById("YOUR_SHEET_ID").getSheetByName("Sheet1");
  var data = e.parameter;

  sheet.appendRow([
    data.name,
    data.age,
    data.gender,
    data.email,
    data.phone,
    data.school,
    data.subjects,
    data.grade,
    data.message,
    new Date()
  ]);

  return ContentService.createTextOutput("Success");
}