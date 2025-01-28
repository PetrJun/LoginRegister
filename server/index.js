import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from "bcrypt";//hmmm...
import jwt from "jsonwebtoken";
import cors from 'cors';
const port = 4000;

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// SQLite database connection
let db;

// Initialize database connection
async function initializeDb() {
    try {
        db = await open({
            filename: "./database.sqlite",
            driver: sqlite3.Database,
        });
        console.log("Connected to SQLite database.");

        // Create users table if it doesn't exist
        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                isAdmin BOOLEAN DEFAULT FALSE
            )
        `);
        console.log("Users table created or already exists.");

        // Check if the table is empty
        const count = await db.get("SELECT COUNT(*) as count FROM users");
        if (count.count === 0) {
            // Add mock data
            const mockUsers = [
                {
                    username: "john_doe",
                    email: "john@example.com",
                    password: "dev",
                },
                {
                    username: "jane_smith",
                    email: "jane@example.com",
                    password: "dev",
                },
                {
                    username: "bob_johnson",
                    email: "bob@example.com",
                    password: "dev",
                },
                {
                    username: "admin",
                    email: "admin@admin.com",
                    password: "dev",
                    isAdmin: true,
                }
            ];

            for (const user of mockUsers) {
                await db.run(
                    "INSERT INTO users (username, email, password, isAdmin) VALUES (?, ?, ?, ?)",
                    [user.username, user.email, user.password, user.isAdmin || false]
                );
            }

            console.log("Mock data added successfully.");
        } else {
            console.log("Mock data already exists. Skipping insertion.");
        }
    } catch (error) {
        console.error("Database initialization error:", error);
    }
}

// Hello World
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Register route
app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Insert user into database
        const result = await db.run(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, password]
        );

        const user = await db.get("SELECT * FROM users WHERE id = ?", result.lastID);

        //Create and send token
        const token = jwt.sign({ id: user.id, email: user.email, username: user.username, isAdmin: !!user.isAdmin }, "jwt_secret", {
            expiresIn: "1h",
        });
        res.json(token);
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Login route
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user in database
        const user = await db.get("SELECT * FROM users WHERE email = ?", email);

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Check password
        const validPassword = password === user.password;

        if (!validPassword) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Create and send token
        const token = jwt.sign({ id: user.id, email: user.email, username: user.username, isAdmin: !!user.isAdmin }, "jwt_secret", {
            expiresIn: "1h",
        });
        res.json(token);
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Start server
initializeDb().then(() => {
    app.listen(port, () =>
        console.log(`Server running at http://localhost:${port}`)
    );
});
