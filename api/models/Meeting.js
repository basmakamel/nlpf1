/**
 * Meeting.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        date: {
            type: "string",
            required: true
        },
        hour: {
            type: "string",
            required: true
        },
        tag: {
            type: "string",
            required: true
        }
    }
    
};

