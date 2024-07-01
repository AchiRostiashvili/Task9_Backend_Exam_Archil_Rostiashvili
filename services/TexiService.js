const Taxi = require('../models/taxi');

async function getAllTaxies() {
  try {
    const taxies = await Taxi.find();
    return taxies;
  } catch (err) {
    throw new Error(err.message);
  }
} 

async function searchTaxies(query, page = 1, limit = 10) {
  try {
    const taxies = await Taxi.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalCount = await Taxi.countDocuments(query);

    return {
      taxies,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page)
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

async function getTaxiById(id) {
  try {
    const taxi = await Taxi.findById(id);
    return taxi;
  } catch (err) {
    throw new Error(err.message);
  }
}

async function addTaxi(taxiData) {
  try {
    const newTaxi = new Taxi(taxiData);
    await newTaxi.save();
    return newTaxi;
  } catch (err) {
    throw new Error(err.message);
  }
}

async function updateTaxi(id, taxiData) {
  try {
    const updatedTaxi = await Taxi.findByIdAndUpdate(id, taxiData, { new: true, runValidators: true });
    return updatedtaxi;
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  getAllTaxies,
  searchTaxies,
  getTaxiById,
  addTaxi,
  updateTaxi
};