module.exports = {
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        BACKEND_URL: JSON.stringify(process.env.BACKEND_URL),
        PORT: JSON.stringify(process.env.PORT || 8080),
    },
};
