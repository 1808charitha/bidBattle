import { signup_user } from "../controllers/authentication/signup";
import { login_user } from "../controllers/authentication/login";
import { Router } from "express";

const auth_routes = Router();

// auth routes
// console.log("I am inside auth");

auth_routes.post("/signup", signup_user);
auth_routes.post("/login", login_user);

// export defaults
export default auth_routes;