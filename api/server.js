const express = require('express');

const db = require('../data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/cars', (req, res) => {
    db.select('*')
    .from('cars')
    .then((cars) => {
        res.json(cars);
    })
    .catch((error) => {
        res.status(500).json({ message: 'Server Error, cannot retrieve cars', error });
      });
})

server.get('/cars/:id', (req, res) => {
    db('cars')
      .where({ id: req.params.id })
      .first()
      .then((car) => {
        if (car) {
          res.status(200).json({ data: car });
        } else {
          res.status(500).json({ message: 'Server Error, car not found' });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: 'Server Error', error });
      });
  });

  server.post('/cars', (req, res) => {
      db('cars')
        .insert(req.body)
        .then((car) => {
            res.status(201).json(car)
        })
        .catch((error) => {
            res.status(500).json({ message: 'Server Error, failed to add car', error })
        });
  });

module.exports = server;