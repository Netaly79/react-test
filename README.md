# TravelTrucks Camper Rental Web App

This project is the frontend part of a web application for **TravelTrucks**, a company that rents out campers. The app includes a home page, a catalog page with available campers, and detailed camper pages where users can view camper details, read reviews, and make bookings.

## Project Structure

The project is built with the following technologies:

-   **React** (with Vite bundler)
-   **Redux** for state management
-   **React Router** for client-side routing
-   **Axios** for making API requests
-   **CSS Modules** (or another CSS solution you may choose)

### Key API Endpoints

The app communicates with a backend API available at: `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers`

-   **GET /campers**: Retrieves all campers with optional filtering parameters.
-   **GET /campers/**
    
    : Retrieves details for a specific camper by ID.

## Pages

1.  **Home Page (`/`)**
    
    -   Displays a banner with a call-to-action button leading to the catalog page.
2.  **Catalog Page (`/catalog`)**
    
    -   Lists all available campers with filtering options for location, vehicle type, and features like AC, kitchen, etc.
    -   Users can add campers to a favorites list.
    -   Supports loading more campers as the user scrolls or clicks "Load More".
3.  **Camper Details Page (`/catalog/:id`)**
    
    -   Shows detailed information about a camper (e.g., engine, transmission, features like AC, kitchen).
    -   Displays user reviews with star ratings.
    -   Includes a booking form for reserving the camper.

## Features

-   **Filtering**: Users can filter campers by location, vehicle type, and features like AC, kitchen, etc.
-   **Favorites**: Users can add and remove campers from a favorites list. The list persists after page reload.
-   **Pagination**: The catalog page allows users to load more campers as needed.
-   **Reviews**: The camper details page shows user reviews with a 5-star rating system.
-   **Booking**: Users can book a camper through a form. A toast notification confirms successful booking.
-   **Responsive Design**: The app is designed for desktop, with optional responsiveness for mobile devices.

## Installation and Setup

1.  Clone the repository:
2. 
    `git clone https://github.com/your-repository/traveltrucks.git
    cd traveltrucks` 
    
3.  Install dependencies:
   

    `npm install` 
    
4.  Start the development server:

    `npm run dev` 
    
5.  To build the project for production:
    
    `npm run build` 
    
6.  Deploy the project (for example, on Vercel or Netlify).
    

## Deployment

The project is deployed and live at: [https://react-test-urtr.vercel.app/]

## Project Requirements

-   **React** with Vite as the bundler.
-   **Redux** for state management.
-   **Axios** for API calls.
-   **React Router** for routing.
-   **CSS Modules** (or other CSS library of your choice).
