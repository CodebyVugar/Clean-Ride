function recommendation(percentage) {
  let message = "";

  if (percentage >= 900) {
    message =
      "Excellent! You have achieved great success in reducing your CO2 footprint.";
  } else if (percentage >= 800 && percentage < 900) {
    message =
      "High eco-friendliness! You are significantly reducing your CO2 footprint.";
  } else if (percentage >= 700 && percentage < 800) {
    message = "Great progress! You are effectively reducing emissions.";
  } else if (percentage >= 600 && percentage < 700) {
    message = "Commendable work! You are making a significant impact.";
  } else if (percentage >= 500 && percentage < 600) {
    message = "Good job! You are making a noticeable difference.";
  } else if (percentage >= 400 && percentage < 500) {
    message = "Good start! You are on the right track.";
  } else if (percentage >= 300 && percentage < 400) {
    message =
      "Average reduction. Use more energy-efficient appliances to make a greater impact.";
  } else if (percentage >= 200 && percentage < 300) {
    message = "Moderate reduction. Try to adopt more energy-saving practices.";
  } else if (percentage >= 100 && percentage < 200) {
    message =
      "Minimal reduction. Consider switching to clean energy sources for a larger impact.";
  } else {
    message =
      "Very minimal reduction. Take steps towards adopting sustainable energy practices.";
  }

  return message;
}

function showRecommendation() {
  const percentage = localStorage.getItem("transportEmissionKg");

  // Check if the value exists and is valid
  if (!percentage || isNaN(Number(5000))) {
    console.error("Invalid or missing `lifeEmissionKg` in localStorage");
    document.getElementById("result").innerText =
      "Error! Emission data not found. Please ensure all inputs are provided.";
    return;
  }

  const result = recommendation(Number(percentage));
  const resultElement = document.getElementById("result");

  // Ensure the element exists
  if (resultElement) {
    resultElement.innerText = result;
  } else {
    console.error("Element with ID `result` not found in the DOM");
  }
}

// Call the function to show the recommendation
showRecommendation();
