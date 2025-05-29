# BBUILDS-LABPC
Repository:
Main: https://github.com/kuulaid/BBuildLabsPC
Mirror: https://github.com/kuulaid/BBuildLabsPC-mirror <br>
A C++ web application using the Crow framework and MySQL, designed to manage PC accounts and parts.


--- 
## Test video of working PC Builder on Localhost:

https://github.com/user-attachments/assets/8779bd41-8563-4ccc-a04e-0d076c0ee8e5

This website is for pc building, has an example 3d models, has a working database for users/products/orders.
---

## ⚙️ Prerequisites

Before running this project, ensure the following dependencies are installed:

- **C++ Compiler** (e.g., `g++`, supporting C++11 or newer)
- **Crow** (C++ web framework)  
  > [GitHub - Crow](https://github.com/CrowCpp/Crow)
- **Boost Libraries** (usually installed via `libboost-all-dev`)
- **MySQL Connector/C++ 1.1.x**
  - Download here: [MySQL Connector/C++ 1.1](https://dev.mysql.com/downloads/connector/cpp/1.1.html)
- **XAMPP** (for running MySQL and phpMyAdmin locally)
- **OpenSSL 1.1**  
  (if using MySQL Connector/C++ 1.1 on Ubuntu 22.04+, you may need to manually install `libssl1.1`)

---

## 🚀 How to Run the Project

### 1. Install Crow (C++ Web Framework)

If you're not familiar with Crow, search for a guide or tutorial on YouTube to help set it up properly.

sudo apt update
sudo apt install g++ cmake libboost-all-dev libssl-dev



git clone https://github.com/CrowCpp/crow.git
cd crow



---

### 2. Build and Run the Backend

After successfully installing dependencies and setting up Crow:

Run this on the terminal with the source folder:

    ./crowbackend

---

### 3. Start the Database

Make sure XAMPP is running and MySQL is started:

    sudo /opt/lampp/lampp start

---

### 4. Import the SQL Files into MySQL via phpMyAdmin

    Visit: http://localhost/phpmyadmin

    For each .sql file (e.g., pc_accounts_db.sql, pc_parts_db.sql):

        Create a database (e.g., pc_accounts_db)

        Click the "Import" tab

        Select the corresponding .sql file

        Click "Go" to import

Repeat for all required SQL files.
