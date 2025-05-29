#include "crow_all.h"
#include <mysql_driver.h>
#include <mysql_connection.h>
#include <cppconn/prepared_statement.h>
#include <cppconn/resultset.h>
#include <cppconn/statement.h>
#include <cppconn/exception.h>
#include <string>
#include <fstream>
#include <sstream>
#include <memory>
#include <iostream>
#include "crow/utility.h"
#include <iomanip>
#include <sstream>
#include <bcrypt/BCrypt.hpp>

struct CORS {
    struct context {};

    void before_handle(crow::request& req, crow::response& res, context&) {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.set_header("Access-Control-Allow-Headers", "Content-Type");
        if (req.method == "OPTIONS"_method) {
            res.end();
        }
    }

    void after_handle(crow::request&, crow::response& res, context&) {
        res.set_header("Access-Control-Allow-Origin", "*");
    }
};


// 🧩 Function to get all processors
crow::response getAllProcessors()
{
    crow::json::wvalue result;

    try {
        sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
        std::unique_ptr<sql::Connection> con(
            driver->connect("tcp://127.0.0.1:3306", "root", "")
        );

        con->setSchema("pc_parts_db");

        std::unique_ptr<sql::Statement> stmt(con->createStatement());
        std::unique_ptr<sql::ResultSet> res(stmt->executeQuery("SELECT * FROM processor"));

        std::vector<crow::json::wvalue> cpuList;

        while (res->next()) {
            crow::json::wvalue cpu;
            cpu["processor_id"] = res->getInt("processor_id");
            cpu["name"] = res->getString("name");
            cpu["boost"] = res->getString("boost");
            cpu["socket"] = res->getString("socket");
            cpu["microarch"] = res->getString("microarch");
            cpu["tdp"] = res->getInt("tdp");
            cpu["stock"] = res->getInt("stocks");
            double price = res->getDouble("price");
            std::ostringstream oss;
            oss << std::fixed << std::setprecision(2) << price;
            cpu["price"] = oss.str();
            cpu["cores"] = res->getInt("cores");
            cpu["igpu"] = res->getString("igpu");

            cpuList.push_back(std::move(cpu));
        }

        result["processors"] = std::move(cpuList);
        return crow::response(200, result);
    }
    catch (sql::SQLException& e) {
        crow::json::wvalue error;
        error["error"] = std::string("SQL Error: ") + e.what();
        return crow::response(500, error);
    }
}

// 🧩 Function to get all GPUs
crow::response getAllGPUs()
{
    crow::json::wvalue result;

    try {
        sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
        std::unique_ptr<sql::Connection> con(
            driver->connect("tcp://127.0.0.1:3306", "root", "")
        );

        con->setSchema("pc_parts_db");

        std::unique_ptr<sql::Statement> stmt(con->createStatement());
        std::unique_ptr<sql::ResultSet> res(stmt->executeQuery("SELECT * FROM gpu"));

        std::vector<crow::json::wvalue> gpuList;

        while (res->next()) {
            crow::json::wvalue gpu;
            gpu["gpu_id"] = res->getInt("gpu_id");
            gpu["name"] = res->getString("name");
            gpu["chipset"] = res->getString("chipset");
            gpu["memory_type"] = res->getString("memory_type");
            gpu["interface"] = res->getString("interface");
            gpu["memory_size"] = res->getInt("memory_size");
            gpu["power_draw"] = res->getInt("power_draw");
            gpu["stock"] = res->getInt("stocks");
            double price = res->getDouble("price");
            std::ostringstream oss;
            oss << std::fixed << std::setprecision(2) << price;
            gpu["price"] = oss.str();
            gpuList.push_back(std::move(gpu));
        }
        result["gpus"] = std::move(gpuList);
        return crow::response(200, result);
    }
    catch (sql::SQLException& e) {
        crow::json::wvalue error;
        error["error"] = std::string("SQL Error: ") + e.what();
        return crow::response(500, error);
    }
}


crow::response getAllMotherboards()
{
    crow::json::wvalue result;

    try {
        sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
        std::unique_ptr<sql::Connection> con(
            driver->connect("tcp://127.0.0.1:3306", "root", "")
        );

        con->setSchema("pc_parts_db");

        std::unique_ptr<sql::Statement> stmt(con->createStatement());
        std::unique_ptr<sql::ResultSet> res(stmt->executeQuery("SELECT * FROM motherboard"));

        std::vector<crow::json::wvalue> mbList;

        while (res->next()) {
            crow::json::wvalue mb;
            mb["motherboard_id"] = res->getInt("motherboard_id");
            mb["name"] = res->getString("name");
            mb["manufacturer"] = res->getString("manufacturer");
            mb["socket_type"] = res->getString("socket_type");
            mb["chipset"] = res->getString("chipset");
            mb["memory_type"] = res->getString("memory_type");
            mb["memory_slots"] = res->getInt("memory_slots");
            mb["max_memory"] = res->getInt("max_memory");
            mb["pcie_version"] = res->getString("pcie_version");
            mb["form_factor"] = res->getString("form_factor");
            mb["sata_ports"] = res->getInt("sata_ports");
            mb["power_consumption"] = res->getInt("power_consumption");
            mb["stock"] = res->getInt("stocks");
            double price = res->getDouble("price");
            std::ostringstream oss;
            oss << std::fixed << std::setprecision(2) << price;
            mb["price"] = oss.str();

            mbList.push_back(std::move(mb));
        }

        result["motherboards"] = std::move(mbList);
        return crow::response(200, result);
    }
    catch (sql::SQLException& e) {
        crow::json::wvalue error;
        error["error"] = std::string("SQL Error: ") + e.what();
        return crow::response(500, error);
    }
}


crow::response getAllComputerCases() {
    crow::json::wvalue result;
    try {
        sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
        std::unique_ptr<sql::Connection> con(
            driver->connect("tcp://127.0.0.1:3306", "root", "")
        );
        con->setSchema("pc_parts_db");

        std::unique_ptr<sql::Statement> stmt(con->createStatement());
        std::unique_ptr<sql::ResultSet> res(stmt->executeQuery("SELECT * FROM ComputerCases"));

        std::vector<crow::json::wvalue> list;
        while (res->next()) {
            crow::json::wvalue row;
            row["case_id"]     = res->getInt("id");
            row["name"]        = res->getString("name");
            row["form_factor"] = res->getString("form_factor");
            row["color"]       = res->getString("color");
            row["stock"] = res->getInt("stocks");

            double price = res->getDouble("price");
            std::ostringstream oss;
            oss << std::fixed << std::setprecision(2) << price;
            row["price"] = oss.str();

            std::ostringstream wss;
            wss << std::fixed << std::setprecision(2) << static_cast<double>(res->getDouble("weight"));
            row["weight"] = wss.str();


            list.push_back(std::move(row));
        }

        result["computer_cases"] = std::move(list);
        return crow::response(200, result);
    }
    catch (sql::SQLException &e) {
        crow::json::wvalue err;
        err["error"] = std::string("SQL Error: ") + e.what();
        return crow::response(500, err);
    }
}



