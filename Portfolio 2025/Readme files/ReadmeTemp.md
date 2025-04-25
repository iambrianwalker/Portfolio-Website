# Temperature Converter

## Project Overview
The **Temperature Converter** is a web application and API that allows users to convert temperatures seamlessly between Celsius, Fahrenheit, and Kelvin. The application features a responsive interface, server-side processing, and random weather facts for a fun and educational experience.

## Features
- **Temperature Conversion**: Convert temperatures between Celsius, Fahrenheit, and Kelvin with precision.
- **Dark Mode**: User-friendly toggle for light and dark themes.
- **Random Weather Facts**: Receive a new weather fact with each conversion.
- **API Integration**: A back-end server processes conversion logic and delivers dynamic weather facts.

## Installation
### Prerequisites
- Node.js installed on your system.

### Steps
1. Clone the repository:
   ```bash
   https://github.com/iambrianwalker/Temperature-Conversion.git
   ```
2. Navigate to the project folder and install dependencies:
   ```bash
   cd Temperature-Conversion
   npm install
   ```

3. Ensure the following files are present:
   - **Client-side files**: `temperature.html`, `temperature.css`, `temperature.js`
   - **Server-side files**: `server.js`, `package.json`
   - **Weather facts file**: `weatherFacts/weatherFacts.txt`

4. Start the server:
   ```bash
   npm start
   ```
   This will start the server on `http://localhost:4000`.

5. Open `temperature.html` in your web browser to use the application.

## API Details
### `/convert`
**Method**: `POST`  
**Request Body**:
```json
{
    "temperature": 100,
    "type": "F",
    "convertTo": "C"
}
```
**Response**:
```json
{
    "convertedTemp": 37.78,
    "convertTo": "C",
    "randomWeatherFact": "Lightning strikes 8 million times a day worldwide."
}
```

### Dependencies
The project uses the following npm packages:
- **express** (`^5.1.0`): A fast, unopinionated, minimalist web framework for Node.js.
- **cors** (`^2.8.5`): Middleware to enable Cross-Origin Resource Sharing (CORS).

Install the dependencies automatically with:
```bash
npm install
```

## Usage
### Client-side
- Input the temperature value, type, and desired conversion unit.
- Click "Convert" to see the result and a random weather fact.
- Use the "Dark Mode" toggle for a better viewing experience.

### Server-side
- Handles API requests and performs conversion logic.
- Retrieves random weather facts from `weatherFacts/weatherFacts.txt`.

## Authors
Developed by **Brian Walker** and **Nadia Thorton**.
