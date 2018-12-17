/**
 * CalendarController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  calendar: async function (req, res) {
    return res.view("calendar");
  }
};

