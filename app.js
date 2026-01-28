require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/authRoute");
const volunteerRoutes = require("./routes/volunteerRoute");
const disasterRoute = require("./routes/disasterRoute");
const assignmentRoute = require("./routes/assignmentRoute");
const userRoute = require("./routes/userRoute");

app.use("/api/auth", authRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/disaster", disasterRoute);
app.use("/api/assignments", assignmentRoute);
app.use("/api/users", userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
