const { errors } = require("@strapi/utils");
const { ApplicationError } = errors;

module.exports = {
  async beforeCreate(event) {
    const { params } = event;

    if (params.data.product && params.data.product.set?.[0]) {
      const product = await strapi.entityService.findOne(
        "api::product.product",
        params.data.product.set[0]
      );

      if (product.balance - params.data.quantity < 0) {
        throw new ApplicationError("Үлдэгдэл хүрэлцэхгүй байна");
      }
    }

    if (params.data.basePrice && params.data.quantity) {
      params.data.totalPrice = params.data.basePrice * params.data.quantity;
    }
  },

  async afterCreate(event) {
    const { result } = event;

    const produceExpense = await strapi.entityService.findOne(
      "api::product-expense.product-expense",
      result.id,
      { populate: "product" }
    );

    if (produceExpense.product) {
      await strapi.entityService.update(
        "api::product.product",
        produceExpense.product.id,
        { data: { balance: produceExpense.product.balance - result.quantity } }
      );
    }
  },

  async beforeDelete(event) {
    const { params } = event;

    const data = await strapi.entityService.findOne(
      "api::product-expense.product-expense",
      params.where.id,
      {
        populate: "product",
      }
    );

    if (data.product) {
      await strapi.entityService.update(
        "api::product.product",
        data.product.id,
        { data: { balance: data.product.balance + data.quantity } }
      );
    }
  },
};
