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

    // Find created product Income
    const createdProductIncome = await strapi.entityService.findOne(
      "api::product-income.product-income",
      result.id,
      { populate: "product" }
    );

    if (createdProductIncome.product) {
      const productBalanceAfterUpdate =
        createdProductIncome.product.balance + result.quantity;

      await strapi.entityService.update(
        "api::product.product",
        createdProductIncome.product.id,
        { data: { balance: productBalanceAfterUpdate } }
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
      const updatedBalance = data.product.balance - data.quantity;

      await strapi.entityService.update(
        "api::product.product",
        data.product.id,
        { data: { balance: updatedBalance } }
      );
    }
  },
};
