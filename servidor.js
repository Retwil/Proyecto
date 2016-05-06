(function(){
var express=require('express');
var morgan=require('morgan');
var bodyparser = require('body-parser');
var mysql=require('mysql');
var cors=require('cors');
var conf=require('./config');
var pool=mysql.createPool(conf.database);
var Sequelize =require('sequelize');
var sequelize = new Sequelize('turismo','root','',{
	host : 'localhost',
	dialect : 'mysql',
	pool : {
		max:20,
		min:0,
		idle:1000
	}
});

var Usuario = sequelize.define('usuario',{
	id_usuario: { type: Sequelize.INTEGER, primarykey: true, autoIncrement: true},
	nombre: {type: Sequelize.STRING, allowNull:false},
	correo: {type: Sequelize.STRING, allowNull:false},
	nick: {type: Sequelize.STRING, allowNull:false},
	contrasena: {type: Sequelize.STRING, allowNull:false},
});

var Departemento = sequelize.define('departamento',{
	id_departamento: { type:Sequelize.INTEGER, primatykey: true, autoIncrement:true},
	nombre: {type: Sequelize.STRING, allowNull:false},
	descripcion: {type: Sequelize.STRING, allowNull:false},
});

var Hotel = sequelize.define('hotel', {
    id_hotel: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    direccion: { type: Sequelize.STRING, allowNull: false},
    descripcion: { type: Sequelize.INTEGER, allowNull: false},
});

 var Restaurante = sequelize.define('restaurante', {
        id_restaurante: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: Sequelize.STRING, allowNull: false },
        descripcion: { type: Sequelize.INTEGER, allowNull: false },
		direccion: { type: Sequelize.INTEGER, allowNull: false },
});

sequelize.sync({force:true});
var puerto=1000;

var app=express();

app.set('sequelize', sequelize);
app.set('usuario', Usuario);
app.set('departamento', Departamento);
app.set('hotel', Hotel);
app.set('restaurante', Restaurante);
app.use(bodyParser.urlencoded({
	extended:false
}));

app.use(bodyparser.json());
app.use(morgan('dev'));
app.use('/api/v1', require('./rutas')(app));
app.use(cors());

app.listen(puerto, function(){
	console.log("Servidor iniciado en el puerto:" + puerto)
});
})();