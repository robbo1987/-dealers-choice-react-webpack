const chai = require("chai");
const { sequelize, Band } = require("./db");
const { expect } = chai;

describe("the sky", () => {
  it("is blue", () => {
    const sky = "blue";
    expect(sky).to.equal("blue");
  });
});

describe("Band", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });
  describe("generateRandom", () => {
    it("generates a random band name", async () => {
      const band = await Band.generateRandom();
      expect(band.name).to.be.ok;
    });
  });
});
