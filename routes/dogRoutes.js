const router = require('express').Router();
const Dog = require('../db');

router.get('/getAll', (req, res, next) => {
  Dog.find((err, dogs) => {
    if (err) return next({ status: 400, message: err.message });
    return res.json(dogs);
  });
});

router.get('/find', ({ query }, res, next) => {
  Dog.find(query, (err, dogs) => {
    if (err) return next({ status: 400, message: err.message });
    return res.json(dogs);
  });
});

router.get('/get/:id', ({ params: { id } }, res, next) => {
  Dog.findById(id, (err, found) => {
    if (err) return next({ status: 400, message: err.message });
    if (!found) return next({ status: 404, message: `No dog found with id ${id}` });
    return res.send(found);
  });
});

router.post('/create', ({ body: dog }, res, next) => {
  new Dog(dog)
    .save()
    .then(() => res.status(201).send('Successfully created'))
    .catch((err) => next({ status: 400, message: err.message }));
});

router.put('/replace/:id', ({ query: newDog, params: { id } }, res, next) => {
  Dog.findByIdAndUpdate(id, newDog, (err) => {
    if (err) return next({ status: 400, message: err.message });
    return Dog.findById(id, (error, updatedDog) => {
      if (error) return next({ status: 400, message: error.message });
      return res.status(202).send(updatedDog);
    });
  });
});

router.delete('/remove/:id', ({ params: { id } }, res, next) => {
  Dog.findByIdAndDelete(id, (err) => {
    if (err) return next({ status: 400, message: err.message });
    return res.sendStatus(204);
  });
});

module.exports = router;
