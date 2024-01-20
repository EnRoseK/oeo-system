const { errors } = require("@strapi/utils");
const { ApplicationError } = errors;

module.exports = {
  async beforeCreate(event) {
    const categoryId = event.params.data.product_category?.set?.[0];

    if (categoryId) {
      const category = await strapi.entityService.findOne(
        "api::product-category.product-category",
        categoryId
      );

      if (!category) {
        throw new ApplicationError("Сонгосон ангилал олдсонгүй");
      }
    }
  },

  async afterCreate(event) {
    const { result } = event;

    const data = await strapi.entityService.findOne(
      "api::product.product",
      result.id,
      {
        populate: "product_category",
      }
    );

    if (data.product_category) {
      await strapi.entityService.update(
        "api::product-category.product-category",
        data.product_category.id,
        { data: { productCount: data.product_category.productCount + 1 } }
      );
    }
  },

  async beforeUpdate(event) {
    const categoryId = event.params.data.product_category?.set?.[0];

    if (categoryId) {
      const category = await strapi.entityService.findOne(
        "api::product-category.product-category",
        categoryId
      );

      if (!category) {
        throw new ApplicationError("Сонгосон ангилал олдсонгүй");
      }

      const product = await strapi.entityService.findOne(
        "api::product.product",
        event.params.where.id,
        { populate: "product_category" }
      );

      if (categoryId !== product.product_category.id) {
        await strapi.entityService.update(
          "api::product-category.product-category",
          product.product_category.id,
          { data: { productCount: product.product_category.productCount - 1 } }
        );

        await strapi.entityService.update(
          "api::product-category.product-category",
          categoryId,
          {
            data: { productCount: category.productCount + 1 },
          }
        );
      }
    }
  },

  async beforeDelete(event) {
    const { params } = event;

    const data = await strapi.entityService.findOne(
      "api::product.product",
      params.where.id,
      {
        populate: "product_category",
      }
    );

    if (data.product_category) {
      await strapi.entityService.update(
        "api::product-category.product-category",
        data.product_category.id,
        { data: { productCount: data.product_category.productCount - 1 } }
      );
    }
  },
};
