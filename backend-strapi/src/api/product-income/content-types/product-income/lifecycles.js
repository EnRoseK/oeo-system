const { errors } = require("@strapi/utils");
const { ApplicationError } = errors;

module.exports = {
  async beforeCreate(event) {
    const { params } = event;

    if (params.data.basePrice && params.data.quantity) {
      params.data.totalPrice = params.data.basePrice * params.data.quantity;
    }
  },

  async afterCreate(event) {
    const { result } = event;

    const productIncome = await strapi.entityService.findOne(
      "api::product-income.product-income",
      result.id,
      { populate: "product" }
    );

    if (productIncome.product) {
      await strapi.entityService.update(
        "api::product.product",
        productIncome.product.id,
        { data: { balance: productIncome.product.balance + result.quantity } }
      );
    }
  },

  async beforeDelete(event) {
    const { params } = event;

    const data = await strapi.entityService.findOne(
      "api::product-income.product-income",
      params.where.id,
      {
        populate: "product",
      }
    );

    if (data.product.balance - data.quantity < 0) {
      throw new ApplicationError("Үлдэгдэл хүрэлцэхгүй байна");
    }

    if (data.product) {
      await strapi.entityService.update(
        "api::product.product",
        data.product.id,
        { data: { balance: data.product.balance - data.quantity } }
      );
    }
  },
};
