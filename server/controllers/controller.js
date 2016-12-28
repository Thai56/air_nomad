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
  },
  getRoomListingProfilePic: (req,res,next) => {
    const room_id = req.params.room_id;
    console.log('room_id from profile pic CTRL backend',room_id);
    db.getRoomListingProfilePic(room_id,(err,pic) => {
      if(!err){
        console.log('this is the profile pic, users.firstname, and users.lst_name',pic);
        res.status(200).send(pic)
      }
      else {
        console.log('this is the error from prof pic ctrl backened',err);
        res.status(422).send(err)
      }
    })
  },
  getRoomListingNightlyPrice : (req,res,next) => {
    const room_id = req.params.room_id;
    console.log('nightly price controller params', room_id);
    db.getRoomListingNightlyPrice(room_id, (err,price) => {
      if(!err){
        console.log('backend nightly price =====> price',price);
        res.status(200).send(price)
      }
      else {
        console.log('backend nightly price ===== > err', err);
        res.status(422).send(err)
      }
    })
  },
  reserveDate: (req,res,next) => {
    const data = req.body;
    console.log('!!!!!data from req.body',req.body);
    const dataArr = [data.room_id,data.start,data.end]
    db.reserveDate(dataArr, (err,response) => {
      if(!err){
        console.log('!!!this is response from controller back eend reserveDAte', response);
        res.status(200).send('your reservation has been booked')
      }
      else {
        console.log('!!!!!this is error from backend reserveDAte', err);
        res.status(422).send(err)
      }
    })
  },
  getRoomListingCoordinates: (req,res,next) => {
    const room_id = req.params.room_id;
    console.log('THIS IS THE COORDINATES BACK END CONTROLLER REQ.PARAMS.ROOM_ID',room_id);
    db.getRoomListingCoordinates(room_id,(err,location) => {
      if (!err) {
        console.log('0o0o0o0This is the LOCATION', location);
        res.status(200).send(location);
      }
      else {
        console.log('o0o0o0o0THIS IS THE ERROR', err);
        res.status(200).send(err)
      }
    })
  }
}
