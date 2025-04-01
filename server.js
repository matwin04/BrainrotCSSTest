import postgres from "postgres";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

dotenv.config();
const sql = postgres(process.env.DATABASE_URL, { ssl: "require" });
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VIEWS_DIR = path.join(__dirname, "views");
const PARTIALS_DIR = path.join(VIEWS_DIR, "partials");
app.engine("html", engine({ extname: ".html", defaultLayout: false, partialsDir: PARTIALS_DIR }));
app.set("view engine", "html");
app.set("views", VIEWS_DIR);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

// ✅ Ensure the POIs table exists
// ✅ Ensure the Users & POIs Table Exist


// HOME ROUTE
app.get("/", (req, res) => {
    res.render("index", { title: "PINGAS" });
});
app.get("/nutshack", (req, res) => {
    res.render("nutshack");
})

if (!process.env.VERCEL && !process.env.NOW_REGION) {
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
    });
}

// ✅ Export the Expres
// ✅ Export the app for Vercel
export default app;