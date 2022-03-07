const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/react_webpack_db"
);

const { STRING, TEXT } = Sequelize.DataTypes;

const Guitarist = sequelize.define(
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
          const name = guitarist.name;
          guitarist.bio = `${name} faker isnt working so this is just a made bio for now. Long live ${name}!!!!`;
        }
      },
    },
  }
);

const Band = sequelize.define("band", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

//ADD a random generator to generate guitarist "name"
Band.generateRandom = function () {
  return this.create({ name: `Band Name: ${(Math.floor(Math.random() * 200))}` });
};

Guitarist.belongsTo(Band);
Band.hasMany(Guitarist);

module.exports = {
    Guitarist,
    Band,
    sequelize,
}