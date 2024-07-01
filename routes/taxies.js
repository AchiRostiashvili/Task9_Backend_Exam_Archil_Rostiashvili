const express = require('express');
const router = express.Router();
const TaxiService = require('../services/TaxiService');
const ApiSecurity = require('../middlewares/apiSecurity');

// GET all Taxies
router.get('/all', ApiSecurity.requireLogin, async (req, res, next) => {
  try {
    const taxies = await TaxiService.getAllTaxies();
    res.status(200).json(taxies);
  } catch (err) {
    next(err);
  }
});


// GET a single taxi by ID
router.get('/:id', async (req, res, next) => {
    try {
        const taxi = await TaxiService.getTaxiById(req.params.id);
        if (!taxi) {
            return res.status(404).json({ error: 'Taxi not found' });
        }
        res.status(200).json(taxi);
    } catch (err) {
        next(err);
    }
});

// POST create a new taxi
router.post('/', ApiSecurity.requirePermits('taxi.add'), async (req, res, next) => {
    try {
        const newTaxi= await TaxiService.addTaxi(req.body);
        res.status(201).json(newTaxi);
    } catch (err) {
        next(err);
    }
});

// PUT update taxi information
router.put('/:id', ApiSecurity.requirePermits('taxi.update', 'taxi.add'), async (req, res, next) => {
    try {
        const updatedTaxi = await TaxiService.updateTaxi(req.params.id, req.body);
        if (!updatedTaxi) {
            return res.status(404).json({ error: 'Taxi not found' });
        }
        res.status(200).json(updatedTaxi);
    } catch (err) {
        next(err);
    }
});

// GET search taxies with pagination and filter by firstName, lastName, or pid
router.get('/search', async (req, res, next) => {
  const { q, page = 1, limit = 10 } = req.query;

  const query = {
    $or: [
      { firstName: new RegExp(q, 'i') },
      { lastName: new RegExp(q, 'i') },
      { pid: new RegExp(q, 'i') }
    ]
  };

  try {
    const result = await TaxiService.searchTaxies(query, page, limit);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;