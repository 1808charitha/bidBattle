import { Router } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid"
import { objects_create } from "../controllers/object/create_object";
import { update_function } from "../controllers/object/update_object";

const object_routes = Router();
// const upload = multer({dest: "src/uploads"})
const DIR = './uploads/';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

object_routes.post("/create/:owner", upload.single("obj_pic"), objects_create);
object_routes.post("/update", update_function)

// object routes
// console.log("I am inside object");

// export defaults
export default object_routes;
