const logger = (req, res, next) => {
    console.log('Visited -> [${req.method}] ${req.url}');
    next();
};

export default logger;
