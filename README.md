#Hungry As Truck ⚡

##Contributors:
- Alex DeMars | @ademars94
- Rob Gonnella | @robgonnella  
- Richard Gutierrez | @richard-gutierrez  
- Max Oldham | @maximusoldham  
- Fernando Orozco | @banando
- Jessica Vliet | @jrvleet


[Hungry as Truck App](https://hungry-as-truck.herokuapp.com/)


[Trello](https://trello.com/b/jMLFbuxz/hungry-as-truck)

[Presentation Deck](slides-deck-1.html)


##The Problem
In larger cities and more populated areas, there is a plethora of great foodtrucks.

- But where are they?

- When will they be near me?

- How long will they be at that location?

##Our Solution
Using the Google Maps API, our team is creating a streamlined, easy-to-use mobile application that connects hungry mother-truckers with food trucks in their area in real-time. These hungry users can view their current location in a map view and all the foodtrucks located around them. Clicking on one of the foodtruck icons on the map will pull up that foodtruck's profile which inludes the foodtruck's name, the address of where it's located, pictures of their truck and food, a menu, and the amount of time they will be serving food at that specific location.

Foodtruck operators will also have accounts within the app. They will be able to post their new locations each day, edit their profile (pictures, menu items, specials, duration at a certain location) and modify their location each day.

##Traction
Hungry As Truck (HAT) aims to help both food truck owners AND hungry mother-truckers, allowing us to market to both groups effectively. Recent trends show a surge in apps in the food arena, such as restaurant finders, food delievery services, restuarant reservations, etc... But nothing prominent in the app store has appeared in the aid the foodtruck world. Surveys indicate that an app like HAT would be highly desired.


##MVP user stories

[x] Hungry person to be able to sign up and go straight to a logged in user page.

[x] Once logged in a hungry person will be able to view a google map.

[x] Once logged in a hungry person will be able to automatically geolocate.

[x] Truck owner can have multiple trucks.

[x] A truck owner can log in and see a map of just their trucks.

[x] A hungry person will be able to see a map of nearby food trucks.

[] Truck owner can click on their truck and update or delete truck info on same page including manually inputing location data.

[] Truck owner can click a button to see other trucks.

[] Hungry person can also input location manually.

[] As a truck owner I want to be able to set a duration and have my truck location removed at the end the duration.

[x] As a user i want to be able to click on a truck and see details, like truck location and link to yelp/truck website.


## Technologies used

- Facebook Oauth
- Node/Express/Mongo/Mongoose
- JavaScript/CSS/Bootstrap/Ajax/jQuery/Lodash
- Google Maps
- Heroku/ Git/ Github

##Unsolved Problems
- We were never able to get to setting a duration time for trucks. 
- We haven't been able to get the info windows on the trucks to close when you click on a new truck. 
- So far our truck data is dummy data we input ourselves. Our app doesn't expose an outside API yet.
- Adding and updating truck info. Got so close, but no cigar.


##Major Hurdles
- Getting comfortable with working with ejs.  
- Getting the trucks to show up on the map. 
- Learning Google Map API. 
- Getting Facebook Oauth to work. 


##API Reference

[Google](https://developers.google.com/maps/?hl=en)

[Facebook](https://developers.facebook.com/docs)











