# FSD Project

This project is a web application built using React and Ant Design. The project structure is organized to maintain a clean and scalable codebase.

## Folder Structure

```
FSD/
├── src/
│   ├── app/
│   ├── assets/
│   │   └── images/
│   │       └── logo.png
│   ├── entities/
│   │   └── user/
│   │       ├── ui/
│   │       ├── api.js
│   │       └── model.js
│   ├── features/
│   │   └── auth/
│   │       ├── ui/
│   │       ├── api.js
│   │       └── model.js
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── NotFoundPage.jsx
│   ├── shared/
│   │   ├── api/
│   │   │   └── index.js
│   │   ├── config/
│   │   │   └── axios.js
│   │   ├── lib/
│   │   │   ├── constants/
│   │   │   ├── dateFormatter/
│   │   │   ├── helpers/
│   │   │   ├── storage/
│   │   │   └── utils/
│   ├── App.js
│   ├── index.js
│   └── ...
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── README.md
```

### `node_modules/`

This folder contains all the dependencies and packages installed via npm.

### `public/`

This folder contains the static files for the project. The `index.html` file is the entry point for the React application.

### `src/`

This folder contains the source code for the project.

#### `src/app/`

This folder is intended for application-wide configurations and setups.

#### `src/assets/`

This folder contains the static assets like images, icons, etc.

- **images/**: Contains image files used in the application.
  - **GreenPREP.png**: The logo image for the application.

#### `src/entities/`

This folder contains the domain entities of the application.

- **user/**: Contains files related to the user entity.
  - **ui/**: Contains UI components related to the user.
  - **api.js**: Contains API calls related to the user.
  - **model.js**: Contains the data model for the user.

#### `src/features/`

This folder contains the feature-specific code.

- **auth/**: Contains files related to authentication.
  - **ui/**: Contains UI components related to authentication.
  - **api.js**: Contains API calls related to authentication.
  - **model.js**: Contains the data model for authentication.

#### `src/pages/`

This folder contains the main pages of the application. Each page is a React component that represents a different route in the application.

- **HomePage.jsx**: This is the main landing page of the application. It includes the layout, header, and content for the homepage.
- **NotFoundPage.jsx**: This page is displayed when a user navigates to a route that does not exist.

#### `src/shared/`

This folder contains shared utilities, configurations, and components that can be used across the application.

- **api/**: Contains shared API utilities.
  - **index.js**: Entry point for shared API utilities.
- **config/**: Contains configuration files.
  - **axios.js**: Configuration for Axios HTTP client.
- **lib/**: Contains shared libraries and utilities.
  - **constants/**: Contains constant values used across the application.
  - **dateFormatter/**: Contains utilities for formatting dates.
  - **helpers/**: Contains helper functions.
  - **storage/**: Contains utilities for handling storage.
  - **utils/**: Contains general utility functions.

### `src/App.js`

This file is the root component of the application. It sets up the main routes and renders the appropriate components based on the current route.

### `src/index.js`

This file is the entry point for the React application. It renders the `App` component into the DOM.

### `.env`

This file contains environment variables for the project.

### `.gitignore`

This file specifies which files and directories should be ignored by Git.

### `eslint.config.js`

This file contains the configuration for ESLint, a tool for identifying and fixing problems in JavaScript code.

### `index.html`

This file is the main HTML file for the application, located in the `public` folder.

### `package.json`

This file contains the metadata for the project, including the list of dependencies and scripts.

### `README.md`

This file provides an overview of the project and explains the folder structure.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**:

   ```bash
   cd FSD
   yarn install
   ```

3. **Start the development server**:

   ```bash
   yarn dev
   ```

4. **Open the application**:
   Open your browser and navigate to `http://localhost:5173`.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Create a pull request to the main repository.

## License

This project is licensed under the MIT License.
