

const express = require('express'); 
const cors = require('cors');       
const pool = require('./db');       
require('dotenv').config();        

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', async (req, res) => {
    try {
        
        res.json('HOTEL MANGEMENT SYSTEM');
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/customer', async (req,res) => {
    try{
        const result = await pool.query('select * from Customer');
        res.json(result.rows);
    }catch(err)
    {
        res.status(500).json({Error:err.message});
    }
});

app.post('/customer', async (req, res) => {
  try {
    const { name, email, phone, id_proof } = req.body;

    if (!name || !email || !phone || !id_proof) {
      return res.status(400).json({ error: 'Please fill all required fields' });
    }

    const insertQuery = `
      INSERT INTO Customer (name, email, phone, id_proof)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [name, email, phone, id_proof];

    const result = await pool.query(insertQuery, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.get('/room', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Room');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/employees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Employees');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/booking', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Booking');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/payment', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Payment');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/invoice', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Invoice');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/billing', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Billing');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/service', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Service');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/feedback', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Feedback');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/inventory', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Inventory');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Connected Succefully....on PORT ${PORT}`);
});
