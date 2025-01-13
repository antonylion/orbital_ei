# Orbital_EI

**Orbital_EI** is a RESTful API designed for searching and ordering satellite images. It enables users to interact with a database of satellite imagery seamlessly and efficiently.


## Running the application with Docker

Follow these steps to run the application using Docker.

### Prerequisites
Ensure you have the following installed on your machine:
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

---

### Steps to Run the Application
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

3. **Build the Docker Image**  
   Build the Docker image for the application:
   ```sh
   docker build -t orbit-ei .
   ```

4. **Start the Application**  
   Use Docker Compose to start the database (on port `5432`) and the server (on `localhost:3000`):
   ```sh
   docker compose up
   ```