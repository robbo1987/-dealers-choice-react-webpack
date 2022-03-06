//data layer
const Sequelize = require("sequelize");
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/react_webpack_db"
);

const { STRING, TEXT } = Sequelize.DataTypes;

const Guitarist = db.define(
  "guitarist",
  {
    name: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    bio: TEXT,
  },
  {
    hooks: {
      beforeCreate: function (guitarist) {
        if (!guitarist.bio) {
          const name = guitarist.name
          guitarist.bio = `${name} faker isnt working so this is just a made bio for now. Long live ${name}!!!!`;
        }
      },
    },
  }
);




const Band = db.define("band", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

//ADD a random generator to generate guitarist "name"
Band.generateRandom = function() {
  return this.create({name: `Band Name: ${Math.random() *200}`})
}

Guitarist.belongsTo(Band);
Band.hasMany(Guitarist);

//express

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require('path')

app.use('/dist', express.static(path.join(__dirname, "dist")))
app.get('/', (req,res) => res.sendFile(path.join(__dirname,'index.html')))

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



app.get('/api/bands', async (req,res,next) => {
  try{
      const bands = await Band.findAll()
      res.send(bands)
  }
  catch(ex){
      next(ex)
  }
})
//post route- tested with curl//
app.post('/api/bands', async(req,res,next) => {
  try{
      res.status(201).send(await Band.generateRandom())
  }
  catch(ex) {
    next(ex)
  }
})

const init = async () => {
  try {
    await db.sync({ force: true });
    const [
      joeP,
      bradW,
      jimmyP,
      paulM,
      johnL,
      joeW,
      glennF,
      aerosmith,
      ledZeppelin,
      beatles,
      eagles,
    ] = await Promise.all([
      Guitarist.create({ name: "Joe Perry" }),
      Guitarist.create({ name: "Brad Whitford" }),
      Guitarist.create({ name: "Jimmy Page" }),
      Guitarist.create({ name: "Paul McCartney" }),
      Guitarist.create({ name: "John Lennon" }),
      Guitarist.create({ name: "Joe Walsh" }),
      Guitarist.create({ name: "Glenn Frey" }),
      Band.create({ name: "Aeorsmith" }),
      Band.create({ name: "Led Zeppelin" }),
      Band.create({ name: "The Beatles" }),
      Band.create({ name: "The Eagles" }),
    ]);
    joeP.bandId = aerosmith.id;
    bradW.bandId = aerosmith.id;
    jimmyP.bandId = ledZeppelin.id;
    paulM.bandId = beatles.id;
    johnL.bandId = beatles.id;
    joeW.bandId = eagles.id;
    glennF.bandId = eagles.id;
    await Promise.all([
      joeP.save(),
      bradW.save(),
      jimmyP.save(),
      paulM.save(),
      johnL.save(),
      joeW.save(),
      glennF.save(),
    ]);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (ex) {
    console.log(ex);
  }
};

init();
