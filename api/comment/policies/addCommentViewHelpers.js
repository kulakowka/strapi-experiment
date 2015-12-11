'use strict';

/**
 * Module dependencies
 */

// Public node modules.
const path = require('path');

exports.addCommentViewHelpers = function * (next) {

  this.state.commentPath = function(comment) {
    return '/comment/' + comment.id
  }

  this.state.commentUrl = function(comment) {
    return strapi.config.frontendUrl + '/comment/' + comment.id
  }

  yield next;
};
