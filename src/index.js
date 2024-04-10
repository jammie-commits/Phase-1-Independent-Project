// Get references to the input field, button, and result area
const agentNameInput = document.getElementById('agentName');
const submitButton = document.querySelector('button[type="submit"]');
const agentResults = document.getElementById('agent-results');

// Function to load agent data from db.json
function loadAgentData(name) {
  fetch('db.json')  // Fetch data from db.json file
    .then(response => response.json())  // Parse JSON response
    .then(data => {
      const matchingAgent = data.agents.find(agent => agent.name === name);
      if (matchingAgent) {
        displayAgentResults(matchingAgent);  // Display results if agent found
      } else {
        agentResults.textContent = 'Agent not found.';  // Display message if not found
      }
    })
    .catch(error => console.error('Error loading data:', error));  // Handle errors
}

// Function to display agent performance data
function displayAgentResults(agent) {
  // Clear any previous content
  agentResults.innerHTML = '';  // Removes any existing content

  // Create elements to display properties, commission, and salary
  const propertiesList = document.createElement('ul');
  const commissionPara = document.createElement('p');
  const salaryPara = document.createElement('p');

  // Loop through properties and create list items
  agent.properties.forEach(property => {
    const listItem = document.createElement('li');
    listItem.textContent = `- ${property.address} (Price: $${property.price}, Commission Rate: ${property.commissionRate}%)`;
    if (property.sold) {
      listItem.style.fontWeight = 'bold';  // Mark sold properties as bold
    }
    propertiesList.appendChild(listItem);
  });

  // Calculate and display commission (assuming a simple calculation)
  let totalCommission = 0;
  agent.properties.forEach(property => {
    if (property.sold) {
      totalCommission += property.price * (property.commissionRate / 100);
    }
  });
  commissionPara.textContent = `Total Commission Earned: $${totalCommission.toFixed(2)}`;

  // Salary calculation can be based on a fixed value or a formula (replace with your logic)
  salaryPara.textContent = `Salary: $${2000}`; // Replace with your salary calculation

  // Add elements to the result area
  agentResults.appendChild(propertiesList);
  agentResults.appendChild(commissionPara);
  agentResults.appendChild(salaryPara);
}

// Add event listener to the submit button
submitButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  const enteredName = agentNameInput.value.trim();
  if (enteredName) {
    loadAgentData(enteredName);
  } else {
    agentResults.textContent = 'Please enter an agent name.';
  }
});
