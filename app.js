const express = require('express');
const hbs = require('hbs');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

/* Handlebars */
app.set("view engine", "hbs");

/* Middleware */
app.use("/assets", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

/* Nodemailer */
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'evie.lind@ethereal.email',
    pass: '6nbb6FtQ1J15qqFyGv'
  }
});


  app.use(require('./router/router'));

  app.listen(port, () => {
    console.log(`Usando el puerto http://localhost:${port}`);
  });

/* Renderizar el formulario de contacto */
app.get('/contact', (req, res) => {
  res.render('formulario');
});

/* Envio mail */
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  /* Config mail */
  const mailOptions = {
    from: email,
    to: 'evie.lind@ethereal.email',
    subject: 'EMM Consulta',
    text: `Nombre: ${name}\nCorreo electrónico: ${email}\nMensaje: ${message}`
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo electrónico: ', error);
      res.status(500).render('error', { error });
    } else {
      console.log('Correo electrónico enviado: ' + info.response);
      res.render('confirmacion', { success: true });
    }
  });
});
