# ChronosAPI
Chronos API A robust RESTful API for handling time and date operations, including Unix timestamp conversions, leap year checks, duration calculations, countdowns, age computation, historical events, and multi-language support. Perfect for developers working with temporal data.

## Features
- Get the current time in Unix and UTC formats.
- Convert valid date strings and Unix timestamps.
- Check if a year is a leap year.
- Calculate the duration between two dates.
- Fetch notable historical events for a given date.
- Calculate age from a given birthdate.

## Getting Started

### Prerequisites
- Node.js (>=14.x)
- npm (>=6.x)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/username/chronos-api.git
   ```
2. Navigate to the project directory:
    ```bash
    cd chronos-api
    ```
3. Install dependencies:
    ```bash
    npm install 
    ```
4. Start the server:
    ```bash
    npm start
    ```
The API will run on http://localhost:3000



### Base URL
```text
https://yourdomain.com/api
```


### **Chronos API Documentation**

Welcome to the Chronos API! This API is designed to handle various date and time operations. Below is the comprehensive documentation of its endpoints and features.

----------

### **Base URL**

`https://yourdomain.com/api` 

----------

### **Endpoints**

#### 1. **Get Current Time**

**Description:** Returns the current time in Unix timestamp (milliseconds) and UTC format.  
**URL:**


`GET /api` 

**Response Example:**

`{
  "unix": 1700198400000,
  "utc": "Fri, 17 Nov 2024 00:00:00 GMT"
}` 

----------

#### 2. **Convert Date to Unix and UTC**

**Description:** Converts a valid date string or Unix timestamp to both Unix and UTC formats.  
**URL:**

`GET /api/:date` 

**Parameters:**

-   `:date` - A valid date string (e.g., `2024-11-17`) or Unix timestamp (e.g., `1451001600000`).

**Response Example for Valid Date:**

`GET /api/2024-11-17` 



`{
  "unix": 1731792000000,
  "utc": "Sun, 17 Nov 2024 00:00:00 GMT"
}` 

**Response Example for Invalid Date:**

`GET /api/invalid-date` 

`{
  "error": "Invalid Date"
}` 

----------

#### 3. **Check Leap Year**

**Description:** Checks if a given year is a leap year.  
**URL:**

`GET /api/leap-year/:year` 

**Parameters:**

-   `:year` - A valid year (e.g., `2024`).

**Response Example for Leap Year:**

`GET /api/leap-year/2024` 

`{
  "year": 2024,
  "isLeapYear": true
}` 

**Response Example for Non-Leap Year:**

`GET /api/leap-year/2023` 


`{
  "year": 2023,
  "isLeapYear": false
}` 

----------

#### 4. **Calculate Duration Between Two Dates**

**Description:** Calculates the difference in days, hours, and minutes between two dates.  
**URL:**

`GET /api/duration?start=:startDate&end=:endDate` 

**Query Parameters:**

-   `start` - The start date in a valid format (e.g., `2024-01-01`).
-   `end` - The end date in a valid format (e.g., `2024-12-31`).

**Response Example:**

`GET /api/duration?start=2024-01-01&end=2024-12-31` 

`{
  "start": "Mon, 01 Jan 2024 00:00:00 GMT",
  "end": "Tue, 31 Dec 2024 00:00:00 GMT",
  "duration": {
    "days": 365,
    "hours": 8760,
    "minutes": 525600
  }
}` 

----------

#### 5. **Historical Events**

**Description:** Fetches notable historical events that occurred on a specific date.  
**URL:**

`GET /api/history/:month/:day` 

**Parameters:**

-   `:month` - The month (1-12).
-   `:day` - The day (1-31).

**Response Example:**

`GET /api/history/12/25` 

`{
  "date": "December 25",
  "events": [
    "800 - Coronation of Charlemagne as Holy Roman Emperor.",
    "1066 - William the Conqueror is crowned King of England."
  ]
}` 

----------

#### 6. **Age Calculator**

**Description:** Calculates the age based on a given birthdate.  
**URL:**


`GET /api/age/:birthdate` 

**Parameters:**

-   `:birthdate` - A valid date string (e.g., `2000-01-01`).

**Response Example:**

`GET /api/age/2000-01-01` 

`{
  "birthdate": "Sat, 01 Jan 2000 00:00:00 GMT",
  "age": {
    "years": 24,
    "months": 10,
    "days": 16
  }
}` 

----------

### **Error Handling**

The API returns errors in a consistent format for invalid inputs.

**Response Example for Invalid Input:**

`{
  "error": "Invalid Date"
}` 

----------

### **Usage Notes**

-   Ensure date inputs are in ISO format (YYYY-MM-DD) or Unix timestamps.
-   For time zone-independent calculations, the API uses UTC.

----------

### **Feedback and Support**

Feel free to contribute, report issues, or suggest features via the [GitHub repository](#).  
For any queries, reach out to us at `support@chronosapi.com`.