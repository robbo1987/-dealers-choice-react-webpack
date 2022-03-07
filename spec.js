const chai = require("chai");
const express = require("express");
const app = express()
const _app = require('supertest')(app)
const { sequelize, Band, Guitarist } = require("./db");
const { expect } = chai;
app.get('/api/guitarists', async (req,res,next) => { 
  try{
      res.send(await Guitarist.findAll())
  }
  catch {
    next(ex)
  }
})



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


describe('API', () => {
  describe('GET /api/guitarists', () => {
    it('returns all the guitarists', async() => {
      await Promise.all([
        Guitarist.generateName(),
        Guitarist.generateName(),
        Guitarist.generateName(),
        Guitarist.generateName(),
        Guitarist.generateName()
      ])
      const response = await _app.get('/api/guitarists');
      expect(response.status).to.equal(200)
      expect(response.body.length).to.equal(5)
     
    })
  })
})

