var app = express();

var join = require('path').join;
var staticPath = join(__dirname, "index/pug");
app.use(express.static(staticPath));

// the views are in the views folder
app.set("views", path.resolve(__dirname, "views"));
// views will use the pug engine
app.set("view engine", ”pug");

// When visiting the app root,
// renders the homepage at views/index.pug
app.get("/", function (request, response) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
});
app.listen(8081);