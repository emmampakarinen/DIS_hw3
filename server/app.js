require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

const asiaClient = new Pool({ connectionString: process.env.ASIA_DB_URL });
const europeClient = new Pool({ connectionString: process.env.EUROPE_DB_URL });
const northAmericaClient = new Pool({ connectionString: process.env.NORTHAMERICA_DB_URL });

app.get('/data/:location', async (req, res) => {
  const location = req.params.location;
  let client;

  // checking which location's data is wanted from client
  if (location === 'asia') {
    client = asiaClient;
  } else if (location === 'europe') {
    client = europeClient;
  } else if (location === 'northamerica') {
    client = northAmericaClient;
  } else {
    return res.status(400).json({ error: 'Invalid location' });
  }

  try {
    const [users, products, products_info, orders] = await Promise.all([
      client.query('SELECT * FROM Users'),
      client.query('SELECT * FROM Products'),
      client.query('SELECT * FROM Product_info'),
      client.query('SELECT * FROM Orders')
    ]); // fetching all data related to required location from database
    
    let data = [];
    // pushing datasets to an array
    data.push(users.rows, products.rows, products_info.rows, orders.rows) 

    const response = [
      { title: "Users", data: users.rows },
      { title: "Products", data: products.rows },
      { title: "Product Info", data: products_info.rows },
      { title: "Orders", data: orders.rows }
    ];
    //console.log(response)

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
