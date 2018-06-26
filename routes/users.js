var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/demo', function(req, res, next) {
  datos = {
    title : 'Pagina demo',
    contenido : 'Contenido de la web'
  };
  res.render('demo', datos);
});

router.post('/form', function(req, res) {
  var datos = {
    title : "Respuestas",
    val_dato : req.body.dato,
    val_ciclo : req.body.ciclo
  };
  res.render('form', datos);
});

router.get('/param/:dato', function(req, res) {
  res.send(req.params.dato);
})

module.exports = router;
