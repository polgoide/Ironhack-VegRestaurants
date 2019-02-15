//  Form fields
let placeName = document.getElementById('placeName')
let placePhone = document.getElementById('placePhone')

document.addEventListener('DOMContentLoaded', () => {
  let fqBtn = document.getElementById('fqBtn')
  let fqUrl = document.getElementById('fqUrl')
}, false);

fqBtn.addEventListener('click', () => {
  let url = `https://api.foursquare.com/v2/venues/${fqUrl.value}?client_id=DRE3GPNTW2X1IJJDU02U2C02B3XGVUP0XDGYSF0NMKJQOX5D&client_secret=3QXPOGKXLDMMTGZXIRIIOXTQBM0V4AEITQT4FIHEMSD2JFF4&v=20190213`
  axios.get(url, {
    headers: {
      "Accept-Language": "es",
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      const venue = { ...res.data.response.venue }
      console.log(venue)
      // const data = {res}
      // data = data.data.response.venue
      placeName.value = data.data.response.venue.name
      placePhone.value = data.data.response.venue.contact.formattedPhone || ''
      console.log(venue)
    })
    .catch(e=>console.log(e))
})

// name: String,
//   address: String,
//   phoneNumber: String,
//   type: {
//     type: String,
//     enum: ['Vegan', 'Vegetarian']
//   },
//   foodType: String,
//   pictures: [String],
//   rating: String,
//   priceRange: String,
//   openTimes: String,
//   cityId: {
//     type: Schema.Types.ObjectId,
//     ref: "City"
//   },
//   authorId: {
//     type: Schema.Types.ObjectId,
//     ref: "User"
//   },