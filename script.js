// -------------------------------
// ADMISSION NUMBER SYSTEM
// -------------------------------

function getLastAdmissionNumber() {
  const raw = localStorage.getItem("lastAdmissionNumber");
  return raw ? parseInt(raw, 10) : 1000;
}

function saveAdmissionNumber(num) {
  localStorage.setItem("lastAdmissionNumber", num);
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("admissionForm");

  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const age = document.getElementById("age").value.trim();
    const genderInput = document.querySelector('input[name="gender"]:checked');
    const gender = genderInput ? genderInput.value : "";

    if (!name || !email || !phone || !age || !gender) {
      alert("Please fill in all required fields before submitting.");
      return;
    }

    // Collect checked subjects manually
    const subjectCheckboxes = document.querySelectorAll('input[name="subjects[]"]:checked');
    const subjects = Array.from(subjectCheckboxes).map(cb => cb.value).join(", ");

    // Get other form values
    const school = document.getElementById("school").value.trim();
    const grade = document.getElementById("grade").value;
    const message = document.getElementById("message").value.trim();

    // Generate admission number
    const last = getLastAdmissionNumber();
    const newNumber = last + 1;
    saveAdmissionNumber(newNumber);
    const admissionNumber = `FF-${newNumber}`;

    // Create FormData with proper structure
    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("school", school);
    formData.append("subjects", subjects);
    formData.append("grade", grade);
    formData.append("message", message);
    formData.append("admissionNumber", admissionNumber);
    formData.append("timestamp", new Date().toLocaleString());

    var WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbybE-1qyrOjDnvRUwWP7Qzsyt072conHzLnXGMLpHsAS6xfjlQDJkTaLg48eg0LiKs_QQ/exec';

    fetch(WEB_APP_URL, {
      method: 'POST',
      body: formData
    })
    .then(function(res){
      return res.json().catch(function(){ return res.text(); });
    })
    .then(function(data){
      console.log('Response:', data);
      var id = null;
      if (data && typeof data === 'object' && data.id) id = data.id;
      if (!id && typeof data === 'string') {
        try { var parsed = JSON.parse(data); if (parsed && parsed.id) id = parsed.id; } catch(e){}
      }
      if (id) {
        window.location.href = 'thanks.html?id=' + encodeURIComponent(id);
      } else {
        window.location.href = 'thanks.html';
      }
    })
    .catch(function(err){
      console.error('Error:', err);
      alert('There was an issue submitting your form. Please try again.');
    });
  });
});
