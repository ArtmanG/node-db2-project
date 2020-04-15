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

  server.put('/cars/:id', (req, res) => {
    db('cars')
    .where({ id: req.params.id })
    .update(req.body)
    .then((count) => {
        if (count) {
            res.json({ updated: count });
        } else {
            res.status(404).json({ message: 'Car not found, cannot update'});
        }
    })
    .catch((error) => {
        res.status(500).json({ message: 'Server Error', error })
    });
  });

  server.delete('/cars/:id', (req, res) => {
    db('cars')
        .where({ id: req.params.id })
        .del()
        .then((car) => {
            if (car) {
                res.status(200).json({ data: car });
            } else {
                res.status(500).json({ message: 'Server Error, car cannot be deleted'})
            }
        });
  });

module.exports = server;