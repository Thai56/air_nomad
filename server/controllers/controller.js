const app = require('../index');
const db = app.get('db');

module.exports = {
  findLocationByKeyword: (req,res,next) => {
    const location = req.params.keyword;
    console.log('location from controller backend', location);
    db.find_location_by_keyword([location],(err,location) => {
      if(!err){
        console.log(location);
        res.status(200).send(location);
      }
      else {
        console.log('this is error',err);
        res.status(422).send(err)
      }
    })
  }
}
