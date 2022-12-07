const express = require("express");
require("dotenv").config();
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const CONNECT_DB = require("./db/config");
const USERMODEL = require("./model/User");
const ProductModel = require("./model/products");
const authRoutes = require("./routes/user.route");
const UserRouter = require("./routes/route");
const app = express();

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/user", UserRouter);
app.use("/api", authRoutes);

// database connection
CONNECT_DB();

//upload image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/", upload.single("testImage"), (req, res) => {
  const saveImage = ProductModel({
    name: req.body.name,
    img: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    },
  });
  saveImage
    .save()
    .then((res) => {
      console.log("image is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
  res.send("image is saved");
});

app.get("/", async (req, res) => {
  const allData = await ProductModel.find();
  res.json(allData);
});

//listen the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Port is listening on port " + PORT);
});
