var mongoose = require('./config/database');

var HungryPerson = require('./models/hungryperson');
var TruckOwner = require('./models/truckowner');

var truckowners = [
  {
    orgName: "food truck inc.",
    address: "123 street place",
    email:   "fakeTrucker@gmail.com",
    trucks: [ {
      name:     "Baby's Badass Burgers",
      location: "The Reef",
      isActive: true,
      duration: "2 Hours",
      category: "American"
    } ]
  },
  {
    orgName: "meals on wheels",
    address: "456 second st",
    email:   "fauxTrucker@gmail.com",
    trucks: [{
      name: "The Grilled Cheese Truck",
      location: "The Reef",
      duration: "4 Hours",
      isActive: true,
      category: "American"
    }]
  },
  {
    orgName: "pop up food",
    email:   "falseTrucker@gmail.com",
    trucks: [
    {
      name: "Juana La Cubana",
      location: "The Reef",
      duration: "3 Hours",
      isActive: true,
      category: "Mexican"
    }]
  }
];
var hungryperson = [
  {
    name:    "Fake User",
    email:   "fakeUser@gmail.com",
    photo:   ["http://spinoff.comicbookresources.com/wp-content/uploads/2014/06/mr-t.jpeg"]
  },
  {
    name:    "Faux Profile",
    email:   "fauxProfile@gmail.com",
    photo:   ["https://i.ytimg.com/vi/CMv0V9LqLRo/hqdefault.jpg"]
  },
  {
    name:    "False Account",
    email:   "falseAccount@gmail.com",
    photo:   ["https://media3.giphy.com/media/U7P2vnWfPkIQ8/200_s.gif"]

  }
];


HungryPerson.remove({}, function(err) {
  if (err) console.log(err);
  HungryPerson.create(hungryperson, function(err, hungryperson) {
    if (err) {
      console.log(err);
    } else {
      console.log("Access Granted: Database seeded with " + hungryperson.length  + " users.");
      TruckOwner.remove({}, function(err) {
        if (err) console.log(err);
        TruckOwner.create(truckowners, function(err, truckowners) {
          if (err) {
            console.log(err);
          } else {
            console.log("Access Granted: Database seeded with " + truckowners.length  + " truck owners.");
            mongoose.disconnect();
          }
        });
      });
    }
  });
});


