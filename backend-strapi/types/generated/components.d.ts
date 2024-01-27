import type { Schema, Attribute } from '@strapi/strapi';

export interface IncomeReportExpenseByType extends Schema.Component {
  collectionName: 'components_income_report_expense_by_types';
  info: {
    displayName: 'ExpenseByType';
  };
  attributes: {
    type: Attribute.Enumeration<['CARD', 'CASH', 'TRANSFER', 'RENT']> &
      Attribute.Required;
    amount: Attribute.Integer & Attribute.Required;
  };
}

export interface IncomeReportIncomeByType extends Schema.Component {
  collectionName: 'components_income_report_income_by_types';
  info: {
    displayName: 'incomeByType';
  };
  attributes: {
    type: Attribute.Enumeration<['CARD', 'CASH', 'TRANSFER', 'RENT']> &
      Attribute.Required;
    amount: Attribute.Integer & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'income-report.expense-by-type': IncomeReportExpenseByType;
      'income-report.income-by-type': IncomeReportIncomeByType;
    }
  }
}
