const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',async (req, res) => {
try{
  const categorydata= await Category.findAll();
  console.log("hi")
  res.status(200).json(categorydata);
}catch (err) {
  res.status(500).json(err)
}

  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async(req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      includes: [{ model: Product, }]
    })
    res.status(200).json(categoryData)
  } catch (err) {
    console.log(err)
    res.status(500).send("Get id - id doesn't exist") // find a single product by its `id`
    // be sure to include its associated Category and Tag data
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async(req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category
});

router.put('/:id',async (req, res) => {
  try {
    const categoryData = await Category.update(req.body,{
      where: {
      id: req.params.id
    }});
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async(req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
