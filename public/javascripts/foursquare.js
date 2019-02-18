document.addEventListener('DOMContentLoaded', () => {
  let fqBtn = document.getElementById('fqBtn')
  let fqUrl = document.getElementById('fqUrl')
  let addPicBtn = document.getElementById('addPicBtn')
// Map

mapboxgl.accessToken = 'pk.eyJ1IjoicG9sZ29pZGUiLCJhIjoiY2pzMXhrOW1uMXo0ZTQ0bzNscG52N2c3OSJ9.idfHSgW5pK1sKEx5OAtnTw';
const map = new mapboxgl.Map({
container: "map", 
style: "mapbox://styles/mapbox/streets-v11",
center: [placeLng.value, placeLat.value],
zoom: 10,
})
const marker = new mapboxgl.Marker({
  color: 'red',
}).setLngLat([placeLng.value, placeLat.value]).addTo(map)

}, false);


fqBtn.addEventListener('click', () => {
let urlVenue = `https://api.foursquare.com/v2/venues/${fqUrl.value}?client_id=DRE3GPNTW2X1IJJDU02U2C02B3XGVUP0XDGYSF0NMKJQOX5D&client_secret=3QXPOGKXLDMMTGZXIRIIOXTQBM0V4AEITQT4FIHEMSD2JFF4&v=20190213`
let urlPics = `https://api.foursquare.com/v2/venues/${fqUrl.value}/photos?client_id=DRE3GPNTW2X1IJJDU02U2C02B3XGVUP0XDGYSF0NMKJQOX5D&client_secret=3QXPOGKXLDMMTGZXIRIIOXTQBM0V4AEITQT4FIHEMSD2JFF4&v=20190213`

  // Promise.all([
  //   axios.get(urlVenue, {
  //     headers: {
  //       "Accept-Language": "es",
  //       "Content-Type": "application/json"
  //     }
  //   }),
  //   axios.get(urlPics, {
  //     headers: {
  //       "Accept-Language": "es",
  //       "Content-Type": "application/json"
  //     }
  //   })
  // ])
    axios.get(urlVenue, {
      headers: {
        "Accept-Language": "es",
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      const venue = { ...res.data.response.venue }
      console.log(venue)
      placeName.value = venue.name
      placeDescription.value = venue.description || ''
      placePhone.value = venue.contact.formattedPhone || ''
      placeType.value = venue.tips.groups[0].items[0].text.includes('vegan') ? 'Vegana' : 'Vegetariana'
      placeFoodType.value = venue.categories[0].shortName || ''
      placeRating.value  = venue.rating || ''
      placePriceRange.value = venue.price.currency || '$$'
      placeOpenTimes.value = venue.hours.timeframes[0].open[0].renderedTime + ' de ' + venue.hours.timeframes[0].days || ''
      placeAddress.value = venue.location.address + ', ' + venue.location.city || ''
      placeLat.value = venue.location.lat || 0
      placeLng.value = venue.location.lng || 0
      placeCity.value = venue.location.city || ''
      placePics.value = venue.bestPhoto.prefix + '500x500' + venue.bestPhoto.suffix || ''
      placeLikes.value = venue.likes.count || 0
      placeDislikes.value = venue.dislike ? 1 : 0
      placeInstagram.value = venue.contact.instagram || ''
      placeFoursquare.value = venue.canonicalUrl || ''
      placeTwitter.value = venue.contact.twitter || ''
      placeFacebook.value = venue.contact.facebookUsername || ''
      placeFoursquareId.value = venue.id || ''
      placeSlug.value = slugify(venue.name) || ''
  })
  .catch(e=> console.log(e))
})

addPicBtn.addEventListener('click', () => {
  document.getElementById('addPicContainer').appendChild('<input type="text" name="pictures" id="placePics">')
})

function slugify(string) {
  const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
  const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
}