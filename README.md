# Movie Search Project

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (version 20.17.0)
- **npm** (Version 10.8.3)

### Installation

1. Clone the repository:

   git clone https://github.com/anjankumarmj01/movie-search.git
   cd movie-search

Install the dependencies:
npm install

Running the Project
Start the development server:
npm start

Open your browser and navigate to your localhost server the project is running on
Example: http://localhost:5173

- **Usage**:
  - Use the search bar on the Search page to find movies by title. (Min 3 character is expected as api gives no results for title <3 characters)
  - Click on a movie to view its details.
  - Add movies to your favourites and view them on the Favourites page.
  - Click the logo to refresh the Search page or navigate to the home page from the Favourites page.
  - Home page keeps previously searched values for user to play with.
  - Disconnect internet connection and see a mesage about internet status.
  - Try invalid routes and see route not found message.

### Architecture

- **Frontend**:

  - **React** for component-based architecture.
  - **Typescript** for better development process.
  - **React Router** is used for navigation between different pages.
  - **Redux ToolKit** is used for global app state management.
  - **RTK Query** is used for handling API requests
  - **Ant Design** is used as the UI library to create the interface.
  - **ESLint and Prettier** is used or linting and code formatting.
  - **Husky and lint-staged** is used for set up linters and auto-formatting on commits.

- **API Integration**:

  - The application fetches movie data from an external movie database API i.e. OMDB API.

- **Features**:
  - Search for movies by title.
  - View details of searched movies.
  - Display message for movies not found.
  - Add and remove movies from favourites.
  - Offline message handling using custom hooks.
  - Invalid routes and Javascript error handling.
