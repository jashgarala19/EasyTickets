const express = require("express");
const app = express();
const app2 = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "theatredb",
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.get("/api/theatre_city/:id", (req, res) => {
//   const a = req.params.id;

//   const sql = "select * from theatre where city_id=" + a;
//   db.query(sql, (err, result) => {
//     res.send(result);
//   });
// });
// app.get("/api/getcities", (req, res) => {
//   const sql = "select * from city";
//   db.query(sql, (err, result) => {
//     res.send(result);
//   });
// });

// app.get("/api/theatre_details/:id", (req, res) => {
//   const a = req.params.id;
//   const sql = "select * from theatre where theatre_id=" + a;
//   db.query(sql, (err, result) => {
//     var gettheatre = result[0];
//     // a={...a,ongoingmovies:{}}
//     // console.log(a)
//     const sql2 = "select movie_id from theatre_movie where theatre_id=" + a;
//     db.query(sql2, (err, result2) => {
//       var moviesongoing = result2;
//       console.log(moviesongoing);

//       gettheatre = { ...gettheatre, moviesongoing };
//       res.send(gettheatre);
//     });
//   });
// });

// app.get("/api/theatre_details/:id/:date", (req, res) => {
//   const a = req.params.id;
//   const b = req.params.date;
//   const sql =
//     'select   movie_id,GROUP_CONCAT(show_time) as "Show Timing" from theatre_movie WHERE show_date=? and theatre_id=' +
//     a +
//     " group by movie_id";

//   db.query(sql, b, (err, result) => {
//     console.log(err);
//     res.send(result);
//   });
// });

// app.get("/api/movie_city/:city_id", (req, res) => {
//   const a = req.params.city_id;

//   const sql =
//     "select DISTINCT(theatre_movie.movie_id) from theatre_movie INNER JOIN theatre ON theatre.theatre_id=theatre_movie.theatre_id where theatre.city_id=" +
//     a;

//   db.query(sql, (err, result) => {
//     console.log(err);
//     res.send(result);
//   });
// });

// app.get("/api/movie_details/:movie_id/:city_id/:date", (req, res) => {
//   const a = req.params.movie_id;
//   const b = req.params.city_id;
//   const c = req.params.date;
//   const sql =
//     'select theatre_movie.theatre_id,GROUP_CONCAT(theatre_movie.show_time) as "Show timings "from theatre_movie INNER JOIN theatre ON theatre.theatre_id=theatre_movie.theatre_id where theatre.city_id=' +
//     b +
//     " and theatre_movie.movie_id=" +
//     a +
//     " and theatre_movie.show_date=? GROUP BY theatre_movie.theatre_id";

//   db.query(sql, c, (err, result) => {
//     console.log(err);
//     res.send(result);
//   });
// });

// app.post("/adminlogin", (req, res) => {
//   const u = req.body.username;
//   const p = req.body.password;
//   const sql =
//     "select admin_uname,theatre_id from admin where admin_uname=? and admin_password=?";

//   db.query(sql, [u, p], (err, result) => {
//     if (result.length == 1) {
//       res.send({ r: 1, d: result });
//     } else {
//       res.send({ r: 0 });
//     }
//   });
// });

const mongoose = require("mongoose");
const SeatLayout = require("./Models/seatlayout");
// const dbURI =
//   "mongodb+srv://jash:123@cluster0.vd6uqj7.mongodb.net/theatredb?retryWrites=true&w=majority";

const dbURI = "mongodb://localhost:27017/theatredb";
app2.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app2.use(express.json());
app2.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
try {
  mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
} catch (err) {
  console.log(err);
}

app2.listen(3002, () => {
  console.log("running at port 3002!!");
});

app2.get("/", (req, res) => {
  res.send("MongoDB");
});
const Admin = require("./Models/admin");
const Theatre = require("./Models/theatre");
const Screen = require("./Models/screen");
const MovieShowInfo = require("./Models/movieshowinfo");
const City = require("./Models/city");
const User = require("./Models/user");

app2.post("/adminlogin", (req, res) => {
  const u = req.body.username;
  const p = req.body.password;

  Admin.find(
    {
      admin_uname: u,
      admin_password: p,
    },
    {
      admin_uname: 1,
      theatre_id: 1,
      _id: 0,
    },
    function (err, r) {
      if (err) {
        console.log(err);
      } else {
        if (r.length === 0) {
          res.send({
            r: 0,
          });
        } else {
          res.send({
            r: 1,
            d: r,
          });
        }
      }
    }
  );
});

// app.post("/getadmindetails", (req, res) => {
//   const adminid = req.body.id;
//   const sql = "select * from theatre where theatre_id =" + adminid;

//   db.query(sql, (err, result) => {
//     res.send(result[0]);
//   });
// });
app2.post("/getadmindetails", (req, res) => {
  const adminid = req.body.id;
  // const sql = "select * from theatre where theatre_id =" + adminid;
  Theatre.find(
    {
      theatre_id: adminid,
    },
    {
      _id: 0,
    },
    (err, r) => {
      if (err) {
        console.log(err);
      } else {
        res.send(r[0]);
      }
    }
  );
});

// app.post("/addscreen",(req, res)=>{
// const theatre_id= req.body.t_id
// const a = Object.values(req.body.details)

// const screennumber=a[0]
// const screenlayout =a[1]
// console.log(a[0],a[1])

// const sql ="insert into screen (screen_no,theatre_id,seatlayout_name) values (?,?,?)"
// db.query(sql,[screennumber,theatre_id,screenlayout], (err, result) => {

// });
// })

app2.post("/addscreen", (req, res) => {
  const theatre_idd = req.body.t_id;
  const a = Object.values(req.body.details);
  const screennumber = a[0];
  const screenlayout = a[1];
  console.log(a[0], a[1]);

  // const sql ="insert into screen (screen_no,theatre_id,seatlayout_name) values (?,?,?)"

  const screen = new Screen({
    screen_no: screennumber,
    theatre_id: theatre_idd,
    seatlayout_name: screenlayout,
  });

  screen
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.post("/getscreen", (req, res) => {
//   const theatre_id = req.body.t_id;

//   const sql = "select screen_no from screen where theatre_id=" + theatre_id;

//   db.query(sql, theatre_id, (err, result) => {
//     let r = Object.values(JSON.parse(JSON.stringify(result)));
//     res.send(r);
//   });
// });

app2.post("/getscreen", (req, res) => {
  const theatre_idd = req.body.t_id;

  // const sql = "select screen_no from screen where theatre_id=" + theatre_id;

  Screen.find(
    {
      theatre_id: theatre_idd,
    },
    {
      screen_no: 1,
      seatlayout_name: 1,
      _id: 0,
    },
    function (err, r) {
      if (err) {
        console.log(err);
      } else {
        console.log(r);
        let rr = Object.values(JSON.parse(JSON.stringify(r)));
        res.send(rr);
      }
    }
  );
  // db.query(sql, theatre_id, (err, result) => {
  //   let r = Object.values(JSON.parse(JSON.stringify(result)));
  //   res.send(r);
  // });
});

// app.post("/getscreenclass", (req, res) => {
//   const theatre_id = req.body.t_id;
//   const s = req.body.screen;

//   console.log(theatre_id, s);

//   const sql =
//     "select seatlayout_name from screen where screen_no=? and theatre_id=?";

//   db.query(sql, [s, theatre_id], (err, r) => {
//     console.log(r[0].seatlayout_name);

//     SeatLayout.find(
//       { seatlayout_name: r[0].seatlayout_name },
//       { _id: 0, seatlayout_class: 1 },
//       function (err, r) {
//         console.log(r);
//         if (err) {
//           console.log(err);
//         } else {
//           res.send(r);
//         }
//       }
//     );
//   });
// });

app2.post("/getscreenclass", (req, res) => {
  const theatre_idd = req.body.t_id;
  const s = req.body.screen;
  console.log(theatre_idd);
  console.log("screen_no:" + s);
  Screen.find(
    {
      screen_no: s,
      theatre_id: theatre_idd,
    },
    {
      seatlayout_name: 1,
      _id: 0,
    },
    function (err, myresult) {
      if (err) {
        console.log(err);
      } else {
        console.log(myresult);

        SeatLayout.find(
          {
            seatlayout_name: myresult[0].seatlayout_name,
          },
          {
            _id: 0,
            seatlayout_class: 1,
          },
          function (err, r) {
            console.log(r);
            if (err) {
              console.log(err);
            } else {
              res.send(r);
            }
          }
        );
      }
    }
  );
});

app.listen(3001, () => {
  console.log("running at port 3001!!");
});
app.get("/", (req, res) => {
  res.send("Movie Ticket Booking System!!!!!!!");
});

app2.post("/addseatlayout", (req, res) => {
  const theatre_id = req.body.t_id;
  const seatlayout_name = req.body.sname;
  const seatlayoutclass = req.body.sclass;
  const seatlayout = req.body.slayout;
  const seatlayout_s = req.body.slayout_struct;
  const t = req.body.totalseats;

  const s = new SeatLayout({
    theatre_id: theatre_id,
    seatlayout_name: seatlayout_name,
    seatlayout_class: seatlayoutclass,
    seatlayout: seatlayout,
    seatlayout_structure: seatlayout_s,
    total_seats: t,
  });

  s.save()
    .then((result) => {
      res.send({
        r: 1,
      });
    })
    .catch((err) => {
      if (err.code == 11000) {
        console.log(err);
        res.send({
          r: 0,
        });
      }
    });
});

app2.post("/getseatlayout", (req, res) => {
  const theatre_id = req.body.t_id;
  SeatLayout.find(
    {
      theatre_id: theatre_id,
    },

    {
      seatlayout_name: 1,
      _id: 0,
    },
    function (err, r) {
      // console.log(r)
      if (err) {
        console.log(err);
      } else {
        res.send(r);
      }
    }
  );
});
app2.post("/deleteseatlayout", (req, ress) => {
  const seatlayout_name = req.body.s_name;
  // console.log(seatlayout_name);

  Screen.find(
    {
      seatlayout_name: seatlayout_name,
    },
    function (err, res) {
      if (res.length === 0) {
        SeatLayout.find(
          {
            seatlayout_name: seatlayout_name,
          },
          function (err, r) {
            console.log(r);
          }
        ).remove();
      } else {
        ress.send("err");
      }
    }
  );
});

app2.post("/addmovieshow", (req, res) => {
  const tm_id = req.body.t_id;
  const movie_id = req.body.m_id;

  const movie_date = req.body.m_date;
  const movie_time = req.body.m_time;
  const movie_screen_no = req.body.m_screen_no;
  const movie_prices = req.body.m_prices;
  var movie_seatlayout_statuss;
  var total_seats_availablee;
  console.log(
    tm_id,
    movie_id,
    movie_date,
    movie_time,
    movie_screen_no,
    movie_prices
  );

  Screen.find(
    {
      theatre_id: tm_id,
      screen_no: movie_screen_no,
    },
    {
      seatlayout_name: 1,
      _id: 0,
    },
    function (err, r) {
      if (err) {
        console.log(err);
      } else {
        //  const movie_seatlayout_name=
        const movie_seatlayout_name = r[0].seatlayout_name;

        SeatLayout.find(
          { seatlayout_name: movie_seatlayout_name },
          { seatlayout_structure: 1, total_seats: 1, _id: 0 },
          function (err, r) {
            movie_seatlayout_statuss = r[0].seatlayout_structure;
            total_seats_availablee = r[0].total_seats;
            console.log(movie_seatlayout_statuss, total_seats_availablee);

            console.log(
              tm_id +
                "_" +
                movie_screen_no +
                "_" +
                movie_id +
                "_" +
                movie_date +
                "_" +
                movie_time
            );

            const s = new MovieShowInfo({
              ms_id:
                tm_id +
                "_" +
                movie_screen_no +
                "_" +
                movie_id +
                "_" +
                movie_date +
                "_" +
                movie_time,
              ms_date_time: { ms_date: movie_date, ms_time: movie_time },
              screen_no: movie_screen_no,
              theatre_id: tm_id,
              movie_id: movie_id,
              ms_price: movie_prices,
              seats_info: {
                total_seats: total_seats_availablee,
                total_seats_available: total_seats_availablee,
              },
              seatlayout_status: movie_seatlayout_statuss,
            });

            s.save()
              .then((result) => {})
              .catch((err) => {
                console.log(err);
                if (err.code == 11000) {
                  console.log(err);
                }
              });
          }
        );
      }
    }
  );
});

app2.post("/gettheatrecities", (req, res) => {
  Theatre.find({}, { city_Name: 1, _id: 0 }, function (err, result) {
    // console.log("-----");
    // console.log(typeof(result));

    // console.log(result)

    res.send(
      Object.values(
        result.reduce(
          (acc, cur) => Object.assign(acc, { [cur.city_Name]: cur }),
          {}
        )
      )
    );
  });
});

app2.post("/registeruser", (req, ress) => {
  const u = req.body.userdata;

  console.log(u);

  const user = new User({
    first_Name: u.first_name,
    last_Name: u.last_name,
    Email: u.email,
    Mobile_No: parseInt(u.mobile_no),
    Password: u.Password,
  });

  User.find(
    { Mobile_No: parseInt(u.mobile_no) },
    { _id: 0 },
    function (err, result) {
      console.log(err);
      if (result.length == 1) {
        ress.send({ r: 0 });
      } else {
        user.save();

        ress.send({ r: 1 });
      }
    }
  );
});

//abcd check!!
app2.post("/getuserdetails", (req, res) => {
  const user_mobile_no = req.body.user_mobile.mobile_no;
  // console.log("a"+ user_mobile_no);

  User.find({ Mobile_No: user_mobile_no }, { _id: 0 }, function (err, result) {
    res.send(result[0]);
  });
});




app2.post("/loginuser", (req, res) => {
  const m = req.body.userdata.mobile;
  const p = req.body.userdata.password;

  User.find(
    { Mobile_No: parseInt(m), Password: p },
    { Mobile_No: 1 },
    function (err, result) {
      console.log(result);

      if (result.length == 1) {
        res.send({ r: 1, result });
      } else {
        res.send({ r: 0 });
      }
    }
  );
});

app2.post("/getallmoviesbycity", async (req, res) => {
  const m = req.body.mc;

  const movies = [];
  const finalmovies = [];
  let a = await Theatre.find(
    { city_Name: m },
    { theatre_id: 1, _id: 0 }
  ).exec();

  for (var i = 0; i < a.length; i++) {
    // console.log(a[i].theatre_id)

    let b = await MovieShowInfo.find(
      { theatre_id: a[i].theatre_id },
      { movie_id: 1 }
    ).exec();

    movies.push(b);
  }

  // console.log(movies)

  for (var k = 0; k < movies.length; k++) {
    movies[k].map((e) => {
      finalmovies.push(e.movie_id);

      // console.log(movies[k].movie_id)
    });
  }
  let uniq = [...new Set(finalmovies)];
  // console.log(uniq)
  res.send(uniq);
});

// console.log(c)

// app2.post("/getmovietimings", async (req, res) => {
//   const c = req.body.movie_city;
//   const id = req.body.movie_id;
//   const movies = [];
// console.log(c,id)
// let a = await Theatre.find(
//   { city_Name: c },
//   { theatre_id: 1, _id: 0 }
// ).exec();
// console.log(a);

// for (var i = 0; i < a.length; i++) {
//   // console.log(a[i].theatre_id)

//   let b = await MovieShowInfo.find(
//     { theatre_id: a[i].theatre_id ,movie_id:id},
//     { }
//   ).exec();

//   movies.push(b);
// }

// console.log(movies)
// });

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("theatredb");
//   // dbo.collection("cities").findOne({}, function(err, result) {
//   //   if (err) throw err;

//   //   db.close();
//   // });

//   dbo.collection('movieshowinfos').aggregate([
//     { $lookup:
//        {
//          from: 'theatres',
//          localField: 'theatre_id',
//          foreignField: 'theatre_id',
//          as: 'theatre_info'
//        }
//      }
//     ]).toArray(function(err, res) {
//     if (err) throw err;
//     console.log(res);
//   });

// });

MongoClient.connect(url, { useUnifiedTopology: true })
  .then(async (client) => {
    console.log("Connected to Database");
    const dbo = await client.db("theatredb");

    app2.post("/getmovietimings", async (req, ress) => {
      const c = req.body.movie_city;
      const id = req.body.movie_id;
      const d = req.body.movie_date;
console.log(d);
      var b = [];

      let a = await dbo
        .collection("theatres")
        .find({ city_Name: c }, { projection: { _id: 0, theatre_id: 1 } })
        .toArray();

      // console.log(a);

      for (var i = 0; i < a.length; i++) {
        b.push(
          await dbo
            .collection("movieshowinfos")
            .find(
              {
                theatre_id: a[i].theatre_id,
                movie_id: parseInt(id),
                "ms_date_time.ms_date":d
              },
              {}
            )
            .toArray()
        );
      }

      // console.log(b);

      for (var j = 0; j < b.length; j++) {
        var h;
        for (var k = 0; k < b[j].length; k++) {
          //  b.push({a:b[]})

          let g = await dbo
            .collection("theatres")
            .find({ theatre_id: b[j][k].theatre_id }, {})
            .toArray();

          h = g;
        }
        if (b[j].length != 0) {
          b[j].push(h);
        }
      }
      // console.log(b);
      var fullArrays = b.filter((a) => !a.every((ax) => a == undefined));
      ress.send(fullArrays);

      // console.log(b);
      // dbo.collection('movieshowinfos').aggregate([
      //   { $lookup:
      //      {
      //        from: 'theatres',
      //        localField: 'theatre_id',
      //        foreignField: 'theatre_id',
      //        as: 'theatre_info'
      //      },
      //    },   { $unset: [ "_id" ] }
      //   ]).toArray(function(err, res) {
      //   if (err) throw err;
      //  ress.send(res)
      // });
    });

    app2.post("/getmoviedates", async (req, res) => {
      const c = req.body.movie_city;
      const id = req.body.movie_id;
      var b = [];
      let a = await dbo
        .collection("theatres")
        .find({ city_Name: c }, { projection: { _id: 0, theatre_id: 1 } })
        .toArray();
      // console.log(a);

      for (var i = 0; i < a.length; i++) {
        b.push(
          await dbo
            .collection("movieshowinfos")
            .find(
              {
                theatre_id: a[i].theatre_id,
                movie_id: parseInt(id),
              },
              { projection: { ms_date_time: 1, _id: 0 } }
            )
            .toArray()
        );
      }

      var d = [];

      for (var i = 0; i < b.length; i++) {
        for (var j = 0; j < b[i].length; j++) {
          d.push(b[i][j].ms_date_time.ms_date);
        }
      }
      // console.log(d)
      let uniq = [...new Set(d)];
      // console.log(uniq);
      res.send(uniq);
    });
  })
  .catch((error) => console.error(error));
