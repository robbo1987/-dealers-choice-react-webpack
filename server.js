const db = require('./db')
const { Guitarist, Band } = db
const sequelize = db.sequelize

//data layer
//express

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get("/api/guitarists", async (req, res, next) => {
  try {
    const guitarists = await Guitarist.findAll({
      include: [Band],
    });
    res.send(guitarists);
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/bands", async (req, res, next) => {
  try {
    const bands = await Band.findAll();
    res.send(bands);
  } catch (ex) {
    next(ex);
  }
});
//post route- tested with curl//
app.post("/api/bands", async (req, res, next) => {
  try {
    res.status(201).send(await Band.generateRandom());
  } catch (ex) {
    next(ex);
  }
});

const init = async () => {
  try {
    await sequelize.sync({ force: true });
    const [
      joeP,
      bradW,
      jimmyP,
      paulM,
      johnL,
      joeW,
      glennF,
      vanHalen,
      aerosmith,
      ledZeppelin,
      beatles,
      eagles,
      vanHalenBand,
    ] = await Promise.all([
      Guitarist.create({ name: "Joe Perry" }),
      Guitarist.create({ name: "Brad Whitford" }),
      Guitarist.create({ name: "Jimmy Page" }),
      Guitarist.create({ name: "Paul McCartney" }),
      Guitarist.create({ name: "John Lennon" }),
      Guitarist.create({ name: "Joe Walsh" }),
      Guitarist.create({ name: "Glenn Frey" }),
      Guitarist.create({ name: "Eddie Van Halen" }),
      Band.create({ name: "Aerosmith" }),
      Band.create({ name: "Led Zeppelin" }),
      Band.create({ name: "The Beatles" }),
      Band.create({ name: "The Eagles" }),
      Band.create({ name: "Van Halen" }),
    ]);
    joeP.bandId = aerosmith.id;
    bradW.bandId = aerosmith.id;
    jimmyP.bandId = ledZeppelin.id;
    paulM.bandId = beatles.id;
    johnL.bandId = beatles.id;
    joeW.bandId = eagles.id;
    glennF.bandId = eagles.id;
    vanHalen.bandId = vanHalenBand.id;
    await Promise.all([
      joeP.save(),
      bradW.save(),
      jimmyP.save(),
      paulM.save(),
      johnL.save(),
      joeW.save(),
      glennF.save(),
      vanHalen.save()
    ]);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (ex) {
    console.log(ex);
  }
};

init();
