
const mongoose = require('mongoose')
const City = require('../models/City')


const cities =  [
{
  cityname : 'Mexico city',
  photoURL: 'https://www.riotgames.com/darkroom/1440/6d50530c079206a27f4444ce4b481ae1:486c2e1b548055480a3a169743734be8/mexico-city-office-header-1.jpg',
  info: "Mexico City is the capital city of Mexico and one of the most important political, cultural, educational and financial centres in North America. It is ranked as the eighth richest city in the world. Settling on an altitude of more than 2,000 metres, tourists are instantly enamoured by the city's glamour, cultural heritage and contemporary development. Every corner of the city is sprinkled with stories to tell of famous personalities and ancient tribes. While the Aztecs discovered and gave the city its culture and heritage, the Spanish revamped and added their touch. Today, the cultural amalgamation is mirrored in every landmark of Mexico City, be it the Templo Mayor, El Zócalo square, Catedral Metropolitana or Frida Kahlo museum.",
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
  photoURL: 'http://s1.1zoom.me/b5050/402/Mexico_Temples_Church_Cactuses_Santo_Domingo_552796_2880x1800.jpg',
  address: {
    coordinates: [-96.72365,17.06542],
  },
},
{
  cityname: 'Santiago',
  photoURL: 'https://i3.visitchile.com/img/GalleryContent/2979/11173-san-pedro-de-atacama-valparaiso-santiago.jpg',
  address: {
    coordinates: [-70.7699,-33.4727],
  },
},
{
  cityname: 'Buenos Aires',
  photoURL: 'https://www.eltiempo.com/Multimedia/galeria_fotos/internacional14/IMAGEN/IMAGEN-13863260-2.png',
  address: {
    coordinates: [-34.61315, -58.37723],
  },
},{
  cityname: 'London',
  photoURL:'https://d2z6c3c3r6k4bx.cloudfront.net/uploads/event/logo/1053664/3d32524b03040a6202008072a8f24b6a.jpg',
  address: {
    coordinates: [51.508530,-0.076132],
  },
},
{
  cityname: 'Portland',
  photoURL:'https://media2.trover.com/T/549615ee26c48d277d000f54/fixedw_large_4x.jpg',
  address: {
    coordinates: [45.512794, -122.679565],
  },
},
{
  cityname: 'New York',
  photoURL:'http://www.graylinewest.com/wp-content/uploads/2016/10/Central-Park.jpg',
  address: {
    coordinates: [40.730610,-73.935242],
  },
},
{
  cityname: 'Vancouver',
  photoURL:'https://www.canadianbusiness.com/wp-content/uploads/2017/04/08.-Vancouver_British_Columbia-2.jpg',
  address: {
    coordinates: [-123.1939,49.2577],
  },
},
{
  cityname: 'Barcelona',
  photoURL:'https://images8.alphacoders.com/354/thumb-1920-354497.jpg',
  address: {
    coordinates: [41.3947,2.0086],
  },
},
{
  cityname: 'Berlin',
  photoURL:'https://ctcdn.azureedge.net/cloudcache/6/4/5/4/1/5/645415e1d2bea11f499c47ac3ce957d1a86c65ed.jpg', 
  address: {
    coordinates: [52.5065,13.1445],
  },
},
{
  cityname: 'Paris',
  photoURL:'https://www.paristours.es/images/buendia/visitas-guiadas/imprescindibles-paris/tour-gratis-torre-eiffel-campos-eliseos-paris.jpg',
  address: {
    coordinates: [48.8587,2.2069],
  }
}
]

mongoose.connect('mongodb://polgoide:xixipan1@cluster0-shard-00-00-mmctt.mongodb.net:27017,cluster0-shard-00-01-mmctt.mongodb.net:27017,cluster0-shard-00-02-mmctt.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', () => {
  City.create(cities)
    .then (places=>{
      console.log(`You have created ${places.length} succesfully`)
      mongoose.connection.close()
    })
    .catch(err=>{(err)})
  })


