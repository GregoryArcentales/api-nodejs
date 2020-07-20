const path = require("path");
const express = require("express");
const jwtMiddleware = require("express-jwt");

const places = require("./routes/places");
const users = require("./routes/users");
const sessions = require("./routes/sessions");
const favorites = require("./routes/favorites");
const visits = require("./routes/visits");
const visitsPlaces = require("./routes/visitsPlaces");
const applications = require("./routes/applications");

const findAppBySecret = require("./middlewares/findAppBySecret");
const findAppByApplicationId = require("./middlewares/findAppByApplicationId");
const authApp = require("./middlewares/authApp")();
const allowCoRs = require("./middlewares/allowCORs")();

const db = require("./config/database");
const secrets = require("./config/secrets");

db.connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(findAppBySecret)
app.use(findAppByApplicationId)
app.use(authApp.unless({method: 'OPTIONS'}))
app.use(allowCoRs.unless({path: '/public'}))

app.use(
    jwtMiddleware({secret:secrets.jwtSecret})
        .unless({path:['/login', '/users'], method:['GET','OPTIONS']})
)

app.use('/places', places)
app.use('/places', visitsPlaces)
app.use('/users', users)
app.use('/login', sessions)
app.use('/favorites', favorites)
app.use('/visits', visits)
app.use('/applications', applications)

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));
