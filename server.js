var express      = require('express');
var app          = express();
var http         = require('http').Server(app);
var bodyParser   = require('body-parser');
var cors         = require('cors');
var session      = require('express-session');

// app.use(SSL_redirect);
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    name: 'sess.id',
    secret: 'tiletrailsecret',
    proxy: false,
    resave: false,
    saveUninitialized: false
}));

var indexRouter = express.Router();
app.use(cors());
app.use('/', indexRouter);

indexRouter.get('/', function(req, res) { res.sendfile('./public/index.html'); });

var port = app.get('port') || process.env.PORT || 3000;
http.listen(port, function() {
    console.log('listening on *: ' + port);
});
