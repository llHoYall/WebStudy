const request = require("supertest");
const should = require("should");
const app = require("../../");
const models = require("../../models");

describe("GET /users", () => {
  const users = [{ name: "alice" }, { name: "bruce" }, { name: "chris" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.User.bulkCreate(users));

  describe("Success", () => {
    const users = [{ name: "alice" }, { name: "bruce" }, { name: "chris" }];
    before(() => models.sequelize.sync({ force: true }));
    before(() => models.User.bulkCreate(users));

    it("Response an array of user list", done => {
      request(app)
        .get("/users")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });

    it("Response to limit", done => {
      request(app)
        .get("/users?limit=2")
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });

  describe("Failure", () => {
    it("Limit is not number type", done => {
      request(app)
        .get("/users?limit=two")
        .expect(400)
        .end(done);
    });
  });
});

describe("GET /users/id", () => {
  const users = [{ name: "alice" }, { name: "bruce" }, { name: "chris" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.User.bulkCreate(users));

  describe("Success", () => {
    it("User ID is 1", done => {
      request(app)
        .get("/users/1")
        .end((err, res) => {
          res.body.should.have.property("id", 1);
          done();
        });
    });
  });

  describe("Failure", () => {
    it("User ID is not number type", done => {
      request(app)
        .get("/users/one")
        .expect(400)
        .end(done);
    });
    it("Can't find a user ID", done => {
      request(app)
        .get("/users/999")
        .expect(404)
        .end(done);
    });
  });
});

describe("POST /users", () => {
  const users = [{ name: "alice" }, { name: "bruce" }, { name: "chris" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.User.bulkCreate(users));

  describe("Success", () => {
    const name = "daniel";
    let body;
    before(done => {
      request(app)
        .post("/users")
        .send({
          name
        })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });
    it("Response created user", () => {
      body.should.have.property("id");
    });
    it("Response created user name", () => {
      body.should.have.property("name", name);
    });
  });

  describe("Failure", () => {
    it("Doesn't contains name parameter", done => {
      request(app)
        .post("/users")
        .send({})
        .expect(400)
        .end(done);
    });
    it("Duplicated name parameter", done => {
      request(app)
        .post("/users")
        .send({ name: "daniel" })
        .expect(409)
        .end(done);
    });
  });
});

describe("PUT /users/id", () => {
  const users = [{ name: "alice" }, { name: "bruce" }, { name: "chris" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.User.bulkCreate(users));

  describe("Success", () => {
    it("Response changed name", done => {
      const name = "charles";
      request(app)
        .put("/users/3")
        .send({ name })
        .end((err, res) => {
          res.body.should.have.property("name", name);
          done();
        });
    });
  });

  describe("Failure", () => {
    it("User ID is not a number type", done => {
      request(app)
        .put("/users/one")
        .expect(400)
        .end(done);
    });
    it("Doesn't contains name parameter", done => {
      request(app)
        .put("/users/1")
        .send({})
        .expect(400)
        .end(done);
    });
    it("Can't find a user ID", done => {
      request(app)
        .put("/users/999")
        .send({ name: "foo" })
        .expect(404)
        .end(done);
    });
    it("Duplicated name parameter", done => {
      request(app)
        .put("/users/3")
        .send({ name: "bruce" })
        .expect(409)
        .end(done);
    });
  });
});

describe("DELETE /users/id", () => {
  const users = [{ name: "alice" }, { name: "bruce" }, { name: "chris" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.User.bulkCreate(users));

  describe("Success", () => {
    it("User ID is 1", done => {
      request(app)
        .delete("/users/1")
        .expect(204)
        .end(done);
    });
  });

  describe("Failure", () => {
    it("User ID is not number type", done => {
      request(app)
        .delete("/users/one")
        .expect(400)
        .end(done);
    });
  });
});
