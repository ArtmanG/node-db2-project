
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { VIN: 1234567891, make: 'Honda', model: 'Civic', milage: 10000, transmissionType: 'V6', statusOfTitle: 'clean' },
        { VIN: 2345678901, make: 'Toyota', model: 'Corolla', milage: 500000, transmissionType: 'V4', statusOfTitle: 'dead' },
        { VIN: 3456789012, make: 'Hyundai', model: 'Sonata', milage: 50000, transmissionType: 'V8', statusOfTitle: 'clean' }
      ]);
    });
};
