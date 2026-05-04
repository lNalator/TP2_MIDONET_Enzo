// Error handling middleware
const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    // Validation error (Mongoose)
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation Error',
            message: err.message,
            details: Object.values(err.errors).map(e => e.message)
        });
    }

    // Cast error (Invalid ObjectId)
    if (err.name === 'CastError') {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Invalid ID format'
        });
    }

    // Duplicate key error (MongoDB)
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(409).json({
            error: 'Conflict',
            message: `${field} already exists`
        });
    }

    // Default server error
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
};

module.exports = errorMiddleware;