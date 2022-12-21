const router = require("express").Router();
// const { any } = require("sequelize/types/lib/operators");
// const { any } = require("sequelize/types/lib/operators");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  const categoryData = await Category.findAll({
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  });
  // be sure to include its associated Products

  res.send(categoryData);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  const categoryData = await Category.findOne({
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
    where: {
      id: req.params.id,
    },
  });
  // be sure to include its associated Products
  res.send(categoryData);
});

router.post("/", async (req, res) => {
  // create a new category
  // const newData = await Category.create({
  //   category_name: req.body.category_name,
  // });

  Category.create(req.body).then((response) => {
    res.status(200).json(response);
  });

  // res.send(newData);
});

router.put("/:id", async (req, res) => {
  try {
    // update a category by its `id` value
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send(`Category Updated`);
  } catch {
    res.send("Category not updated !");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // delete a category by its `id` value

    const newCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send(`Category deleted successfully !`);
  } catch (err) {
    console.log(err);
    res.send(`Category not deleted, try again!`);
  }
});

module.exports = router;
