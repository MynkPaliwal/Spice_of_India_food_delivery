# Spice of India - Food Delivery Website

Food Delivery website using React.JS

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm package manager
- Firebase account

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Spice_of_India_food_delivery-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Firestore Database
   - Copy your Firebase configuration
   - Update the configuration in `src/firebase/setup.js`:
   
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   
   The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```
