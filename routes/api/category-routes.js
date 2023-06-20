const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/category', async (req, res) => {
  // find all categories
  try {
    const allCategory= await Category.findAll({
      include:[{model:Product}]
    });
    res.status(200).json(allCategory);
    } catch (err) {
    res.status(500).json(err)
  }
  // be sure to include its associated Products
});

router.get('/categories/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category= await Category.findByPk(req.params.id, {
      include: [{model:Product}]
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/categories', async (req, res) => {
  // create a new category
  try {
    
    const newCategory= await Category.create(req.body);
    res.status(200).json(newCategory)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/categories/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCat= await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(updatedCat)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/categories/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCat= await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(deletedCat);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
