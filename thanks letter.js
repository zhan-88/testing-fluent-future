// Wait until the page fully loads
document.addEventListener("DOMContentLoaded", function () {

  // Get the URL parameters
  const params = new URLSearchParams(window.location.search);

  // Extract the unique ID sent from the form
  const uniqueID = params.get("id");

  // Target the ID box
  const idBox = document.getElementById("uniqueID");

  // Display the ID or fallback text
  if (uniqueID) {
    idBox.textContent = "Your Admission ID: " + uniqueID;
  } else {
    idBox.textContent = "No ID found";
  }
});



document.getElementById("generatedID").value = uniqueID;