import { combineReducers } from "redux";

import home from "./home";
import about from "./about";
import app from "./app";
import user from "./user";
import create from "./create";
import event from "./event";
import admin from "./admin";
import management from "./management";
import header from "./header";
import register from "./register";
import bookmark from "./bookmark";

export default combineReducers({
  home,
  about,
  app,
  user,
  create,
  event,
  admin,
  management,
  header,
  register,
  bookmark
});
