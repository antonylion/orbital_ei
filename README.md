# Orbital_EI

**Orbital_EI** is a fictional RESTful API designed for searching and ordering satellite images. It enables users to interact with a database of satellite imagery and create an order.


## Running the application with Docker

Follow these steps to run the application using Docker.

### Prerequisites
Ensure you have the following installed on your machine:
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)(for local development)

---

### Quick Start
1. **Clone the Repository**  
   Clone the Orbital_EI repository to your local machine:
   ```sh
   git clone https://github.com/antonylion/orbital_ei.git
   ```

2. **Navigate to the Project Directory**  
   Change into the cloned directory:
   ```sh
   cd orbital_ei
   ```

3. **Set up environment variables**
   ```sh
   # Create .env file and write the following content:

   DB_USER="postgres"
   DB_HOST="localhost"
   DB_NAME="postgres"
   DB_PSWD="mysecretpassword"
   DB_PORT=5432
   ```

4. **Build the Docker Image**  
   Build the Docker image for the application:
   ```sh
   docker build -t orbit-ei .
   ```

5. **Start the Application**  
   Use Docker Compose to start the database (on port `5432`) and the server (on `localhost:3000`):
   ```sh
   docker-compose up
   ```

6. **Test the API**
   ```sh
   # Get all satellite images
   curl http://localhost:3000/api/images
   ```

7. **Development**
   The application will automatically reload when you make changes to the code.