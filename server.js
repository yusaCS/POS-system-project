const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const path = require('path');
const cors = require('cors');

// Create express app
const app = express();
const port = 5000;

app.use(cors());

// Create pool
const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DATABASE,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT,
  ssl: {rejectUnauthorized: false}
});

// Add process hook to shutdown pool
process.on('SIGINT', function() {
  pool.end();
  console.log('Application successfully shutdown');
  process.exit(0);
});

/**
 * Generic function for handling database queries
 * @param {string} grabLine - Database query
 * @param {*} req - Request
 * @param {*} res - Reponse
 */
const handleQuery = (grabLine, req, res) => {
  pool.query(grabLine, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result.rows);
    }
  });
};

/**
 * Route to get menu items
 * @name GET /menu
 * @function
 * @param {*} req - Request
 * @param {*} res - Response
 */
app.get('/menu', (req, res) => handleQuery('SELECT * FROM menu ORDER BY drink_order', req, res));

/**
 * Route to get inventory items
 * @name GET /inventory
 * @function
 * @param {*} req - Request
 * @param {*} res - Response
 */
app.get('/inventory', (req, res) => handleQuery('SELECT * FROM inventory ORDER BY id', req, res));

/**
 * Route to get inventory items
 * @name GET /orderhistory
 * @function
 * @param {*} req - Request
 * @param {*} res - Response
 */
app.get('/orderhistory', (req, res) => handleQuery('SELECT * FROM sales_history ORDER BY id DESC LIMIT 1000', req, res));

// ########## Submitting Orders ##########

/**
 * Submit an order
 * @name POST /submitOrder
 * @function
 * @param {*} req - Request
 * @param {*} res - Response
 */
app.post('/submitOrder', express.json(), (req, res) => {
  const {cashier, sale_week, sale_date, current_hour, payment, cart, order_total} = req.body;
  pool.query("INSERT INTO sales_history (cashier, sale_week, sale_date, current_hour, payment, cart, order_total) VALUES ($1, $2, $3, $4, $5, $6, $7)",
  [cashier, sale_week, sale_date, current_hour, payment, cart, order_total], (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({error: 'Internal Server Error'});
    } else {
      res.json();
    }
  });
})

// ########## Inventory Functions ##########

/**
 * Adds an inventory item
 * @name POST /addInventoryItem
 * @function
 * @param {*} req - Request
 * @param {*} res - Response
 */
app.post('/addInventoryItem', express.json(), (req, res) => {
  const {name, price, quantity} = req.body;
  pool.query("SELECT insert_inventory ($1, $2, $3)", [name, price, quantity], (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({error: 'Internal Server Error'});
    } else {
      res.json();
    }
  });
});

/**
 * Deletes an inventory item
 * @name POST /deleteInventoryItem
 * @function
 * @param {*} req - Request
 * @param {*} res - Response
 */
app.post('/deleteInventoryItem', express.json(), (req, res) => {
  const {id} = req.body;
  pool.query("SELECT delete_inventory ($1)", [id], (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({error: 'Internal Server Error'});
    } else {
      res.json();
    }
  });
});

/**
 * Edits an inventory item's name
 * @name POST /updateInventoryItemName
 * @function
 * @param {*} req - Request
 * @param {*} res - Response
 */
app.post('/updateInventoryItemName', express.json(), (req, res) => {
  const {id, name} = req.body;
  pool.query("SELECT update_inventory_name ($1, $2)", [id, name], (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({error: 'Internal Server Error'});
    } else {
      res.json();
    }
  });
})

/**
 * Edits an inventory item's quantity
 * @name POST /updateInventoryItemQuantity
 * @function
 * @param {*} req - Request
 * @param {*} res - Response
 */
app.post('/updateInventoryItemQuantity', express.json(), (req, res) => {
  const {id, quantity} = req.body;
  pool.query("SELECT update_inventory_quantity ($1, $2)", [id, quantity], (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({error: 'Internal Server Error'});
    } else {
      res.json();
    }
  });
})

/**
 * Edits an inventory item's price
 * @name POST /updateInventoryItemPrice
 * @function
 * @param {*} req - Request
 * @param {*} res - Response
 */
