# DEALS FORGE
### DATE, 2024/04/12
###By *James Mbugua
## Description
This project is on a Real Estate Sales Agency with a number "n" of sales agents. The sales agency allocates a number "x" of units to each agent for to sell. Also the salary is calculated based on the commissions from the sales meaning the commission is also calculated and displayed based on the value if the unit sold. The agent has to input his/her name in the agent name input area to populate properties allocated, also sold properties are uniquely output in bold and orange color.

### process
    • Loads agent data: The loadAgentData function fetches data from db.json and searches for an agent matching the provided name. If found, it calls displayAgentResults to display details. 
    • Displays agent results: The displayAgentResults function creates a detailed view for the agent, including: 
        ◦ Properties list with delete buttons for each property. 
        ◦ Styling for sold properties (orange color, bold text). 
        ◦ Total commission earned (assuming a commission rate on sold properties). 
        ◦ Salary 
    • The code consistently uses agentResultsContainer.innerHTML = '' (corrected container ID) to clear the container before displaying new results, preventing content accumulation. 
    • Event listeners are properly added to the submit buttons to handle form submissions.

### Output
For Agents:
The system would display your performance details, including:
    • Agent Name: Your full name 
    • Properties Managed: A list of properties you are managing, including whether they are sold or not. 
    • Total Commission Earned: The total commission you have earned from sold properties. 
    • Salary: Your fixed salary 

### User Stories 
As an agent, I want to see my performance details, including properties I'm managing and my commission earned, so I can track my progress and identify areas for improvement.
As a manager, I want to be able to search for agents and view their performance details, including properties managed and commission earned, so I can monitor agent performance and make informed decisions.
As an agent, I want to be able to add new properties I'm managing to my profile, so I can keep my performance details up-to-date.
As a manager, I want to be able to see which properties are sold and easily identify top-performing agents based on their commission earned, so I can reward and motivate them.

### Technology used
html
css
javascript
