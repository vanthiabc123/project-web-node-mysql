// index.js
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const configViewEngine = require("./configs/viewEngine");
const initWebRoute = require('./routers/authRouter');
var session = require('express-session')
dotenv.config();
const port = process.env.PORT;

app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));
  const getUser = async (req, res, next) => {
      res.locals.user = req.session.user;
      console.log(res.locals);
      next();
    };
    app.use(getUser);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình view engine
configViewEngine(app);

// Khởi tạo các route web
initWebRoute(app);


// Bắt đầu máy chủ
app.listen(port, () => {
    console.log(`Máy chủ đang chạy tại http://localhost:${port}/`);
});
