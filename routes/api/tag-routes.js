const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const allTags = await Tag.findAll({include: [{ model: Product }],});
  res.status(200).json(allTags)

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagById = await Tag.findByPk(req.params.id, {include: [{ model: Product }],});
  res.status(200).json(tagById);
});

router.post('/', async (req, res) => {
  // create a new tag
  const newTag = await Tag.create({category_name: req.body.tag_name})
  res.status(200).json(newTag);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  
  const updateTag = await Tag.update({tag_name: req.body.category_name}, {where: {id: req.params.id}});
  res.status(200).json(updateTag)

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const deleteTagById = await Tag.destroy({where: {id: req.params.id}});
  if(!deleteTagById) {
    res.status(404).json({message: 'No category with this Id'});
    return;
  }
  res.status(200).json(deleteTagById);
});

module.exports = router;
