
const mongoose = require('mongoose')
const City = require('../models/City')


const cities =  [
{
  cityname : 'México city',
  photoURL: 'https://www.riotgames.com/darkroom/1440/6d50530c079206a27f4444ce4b481ae1:486c2e1b548055480a3a169743734be8/mexico-city-office-header-1.jpg',
  likes:"2",
  address: {
    coordinates: [-99.1652, 19.3889],
  },
},
{
  cityname: 'Guadalajara',
  photoURL: 'https://www.tripsavvy.com/thmb/FWCAqGGqWegbKD5n_gIYjL3FSEU=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/guadalajara-543937071-592ad53e3df78cbe7eb320dc.jpg', 
  address: {
    coordinates: [-20.6737,103.4054],
  },
},
{
  cityname: 'Oaxaca',
  address: {
    coordinates: [-96.7707,17.0812],
  },
},
{
  cityname: 'Santiago',
  address: {
    coordinates: [-70.7699,-33.4727],
  },
},
{
  cityname: 'Buenos Aires',
  address: {
    coordinates: [-96.7707,17.0812],
  },
},{
  cityname: 'London',
  address: {
    coordinates: [-96.7707,17.0812],
  },
},
{
  cityname: 'Portland', 
  address: {
    coordinates: [-96.7707,17.0812],
  },
},
{
  cityname: 'New York',
  address: {
    coordinates: [-96.7707,17.0812],
  },
},
{
  cityname: 'Vancouver',
  address: {
    coordinates: [-96.7707,17.0812],
  },
},
{
  cityname: 'Barcelona',
  address: {
    coordinates: [-96.7707,17.0812],
  },
},
{
  cityname: 'Berlín', 
  address: {
    coordinates: [-96.7707,17.0812],
  },
},
{
  cityname: 'Paris', 
  address: {
    coordinates: [-96.7707,17.0812],
  }
}
]

mongoose.connect('mongodb://localhost:27017/cities', () => {
  City.create(cities)
    .then (places=>{
      console.log(`You have created ${places.length} succesfully`)
      mongoose.connection.close()
    })
    .catch(err=>{(err)})
  })


