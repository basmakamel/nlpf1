/**
 * Ticket.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {

  attributes: {
    client_mail: {
        type: "string",
        required: true
    },
    address: {
        type: "string",
        required: true
    },
    direction: {
        type: "string",
        required: true
    },
    image: {
        type: "ref",
        columnType: "bytea",
        required : false,
    },
    status: {
        type: "string",
        required: true
    },
    tag: {
        type: "string",
        required: false,
        unique: true
    },
    meeting_date: {
        type: "string",
        required: false
    },
    meeting_time_start: {
        type: "string",
        required: false
    },
    meeting_time_end: {
        type: "string",
        required: false
    },
    admin_comment: {
        type: "string",
        required: false
    }
}

};

