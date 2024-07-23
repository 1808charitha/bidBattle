import { owner_display } from "../controllers/display/owner_display";
import { all_display } from "../controllers/display/all_display";
import { bidder_display } from "../controllers/display/bidder_display";
import { Router } from "express";

const display_routes = Router();

// display routes
// console.log("I am inside display");

display_routes.get("/owner/:owner", owner_display);
display_routes.get("/all/:all", all_display);
display_routes.get("/bidder/:bidder", bidder_display);
// display_routes.post("/login", login_user);

// export defaults
export default display_routes;