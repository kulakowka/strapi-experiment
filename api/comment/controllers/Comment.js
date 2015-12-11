'use strict';

const model = 'comment';

/**
 * A set of functions called "actions" for `Comment`
 */

module.exports = {

  /**
   * Get Comment entries.
   *
   * @return {Object|Array}
   */

  index: function * () {
    this.model = model;
    try {
      this.state.comments = yield strapi.hooks.blueprints.find(this);
      yield this.render('comments/index');
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Get a specific Comment.
   *
   * @return {Object|Array}
   */

  show: function * () {
    this.model = model;
    try {
      this.state.comment = yield strapi.hooks.blueprints.findOne(this);
      yield this.render('comments/show');
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Create a Comment entry.
   *
   * @return {Object}
   */

  create: function * () {
    this.model = model;
    try {
      let entry = yield strapi.hooks.blueprints.create(this);
      this.body = entry;
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Update a Comment entry.
   *
   * @return {Object}
   */

  update: function * () {
    this.model = model;
    try {
      let entry = yield strapi.hooks.blueprints.update(this);
      this.body = entry;
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Destroy a Comment entry.
   *
   * @return {Object}
   */

  destroy: function * () {
    this.model = model;
    try {
      let entry = yield strapi.hooks.blueprints.destroy(this);
      this.body = entry;
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Add an entry to a specific Comment.
   *
   * @return {Object}
   */

  add: function * () {
    this.model = model;
    try {
      let entry = yield strapi.hooks.blueprints.add(this);
      this.body = entry;
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Remove a specific entry from a specific Comment.
   *
   * @return {Object}
   */

  remove: function * () {
    this.model = model;
    try {
      let entry = yield strapi.hooks.blueprints.remove(this);
      this.body = entry;
    } catch (err) {
      this.body = err;
    }
  }
};
