const Sequelize = require("sequelize");
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/react_webpack_db"
);
const { STRING } = Sequelize.DataTypes;

const Guitarist = db.define("guitarist", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

const Band = db.define("band", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Guitarist.belongsTo.Band;
Band.hasMany.Guitarist;

const init = async () => {
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
};

init();
