// authMiddleware.js
const jwt = require('jsonwebtoken');
var cookies = require('cookie-parser');
function checkToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send('Token không tồn tại');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            // Token hết hạn
            if (err.name === 'TokenExpiredError') {
                res.clearCookie('token'); // Xóa cookie token hết hạn
                return res.status(401).send('Token hết hạn. Vui lòng đăng nhập lại');
            } else {
                return res.status(401).send('Token không hợp lệ');
            }
        }

        req.userId = decoded.userId;
        next();
    });
}

module.exports = {
    checkToken
};
