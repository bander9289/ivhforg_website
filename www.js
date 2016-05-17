
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var connect = { session : session };
var RedisStore = require('connect-redis')(connect);

app.use(cookieParser());
app.use(session({
		resave : false,
		saveUninitialized : true,
		secret : 'bankofchillicothe',
		store : new RedisStore({
			host: 'localhost',
			port: 6379,
			db: 2,
			cookie: { secure : true }
			//pass: 'RedisPASS'
		})
}));

//app.set('trust proxy', 1) // trust first proxy

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function(req, res, next) {
	if (req.session.views) {
		req.session.views++
		console.log("user has connected " + req.session.views + " times")
	} else {
		req.session.views = 1
	}

	res.render('home', { title : 'Iris Village Heritage Foundation' })
})

app.listen(8000);