// 🧩 Function to get all CPU Coolers
crow::response getAllCpuCoolers() {
    crow::json::wvalue result;
    try {
        sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
        std::unique_ptr<sql::Connection> con(
            driver->connect("tcp://127.0.0.1:3306", "root", "")
        );
        con->setSchema("pc_parts_db");

        std::unique_ptr<sql::Statement> stmt(con->createStatement());
        std::unique_ptr<sql::ResultSet> res(stmt->executeQuery("SELECT * FROM cpu_cooler"));

        std::vector<crow::json::wvalue> list;
        while (res->next()) {
            crow::json::wvalue row;
            row["cooler_id"]         = res->getInt("cooler_id");
            row["name"]              = res->getString("name");
            row["type"]              = res->getString("type");
            row["supported_sockets"] = res->getString("supported_sockets");
            row["fan_rpm_range"]     = res->getString("fan_rpm_range");
            row["tdp"]               = res->getInt("tdp");
            row["stock"] = res->getInt("stocks");
            double price = res->getDouble("price");
            std::ostringstream oss;
            oss << std::fixed << std::setprecision(2) << price;
            row["price"] = oss.str();
            list.push_back(std::move(row));
        }
        result["cpu_coolers"] = std::move(list);
        return crow::response(200, result);
    }
    catch (sql::SQLException &e) {
        crow::json::wvalue err;
        err["error"] = std::string("SQL Error: ") + e.what();
        return crow::response(500, err);
    }
}

// 🧩 Function to get all Case Fans
crow::response getAllCaseFans() {
    crow::json::wvalue result;
    try {
        // Establish MySQL connection
        sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
        std::unique_ptr<sql::Connection> con(
            driver->connect("tcp://127.0.0.1:3306", "root", "")
        );
        con->setSchema("pc_parts_db");

        // Execute the query to retrieve all case fans
        std::unique_ptr<sql::Statement> stmt(con->createStatement());
        std::unique_ptr<sql::ResultSet> res(stmt->executeQuery("SELECT * FROM case_fans"));

        std::vector<crow::json::wvalue> list;
        while (res->next()) {
            crow::json::wvalue row;

            // Extract values from the database and populate the JSON object
            row["fan_id"]      = res->getInt("fan_id");
            row["name"]        = res->getString("name");
            row["fan_type"]    = res->getString("fan_type");
            row["size"]        = res->getInt("size");
            row["rpm_range"]   = res->getString("rpm_range");
            row["airflow"]     = res->getString("airflow");
            row["noise_level"] = res->getString("noise_level");
            row["stock"] = res->getInt("stocks");

            // Handle price formatting with two decimals
            double price = res->getDouble("price");
            std::ostringstream oss;
            oss << std::fixed << std::setprecision(2) << price;
            row["price"] = oss.str();

            row["tdp"]         = res->getInt("tdp");
            row["rgb"]         = res->getBoolean("rgb");
            row["quantity"]    = res->getInt("quantity");

            // Push the row into the list
            list.push_back(std::move(row));
        }

        // Add the list of case fans to the result
        result["case_fans"] = std::move(list);

        // Return a successful response
        return crow::response(200, result);
    }
    catch (sql::SQLException &e) {
        // Catch and return SQL errors
        crow::json::wvalue err;
        err["error"] = std::string("SQL Error: ") + e.what();
        return crow::response(500, err);
    }
}



crow::response getAllStorages() {
    crow::json::wvalue result;
    try {
        sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
        std::unique_ptr<sql::Connection> con(
            driver->connect("tcp://127.0.0.1:3306", "root", "")
        );
        con->setSchema("pc_parts_db");

        std::unique_ptr<sql::Statement> stmt(con->createStatement());
        std::unique_ptr<sql::ResultSet> res(stmt->executeQuery("SELECT * FROM storage_devices"));

        std::vector<crow::json::wvalue> list;
        while (res->next()) {
            crow::json::wvalue row;
            row["storage_id"]   = res->getInt("id");
            row["name"]         = res->getString("name");
            row["rpm"]          = res->getString("rpm");
            row["form_factor"]  = res->getString("form_factor");
            row["interface"]    = res->getString("interface");
            row["nvme"]         = res->getString("nvme");
            row["stock"] = res->getInt("stocks");

            row["capacity"] = static_cast<double>(res->getDouble("capacity"));


            double price = res->getDouble("price");
            std::ostringstream oss;
            oss << std::fixed << std::setprecision(2) << price;
            row["price"] = oss.str();

            list.push_back(std::move(row));
        }
        result["storages"] = std::move(list);
        return crow::response(200, result);
    }
    catch (sql::SQLException &e) {
        crow::json::wvalue err;
        err["error"] = std::string("SQL Error: ") + e.what();
        return crow::response(500, err);
    }
}


crow::response getAllPowersupplies() {
    crow::json::wvalue result;
    try {
        // Establish connection to the MySQL database
        sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
        std::unique_ptr<sql::Connection> con(
            driver->connect("tcp://127.0.0.1:3306", "root", "")
        );
        con->setSchema("pc_parts_db");

        // Execute SQL query to retrieve all power supplies
        std::unique_ptr<sql::Statement> stmt(con->createStatement());
        std::unique_ptr<sql::ResultSet> res(stmt->executeQuery("SELECT * FROM power_supplies"));

        // Prepare JSON response
        std::vector<crow::json::wvalue> list;
        while (res->next()) {
            crow::json::wvalue row;
            row["id"] = res->getInt("id");
            row["name"] = res->getString("name");
            row["price"] = static_cast<float>(res->getDouble("price"));
            row["form_factor"] = res->getString("form_factor");
            row["efficiency"] = res->getString("efficiency");
            row["modularity"] = res->getString("modularity");
            row["fanless"] = res->getString("fanless");
            row["wattage"] = res->getInt("wattage");
            row["stock"] = res->getInt("stocks");

            list.push_back(std::move(row));
        }
        result["power_supplies"] = std::move(list);
        return crow::response(200, result);
    }
    catch (sql::SQLException &e) {
        crow::json::wvalue err;
        err["error"] = std::string("SQL Error: ") + e.what();
        return crow::response(500, err);
    }
}


crow::response getAllRams() {
    crow::json::wvalue result;
    try {
        sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
        std::unique_ptr<sql::Connection> con(
            driver->connect("tcp://127.0.0.1:3306", "root", "")
        );
        con->setSchema("pc_parts_db");

        std::unique_ptr<sql::Statement> stmt(con->createStatement());
        std::unique_ptr<sql::ResultSet> res(stmt->executeQuery("SELECT * FROM ram_modules"));

        std::vector<crow::json::wvalue> list;
        while (res->next()) {
            crow::json::wvalue row;
            row["ram_id"]      = res->getInt("id");
            row["name"]        = res->getString("name");
            row["ram_type"]    = res->getString("ram_type");
            row["form_factor"] = res->getString("form_factor");
            row["speed"]       = res->getInt("speed");
            row["capacity"]    = res->getInt("capacity");
            row["stock"] = res->getInt("stocks");

            row["price"]       = static_cast<float>(res->getDouble("price")); // Explicit cast to float
            list.push_back(std::move(row));
        }
        result["Ram"] = std::move(list);
        return crow::response(200, result);
    }
    catch (sql::SQLException &e) {
        crow::json::wvalue err;
        err["error"] = std::string("SQL Error: ") + e.what();
        return crow::response(500, err);
    }
}

