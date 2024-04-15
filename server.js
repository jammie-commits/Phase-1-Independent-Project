const express = require('express');
const fs = require('fs'); // File system module

const app = express();
const port = 3000; // Port to listen on

const dataFile = 'db.json'; // Path to your JSON file

// Function to read data from the JSON file
function readData() {
  return new Promise((resolve, reject) => {
    fs.readFile(dataFile, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(new Error('Invalid JSON data in file'));
        }
      }
    });
  });
}

// Function to write data to the JSON file
function writeData(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dataFile, JSON.stringify(data, null, 2), 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Route handler for POST requests to /add-property
app.post('/add-property', async (req, res) => {
  try {
    const { propertyName } = req.body; // Get property name from request body

    if (!propertyName) {
      return res.status(400).json({ message: 'Missing property name' });
    }

    const data = await readData(); // Read existing data

    // Add logic to identify the target agent (if needed) based on your data structure
    // ...

    // Create a new property object
    const newProperty = {
      name: propertyName,
      // Add other property details like price, sold status, etc. (optional)
    };

    data.agents.forEach(agent => {
      // Add logic to identify the target agent for the property (if needed)
      agent.properties.push(newProperty);
    });

    await writeData(data); // Write updated data to the JSON file

    res.json({ message: 'Property added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding property' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
