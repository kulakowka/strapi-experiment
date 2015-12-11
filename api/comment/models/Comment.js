'use strict';

/**
 * Module dependencies
 */

// Node.js core.
var fs = require('fs');
var path = require('path');
var anchor = require('anchor');
var Waterline = require('waterline');

// Public node modules.
const _ = require('lodash');

// Settings for the Comment model.
const settings = require('./Comment.settings.json');

/**
 * Export the Comment model
 */

module.exports = {

  /**
   * Basic settings
   */

  // The identity to use.
  identity: settings.identity,

  // The connection to use.
  connection: settings.connection,

  // Do you want to respect schema?
  schema: settings.schema,

  // Limit for a get request on the list.
  limit: settings.limit,

  // Merge simple attributes from settings with those ones.
  attributes: _.merge(settings.attributes, {

  }),

  // Do you automatically want to have time data?
  autoCreatedAt: settings.autoCreatedAt,
  autoUpdatedAt: settings.autoUpdatedAt,

  /**
   * Lifecycle callbacks on create
   */

  // Before validating value
  beforeValidate: function (values, next) {
    // WARNING: Don't remove this part of code if you don't know what you are doing
    const api = path.basename(__filename, '.js').toLowerCase();

    if (strapi.api.hasOwnProperty(api) && _.size(strapi.api[api].templates)) {
      const template = strapi.api[api].templates.hasOwnProperty(values.template) ? values.template : strapi.models[api].defaultTemplate;

      // Set template with correct value
      values.template = template;

      // Merge model type with template validations
      const templateAttributes = _.merge(_.pick(strapi.models[api].attributes, 'lang'), strapi.api[api].templates[template].attributes);
      const err = [];

      _.forEach(templateAttributes, function(rules, key){
        if (key === 'lang') {
          // Set lang with correct value
          values[key] = _.includes(strapi.config.i18n.locales, values[key]) ? values[key] : strapi.config.i18n.defaultLocale;
        } else if(values.hasOwnProperty(key)) {
          // Check rules
          const test = anchor(values[key]).to(rules);

          if (test) {
            err.push(rulesTest[0]);
          }
        } else {
          rules.required && err.push({
            rule: "required",
            message: "Missing attributes " + key
          });
        }
      });

      // Go next step or not
      _.isEmpty(err) ? next() : next(err);
    } else {
      next(new Error('Unknow API or no template detected'));
    }
  }

  // Before creating a value.
  // beforeCreate: function (values, next) {
  //   next();
  // },

  // After creating a value.
  // afterCreate: function (newlyInsertedRecord, next) {
  //   next();
  // },

  /**
   * Lifecycle callbacks on update
   */

  // Before updating a value.
  // beforeUpdate: function (valuesToUpdate, next) {
  //   next();
  // },

  // After updating a value.
  // afterUpdate: function (updatedRecord, next) {
  //   next();
  // },

  /**
   * Lifecycle callbacks on destroy
   */

  // Before updating a value.
  // beforeDestroy: function (criteria, next) {
  //   next();
  // },

  // After updating a value.
  // afterDestroy: function (destroyedRecords, next) {
  //   next();
  // }
};