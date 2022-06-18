import chai from "chai";
import chaiHttp from 'chai-http';
import {server} from '../server.js';

process.env.NODE_ENV = 'test';
chai.use(chaiHttp);
const should = chai.should();

describe('Products', () => {
    // Consts
    let id = 'a0d07879-c532-48ed-9cc2-5cde99bf4ddc3';
    const  successCode = 200;
    const  product = {
        name: 'hello',
        age: 'hello',
        hobbies: '1170',
      };
    const  testName = 'Cannon EOS 80D DSLR Camera';
    const newInfo = { name: 'Vova', age: '778',hobbies: 'sport' };


    describe('/GET user', () => {
        it('Should return an empty array', done => {
          chai.request(server)
            .get('/api/users')
            .end((err, res) => {
              res.should.have.status(successCode);
              res.body.should.be.eql([]);
              done();
            });
        });
      });

      describe('/POST user', () => {
        it('it should POST a user ', done => {
          chai.request(server)
            .post('/api/users')
            .send(product)
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('name');
              res.body.should.have.property('age');
              res.body.should.have.property('hobbies');
              res.body.should.have.property('id');
              id = res.body.id;
              done();
            });
        });
      });


      describe('/GET/:id user', () => {
        it('Returns an existing user', done => {
          chai.request(server)
            .get(`/api/users/${id}`)
            .end((err, res) => {
              
              res.should.have.status(successCode);
              res.body.should.be.a('object');
              res.body.should.have.property('id').eql(id);
              res.body.should.have.property('name');
              res.body.should.have.property('age');
              done();
            });
        });
      });

      describe('/PUT/:id user', () => {
        it('it should UPDATE a user given the id', done => {
          chai.request(server)
            .put(`/api/users/${id}`)
            .send(newInfo)
            .end((err, res) => {
              res.should.have.status(successCode);
              res.body.should.be.a('object');
              res.body.should.have.property('id').eql(id);
              res.body.should.have.property('age').eql(newInfo.age);
              done();
            });
        });
      });


      describe('/DELETE/:id user', () => {
        it('it should DELETE a user given the id', done => {
          chai.request(server)
            .delete(`/api/users/${id}`)
            .end((err, res) => {
              res.should.have.status('204');    
              done();
            });
        });
      });

      describe('/GET/:id user', () => {
        it('Returns status code 404', done => {
          chai.request(server)
            .get(`/api/users/${id}`)
            .end((err, res) => {
              res.should.have.status(404);
              done();
            });
        });
      });
});


describe('Products find error', () => {
    // Consts
    let id = 'a0d07879-c532-48ed-9cc2-5cde99bf4ddc3';
    let fakeId = '31231'
    const  successCode = 200;
    const  product = {
        name: 'hello',
        age: 'hello',
        hobbies: '1170',
      };
    const newInfo = { name: 'Vova', age: '778',hobbies: 'sport' };

    describe('/GET user', () => {
        it('Should return an empty array', done => {
          chai.request(server)
            .get('/api/users')
            .end((err, res) => {
              res.should.have.status(successCode);
              res.body.should.be.eql([]);
              done();
            });
        });
      });

      describe('/POST user', () => {
        it('it should POST a user ', done => {
          chai.request(server)
            .post('/api/users')
            .send(product)
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('name');
              res.body.should.have.property('age');
              res.body.should.have.property('hobbies');
              res.body.should.have.property('id');
              id = res.body.id;
              done();
            });
        });
      });

      describe('/GET/:id user', () => {
        it('Returns correct error status code', done => {
          chai.request(server)
            .get(`/api/users/${fakeId}`)
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
        });
      });

});

describe('Products find correct length', () => {
    // Consts
    let id = 'a0d07879-c532-48ed-9cc2-5cde99bf4ddc3';
    let fakeId = '31231'
    const  successCode = 200;
    const  product = {
        name: 'hello',
        age: 'hello',
        hobbies: '1170',
      };
    const newInfo = { name: 'Vova', age: '778',hobbies: 'sport' };

   

      describe('/POST user', () => {
        it('it should POST a user ', done => {
          chai.request(server)
            .post('/api/users')
            .send(product)
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('name');
              res.body.should.have.property('age');
              res.body.should.have.property('hobbies');
              res.body.should.have.property('id');
              id = res.body.id;
              done();
            });
        });
      });

      describe('/GET user', () => {
        it('Should return an  array with 2 length', done => {
          chai.request(server)
            .get('/api/users')
            .end((err, res) => {
              res.should.have.status(successCode);
              res.body.length.should.be.eql(2);
              done();
            });
        });
      });

      describe('/GET/:id user', () => {
        it('Returns correct error status code', done => {
          chai.request(server)
            .get(`/api/users/${fakeId}`)
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
        });
      });

});