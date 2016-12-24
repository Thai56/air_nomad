const app = require('../index');
const db = app.get('db');

module.exports = {
  findLocationByKeyword: (req,res,next) => {
    const location = req.params.keyword;
    console.log('location from controller backend', location);
    db.find_location_by_keyword(location,(err,location) => {
      if(!err){
        console.log(location);
        res.status(200).send(location);
      }
      else {
        console.log('this is error',err);
        res.status(422).send(err)
      }
    })
  },
  getListingsForHome: (req,res,next) => {
    db.getListingsForHome((err,listings) => {
      if(!err){
        console.log('listings from controller backend',listings);
        res.status(200).send(listings);
      }
      else {
        console.log('this is ther err from the contoller backend',err);
        res.status(422).send(err)
      }
    })
  },
  getRoomListingMainPic: (req,res,next) => {
    const room_id = req.params.room_id;
    console.log(room_id);
    db.getRoomListingMainPic(room_id, (err,image_url) => {
      if(!err){
        console.log('imaage_url from Ctrl backend', image_url);
        res.status(200).send(image_url)
      }
      else {
        console.log('err from ctrl backend');
        res.status(422).send(err)
      }
    })
  },
  getRoomListingMainDesc: (req,res,next) => {
    const room_id = req.params.room_id;
    console.log('room_id from the controller back end this should be the req.parmas.room_id', room_id);
    db.getRoomListingMainDesc(room_id, (err,desc) => {
      if(!err){
        console.log('desc from the controller backend',desc);
        res.status(200).send(desc);
      }
      else {
        console.log('err from the controller backend',err);
        res.status(422).send(err)
      }
    })
  },
  getRoomListingMainAccessories: (req,res,next) => {
    const room_id = req.params.room_id;
    console.log('this is room id from accessories back end controller',room_id);
    db.getRoomListingMainAccessories(room_id, (err, acc)=> {
      if(!err){
        console.log('this is acc from backend CTRL',acc);
        res.status(200).send(acc)
      }
      else {
        console.log('there was err in get acc controller back end',err);
        res.status(422).send(err)
      }
    })
  },
  getRoomListMainCarousel: (req,res,next) => {
    const room_id =req.params.room_id;
    console.log('this is room_id from controller',room_id);
    db.getRoomListMainCarousel(room_id,(err, images) => {
      if(!err) {
        console.log('images from carousel controller backend', images);
        res.status(200).send(images)
      }
      else {
        console.log('err from back end controller carousel',err);
        res.status(404).send('err from the ', err)
      }
    })
  }
}
