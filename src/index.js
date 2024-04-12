// Get references to the input field, button, and result area
const agentNameInput = document.getElementById('agentName');
const submitButton = document.querySelector('button[type="submit"]');
const agentResultsContainer = document.getElementById('agent-results-container'); // Corrected container ID

 // Get references to the input field, button, and result area
 const propertyNameInput = document.getElementById('propertyName');
 const addButton = document.querySelector('button[type="submit"]');

  
// Function to load agent data from db.json
function loadAgentData(name) {
  fetch('db.json')  // Fetch data from db.json file
    .then(response => response.json())  // Parse JSON response
    .then(data => {
      const matchingAgent = data.agents.find(agent => agent.name === name);
      if (matchingAgent) {
        displayAgentResults(matchingAgent);  // Display results if agent found
      } else {
        alert('Agent not found!');      }
    })
    .catch(error => console.error('Error loading data:', error));  // Handle errors
}

function displayAgentResults(agent) {

  // Create elements to display properties, commission, and salary
  const propertiesList = document.createElement('ul');
  const commissionPara = document.createElement('p');
  const salaryPara = document.createElement('p');

  // Clear the container before displaying new results
  agentResultsContainer.innerHTML = ''; // Corrected container

  // Create a heading element
  const heading = document.createElement('h2');
  heading.textContent = `Agent Performance Details for ${agent.name}`;

  // Loop through properties and create list items with delete buttons
  agent.properties.forEach(property => {
    const listItem = document.createElement('li');
    listItem.textContent = `. ${property.name}`;

    // Create and add delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove';
    deleteButton.classList.add('remove-project');  // Add a class for styling
    listItem.appendChild(deleteButton);

    // Add styling for sold properties 
    if (property.sold) {
      listItem.style.color = 'orange';
      listItem.style.fontWeight = 'bold';
    }

    // Add property and delete button to the list
    propertiesList.appendChild(listItem);

    // Add event listener to the delete button
    deleteButton.addEventListener('click', () => {
      const index = agent.properties.indexOf(property);
      if (index > -1) {
        agent.properties.splice(index, 1);
        displayAgentResults(agent); // Update results after removal
      }
    });
  });

  submitButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default form submission

    const propertyName = propertyNameInput.value.trim(); // Get and trim property name

    if (!propertyName) {
      alert('Please enter a property name.');
      return;
    }

    const agentName = prompt('Enter Agent Name:');

    if (!agentName) {
      return; // User canceled the prompt
    }

  // Calculate and display commission (assuming a simple calculation)
  let totalCommission = 0;
  agent.properties.forEach(property => {
    if (property.sold) {
      totalCommission += property.price * (property.commissionRate / 100);
    }
  });
  commissionPara.textContent = `Total Commission Earned: ksh${totalCommission.toFixed(2)}`;

  // Salary calculation can be based on a fixed value or a formula 
  salaryPara.textContent = `Salary: ksh${20000}`; 

  // Add elements to the container (corrected container ID)
  agentResultsContainer.appendChild(heading);
  agentResultsContainer.appendChild(propertiesList);
  agentResultsContainer.appendChild(commissionPara);
  agentResultsContainer.appendChild(salaryPara);
}

// Add event listener to the submit button
submitButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  const enteredName = agentNameInput.value.trim();
  if (enteredName) {
    loadAgentData(enteredName);
  } else {
    alert('Please enter an agent name.');  }
});
