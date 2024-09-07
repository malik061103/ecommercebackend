const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagdata = await Tag.findAll();
    res.status(300).json(tagdata);
  } catch (err) {
    res.status(500).json(err)
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async(req, res) => {
  try {
    const tagdata = await Tag.findByPk(req.params.id, {
      includes: [{ model: Product, }]
    })
    res.status(200).json(tagdata)
  } catch (err) {
    console.log(err)
    res.status(500).send("Get id - id doesn't exist") 
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async(req, res) => {
  try {
    const tagdata = await Tag.create(req.body);
    res.status(200).json(tagdata);
  } catch(err) {
    res.status(400).json(err);
  }
  // create a new tag
});

router.put('/:id',async (req, res) => {
  try {
    const tagdata = await Tag.update(req.body,{
      where: {
      id: req.params.id
    }});
    res.status(200).json(tagdata);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async(req, res) => {
  try {
    const tagdata = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagdata) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(tagdata);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
