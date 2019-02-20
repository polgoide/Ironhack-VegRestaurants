document.addEventListener('DOMContentLoaded', () => {
  //Materialize
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);

  var pics = document.querySelectorAll('.materialboxed');
  var picInstances = M.Materialbox.init(pics);

  var navbar = document.querySelectorAll('.sidenav');
  var navbarInstances = M.Sidenav.init(navbar);

}, false);

// Place pages

// let likeBtn = document.getElementById('like')
  
// likeBtn.addEventListener('click', () => {
//   console.log('hola')
  
// })
