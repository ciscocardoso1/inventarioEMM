const express = require('express');
const hbs = require('hbs');

const app = express();
const port = 3000;


//---------------HANDLEBARS

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

/*  -------------middleware ---*/
app.use("/assets", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));



/* app.use('/', router); */
app.use(require('./router/router'));

app.listen(port, () => {
    console.log(`Usando el puerto http://localhost:${port}`);
});