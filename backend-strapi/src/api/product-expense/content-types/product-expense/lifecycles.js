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

      const today = new Date().toISOString().split("T")[0];

      const productReport = await strapi.entityService.findMany(
        "api::product-report.product-report",
        {
          filters: {
            $and: [
              {
                createdAt: {
                  $gte: today + "T00:00:00.000Z",
                },
              },
              {
                createdAt: {
                  $lte: today + "T23:59:59.999Z",
                },
              },
              {
                product: {
                  id: {
                    $eq: produceExpense.product.id,
                  },
                },
              },
            ],
          },
        }
      );

      if (productReport.length > 0) {
        await strapi.entityService.update(
          "api::product-report.product-report",
          productReport[0].id,
          {
            data: {
              expenseAmount:
                productReport[0].expenseAmount + produceExpense.quantity,
              after: productReport[0].after - produceExpense.quantity,
            },
          }
        );
      } else {
        await strapi.entityService.create(
          "api::product-report.product-report",
          {
            data: {
              product: produceExpense.product.id,
              before: produceExpense.product.balance,
              after: produceExpense.product.balance - result.quantity,
              expenseAmount: produceExpense.quantity,
              incomeAmount: 0,
            },
          }
        );
      }
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

      const today = new Date().toISOString().split("T")[0];
      const productReportExist = await strapi.entityService.findMany(
        "api::product-report.product-report",
        {
          filters: {
            $and: [
              {
                createdAt: {
                  $gte: today + "T00:00:00.000Z",
                },
              },
              {
                createdAt: {
                  $lte: today + "T23:59:59.999Z",
                },
              },
              {
                product: {
                  id: {
                    $eq: data.product.id,
                  },
                },
              },
            ],
          },
        }
      );

      if (productReportExist[0]) {
        await strapi.entityService.update(
          "api::product-report.product-report",
          productReportExist[0].id,
          {
            data: {
              expenseAmount:
                productReportExist[0].expenseAmount - data.quantity,
              after: productReportExist[0].after + data.quantity,
            },
          }
        );
      }
    }
  },
};
