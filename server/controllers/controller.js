const app = require('../index');
const db = app.get('db');

module.exports = {
    findLocationByKeyword: (req, res, next) => {
        const location = req.params.keyword;
        console.log('location from controller backend', location);
        db.find_location_by_keyword(location, (err, location) => {
            if (!err) {
                console.log(location);
                res.status(200).send(location);
            } else {
                console.log('this is error', err);
                res.status(422).send(err)
            }
        })
    },
    getListingsForHome: (req, res, next) => {
        db.getListingsForHome((err, listings) => {
            if (!err) {
                console.log(')(*&^%$#@#$%^&*(listings from controller backend');
                // res.status(200).send({test: 'hi'});
                res.status(200).send(listings);
            } else {
                console.log('this is ther err from the contoller backend', err);
                res.status(422).send(err)
            }
        })
    },
    getRoomListingMainPic: (req, res, next) => {
        const room_id = req.params.room_id;
        console.log(room_id);
        db.getRoomListingMainPic(room_id, (err, image_url) => {
            if (!err) {
                console.log('imaage_url from Ctrl backend', image_url);
                res.status(200).send(image_url)
            } else {
                console.log('err from ctrl backend');
                res.status(422).send(err)
            }
        })
    },
    getRoomListingMainDesc: (req, res, next) => {
        const room_id = req.params.room_id;
        console.log('room_id from the controller back end this should be the req.parmas.room_id', room_id);
        db.getRoomListingMainDesc(room_id, (err, desc) => {
            if (!err) {
                console.log('desc from the controller backend', desc);
                res.status(200).send(desc);
            } else {
                console.log('err from the controller backend', err);
                res.status(422).send(err)
            }
        })
    },
    getRoomListingMainAccessories: (req, res, next) => {
        const room_id = req.params.room_id;
        console.log('this is room id from accessories back end controller', room_id);
        db.getRoomListingMainAccessories(room_id, (err, acc) => {
            if (!err) {
                console.log('this is acc from backend CTRL', acc);
                res.status(200).send(acc)
            } else {
                console.log('there was err in get acc controller back end', err);
                res.status(422).send(err)
            }
        })
    },
    getRoomListMainCarousel: (req, res, next) => {
        const room_id = req.params.room_id;
        console.log('this is room_id from controller', room_id);
        db.getRoomListMainCarousel(room_id, (err, images) => {
            if (!err) {
                console.log('images from carousel controller backend', images);
                res.status(200).send(images)
            } else {
                console.log('err from back end controller carousel', err);
                res.status(404).send('err from the ', err)
            }
        })
    },
    getRoomListingProfilePic: (req, res, next) => {
        const room_id = req.params.room_id;
        console.log('room_id from profile pic CTRL backend', room_id);
        db.getRoomListingProfilePic(room_id, (err, pic) => {
            if (!err) {
                console.log('this is the profile pic, users.firstname, and users.lst_name', pic);
                res.status(200).send(pic)
            } else {
                console.log('this is the error from prof pic ctrl backened', err);
                res.status(422).send(err)
            }
        })
    },
    getRoomListingNightlyPrice: (req, res, next) => {
        const room_id = req.params.room_id;
        console.log('||||||||||||!!!!!!!THIS IS THE REQ.USER LOCATIED IN GETROOMSLISTNIGHTLYPRICE |||||||||||', req.user);
        console.log('nightly price controller params', room_id);
        db.getRoomListingNightlyPrice(room_id, (err, price) => {
            if (!err) {
                console.log('backend nightly price =====> price', price);
                res.status(200).send(price)
            } else {
                console.log('backend nightly price ===== > err', err);
                res.status(422).send(err)
            }
        })
    },
    reserveDate: (req, res, next) => {
        // console.log('this is the req.body',req.body);
        console.log('SESSION', req.session);
        if (!req.session.bookings) {
            console.log('||||||||||| creating new |||||||||||||', req.session.bookings);
            req.session.bookings = []
                // write a price check
            req.body.buyer_id = req.user.id;
            console.log('@#$%^&* this is the req.body afer adding buyer_id', req.body);
            req.body.id = (req.session.bookings.length + 1)
            req.session.bookings.push(req.body)
            console.log('!@#$%^&* THIS IS THE  NEW REQ.BODY )(*&^%$#@)', req.body);
            console.log("!@#$%^&*( this is the req.session.bookings)", req.session.bookings);
            res.send(req.session.bookings)
        } else {
            console.log('@#$%^&* THis is req. SESSION.BOOKINGS.LENGTH BEFORE WE INCREMENT', req.session.bookings.length);
            req.body.id = (req.session.bookings.length + 1)
            req.body.buyer_id = req.user.id
            console.log('@#$%^&*this is the req.body after adding the buyer_id in else statement', req.body);
            console.log('THIS IS THE REQ>BODY> after we add ID', req.body);
            req.session.bookings.push(req.body)
            console.log('THIS IS THE REQ>session with the >BOOKINGS pushed ', req.session);
            res.send(req.session.bookings)

        }
        console.log('THIS IS THE REQ>SESSION', req.session);


    },
    getRoomListingCoordinates: (req, res, next) => {
        const room_id = req.params.room_id;
        console.log('THIS IS THE COORDINATES BACK END CONTROLLER REQ.PARAMS.ROOM_ID', room_id);
        db.getRoomListingCoordinates(room_id, (err, location) => {
            if (!err) {
                console.log('0o0o0o0This is the LOCATION', location);
                res.status(200).send(location);
            } else {
                console.log('o0o0o0o0THIS IS THE ERROR', err);
                res.status(200).send(err)
            }
        })
    },
    addReview: (req, res, next) => {
        const data = req.body;
        console.log('THIS IS THE DATA FROM ADDREVIEW CONTROLLER BACKEND', data);
        const user_id = req.user.id
        console.log('this is the user id', user_id);
        const dataArray = [data.stars, data.text, data.room_id, user_id]
        console.log('THIS IS THE ARRAY OF DATA', dataArray);
        db.addReview(dataArray, (err, response) => {
            //**  write a getReviews functions and add inside of this function once written **
            if (!err) {
                console.log('response from Database ', response);
                // db.getReviews(data.room_id, (err, reviews) => {
                //     if (!err) {
                //         res.status(200).send(reviews)
                //     } else {
                //         res.status(404).send(err)
                //     }
                // });
                res.status(200).send('Your Review has Been Successfully Added!')
            } else {
                console.log('error from DB', err);
                res.status(422).send(err)
            }
        })
    },
    getReviews: (req, res, next) => {
        const room_id = req.params.room_id;
        console.log('This is the room_id from getReviews', room_id);
        db.getReviews(room_id, (err, reviews) => {
            if (!err) {
                console.log('this is reviews again from DB ===> ', reviews);
                res.status(200).send(reviews)
            } else {
                console.log('this is the error from DB getREviews', err);
                res.status(422).send(err);
            }
        })
    },
    getUsersProfilePic: (req, res, next) => {
        const user_id = req.params.user_id;
        console.log('THIS IS USER_ID FROM GETUSERSPRFILEPIC', user_id);
        db.getUsersProfilePic(user_id, (err, pic) => {
            if (!err) {
                res.status(200).send(pic)
            } else {
                res.status(422).send(err)
            }
        })
    },
    getHostDesc: (req, res, next) => {
        const user_id = req.params.user_id
        console.log('THIS IS GETHOSTDESC BACKEND CTRL ENTERING', user_id);
        db.getHostDesc(user_id, (err, desc) => {
            if (!err) {
                console.log("THIS IS DESC FROM BACKEND SEND", desc);
                res.status(200).send(desc)
            } else {
                console.log("THIS IS THE ERROR", err);
                res.status(422).send(err)
            }
        })
    },
    getHostListings: (req, res, next) => {
        const user_id = req.params.user_id;
        console.log('This is USER ID BACKAEND CONTROLLER', user_id);
        db.getHostListings(user_id, (err, listings) => {
            if (!err) {
                console.log('WE GOT IT LISTINGS', listings);
                res.status(200).send(listings)
            } else {
                console.log('error', err);
                res.status(422).send(err)
            }
        })
    },
    getConversationProfilePic: (req, res, next) => {
        const user_id = req.params.user_id;
        console.log('========>USER_ID FROM getconversations COMING IN', user_id);
        db.getConversationProfilePic(user_id, (err, pic) => {
            if (!err) {
                console.log('THIS IS ON THE WAY OUT FROM GETCONVPROFILEPIC', pic);
                res.status(200).send(pic)
            } else {
                console.log('THIS IS THE ERROR', err);
                res.status(422).send(err);
            }
        })
    },
    getConversationUsername: (req, res, next) => {
        const user_id = req.params.user_id;
        db.getConversationUsername(user_id, (err, username) => {
            if (!err) {
                res.status(200).send(username)
            } else {
                res.status(422).send(err)
            }
        })
    },
    getRoomThisLocationInfo: (req, res, next) => {
        const room_id = req.params.room_id;
        console.log('This is current location room_id', room_id);
        db.getRoomThisLocationInfo(room_id, (err, location) => {
            if (!err) {
                console.log('this is the from controller backend getRoomThisLocationInfo', location);
                res.status(200).send(location)
            } else {
                console.log('this is the from controller backend getRoomThisLocationInfo', err);
                res.status(422).send(err)
            }
        })
    },
    getRoomsNearby: (req, res, next) => {
        const data = req.params;
        const dataArr = [data.room_id, data.city_name];
        console.log('this is the data array from getRoomsNearby', dataArr);
        db.getRoomsNearby(dataArr, (err, nearbyRooms) => {
            if (!err) {
                console.log('nearby rooms from getRoomsNearby', nearbyRooms);
                res.status(200).send(nearbyRooms)
            } else {
                console.log('err from nearbyRooms', err);
                res.status(200).send(err)
            }
        })
    },
    getSearchListings: (req, res, next) => {
        console.log('This is the req.query.search', req.query.search);
        const search_string = req.query.search;
        db.getSearchListings(search_string, (err, listings) => {
            if (!err) {
                console.log('these are the listings from getSearchListings', listings);
                res.status(200).send(listings)
            } else {
                console.log("this is the err", err);
                res.status(422).send(err)
            }
        })
    },
    filterSearchListings: (req, res, next) => {
        console.log(req.body);
        const obj = req.body;
        const filterArr = [obj.minPrice, obj.maxPrice, obj.acc, obj.bath, obj.bed, obj.tv, obj.kitchen, obj.internet, obj.heating, obj.ac, obj.searchString]
        console.log(filterArr);
        db.filterSearchListings(filterArr, (err, results) => {
            if (!err) {
                console.log('||||||||||||||results from filterSearchListings', results);
                res.status(200).send(results)
            } else {
                console.log('error from filterSearchListings', err);
                res.status(422).send(err)
            }
        })
    },
    getUserById: (req, res, next) => {
        const user_id = req.params.user_id;
        console.log('this is the user_Id', user_id);
        db.getUserByIdForDropdown(user_id, (err, user_obj) => {
            if (!err) {
                console.log('This is the User Obj', user_obj);
                res.status(200).send(user_obj)
            } else {
                console.log('this is the error', err);
                res.status(422).send(err)
            }
        })
    },
    insertMessage: (req, res, next) => {
        const messageObj = req.body;
        const currentUser = req.user;
        // function() {
        //check to see if room exists

        // if not create room set counter variable

        // }
        // req.seession.room8 = [{message:'',sender_id:6},reciever_id:8]
        // req.seession.room8.push({message:messageObj.message,sender_id:messsageObj.sender,reciever_id:messageObj.reciever})
        console.log(req.body.message_recepient, req.user.id);
        const dataArr = [messageObj.user_message, currentUser.id, messageObj.message_recepient, messageObj.message_time]
        console.log('this is the data array', dataArr);
        db.insertMessage(dataArr, (err, message) => {
            if (!err) {

            } else {
                console.log('This is the err from insertMessage backend', err);
                res.status(422).send(err)
            }
        })
    },
    getConversation: (req, res, next) => {
        const host_id = req.params.host_id;
        const user_id = req.user.id

        db.getConversation([host_id, user_id], (err, messages) => {
            if (!err) {
                console.log('||||||||||||||||these are the messages from getCONVERSATIONS', messages);
                res.status(200).send(messages)
            } else {
                console.log('this is the err from get conversations', err);
                res.status(422).send(err)
            }
        })
    },
    saveChanges: (req, res, next) => {
        const editObj = req.body;
        console.log('!!!!!this is the editObj', editObj);
        console.log('!!!!!this is the req.user', req.user);
        for (var k in req.user) {
            console.log('%%%%%%THIS IS K%%%%%', k);
            for (var j in editObj) {
                console.log("$$$$$J$$$$$$", j);
                if (k === j) {
                    console.log('@@@@@@@@@@@@@@THESE MATCH@@@@@@@@@', k)
                    console.log('########### AND THESE ARE THEIR VALUES  ####', req.user[k]);
                    console.log('^^^^^^^^^^ AND THESE ARE THEIR NEW VALUES ^^^^', editObj[j]);
                    req.user[k] = editObj[j]

                }
            }
        }
        console.log('&&&&&&&&&&&THIS IS THE NEW REQ.USER&&&&&&&&', req.user);
        const newUser = req.user
        const newUserArr = [newUser.first_name, newUser.last_name, newUser.email, newUser.gender, newUser.where_you_live, newUser.preffered_currency, newUser.password, newUser.id]
            // db.update_user_in_users()
        console.log('++++++++++++++++ NEWUSER ++++++++++++', newUser);
        console.log('|||||||||||||| NEWUSERARRAY ||||||||||||', newUserArr);
        // now to write a schema for the updating the user in the users table
        //db.updateUserInUsers => update_user_in_users
        db.update_user_in_users(newUserArr, (err, success) => {
            if (!err) {
                console.log('~~~~~~~~~~~~~~ this is the success ~~~~~~~~~~~', success);
                res.status(200).send('Your User Profile has been Successfully Updated')
            } else {
                console.log('=========== this is the error ========', err);
                res.status(422).send(err)
            }
        })

    },
    getListingsForView: (req, res, next) => {
        console.log('!@#$%^&*( THIS IS REQ.QUERY.USER_ID ))(*&^%$#@!)', req.query.user_id);
        db.getListingsForView(req.query.user_id, (err, listings) => {
            if (!err) {
                console.log('!@#$%^&*() LISTINGS )(*&^%$#@!)', listings);
                res.status(200).send(listings)
            } else {
                res.status(422).send(err)
            }
        })
    },
    addUser: (req, res, next) => {
        console.log('user', req.body);
        const user = req.body
        const userArr = [user.first_name, user.last_name, user.email, user.password]
            //see if user already exists using email because email is used to sign in
        db.userCheck(user.email, (err, user) => {
            if (!err) {
                console.log('THIS IS THE USER FROM USERCHECK', user.length);
                if (user.length > 0) {
                    console.log('this is the user length that was greater than 1', user);
                    res.status(422).send('This User already exists')
                } else {
                    db.addUser(userArr, (err, user) => {
                        if (!err) {
                            console.log('res', user);
                            res.status(200).send('Your Submission Was A Success!')
                        } else {
                            console.log('this is the error', err);
                            res.status(422).send(err)
                        }
                    })
                }
            } else {
                console.log('This is the error', err);
                res.status(422).send(err)
            }

        })

    },
    getUserBookingsById: (req, res, next) => {
        if (!req.session.bookings) req.session.bookings = [];
        console.log(req.session.bookings)
        console.log('#$%^&* THIS IS THE PARAMS', req.params.id);
        console.log('#$%^&*( req.SESSION.bookings) $%^&*()', req.session.bookings);
        console.log("!@#$%^&*( THIS IS REQ.SESSION ))(*&^%$#)", req.session);
        console.log('@#$%^&*( this is the req.user.id)', req.user.id);
        const sess = req.session;
        var userbookArr = [];
        for (var i = 0; i < sess.bookings.length; i++) {
            console.log(sess.bookings[i]);
            if (sess.bookings[i].buyer_id === req.user.id) {
                userbookArr.push(sess.bookings[i])
                console.log('@#$%^&* this is all userbookArr )(*&^%$#@!)', userbookArr);
            }
        }
        res.send(userbookArr);
    },
    getRoomInfoByIdForReservations: (req, res, next) => {
        var roomsArray = []
        var splitStr = req.query.rooms.split(',')
        console.log('$%^&*() THIS IS splitStr )(*&^%)', splitStr);
        splitStr.forEach(room => {
            room = (room * 1)
            db.getRoomInfoByIdForReservations(room, (err, info) => {
                if (!err) {
                    console.log('@#$%^& THIS IS THE INFO FROM getRoomInfoByIdForReservations()(*&^%$)', info);
                    // res.status(200).send(info)
                    roomsArray.push(info)
                    console.log('#$%^&*()THIS IS THE ROOMS ARRAY (*&^%$)', roomsArray);
                } else {
                    console.log("$%^&*( HERS THE ERR FROM getRoomInfoByIdForReservations", err);
                    res.status(422).send(err)
                }
                return roomsArray
            })
            res.status(200).send(roomsArray)
            return roomsArray
        })
        console.log('#$%^&* THIS IS ROOMSARRAY )(*&^%)', roomsArray);
        //try returning here next
    },
    logSession: (req, res, next) => {
      if(!req.session.bookings || req.session.bookings.length < 1){
        console.log('#$%^&* THIS USER HAD NO BOOKINGS )(*&^%$#)', req.user, req.session.bookings);
        next();
      }
      else {
        console.log("$%^&* THIS IS THE REQ.SESSION (*&^%)", req.session);
        var myArray = []
        req.session.bookings.forEach(booking => {
            if (booking.buyer_id === req.user.id) {
                myArray.push(booking)
            }
        })
        console.log('$%^&* this is myARRAY FROM LOGSESSION', myArray);
        myArray.forEach(sess => {
            var dataArr = [sess.buyer_id, sess.room_id, sess.start, sess.end, sess.price]
            db.insertUserSessionBookings(dataArr, (err, succ) => {
                if (!err) {
                    console.log('$%^&*( THIS IS REQ.SESSION INSIDE OF DBINSERTUSERSESSBOOK )(*&^%$)', req.session);
                    req.session.bookings.forEach((booking, i) => {
                        if (booking.buyer_id === sess.buyer_id) {
                            console.log('#$%^&* booking from req.session.bookings.forEach )(*&^%)', booking);
                            req.session.bookings.splice(i, 1)
                        }
                    })
                    console.log('$%^&*() REQ.SESSION AFTER', req.session);
                    next()
                } else {
                    res.status(422).send(err)
                }
            })
        })
      }

    },
    cancelBooking: (req, res, next) => {
        // var myArray = [];
        // console.log('@#$%^&*( THIS IS THE REQ.PARAMS.BOOKING_ID)', req.params.booking_id);
        // console.log('#$%^&*() THIS IS THE REQ.USER.id ()*&^%$', req.user.id);
        // console.log('$%^&*( THUS US REQ.SESSION.BOOKINGS)', req.session.bookings);
        // for (var i = 0; i < req.session.bookings.length; i++) {
        //     console.log('$%^&*( THIS IS req.session.bookings[i])', req.session.bookings[i]);
        //     if (req.session.bookings[i].buyer_id === req.user.id) {
        //         console.log('#$%^&*( THIS IS THE req.session.bookings[i].buyer_id that = req.user.id)', req.session.bookings[i].buyer_id);
        //         for (var k in req.session.bookings[i]) {
        //             if (req.session.bookings[i].id === req.params.booking_id) {
        //                 console.log('$%^&*( THIS IS REQ.SESSIONS BOOKING ID THAT MATCHES REQ.PARAMS ROOM ID)');
        //                 req.session.bookings.splice(i, 1)
        //                 console.log('#$%^&*( This is req.session.bookings after the splice)',req.session.bookings);
        //             }
        //         }
        //     }
        // }
        console.log('@#$%^&*( THIS IS THE REQ.PARAMS.BOOKING_ID)', req.params.booking_id);
        console.log('#$%^&*() THIS IS THE REQ.USER.id ()*&^%$', req.user.id);
        console.log('$%^&*( THUS US REQ.SESSION.BOOKINGS)', req.session.bookings);
        var myArray = []
        req.session.bookings.forEach((booking,index) => {
          console.log('#$%^&* THIS IS EACH BOOKING )(*&^%$)', booking);
          if(booking.buyer_id === req.user.id){
            console.log('#$%^&*( THIS booking matches the user.id)', booking);
            if((booking.id * 1) === (req.params.booking_id * 1)){
              console.log("#$%^&*( THERE WAS A MATCH )", booking);
              req.session.bookings.splice(index,1)
            }
          }
          console.log('@#$%^& THIS IS BOOKINGS OUTSIDE OF FOREACHLOOP', req.session.bookings);
          // res.status(200).end(req.session.bookings)
        })

        res.status(200).send(req.session.bookings)




        console.log('#$%^&*( THIS IS THE req.session.bookings after splice )', req.session.bookings);

    },
    deleteAccount: (req,res,next)=> {
      console.log('#$%^&* req.params.id', req.params.id);
      const id = req.params.id;
      console.log('#$%^&*( ID ) )(*&^%$)', id);
      db.deleteAccount(id,(err,del)=> {
        if(!err){
          console.log('#$%^&* THIS IS THE deleted', del);

            req.logout();
            console.log(req.user);
            res.send({redirect:'home'});
        }
        else {
          console.log('#$%^&* THIS IS THE ERR )(*&^%$)', err);
          res.status(422).send(err)
        }
      })
    },
    getBookingsFromDBforTrips: (req,res,next) => {
      console.log(req.params.user_id);
      const user_id = req.params.user_id;
      db.getBookingsFromDBforTrips(user_id, (err,bookings) => {
        if(!err){
          res.status(200).send(bookings)
        }
        else {
          res.status(422).send(err)
        }
      })
    },
    deleteTripFromDB: (req,res,next)=> {
      console.log('#$%^&* THIS IS REQ>PARAMS>RES>ID', req.params.res_id);
      const res_id = req.params.res_id;
      db.deleteTripFromDB(res_id, (err,succ)=> {
        if(!err){
          console.log('$%^&* THIS IS SUCCESS (*&^)', succ);
          db.getBookingsFromDBforTrips(req.user.id, (err,bookings)=> {
            console.log('#$%^& THIS IS ERR (*&^%)', err);
            if(!err){
              console.log('#$%^&* THIS IS BOOKINGS (*&^%)', bookings);
              res.status(200).send(bookings)
            }
            else {
              console.log('#$%^&* THIS IS ERR', err);
              res.status(422).send(err)
            }
          })
        }
        else {
          console.log('#$%^&* THIS IS ERR FROM DELET TRIPDB', err);
          res.status(422).send(err)
        }
      })
    }
}