crow::response getAllOrders() {
    crow::json::wvalue result;

    try {
        std::cout << "Connecting to MySQL..." << std::endl;

        sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
        std::unique_ptr<sql::Connection> con(
            driver->connect("tcp://127.0.0.1:3306", "root", "")
        );

        std::cout << "Connected to MySQL successfully!" << std::endl;

        con->setSchema("pc_accounts_db");
        std::unique_ptr<sql::Statement> stmt(con->createStatement());

        std::unique_ptr<sql::ResultSet> res(stmt->executeQuery(R"(
            SELECT 
                o.order_id, o.street_address, o.apartment, o.city,
                o.subtotal, o.total, o.payment_method, o.order_date,o.account_id,
                i.cpu_name, i.cpu_price,
                i.gpu_name, i.gpu_price,
                i.ram_name, i.ram_price,
                i.storage_name, i.storage_price,
                i.mobo_name, i.mobo_price,
                i.psu_name, i.psu_price,
                i.case_name, i.case_price,
                i.cooler_name, i.cooler_price,
                i.casefan_name, i.casefan_price
            FROM orders o
            JOIN order_items i ON o.order_id = i.order_id
        )"));

        std::vector<crow::json::wvalue> orders;
        while (res->next()) {
            crow::json::wvalue items;

            items["cpu"]["name"] = res->getString("cpu_name");
            items["cpu"]["price"] = static_cast<float>(res->getDouble("cpu_price"));

            items["gpu"]["name"] = res->getString("gpu_name");
            items["gpu"]["price"] = static_cast<float>(res->getDouble("gpu_price"));

            items["ram"]["name"] = res->getString("ram_name");
            items["ram"]["price"] = static_cast<float>(res->getDouble("ram_price"));

            items["storage"]["name"] = res->getString("storage_name");
            items["storage"]["price"] = static_cast<float>(res->getDouble("storage_price"));

            items["mobo"]["name"] = res->getString("mobo_name");
            items["mobo"]["price"] = static_cast<float>(res->getDouble("mobo_price"));

            items["psu"]["name"] = res->getString("psu_name");
            items["psu"]["price"] = static_cast<float>(res->getDouble("psu_price"));

            items["case"]["name"] = res->getString("case_name");
            items["case"]["price"] = static_cast<float>(res->getDouble("case_price"));

            items["cooler"]["name"] = res->getString("cooler_name");
            items["cooler"]["price"] = static_cast<float>(res->getDouble("cooler_price"));

            items["casefan"]["name"] = res->getString("casefan_name");
            items["casefan"]["price"] = static_cast<float>(res->getDouble("casefan_price"));

            crow::json::wvalue order;
            order["order_id"] = res->getInt("order_id");
            order["account_id"] = res->getInt("account_id");
            order["street_address"] = res->getString("street_address");
            order["apartment"] = res->getString("apartment");
            order["city"] = res->getString("city");
            order["subtotal"] = static_cast<float>(res->getDouble("subtotal"));
            order["total"] = static_cast<float>(res->getDouble("total"));
            order["payment_method"] = res->getString("payment_method");
            order["order_date"] = res->getString("order_date");
            order["items"] = std::move(items);  // Moved to avoid copy error

            orders.push_back(std::move(order)); // Moved to avoid copy error
        }

        result["orders"] = std::move(orders); // Optional move

        std::cout << "Orders fetched successfully." << std::endl;
        return crow::response(200, result);

    } catch (sql::SQLException& e) {
        std::cout << "SQL Exception: " << e.what() << std::endl;

        crow::json::wvalue err;
        err["error"] = std::string("SQL Error: ") + e.what();
        return crow::response(500, err);
    }
}




int main()
{
    crow::App<CORS> app;
    CROW_ROUTE(app, "/order/status").methods("GET"_method)(getAllOrders);
    CROW_ROUTE(app, "/CPUs").methods("GET"_method)(getAllProcessors);
    CROW_ROUTE(app, "/GPUs").methods("GET"_method)(getAllGPUs);
    CROW_ROUTE(app, "/Motherboards").methods("GET"_method)(getAllMotherboards);
    CROW_ROUTE(app, "/ComputerCases").methods("GET"_method)(getAllComputerCases);
    CROW_ROUTE(app, "/CpuCoolers").methods("GET"_method)(getAllCpuCoolers);
    CROW_ROUTE(app, "/CaseFans").methods("GET"_method)(getAllCaseFans);
    CROW_ROUTE(app, "/Storages").methods("GET"_method)(getAllStorages);
    CROW_ROUTE(app, "/Rams").methods("GET"_method)(getAllRams);
    CROW_ROUTE(app, "/Powersupplies").methods("GET"_method)(getAllPowersupplies);

    CROW_ROUTE(app, "/login").methods("POST"_method)([](const crow::request& req) {
    auto body = crow::json::load(req.body);
    if (!body || !body.has("username") || !body.has("password")) {
        return crow::response(400, "{\"status\": \"error\", \"message\": \"Missing fields\"}");
    }

    std::string username = body["username"].s();
    std::string password = body["password"].s();

    try {
        sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
        std::unique_ptr<sql::Connection> con(driver->connect("tcp://127.0.0.1:3306", "root", ""));
        con->setSchema("pc_accounts_db");

        std::unique_ptr<sql::PreparedStatement> stmt(con->prepareStatement("SELECT account_id, password FROM accounts WHERE username = ?"));
        stmt->setString(1, username);
        std::unique_ptr<sql::ResultSet> res(stmt->executeQuery());

        if (res->next()) {
            std::string storedHashedPassword = res->getString("password");
            int accountId = res->getInt("account_id");

            // Use BCrypt to validate password
            if (BCrypt::validatePassword(password, storedHashedPassword)) {
                crow::json::wvalue response;
                response["status"] = "success";
                response["token"] = "your-jwt-token"; // Replace with real JWT generation
                response["username"] = username;
                response["account_id"] = accountId;
                return crow::response(200, response);
            } else {
                crow::json::wvalue response;
                response["status"] = "error";
                response["message"] = "Incorrect password.";
                return crow::response(401, response);
            }
        } else {
            crow::json::wvalue response;
            response["status"] = "error";
            response["message"] = "Username not found.";
            return crow::response(404, response);
        }
    } catch (sql::SQLException& e) {
        return crow::response(500, "{\"status\": \"error\", \"message\": \"Database error: " + std::string(e.what()) + "\"}");
    }
});
    
    CROW_ROUTE(app, "/register").methods("POST"_method)([](const crow::request& req) {
    auto body = crow::json::load(req.body);
    if (!body || !body.has("username") || !body.has("email") || !body.has("password")) {
        return crow::response(400, "Missing fields");
    }

    std::string username = body["username"].s();
    std::string email = body["email"].s();
    std::string password = body["password"].s();

    // Hash the password using BCrypt
    std::string hashedPassword = BCrypt::generateHash(password);

    try {
        sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
        std::unique_ptr<sql::Connection> con(driver->connect("tcp://127.0.0.1:3306", "root", ""));
        con->setSchema("pc_accounts_db");

        std::unique_ptr<sql::PreparedStatement> stmt(
            con->prepareStatement("INSERT INTO accounts (username, email, password) VALUES (?, ?, ?)")
        );
        stmt->setString(1, username);
        stmt->setString(2, email);
        stmt->setString(3, hashedPassword);
        stmt->executeUpdate();

        crow::json::wvalue res;
        res["status"] = "success";
        res["message"] = "User registered";
        return crow::response(201, res);
    } catch (sql::SQLException& e) {
        return crow::response(500, std::string("Database error: ") + e.what());
    }
});

    CROW_ROUTE(app, "/api/builds").methods("POST"_method)([](const crow::request& req) {
        auto body = crow::json::load(req.body);
        if (!body || 
            !body.has("build_name") || !body.has("cpu") || !body.has("gpu") ||
            !body.has("ram") || !body.has("storage") || !body.has("powersupply") ||
            !body.has("cpucooler") || !body.has("motherboard") || !body.has("case_name") ||
            !body.has("casefan") || !body.has("account_id")) {
            return crow::response(400, "Missing fields");
        }
    
        std::string build_name = body["build_name"].s();
        std::string cpu = body["cpu"].s();
        std::string gpu = body["gpu"].s();
        std::string ram = body["ram"].s();
        std::string storage = body["storage"].s();
        std::string powersupply = body["powersupply"].s();
        std::string cpucooler = body["cpucooler"].s();
        std::string motherboard = body["motherboard"].s();
        std::string case_name = body["case_name"].s();
        std::string casefan = body["casefan"].s();
        int account_id = body["account_id"].i();
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_accounts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("INSERT INTO builds (build_name, cpu, gpu, ram, storage, powersupply, cpucooler, motherboard, case_name, casefan, account_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
            );
    
            stmt->setString(1, build_name);
            stmt->setString(2, cpu);
            stmt->setString(3, gpu);
            stmt->setString(4, ram);
            stmt->setString(5, storage);
            stmt->setString(6, powersupply);
            stmt->setString(7, cpucooler);
            stmt->setString(8, motherboard);
            stmt->setString(9, case_name);
            stmt->setString(10, casefan);
            stmt->setInt(11, account_id);
    
            stmt->executeUpdate();
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "Build saved";
            return crow::response(201, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });
    
    CROW_ROUTE(app, "/builds").methods("GET"_method)([](const crow::request& req) {
    crow::json::wvalue result;

    try {
        sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
        std::unique_ptr<sql::Connection> con(
            driver->connect("tcp://127.0.0.1:3306", "root", "")
        );

        con->setSchema("pc_accounts_db");

        std::unique_ptr<sql::Statement> stmt(con->createStatement());
        std::unique_ptr<sql::ResultSet> res(stmt->executeQuery("SELECT * FROM builds"));

        std::vector<crow::json::wvalue> buildList;

        while (res->next()) {
            crow::json::wvalue build;

            build["id"]    = res->getInt("build_id");
            build["account_id"]  = res->getInt("account_id");
            build["name"]  = res->getString("build_name");

            build["case"]   = res->isNull("case_name") ? "" : res->getString("case_name");
            build["ram"]         = res->isNull("ram") ? "" : res->getString("ram");
            build["cpu"]         = res->isNull("cpu") ? "" : res->getString("cpu");
            build["gpu"]         = res->isNull("gpu") ? "" : res->getString("gpu");
            build["mobo"] = res->isNull("motherboard") ? "" : res->getString("motherboard");
            build["cooler"]   = res->isNull("cpucooler") ? "" : res->getString("cpucooler");
            build["storage"]     = res->isNull("storage") ? "" : res->getString("storage");
            build["posu"] = res->isNull("powersupply") ? "" : res->getString("powersupply");
            build["fan"]     = res->isNull("casefan") ? "" : res->getString("casefan");

            buildList.push_back(std::move(build));
        }

        result["builds"] = std::move(buildList);
        return crow::response(200, result);
    }
    catch (sql::SQLException& e) {
        crow::json::wvalue error;
        error["error"] = std::string("SQL Error: ") + e.what();
        return crow::response(500, error);
    }
    });

    // Route to update stock and price of existing CPU
    CROW_ROUTE(app, "/cpu/update").methods("POST"_method)([](const crow::request& req){
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name") || !body.has("price") || !body.has("stocks")) {
            return crow::response(400, "Missing fields");
        }

        std::string name = body["name"].s();
        double price = body["price"].d();
        int stocks = body["stocks"].i();

        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");

            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("UPDATE processor SET price=?, stocks=? WHERE name=?")
            );
            stmt->setDouble(1, price);
            stmt->setInt(2, stocks);
            stmt->setString(3, name);
            int rows = stmt->executeUpdate();

            if (rows == 0)
                return crow::response(404, "CPU not found");

            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "CPU updated";
            return crow::response(200, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });

    // Route to delete a CPU by name
    CROW_ROUTE(app, "/cpu/delete").methods("POST"_method)([](const crow::request& req){
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name")) {
            return crow::response(400, "Missing CPU name");
        }

        std::string name = body["name"].s();

        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");

            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("DELETE FROM processor WHERE name=?")
            );
            stmt->setString(1, name);
            int rows = stmt->executeUpdate();

            if (rows == 0)
                return crow::response(404, "CPU not found");

            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "CPU deleted";
            return crow::response(200, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });


    CROW_ROUTE(app, "/gpu/delete").methods("POST"_method)([](const crow::request& req) {
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name")) {
            return crow::response(400, "Missing GPU name");
        }
    
        std::string name = body["name"].s();
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("DELETE FROM gpu WHERE name=?")
            );
            stmt->setString(1, name);
            int rows = stmt->executeUpdate();
    
            if (rows == 0)
                return crow::response(404, "GPU not found");
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "GPU deleted";
            return crow::response(200, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });

    CROW_ROUTE(app, "/storage/delete").methods("POST"_method)([](const crow::request& req) {
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name")) {
            return crow::response(400, "Missing Storage name");
        }
    
        std::string name = body["name"].s();
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("DELETE FROM storage_devices WHERE name=?")
            );
            stmt->setString(1, name);
            int rows = stmt->executeUpdate();
    
            if (rows == 0)
                return crow::response(404, "Storage not found");
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "Storage deleted";
            return crow::response(200, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });

    CROW_ROUTE(app, "/memory/delete").methods("POST"_method)([](const crow::request& req) {
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name")) {
            return crow::response(400, "Missing Memory name");
        }
    
        std::string name = body["name"].s();
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("DELETE FROM ram_modules WHERE name=?")
            );
            stmt->setString(1, name);
            int rows = stmt->executeUpdate();
    
            if (rows == 0)
                return crow::response(404, "Memory not found");
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "Memory deleted";
            return crow::response(200, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });

    CROW_ROUTE(app, "/case/delete").methods("POST"_method)([](const crow::request& req) {
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name"))
            return crow::response(400, "Missing Case name");
    
        std::string name = body["name"].s();
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(driver->connect("tcp://127.0.0.1:3306", "root", ""));
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(con->prepareStatement("DELETE FROM ComputerCases WHERE name=?"));
            stmt->setString(1, name);
            int rows = stmt->executeUpdate();
    
            if (rows == 0) return crow::response(404, "Case not found");
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "Case deleted";
            return crow::response(200, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, e.what());
        }
    });

    CROW_ROUTE(app, "/mobo/delete").methods("POST"_method)([](const crow::request& req) {
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name"))
            return crow::response(400, "Missing Motherboard name");
    
        std::string name = body["name"].s();
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(driver->connect("tcp://127.0.0.1:3306", "root", ""));
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(con->prepareStatement("DELETE FROM motherboard WHERE name=?"));
            stmt->setString(1, name);
            int rows = stmt->executeUpdate();
    
            if (rows == 0) return crow::response(404, "Motherboard not found");
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "Motherboard deleted";
            return crow::response(200, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, e.what());
        }
    });

    CROW_ROUTE(app, "/case-fans/delete").methods("POST"_method)([](const crow::request& req) {
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name"))
            return crow::response(400, "Missing Case Fan name");
    
        std::string name = body["name"].s();
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(driver->connect("tcp://127.0.0.1:3306", "root", ""));
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(con->prepareStatement("DELETE FROM case_fans WHERE name=?"));
            stmt->setString(1, name);
            int rows = stmt->executeUpdate();
    
            if (rows == 0) return crow::response(404, "Case Fan not found");
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "Case Fan deleted";
            return crow::response(200, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, e.what());
        }
    });

    CROW_ROUTE(app, "/cooler/delete").methods("POST"_method)([](const crow::request& req) {
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name"))
            return crow::response(400, "Missing Cooler name");
    
        std::string name = body["name"].s();
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(driver->connect("tcp://127.0.0.1:3306", "root", ""));
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(con->prepareStatement("DELETE FROM cpu_cooler WHERE name=?"));
            stmt->setString(1, name);
            int rows = stmt->executeUpdate();
    
            if (rows == 0) return crow::response(404, "Cooler not found");
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "Cooler deleted";
            return crow::response(200, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, e.what());
        }
    });

    CROW_ROUTE(app, "/psu/delete").methods("POST"_method)([](const crow::request& req) {
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name"))
            return crow::response(400, "Missing PSU name");
    
        std::string name = body["name"].s();
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(driver->connect("tcp://127.0.0.1:3306", "root", ""));
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(con->prepareStatement("DELETE FROM power_supplies WHERE name=?"));
            stmt->setString(1, name);
            int rows = stmt->executeUpdate();
    
            if (rows == 0) return crow::response(404, "PSU not found");
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "PSU deleted";
            return crow::response(200, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, e.what());
        }
    });

    CROW_ROUTE(app, "/gpu/update").methods("POST"_method)([](const crow::request& req){
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name") || !body.has("price") || !body.has("stocks")) {
            return crow::response(400, "Missing fields");
        }
    
        std::string name = body["name"].s();
        double price = body["price"].d();
        int stocks = body["stocks"].i();
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("UPDATE gpu SET price=?, stocks=? WHERE name=?")
            );
            stmt->setDouble(1, price);
            stmt->setInt(2, stocks);
            stmt->setString(3, name);
            int rows = stmt->executeUpdate();
    
            if (rows == 0)
                return crow::response(404, "GPU not found");
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "GPU updated";
            return crow::response(200, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });

    CROW_ROUTE(app, "/mobo/update").methods("POST"_method)([](const crow::request& req){
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name") || !body.has("price") || !body.has("stocks")) {
            return crow::response(400, "Missing fields");
        }
    
        std::string name = body["name"].s();
        double price = body["price"].d();
        int stocks = body["stocks"].i();
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("UPDATE motherboard SET price=?, stocks=? WHERE name=?")
            );
            stmt->setDouble(1, price);
            stmt->setInt(2, stocks);
            stmt->setString(3, name);
            int rows = stmt->executeUpdate();
    
            if (rows == 0)
                return crow::response(404, "Motherboard not found");
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "Motherboard updated";
            return crow::response(200, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });

    CROW_ROUTE(app, "/ram/update").methods("POST"_method)([](const crow::request& req){
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name") || !body.has("price") || !body.has("stocks")) {
            return crow::response(400, "Missing fields");
        }
    
        std::string name = body["name"].s();
        double price = body["price"].d();
        int stocks = body["stocks"].i();
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("UPDATE ram_modules SET price=?, stocks=? WHERE name=?")
            );
            stmt->setDouble(1, price);
            stmt->setInt(2, stocks);
            stmt->setString(3, name);
            int rows = stmt->executeUpdate();
    
            if (rows == 0)
                return crow::response(404, "RAM not found");
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "RAM updated";
            return crow::response(200, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });

    CROW_ROUTE(app, "/storage/update").methods("POST"_method)([](const crow::request& req){
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name") || !body.has("price") || !body.has("stocks")) {
            return crow::response(400, "Missing fields");
        }
    
        std::string name = body["name"].s();
        double price = body["price"].d();
        int stocks = body["stocks"].i();
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("UPDATE storage_devices SET price=?, stocks=? WHERE name=?")
            );
            stmt->setDouble(1, price);
            stmt->setInt(2, stocks);
            stmt->setString(3, name);
            int rows = stmt->executeUpdate();
    
            if (rows == 0)
                return crow::response(404, "Storage not found");
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "Storage updated";
            return crow::response(200, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });

    CROW_ROUTE(app, "/psu/update").methods("POST"_method)([](const crow::request& req){
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name") || !body.has("price") || !body.has("stocks")) {
            return crow::response(400, "Missing fields");
        }
    
        std::string name = body["name"].s();
        double price = body["price"].d();
        int stocks = body["stocks"].i();
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("UPDATE power_supplies SET price=?, stocks=? WHERE name=?")
            );
            stmt->setDouble(1, price);
            stmt->setInt(2, stocks);
            stmt->setString(3, name);
            int rows = stmt->executeUpdate();
    
            if (rows == 0)
                return crow::response(404, "PSU not found");
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "PSU updated";
            return crow::response(200, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });

    CROW_ROUTE(app, "/case/update").methods("POST"_method)([](const crow::request& req){
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name") || !body.has("price") || !body.has("stocks")) {
            return crow::response(400, "Missing fields");
        }
    
        std::string name = body["name"].s();
        double price = body["price"].d();
        int stocks = body["stocks"].i();
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("UPDATE ComputerCases SET price=?, stocks=? WHERE name=?")
            );
            stmt->setDouble(1, price);
            stmt->setInt(2, stocks);
            stmt->setString(3, name);
            int rows = stmt->executeUpdate();
    
            if (rows == 0)
                return crow::response(404, "Case not found");
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "Case updated";
            return crow::response(200, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });

    CROW_ROUTE(app, "/cooler/update").methods("POST"_method)([](const crow::request& req){
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name") || !body.has("price") || !body.has("stocks")) {
            return crow::response(400, "Missing fields");
        }
    
        std::string name = body["name"].s();
        double price = body["price"].d();
        int stocks = body["stocks"].i();
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("UPDATE cpu_cooler SET price=?, stocks=? WHERE name=?")
            );
            stmt->setDouble(1, price);
            stmt->setInt(2, stocks);
            stmt->setString(3, name);
            int rows = stmt->executeUpdate();
    
            if (rows == 0)
                return crow::response(404, "Cooler not found");
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "Cooler updated";
            return crow::response(200, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });

    CROW_ROUTE(app, "/casefan/update").methods("POST"_method)([](const crow::request& req){
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name") || !body.has("price") || !body.has("stocks")) {
            return crow::response(400, "Missing fields");
        }
    
        std::string name = body["name"].s();
        double price = body["price"].d();
        int stocks = body["stocks"].i();
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("UPDATE case_fans SET price=?, stocks=? WHERE name=?")
            );
            stmt->setDouble(1, price);
            stmt->setInt(2, stocks);
            stmt->setString(3, name);
            int rows = stmt->executeUpdate();
    
            if (rows == 0)
                return crow::response(404, "Case Fan not found");
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "Case Fan updated";
            return crow::response(200, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });

    CROW_ROUTE(app, "/case/add").methods("POST"_method)([](const crow::request& req){
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name") || !body.has("price") || !body.has("form_factor") ||
            !body.has("color") || !body.has("weight") || !body.has("stocks")) {
            return crow::response(400, "Missing fields");
        }
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("INSERT INTO ComputerCases (name, price, form_factor, color, weight, stocks) VALUES (?, ?, ?, ?, ?, ?)")
            );
            stmt->setString(1, sql::SQLString(std::string(body["name"].s())));
            stmt->setDouble(2, body["price"].d());
            stmt->setString(3, sql::SQLString(std::string(body["form_factor"].s())));
            stmt->setString(4, sql::SQLString(std::string(body["color"].s())));
            stmt->setDouble(5, body["weight"].d());
            stmt->setInt(6, body["stocks"].i());
            stmt->executeUpdate();
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "Computer Case added";
            return crow::response(201, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });

    CROW_ROUTE(app, "/casefan/add").methods("POST"_method)([](const crow::request& req){
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name") || !body.has("fan_type") || !body.has("size") ||
            !body.has("rpm_range") || !body.has("airflow") || !body.has("tdp") || 
            !body.has("noise_level") || !body.has("price") || !body.has("rgb") || 
            !body.has("quantity") || !body.has("stocks")) {
            return crow::response(400, "Missing fields");
        }
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("INSERT INTO case_fans (name, fan_type, size, rpm_range, airflow, tdp, noise_level, price, rgb, quantity, stocks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
            );
            stmt->setString(1, sql::SQLString(std::string(body["name"].s())));
            stmt->setString(2, sql::SQLString(std::string(body["fan_type"].s())));
            stmt->setInt(3, body["size"].i());
            stmt->setString(4, sql::SQLString(std::string(body["rpm_range"].s())));
            stmt->setString(5, sql::SQLString(std::string(body["airflow"].s())));
            stmt->setInt(6, body["tdp"].i());
            stmt->setString(7, sql::SQLString(std::string(body["noise_level"].s())));
            stmt->setDouble(8, body["price"].d());
            stmt->setInt(9, body["rgb"].i()); // 0 or 1
            stmt->setInt(10, body["quantity"].i());
            stmt->setInt(11, body["stocks"].i());
            stmt->executeUpdate();
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "Case Fan added";
            return crow::response(201, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });

    CROW_ROUTE(app, "/cooler/add").methods("POST"_method)([](const crow::request& req){
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name") || !body.has("type") || !body.has("supported_sockets") ||
            !body.has("fan_rpm_range") || !body.has("tdp") || !body.has("price") || !body.has("stocks")) {
            return crow::response(400, "Missing fields");
        }
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("INSERT INTO cpu_cooler (name, type, supported_sockets, fan_rpm_range, tdp, price, stocks) VALUES (?, ?, ?, ?, ?, ?, ?)")
            );
            stmt->setString(1, sql::SQLString(std::string(body["name"].s())));
            stmt->setString(2, sql::SQLString(std::string(body["type"].s())));
            stmt->setString(3, sql::SQLString(std::string(body["supported_sockets"].s())));
            stmt->setString(4, sql::SQLString(std::string(body["fan_rpm_range"].s())));
            stmt->setInt(5, body["tdp"].i());
            stmt->setDouble(6, body["price"].d());
            stmt->setInt(7, body["stocks"].i());
            stmt->executeUpdate();
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "CPU Cooler added";
            return crow::response(201, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });

    CROW_ROUTE(app, "/gpu/add").methods("POST"_method)([](const crow::request& req){
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name") || !body.has("chipset") || !body.has("memory_type") ||
            !body.has("memory_size") || !body.has("interface") || !body.has("power_draw") || 
            !body.has("price") || !body.has("stocks")) {
            return crow::response(400, "Missing fields");
        }
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("INSERT INTO gpu (name, chipset, memory_type, memory_size, interface, power_draw, price, stocks) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
            );
            stmt->setString(1, sql::SQLString(std::string(body["name"].s())));
            stmt->setString(2, sql::SQLString(std::string(body["chipset"].s())));
            stmt->setString(3, sql::SQLString(std::string(body["memory_type"].s())));
            stmt->setInt(4, body["memory_size"].i());
            stmt->setString(5, sql::SQLString(std::string(body["interface"].s())));
            stmt->setInt(6, body["power_draw"].i());
            stmt->setDouble(7, body["price"].d());
            stmt->setInt(8, body["stocks"].i());
            stmt->executeUpdate();
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "GPU added";
            return crow::response(201, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });

    CROW_ROUTE(app, "/motherboard/add").methods("POST"_method)([](const crow::request& req) {
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name") || !body.has("manufacturer") || !body.has("socket_type") ||
            !body.has("chipset") || !body.has("memory_type") || !body.has("memory_slots") ||
            !body.has("max_memory") || !body.has("pcie_version") || !body.has("form_factor") ||
            !body.has("sata_ports") || !body.has("price") || !body.has("power_consumption") ||
            !body.has("stocks")) {
            return crow::response(400, "Missing fields");
        }
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement(R"(
                    INSERT INTO motherboard (
                        name, manufacturer, socket_type, chipset, memory_type,
                        memory_slots, max_memory, pcie_version, form_factor,
                        sata_ports, price, power_consumption, stocks
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                )")
            );
    
            stmt->setString(1, sql::SQLString(std::string(body["name"].s())));
            stmt->setString(2, sql::SQLString(std::string(body["manufacturer"].s())));
            stmt->setString(3, sql::SQLString(std::string(body["socket_type"].s())));
            stmt->setString(4, sql::SQLString(std::string(body["chipset"].s())));
            stmt->setString(5, sql::SQLString(std::string(body["memory_type"].s())));
            stmt->setInt(6, body["memory_slots"].i());
            stmt->setInt(7, body["max_memory"].i());
            stmt->setString(8, sql::SQLString(std::string(body["pcie_version"].s())));
            stmt->setString(9, sql::SQLString(std::string(body["form_factor"].s())));
            stmt->setInt(10, body["sata_ports"].i());
            stmt->setDouble(11, body["price"].d());
            stmt->setInt(12, body["power_consumption"].i());
            stmt->setInt(13, body["stocks"].i());
    
            stmt->executeUpdate();
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "Motherboard added";
            return crow::response(201, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });

    CROW_ROUTE(app, "/psu/add").methods("POST"_method)([](const crow::request& req){
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name") || !body.has("price") || !body.has("wattage") || !body.has("stocks")) {
            return crow::response(400, "Missing required fields");
        }
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("INSERT INTO power_supplies (name, price, form_factor, efficiency, modularity, fanless, wattage, stocks) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
            );
            stmt->setString(1, sql::SQLString(std::string(body["name"].s())));
            stmt->setDouble(2, body["price"].d());
    
            // Optional fields (nullable)
            stmt->setString(3, body.has("form_factor") ? sql::SQLString(std::string(body["form_factor"].s())) : "");
            stmt->setString(4, body.has("efficiency") ? sql::SQLString(std::string(body["efficiency"].s())) : "");
            stmt->setString(5, body.has("modularity") ? sql::SQLString(std::string(body["modularity"].s())) : "");
            stmt->setString(6, body.has("fanless") ? sql::SQLString(std::string(body["fanless"].s())) : "No");
    
            stmt->setInt(7, body["wattage"].i());
            stmt->setInt(8, body["stocks"].i());
    
            stmt->executeUpdate();
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "PSU added";
            return crow::response(201, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });

    CROW_ROUTE(app, "/ram/add").methods("POST"_method)([](const crow::request& req){
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name") || !body.has("capacity") || !body.has("speed") ||
            !body.has("ram_type") || !body.has("form_factor") || !body.has("price") || !body.has("stocks")) {
            return crow::response(400, "Missing fields");
        }
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("INSERT INTO ram_modules (name, ram_type, capacity, form_factor, price, stocks, speed) VALUES (?, ?, ?, ?, ?, ?, ?)")
            );
            stmt->setString(1, sql::SQLString(std::string(body["name"].s())));
            stmt->setString(2, sql::SQLString(std::string(body["ram_type"].s())));
            stmt->setInt(3, body["capacity"].i());
            stmt->setString(4, sql::SQLString(std::string(body["form_factor"].s())));
            stmt->setDouble(5, body["price"].d());
            stmt->setInt(6, body["stocks"].i());
            stmt->setInt(7, body["speed"].i());
            stmt->executeUpdate();
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "RAM added";
            return crow::response(201, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });
    CROW_ROUTE(app, "/storage/add").methods("POST"_method)([](const crow::request& req){
        auto body = crow::json::load(req.body);
        if (!body || 
            !body.has("name") || 
            !body.has("price") || 
            !body.has("rpm") || 
            !body.has("form_factor") || 
            !body.has("interface") || 
            !body.has("nvme") || 
            !body.has("capacity") || 
            !body.has("stocks")) 
        {
            return crow::response(400, "Missing fields");
        }
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");
    
            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement(
                    "INSERT INTO storage_devices "
                    "(name, price, rpm, form_factor, interface, nvme, capacity, image, stocks) "
                    "VALUES (?, ?, ?, ?, ?, ?, ?, NULL, ?)"
                )
            );
    
            stmt->setString(1, std::string(body["name"].s()));
            stmt->setDouble(2, body["price"].d());
            stmt->setString(3, std::string(body["rpm"].s()));
            stmt->setString(4, std::string(body["form_factor"].s()));
            stmt->setString(5, std::string(body["interface"].s()));
            stmt->setString(6, std::string(body["nvme"].s()));
            stmt->setDouble(7, body["capacity"].d());
            stmt->setInt(8, body["stocks"].i());
    
            stmt->executeUpdate();
    
            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "Storage device added";
            return crow::response(201, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });

    CROW_ROUTE(app, "/cpu/add").methods("POST"_method)([](const crow::request& req){
        auto body = crow::json::load(req.body);
        if (!body || !body.has("name") || !body.has("boost") || !body.has("socket") ||
            !body.has("microarch") || !body.has("tdp") || !body.has("price") ||
            !body.has("cores") || !body.has("igpu") || !body.has("stocks")) {
            return crow::response(400, "Missing fields");
        }

        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(
                driver->connect("tcp://127.0.0.1:3306", "root", "")
            );
            con->setSchema("pc_parts_db");

            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("INSERT INTO processor (name, boost, socket, microarch, tdp, price, cores, igpu, stocks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
            );
            stmt->setString(1, sql::SQLString(std::string(body["name"].s())));
            stmt->setString(2, sql::SQLString(std::string(body["boost"].s())));
            stmt->setString(3, sql::SQLString(std::string(body["socket"].s())));
            stmt->setString(4, sql::SQLString(std::string(body["microarch"].s())));
            stmt->setString(8, sql::SQLString(std::string(body["igpu"].s())));
            stmt->setInt(5, body["tdp"].i());
            stmt->setDouble(6, body["price"].d());
            stmt->setInt(7, body["cores"].i());
            stmt->setInt(9, body["stocks"].i());
            stmt->executeUpdate();

            crow::json::wvalue res;
            res["status"] = "success";
            res["message"] = "CPU added";
            return crow::response(201, res);
        } catch (sql::SQLException& e) {
            return crow::response(500, std::string("Database error: ") + e.what());
        }
    });
    
    CROW_ROUTE(app, "/checkout/submit").methods("POST"_method)([](const crow::request& req) {
        std::cerr << "[LOG] Incoming /checkout/submit request\n";
        std::cerr << "[LOG] Raw Request Body:\n" << req.body << "\n";
    
        auto body = crow::json::load(req.body);
        if (!body) {
            std::cerr << "[ERROR] Failed to parse JSON body.\n";
            return crow::response(400, "Invalid JSON body");
        }
    
        // Validate required fields
        std::vector<std::string> required_fields = {
            "first_name", "company_name", "street_address", "city", "phone_number",
            "email", "payment_method", "subtotal", "total", "account_id", "build"
        };
    
        for (const std::string& field : required_fields) {
            if (!body.has(field)) {
                std::cerr << "[ERROR] Missing required field: " << field << "\n";
                return crow::response(400, "Missing required field: " + field);
            }
        }
    
        try {
            sql::mysql::MySQL_Driver* driver = sql::mysql::get_mysql_driver_instance();
            std::unique_ptr<sql::Connection> con(driver->connect("tcp://127.0.0.1:3306", "root", ""));
            con->setSchema("pc_accounts_db");
    
            std::cerr << "[LOG] Connected to database\n";
    
            // Insert into orders
            std::unique_ptr<sql::PreparedStatement> stmt(
                con->prepareStatement("INSERT INTO orders (account_id, first_name, company_name, street_address, apartment, city, phone_number, email, save_info, subtotal, shipping_fee, total, payment_method, coupon_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
            );
    
            stmt->setInt(1, std::stoi(std::string(body["account_id"].s())));
            stmt->setString(2, std::string(body["first_name"].s()));
            stmt->setString(3, std::string(body["company_name"].s()));
            stmt->setString(4, std::string(body["street_address"].s()));
            stmt->setString(5, body.has("apartment") ? std::string(body["apartment"].s()) : "");
            stmt->setString(6, std::string(body["city"].s()));
            stmt->setString(7, std::string(body["phone_number"].s()));
            stmt->setString(8, std::string(body["email"].s()));
            stmt->setInt(9, body.has("save_info") && body["save_info"].b() ? 1 : 0);
            stmt->setDouble(10, std::stod(std::string(body["subtotal"].s())));
            stmt->setDouble(11, body.has("shipping_fee") ? std::stod(std::string(body["shipping_fee"].s())) : 0.0);
            stmt->setDouble(12, std::stod(std::string(body["total"].s())));
            stmt->setString(13, std::string(body["payment_method"].s()));
            stmt->setString(14, body.has("coupon_code") ? std::string(body["coupon_code"].s()) : "");
            stmt->executeUpdate();
    
            std::cerr << "[LOG] Order inserted into 'orders' table.\n";
    
            // Get last inserted order_id
            std::unique_ptr<sql::Statement> lastIdStmt(con->createStatement());
            std::unique_ptr<sql::ResultSet> rs(lastIdStmt->executeQuery("SELECT LAST_INSERT_ID() AS order_id"));
            int orderId = 0;
            if (rs->next()) {
                orderId = rs->getInt("order_id");
                std::cerr << "[LOG] Retrieved order_id: " << orderId << "\n";
    
                // Return order_id to the client first
                crow::json::wvalue responseJson;
                responseJson["order_id"] = orderId;
                crow::response response(200, responseJson);
    
                // Now insert the order items after returning the response
                const crow::json::rvalue& build = body["build"];
                std::unique_ptr<sql::PreparedStatement> itemStmt(
                    con->prepareStatement(
                        "INSERT INTO order_items (order_id, cpu_name, cpu_price, mobo_name, mobo_price, gpu_name, gpu_price, "
                        "ram_name, ram_price, cooler_name, cooler_price, storage_name, storage_price, psu_name, psu_price, "
                        "case_name, case_price, casefan_name, casefan_price) "
                        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
                    )
                );
    
                // Initialize all parts with default values
                std::map<std::string, std::pair<std::string, double>> parts = {
                    {"cpu", {"", 0.0}}, {"mobo", {"", 0.0}}, {"gpu", {"", 0.0}}, {"ram", {"", 0.0}},
                    {"cooler", {"", 0.0}}, {"storage", {"", 0.0}}, {"psu", {"", 0.0}}, {"case", {"", 0.0}}, {"casefan", {"", 0.0}}
                };
    
                // Iterate over the build array to fill parts
                for (const auto& part : build) {
                    std::string partType = part["part_type"].s();
                    if (parts.find(partType) != parts.end()) {
                        parts[partType] = {part["name"].s(), std::stod(part["price"].s())};
                        std::cerr << "[LOG] Parsed " << partType << ": Name='" << parts[partType].first << "', Price=" << parts[partType].second << "\n";
                    } else {
                        std::cerr << "[WARN] Unknown part type: " << partType << "\n";
                    }
                }
    
                // Insert part data into the database
                itemStmt->setInt(1, orderId);
                itemStmt->setString(2, parts["cpu"].first);
                itemStmt->setDouble(3, parts["cpu"].second);
                itemStmt->setString(4, parts["mobo"].first);
                itemStmt->setDouble(5, parts["mobo"].second);
                itemStmt->setString(6, parts["gpu"].first);
                itemStmt->setDouble(7, parts["gpu"].second);
                itemStmt->setString(8, parts["ram"].first);
                itemStmt->setDouble(9, parts["ram"].second);
                itemStmt->setString(10, parts["cooler"].first);
                itemStmt->setDouble(11, parts["cooler"].second);
                itemStmt->setString(12, parts["storage"].first);
                itemStmt->setDouble(13, parts["storage"].second);
                itemStmt->setString(14, parts["psu"].first);
                itemStmt->setDouble(15, parts["psu"].second);
                itemStmt->setString(16, parts["case"].first);
                itemStmt->setDouble(17, parts["case"].second);
                itemStmt->setString(18, parts["casefan"].first);
                itemStmt->setDouble(19, parts["casefan"].second);
                itemStmt->executeUpdate();
    
                std::cerr << "[LOG] Build parts inserted into 'order_items' table.\n";

                // Update stock quantities for each part

                con -> setSchema("pc_parts_db");
                for (const auto& entry : parts) {
                    const std::string& type = entry.first;
                    const std::string& partName = entry.second.first;

                    if (partName.empty()) continue; // Skip if no part was selected

                    std::string tableName;
                    if (type == "cpu") tableName = "processor";
                    else if (type == "mobo") tableName = "motherboard";
                    else if (type == "gpu") tableName = "gpu";
                    else if (type == "ram") tableName = "ram_modules";
                    else if (type == "cooler") tableName = "cpu_cooler";
                    else if (type == "storage") tableName = "storage_devices";
                    else if (type == "psu") tableName = "power_supplies";
                    else if (type == "case") tableName = "ComputerCases";
                    else if (type == "casefan") tableName = "case_fans";
                    else continue;

                    std::unique_ptr<sql::PreparedStatement> updateStmt(
                        con->prepareStatement("UPDATE " + tableName + " SET stocks = stocks - 1 WHERE name = ? AND stocks > 0")
                    );
                    updateStmt->setString(1, partName);
                    int rowsAffected = updateStmt->executeUpdate();

                    if (rowsAffected == 0) {
                        std::cerr << "[WARN] No stock updated for part '" << partName << "' in table '" << tableName << "'\n";
                    } else {
                        std::cerr << "[LOG] Stock decremented for part '" << partName << "' in table '" << tableName << "'\n";
                    }
                }
                
                return response;
            }
    
            // If order_id retrieval fails, handle it here:
            crow::json::wvalue errorResponse;
            errorResponse["status"] = "error";
            errorResponse["message"] = "Failed to retrieve order_id";
            return crow::response(500, errorResponse);
    
        } catch (const sql::SQLException& e) {
            std::cerr << "[ERROR] SQL Exception: " << e.what() << "\n";
            return crow::response(500, "Database error: " + std::string(e.what()));
        } catch (const std::exception& e) {
            std::cerr << "[ERROR] General Exception: " << e.what() << "\n";
            return crow::response(500, "Internal server error");
        }
    });
    
    app.port(3000).multithreaded().run();
}
