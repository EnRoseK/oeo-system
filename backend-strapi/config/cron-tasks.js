module.exports = {
  createProductReport: {
    task: async ({ strapi }) => {
      const today = new Date().toISOString().split("T")[0];

      // Find all existing products
      const existingProducts = await strapi.entityService.findMany(
        "api::product.product"
      );

      for (const product of existingProducts) {
        // Find if report for today and current product exist
        const reportExist = await strapi.entityService.findMany(
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
                      $eq: product.id,
                    },
                  },
                },
              ],
            },
          }
        );

        // If report doesn't exist, create one
        if (reportExist.length === 0) {
          await strapi.entityService.create(
            "api::product-report.product-report",
            {
              data: {
                before: product.balance,
                after: product.balance,
                incomeAmount: 0,
                expenseAmount: 0,
                product: product.id,
              },
            }
          );
        }
      }
    },
    options: {
      rule: "0 0 5 * * *",
    },
  },

  createIncomeReport: {
    task: ({ strapi }) => {},
    options: {
      rule: "0 0 1 * * *",
    },
  },
};