app.post('/updateInventoryItemPrice', express.json(), (req, res) => {
  const {id, price} = req.body;
  pool.query("SELECT update_inventory_price ($1, $2)", [id, price], (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({error: 'Internal Server Error'});
    } else {
      res.json();
    }
  });
})

// ########## Menu Functions ##########

/**
 * Adds a drink to the menu
 * @name POST /addMenuDrink
 * @function
 * @param {*} req - Request
 * @param {*} res - Response
 */
app.post('/addMenuDrink', express.json(), (req, res) => {
  const {id, name, price, ingredients} = req.body;
  pool.query("INSERT INTO menu (id, name, price, ingredients) VALUES ($1, $2, $3, $4)", [id, name, price, ingredients], (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({error: 'Internal Server Error'});
    } else {
      res.json();
    }
  });
})

/**
 * Deletes a drink from the menu
 * @name POST /deleteMenuDrink
 * @function
 * @param {*} req - Request
 * @param {*} res - Response
 */
app.post('/deleteMenuDrink', express.json(), (req, res) => {
  const {id} = req.body;
  pool.query("SELECT delete_menu ($1)", [id], (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({error: 'Internal Server Error'});
    } else {
      res.json();
    }
  });
})

/**
 * Updates a drink's ID
 * @name POST /updateMenuDrinkID
 * @function
 * @param {*} req - Request
 * @param {*} res - Response
 */
app.post('/updateMenuDrinkID', express.json(), (req, res) => {
  const {id, newID} = req.body;
  pool.query("SELECT update_menu_id ($1, $2)", [id, newID], (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({error: 'Internal Server Error'});
    } else {
      res.json();
    }
  });
})

/**
 * Updates a drink's name
 * @name POST /updateMenuDrinkName
 * @function
 * @param {*} req - Request
 * @param {*} res - Response
 */
app.post('/updateMenuDrinkName', express.json(), (req, res) => {
  const {id, name} = req.body;
  pool.query("SELECT update_menu_name ($1, $2)", [id, name], (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({error: 'Internal Server Error'});
    } else {
      res.json();
    }
  });
})

/**
 * Updates a drink's price
 * @name POST /updateMenuDrinkPrice
 * @function
 * @param {*} req - Request
 * @param {*} res - Response
 */
app.post('/updateMenuDrinkPrice', express.json(), (req, res) => {
  const {id, price} = req.body;
  pool.query("SELECT update_menu_price ($1, $2)", [id, price], (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({error: 'Internal Server Error'});
    } else {
      res.json();
    }
  });
})

/**
 * Updates a drink's ingredients
 * @name POST /updateMenuDrinkIngredients
 * @function
 * @param {*} req - Request
 * @param {*} res - Response
 */
app.post('/updateMenuDrinkIngredients', express.json(), (req, res) => {
  const {id, ingredients} = req.body;
  pool.query("UPDATE menu SET ingredients = $2 WHERE id = $1", [id, ingredients], (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({error: 'Internal Server Error'});
    } else {
      res.json();
    }
  });
})

// ########## Report Features ##########

/**
 * Grabs inventor items that have a quantity less than {amount}
 * @name POST /restockReport
 * @function
 * @param {*} req - Request
 * @param {*} res - Response
 */
app.post('/restockReport', express.json(), (req, res) => {
  const { amount } = req.body;
  pool.query("SELECT * FROM inventory WHERE quantity <= $1 ORDER BY id", [amount], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result.rows);
    }
  });
})

/**
 * Grabs sales history between {first date} and {second date}
 * @name POST /salesReport
 * @function
 * @param {*} req - Request
 * @param {*} res - Response
 */
app.post('/salesReport', express.json(), (req, res) => {
  const {firstDate, secondDate} = req.body;
  pool.query("SELECT * FROM sales_history WHERE sale_date BETWEEN $1 and $2 ORDER BY id DESC", [firstDate, secondDate], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result.rows);
    }
  });
})

app.listen(port, () => { console.log(`Server started on http://localhost:${port}`) });