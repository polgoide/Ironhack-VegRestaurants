let nodemailer = require('nodemailer')
let hbs = require('handlebars')
let fs = require('fs')

let transport = nodemailer.createTransport({
  service: 'Gmail', // otherwise, SMTP details
  auth: {
    user: 'fixtermailer@gmail.com',
    pass: 'polloyon'
  }
})

// const accountCreated = hbs.compile(fs.readFileSync((__dirname, './views/mail/accountCreated.hbs'), 'utf8'));


exports.sendWelcomeMail = function (name, email) {
  transport.sendMail({
    from: "Pol Ironhack",
    to: email,
    subject: "Bienvenido " + name,
    html: accountCreated({name})
    // html: `<h2>Hola ${name}</h2>
    // <p>Email de bienvenida</p>`
  })
  .then(r=> console.log(r))
  .catch(e=> console.log(e))
}

exports.sendNewsletter = function (name, email) {
  transport.sendMail({
    from: "Pol Ironhack",
    to: email,
    subject: "Noticias de la semana " + name,
    html: `<h2>Hola ${name}</h2>
    <p>Email de bienvenida</p>`
  })
  .then(r=> console.log(r))
  .catch(e=> console.log(e))
}