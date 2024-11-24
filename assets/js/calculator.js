document
  .getElementById("transportationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Send data to the backend
    fetch(
      "https://e295-94-20-49-98.ngrok-free.app/api/carbon-footprint/calculate/transport",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Form submitted successfully:", data);
        console.log(data.emissionKg);
        console.log(data.emissionPercentage);
        
        localStorage.setItem("transportEmissionKg", data.emissionKg)
        alert("Form submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Failed to submit the form");
      });
  });

document
  .getElementById("shoppingForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission and page reload

    // Get form data
    const formData = new FormData(this);

    // Create an object from form data
    const data = {
      productType: formData.get("productType"),
      originCountry: formData.get("originCountry"),
      packaging: formData.get("packaging"),
      productWeight: formData.get("productWeight"),
    };

    // Send the data to the backend via POST request
    fetch(
      "https://e295-94-20-49-98.ngrok-free.app/api/carbon-footprint/calculate/shop",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        // Handle success (e.g., show a success message)
        alert("Data submitted successfully!");
        localStorage.setItem("shopEmissionKg", data.emissionKg)
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error submitting data.");
      });
  });

// Life style

function handleDietTypeChange(selectElement) {
  const meatWeightField = document.getElementById("meatWeightField");
  if (selectElement.value === "omnivores") {
    meatWeightField.classList.remove("hidden");
  } else {
    meatWeightField.classList.add("hidden");
  }
}

// Form Submission Handling
document
  .getElementById("lifestyleForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission and page reload

    // Get form data
    const formData = new FormData(this);

    // Create an object from form data
    const data = {
      dietType: formData.get("dietType"),
      meatWeight: formData.get("meatWeight"),
      foodWaste: formData.get("foodWaste"),
      recycling: formData.get("recycling"),
      waterConsumption: formData.get("waterConsumption"),
      gasConsumption: formData.get("gasConsumption"),
      electricityConsumption: formData.get("electricityConsumption"),
    };

    // Send the data to the backend via POST request
    fetch("https://e295-94-20-49-98.ngrok-free.app/api/carbon-footprint/calculate/life", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        alert("Lifestyle data submitted successfully!");
        localStorage.setItem("lifeEmissionKg", data.emissionKg)        
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error submitting lifestyle data.");
      });
  });
