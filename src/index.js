const agentNameInput = document.getElementById('agentName');
const submitButton = document.querySelector('button[type="submit"]');
const agentResultsContainer = document.getElementById('agent-results-container');
const propertyNameInput = document.getElementById('propertyName');
const addButton = document.querySelector('button[type="submit"]');

// Function to load agent data from db.json
function loadAgentData(name) {
  fetch('db.json')
    .then(response => response.json())
    .then(data => {
      const matchingAgent = data.agents.find(agent => agent.name === name);
      if (matchingAgent) {
        displayAgentResults(matchingAgent);
      } else {
        alert('Agent not found!');
      }
    })
    .catch(error => console.error('Error loading data:', error));
}

function displayAgentResults(agent) {
  // Create table element
  const table = document.createElement('table');
  table.classList.add('agent-results-table');

  // Create table header row
  const headerRow = document.createElement('tr');
  const nameHeader = document.createElement('th');
  nameHeader.textContent = 'Property Name';
  const soldHeader = document.createElement('th');
  soldHeader.textContent = 'Sold';
  headerRow.appendChild(nameHeader);
  headerRow.appendChild(soldHeader);
  table.appendChild(headerRow);

  // Loop through properties and add rows to the table
  agent.properties.forEach(property => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    nameCell.textContent = property.name;

    // Create and add delete button within the same cell
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove';
    deleteButton.classList.add('remove-property'); // Add a class for styling
    nameCell.appendChild(deleteButton);

    // Add event listener to the delete button
    deleteButton.addEventListener('click', () => {
      const index = agent.properties.indexOf(property);
      if (index > -1) {
        agent.properties.splice(index, 1);
        displayAgentResults(agent); // Update results after removal
      }
    });

    const soldCell = document.createElement('td');
    soldCell.textContent = property.sold ? 'Yes' : 'No';
    row.appendChild(nameCell);
    row.appendChild(soldCell);
    table.appendChild(row);
  });

  // Calculate and display commission (assuming a simple calculation)
  let totalCommission = 0;
  agent.properties.forEach(property => {
    if (property.sold) {
      totalCommission += property.price * (property.commissionRate / 100);
    }
  });

  // Salary calculation can be based on a fixed value or a formula
  const salaryPara = document.createElement('p');
  salaryPara.textContent = `Salary: ksh${20000}`; // Update with actual calculation

  // Add elements to the container
  const heading = document.createElement('h2');
  heading.textContent = `Agent Performance Details for ${agent.name}`;
  agentResultsContainer.innerHTML = ''; // Clear container before adding new content
  agentResultsContainer.appendChild(heading);
  agentResultsContainer.appendChild(table);
  agentResultsContainer.appendChild(salaryPara);
  const commissionPara = document.createElement('p');
  commissionPara.textContent = `Total Commission Earned: ksh${totalCommission.toFixed(2)}`;
  agentResultsContainer.appendChild(commissionPara);
}

// Add event listener to the submit button
submitButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  const enteredName = agentNameInput.value.trim();
  if (enteredName) {
    loadAgentData(enteredName);
  } else {
    alert('Please enter an agent name.');
  }
});