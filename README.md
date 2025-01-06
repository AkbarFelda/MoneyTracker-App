# MoneyTrackerApp

## Description
This is a simple mobile application for managing personal finances, built as part of a mobile development skill test. The app provides features for tracking income and expenses, displaying a summary with a simple graph, and managing transactions.

## Features

### Home Page
- Displays the current total balance.
- Shows a summary of income and expenses using a simple graph.

### Transactions List Page
- Displays a list of transactions with details:
  - Transaction date
  - Description
  - Amount (income in green, expenses in red)

### Add Transaction Page
- Form for adding a new transaction:
  - Transaction type (income or expense)
  - Transaction amount (mandatory number input)
  - Transaction description (optional text input)
  - Transaction date (defaults to the current date)

### Filter Feature
- Filter transactions by transaction type on the transactions list page.

## Technology Stack
- React Native with Expo
- Local data storage using AsyncStorage 
- Navigation with React Navigation
- Responsive design for different screen sizes (mobile and tablet)
- Android-focused
- Simple animations for page transitions

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/AkbarFelda/MoneyTracker-App.git
   cd MoneyTracker-App
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npx expo start
   ```

4. To run on an Android device:
   - scan using expo go app

## API Documentation
No external API is used. Data is stored locally using AsyncStorage 

## Additional Notes
- The application is designed to be intuitive and functional, focusing on simplicity and user experience.
- The project includes basic CRUD functionality with local data storage.
- Responsive design ensures usability across various screen sizes.

## Author
Akbar Felda
