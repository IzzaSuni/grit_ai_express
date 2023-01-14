import express from "express";
import data from "./data.json" assert { type: "json" };
import cors from "cors";

const mw = express();
mw.use(cors());
mw.use(express.json());

const middleWareCheckHeader = (req, res, next) => {
  console.log(req.headers["user-id"]);
  if (req.headers["user-id"] === "ifabula" && req.headers.scope === "user")
    next();
  else {
    return res.send({
      responseCode: 401,
      responseMessage: "UNAUTHORIZED",
    });
  }
};

const GetRes = (req, res) => {
  return res.send({ type: "GET", data: data.data });
};
const GetPost = (req, res) => {
  return res.send({ type: "Post", data: data.data, dataReq: req.body.dataReq });
};

mw.get("/", middleWareCheckHeader, GetRes);
mw.post("/", middleWareCheckHeader, GetPost);

mw.listen(8800, () => {
  console.log("Soal nomor 10 bro");
});
