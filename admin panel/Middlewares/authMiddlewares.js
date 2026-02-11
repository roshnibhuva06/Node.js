const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// ✅ Signup Validation
export const validateSignupFields = (req, res, next) => {

    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({
            status: false,
            message: "Email, password and role are required !"
        });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            status: false,
            message: "Invalid email format !"
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            status: false,
            message: "Password must be at least 6 characters !"
        });
    }

    next();
};


// ✅ Signin Validation
export const validateSigninFields = (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: false,
            message: "Email and password are required !"
        });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            status: false,
            message: "Invalid email format !"
        });
    }

    next();
};


// ✅ OTP Validation
export const validateOtpFields = (req, res, next) => {

    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({
            status: false,
            message: "Email and OTP are required !"
        });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            status: false,
            message: "Invalid email format !"
        });
    }

    if (otp.length !== 6) {
        return res.status(400).json({
            status: false,
            message: "OTP must be 6 digits !"
        });
    }

    next();
};
