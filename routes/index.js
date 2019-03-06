/*
 * GET browse or home page.
 */

exports.view = function(req, res){
  let data = require('../data.json');
  var _ = require('lodash');
  data['selection'] = req.query.dropdown ? req.query.dropdown : 'All classes';
  var dropdown = req.query.dropdown ? req.query.dropdown : 'All classes';
  var professorName = req.query.professorName ? req.query.professorName : 'Scott Klemmer';
  data.records.forEach(function(record){
  	record['category'] = dropdown;
  	record['professorName'] = professorName;
  });
  data.records = _.shuffle( data.records );
  res.render('index', data);
};
