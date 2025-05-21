# Venteliste Application

This is a Vue 3 application for managing school waiting list registrations. It uses Vite for development and build tooling.

## How to Start the Application

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at the URL printed in the terminal (usually http://localhost:5173/).

3. **Alternative start command:**
   ```bash
   npm start
   ```
   This will start the app on port 9669 and open it in your browser.

## Basic Functionality

- **Landing Page:** Users are greeted with a landing page for a school and can begin the registration process.
- **MitID Login Flow:** The main flow (`/`) simulates a login/consent process (MitID), followed by registration steps.
- **Simple Flow:** The `/simple` route provides a simplified registration flow without MitID.
- **Registration:** Users fill out information about their child, contact info, and answer a questionnaire if required.
- **Receipt:** After completing registration, a receipt/confirmation is shown.
- **Mock Data:** The app uses mock data from `src/assets/mock/` for children, schools, questions, etc.

## Useful Information

- **Routes:**
  - `/` - Main flow with MitID simulation
  - `/simple` - Simple registration flow
- **Styling:** Uses Bootstrap 5 and custom SCSS (`src/style.scss`).
- **Dependencies:** Vue 3, Vue Router, Bootstrap, Sass, Vite.
- **Customization:** You can modify mock data in `src/assets/mock/` for testing different scenarios.
- **Build for Production:**
   ```bash
   npm run build
   ```
- **Preview Production Build:**
   ```bash
   npm run preview
   ```

---
For more details, see the source code in the `src/` directory.
