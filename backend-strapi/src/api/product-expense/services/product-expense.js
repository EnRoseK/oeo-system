'use strict';

/**
 * product-expense service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::product-expense.product-expense');
