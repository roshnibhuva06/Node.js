import jwt from 'jsonwebtoken';

export const checkAdmin = (req, res, next) => {

    try {

        const token = req.cookies.auth_token;

        if (!token) {
            return res.json({ status: false, message: "Token not found" });
        }

        const user = jwt.verify(token, process.env.SECRET_KEY);

        if (user.role === 'Admin') {
            next();
        }
        else {
            res.json({ status: false, message: "Only admin can access this page !" });
        }

    }
    catch (error) {
        res.json({ status: false, message: "Invalid token" });
    }
};
