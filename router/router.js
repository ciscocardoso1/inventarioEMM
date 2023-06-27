const { Router } = require("express");
const router = new Router();
const mysql = require('mysql');



/* Conexion BDD */
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventarioemm'
})

conn.connect((err) => {
    if (err) throw err;
    console.log('Conexion establecida')
});



/* Rutas */
router.get('/', (req, res) => {
    let sql = "SELECT * FROM producto";
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('productos', {
            results: results
        });
    });
});

/* Alta producto */
router.post('/save', (req, res) => {
    let data = { producto_nombre: req.body.producto_nombre, producto_descripcion: req.body.producto_descripcion, producto_cantidad: req.body.producto_cantidad };
    let sql = "INSERT INTO producto SET ?";
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});


/* Editar producto */
router.post('/update', (req, res) => {
    let sql = "UPDATE producto SET producto_nombre='" + req.body.producto_nombre + "', producto_descripcion='" + req.body.producto_descripcion + "', producto_cantidad='" + req.body.producto_cantidad + "' WHERE producto_id=" + req.body.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

/* Eliminar producto*/
router.post('/delete', (req, res) => {
    let sql = "DELETE FROM producto WHERE producto_id=" + req.body.producto_id + "";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

/* Confirmacion formulario */
router.get('/confirmacion', (req, res) => {
    res.render('formulario');
});



module.exports = router;