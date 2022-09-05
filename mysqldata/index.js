const express = require("express");
const con = require("./config");
const app = express();

app.use(express.json());

app.get("/", (req, resp) => {
    con.query("select * from user", (err, result) => {
        if (err) { resp.send("error in api") }
        else { resp.send(result) }
    })
});


app.post("/", (req, resp) => {
    const data = req.body;
    con.query("INSERT INTO user SET?", data, (error, results, fields) => {
        if (error) throw error;
        resp.send(results)
    })
});

app.put("/:id", (req, resp) => {
    const data = [req.body.email, req.body.otp, req.params.id];
    con.query("UPDATE user SET email = ?, otp = ? WHERE id = ?",
        data, (error, results, fields) => {
            if (error) throw error;
            resp.send(results)
        })

})

app.delete("/:id", (req, resp) => {

    con.query(" DELETE FROM USER  WHERE id =" + req.params.id,
        (error, results, fields) => {
            if (error) throw error;
            resp.send(results)
        })

})

app.listen("5000")