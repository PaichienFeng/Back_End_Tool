const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/tags', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    
    const allTags= await Tag.findAll({
      include:[{
        model:Product, through: ProductTag, as: 'product_tags'
      }]
    });
      res.status(200).json(allTags);
    } catch (err) {
      res.status(500).json(err)
    }
});

router.get('/tags/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    
    const tags= await Tag.findByPk(req.params.id,{
      include:[{
        model:Product, through: ProductTag, as: 'product_tag'
      }]
    });
      res.status(200).json(tags);
    } catch (err) {
      res.status(500).json(err)
    }
});

router.post('/tags',async (req, res) => {
  // create a new tag
  try {
    
    const newTag= await Tag.creat(req.body);
      res.status(200).json(newTag);
    } catch (err) {
      res.status(500).json(err)
    }
});

router.put('/tags/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    
    const updatedTag= await Tag.update(req.body,{
      where: req.params.id
    });
      res.status(200).json(updatedTag);
    } catch (err) {
      res.status(500).json(err)
    }
});

router.delete('/tags/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    
    const deletedTag= await Tag.destroy({
      where: req.params.id
    });
      res.status(200).json(deletedTag);
    } catch (err) {
      res.status(500).json(err)
    }
});

module.exports = router;
