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
                    $eq: createdProductIncome.product.id,
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
              incomeAmount:
                productReport[0].incomeAmount + createdProductIncome.quantity,
              after: productReport[0].after + createdProductIncome.quantity,
            },
          }
        );
      } else {
        await strapi.entityService.create(
          "api::product-report.product-report",
          {
            data: {
              product: createdProductIncome.product.id,
              before: createdProductIncome.product.balance,
              after: productBalanceAfterUpdate,
              expenseAmount: 0,
              incomeAmount: createdProductIncome.quantity,
            },
          }
        );
      }
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
              incomeAmount: productReportExist[0].incomeAmount - data.quantity,
              after: productReportExist[0].after - data.quantity,
            },
          }
        );
      }
    }
  },
};
