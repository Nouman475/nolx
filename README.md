# OLX Clone

## 1. Project Overview
**Title:** OLX Clone  
**Description:** A full-stack classifieds platform where users can post, search, and manage second-hand products, equipped with Google authentication and a dynamic dashboard for managing listings.

---

## 2. Features
- 🎨 **Modern and responsive UI** inspired by OLX  
- 🔐 **User authentication** via Firebase (Email & Google)  
- 📦 **Post, edit, and delete product listings**  
- 🔍 **Filter and search** ads by category, price, location, and date  
- 🧾 **Product preview** with image carousel and detailed description  
- 📬 **Messaging system** for buyer-seller communication (if implemented)  
- 🧑‍💼 **User dashboard** to manage listings and account settings  
- 📱 **Mobile-responsive design**

---

## 3. Tech Stack
- **Frontend:** React, Bootstrap, SCSS  
- **Backend:** Firebase (Auth, Firestore, Storage)  
- **Authentication:** Firebase Authentication (Email/Password + Google Sign-In)  
- **Other Tools:** React Router, Toastify JS, Ant Design

---

## 4. Pages and Structure

### 🔹 Home Page
- Showcases all live ads with filters by category, location, price, and posting date.
- Highlights featured and recent listings.

### 🔹 Login
- Users can log in using **Email/Password** or **Google Sign-In** via Firebase Authentication.

### 🔹 Signup
- New users can register with Firebase authentication.
- Validations for email, password, and user inputs.

### 🔹 Post Ad Page
- Allows logged-in users to add a new product listing with title, description, category, price, and image upload (via Firebase Storage).

### 🔹 Product Details Page
- Displays complete ad details including image slider, seller info, and location.
- Option to contact the seller.

### 🔹 User Dashboard
**Sub-pages:**
1. **My Ads:**  
   List of ads posted by the user with options to edit or delete.
2. **Post New Ad:**  
   Form to submit a new listing.
3. **Account Settings:**  
   View or update personal profile information.

---

## 5. Installation

### 🔧 Run Locally

```bash
git clone https://github.com/Nouman475/nolx
```
Install dependencies:

```
npm install
```
Start development server:
```
npm start
```
6. Contributing
Contributions, suggestions, and improvements are welcome!
Please make sure to follow the project's coding standards and guidelines.

7. Author
M Nouman

9. Acknowledgements
Big thanks to the open-source community for their excellent libraries and Firebase for backend services.

10. License
This project is licensed under the MIT License.
See the LICENSE file for more details.
