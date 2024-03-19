const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
userModel.createUsersTable();
function addUser(req, res) {
try {
    const { username, email,password,date,gender,phone,address } = req.body;
    userModel.addUser(username, email,password,date,gender,phone,address);
    res.redirect("/signin"); 
    console.log("đăng kí thành công!")
} catch (error) {
    console.log(error);
}
}
async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await userModel.getUserByEmail(email);

        if (!user) {
            res.status(401).send('Email người dùng không tồn tại');
            return;
        }

        bcrypt.compare(password, user.password, (err, passwordMatch) => {
            if (err) {
                throw err;
            }

            if (!passwordMatch) {
                res.status(401).send('Mật khẩu không chính xác');
                return;
            }
            req.session.user=user;
            const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' });

            // Lưu token trong cookie
            res.cookie('token', token, { maxAge: 60000 });
            
            console.log("Đăng nhập thành công!");
            res.redirect("/");
        });
    } catch (error) {
        console.error('Lỗi khi xử lý yêu cầu đăng nhập:', error);
        res.status(500).send('Lỗi máy chủ');
    }
}
const logout = (req, res) => {
    // Xóa token từ cookie
    res.clearCookie('token');
    res.redirect("/signin");
    req.session.user = null;
}
module.exports={
    addUser,
    loginUser,
    logout
}