const { Router } = require("express");
const router = new Router();
const mysql = require('mysql');



// Conexión a base de datos
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventarioEmm'
})

conn.connect((err) => {
    if (err) throw err;
    console.log('Conexion establecida')
});


//RUTAS


// SELECT 
router.get('/', (req, res) => {
    let sql = "SELECT * FROM producto";
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('productos', {
            results: results
        });
    });
});

/* maneja solicitud post para guardar un nuevo producto en la bd, utilizando los datos enviados en el body */
router.post('/save', (req, res) => {
    let data = { producto_nombre: req.body.producto_nombre, producto_descripcion: req.body.producto_descripcion, producto_precio: req.body.producto_precio };
    let sql = "INSERT INTO producto SET ?";
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});


//UPDATE
router.post('/update', (req, res) => {
    let sql = "UPDATE producto SET producto_nombre='" + req.body.producto_nombre + "', producto_descripcion='" + req.body.producto_descripcion + "', producto_precio='" + req.body.producto_precio + "' WHERE producto_id=" + req.body.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});
 
 // DELETE
router.post('/delete', (req, res) => {
    let sql = "DELETE FROM producto WHERE producto_id=" + req.body.producto_id + "";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
}); 



module.exports = router;