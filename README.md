# Orbital_EI 🛰

Orbital_EI is a fictional RESTful API designed for searching and ordering satellite images. It enables users to interact with a database of satellite imagery and place orders for specific images.

## Live Demo

A production instance of Orbital_EI is running on Render. You can interact with the API using:
- cURL commands
- Your web browser
- Our [Postman Collection](https://orbitaledgeimagingantony.postman.co/workspace/orbital_edge_imaging_antony~4094f4ce-41f1-4c9b-83c6-df9bef37a5cc/collection/40922021-cb7a7320-4dc7-4ffc-845f-1f7927219b11?action=share&creator=40922021) (Postman account required)

### Example API Requests

Get orders filtered by payment method:
```sh
curl "https://orbital-ei.onrender.com/api/orders?paymentMethod=Credit%20Card"
```

Search Sentinel-2 images within Seoul's area (bounding box filtering):
```sh
curl "https://orbital-ei.onrender.com/api/images?sensor=SEN2&bbox=126.850,37.438,127.138,37.651"
```

Create a new order:
```sh
curl -X POST https://orbital-ei.onrender.com/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "image_id": 1,
    "customer_email": "test@example.com",
    "payment_method": "PayPal"
  }'
```

## Installation

### Prerequisites

Before getting started, ensure you have installed:
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (required only for local development)

### Environment Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/antonylion/orbital_ei.git
   cd orbital_ei
   ```

2. Create an environment file:
   ```sh
   # Create .env file in project root with the following content:
   DB_USER="postgres"
   DB_HOST="localhost"
   DB_NAME="postgres"
   DB_PSWD="mysecretpassword"
   DB_PORT=5432
   ```

## Running the Application

There are two ways to run Orbital_EI: Production mode and Development mode.

### Production Mode

If you just want to run the application:

1. Build the Docker image:
   ```sh
   docker build -t orbital-ei .
   ```

2. Start the services:
   ```sh
   docker-compose up
   ```

The application will be available at `http://localhost:3000`.

### Development Mode

If you're planning to modify the code:

1. Install dependencies locally:
   ```sh
   npm install
   ```

2. Start only the database container:
   ```sh
   docker-compose up db
   ```

3. Run unit tests:
   ```sh
   npm run test
   ```

4. Run the application in development mode:
   ```sh
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

### Verifying the Installation

Test if the API is running properly:
```sh
curl http://localhost:3000/api/images
```