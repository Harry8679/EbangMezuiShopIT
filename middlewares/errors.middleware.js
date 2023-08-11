const ErrorHandler = require('../utils/errorHandler.util');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    // err.message = err.message || 'Erreur Interne au Serveur';

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        });
    }

    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = {...err};
        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Erreur Interne au serveur'
        });
    }


    res.status(err.statusCode).json({
        success: false,
        error: err.stack
    });
}