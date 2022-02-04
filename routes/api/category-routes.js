const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {

    const allCategories = await Category.findAll({include: [{ model: Product }],});
    res.status(200).json(allCategories)

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {

    const categoryById = await Category.findByPk(req.params.id, {include: [{ model: Product }],});
    res.status(200).json(categoryById);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({category_name: req.body.category_name})
    res.status(200).json(newCategory);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCatById = await Category.destroy({where: {id: req.params.id}});
    if(!deleteCatById) {
      res.status(404).json({message: 'No category with this Id'});
      return;
    }
    res.status(200).json(deleteCatById);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
