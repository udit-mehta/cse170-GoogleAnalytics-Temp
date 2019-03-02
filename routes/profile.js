/*
 * GET profile page.
 */

exports.updateProfile = function (req, res) {
  var fs = require('fs');
  var fileName = '../data.json';
  var destination = './data.json';
  var file = require(fileName);
  console.log(req.body);
  if( req.body.email )
    file.email = req.body.email;
  if( req.body.password )
    file.password = req.body.password;
  if( req.body.university )
    file.universityName = req.body.university;
  if( req.languages )
    {
      file.languages.clear();
      languages.forEach(function (language) {
        file.languages.push(language);
      });
    }
    console.log("file.languages =");
    console.log(file.languages);

  fs.writeFileSync(destination, JSON.stringify(file));
  res.redirect('/');
};

exports.view = function(req, res){
  let data = require('../data.json');
  res.render('profile', data);
};
