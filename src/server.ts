import { app } from './app';

const PORT = process.env.PORT || 3000;

/**
 * Starts the Express server on the specified port.
 * The port is determined from the environment variable `PORT` or defaults to 3000.
 */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
