const baseUrl = 'http://localhost:3000/';

let loggedInAgent = null; 

const dataContainer = document.getElementById('dashboard'); 

// Get the agent name input element
const agentNameInput = document.getElementById('agentName');

// Form submission handling
const form = document.querySelector('form'); // Assuming the agent name input is within a form

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const agentName = agentNameInput.value;

  fetch(`${baseUrl}/agents/${agentName}`)
    .then(response => response.json())
    .then(agentData => {
      if (agentData) {
        loggedInAgent = agentData; 
        updateAllSections(agentData); 
      } else {
        alert('Agent not found!');
      }
    })
    .catch(error => {
      console.error('Error fetching agent data:', error);
      alert('An error occurred. Please try again later.');
    });
});

// DOMContentLoaded event listener
// document.addEventListener('DOMContentLoaded', function() {
  
// });


// let propertyListings = []; 

// function updatePropertyListings(agentData) {
//   const assignedProperties = agentData.assignedProperties || [];

//   let output = `<h2>Property Listings for ${agentData.name}</h2>`;
//   output += "<ul>";
//   for (const property of propertyListings) { 
//     if (assignedProperties.includes(property.id)) {
//       output += `<li>${property.name} (Sold: ${property.soldStatus})</li>`;
//     }
//   }
//   output += "</ul>";

//   const propertyListSection = document.getElementById('properties');
//   propertyListSection.innerHTML = output;
// }

// function updateSalesData(agentData) {
//   const agentName = agentData.name;

//   fetch(`${baseUrl}/agents/${agentName}/sales`)
//     .then(response => response.json())
//     .then(salesData => {
//       if (salesData) {
//         const salesOutput = processSalesData(salesData); 
//         const salesDataSection = document.getElementById('sales');
//         salesDataSection.innerHTML = salesOutput;
//       } else {
//         alert('Error: Sales data not found for this agent.');
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching sales data:', error);
      
//     });
// }

// function updatePerformanceData(agentData) {
//   const agentName = agentData.name;

//   fetch(`${baseUrl}/agents/${agentName}/performance`)
//     .then(response => response.json())
//     .then(performanceData => {
//       if (performanceData) { 
//         const performanceOutput = processPerformanceData(performanceData); 
//         const performanceDataSection = document.getElementById('performance');
//         performanceDataSection.innerHTML = performanceOutput;
//       } else {
//         alert('Error: Performance data not found for this agent.');
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching performance data:', error);
      
//     });
// }

// function updateEarningsData(agentData) {
//   const agentName = agentData.name;

//   fetch(`${baseUrl}/agents/${agentName}/earnings`)
//     .then(response => response.json())
//     .then(earningsData => {
//       if (earningsData) { 
//         const earningsOutput = processEarningsData(earningsData); 
//         const earningsDataSection = document.getElementById('earnings');
//         earningsDataSection.innerHTML = earningsOutput;
//       } else {
//         alert('Error: Earnings data not found for this agent.');
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching earnings data:', error);
      
//     });
// }
