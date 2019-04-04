const uuid = require('uuid/v4');
const fs = require('fs');
const Store = require('../lib/Store');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');


describe('Store', () => {
  let jsonOne = null;
  let jsonTwo = null;
  
  let animalDb = null;

  beforeEach(done => {
    mkdirp('./animalsdb', done);

    animalDb = new Store('./animalsdb');

    jsonOne = {
      name: 'spot',
      species: 'dog'
    };

    jsonTwo = {
      name: 'flipper',
      species: 'penguin'
    };
  });

  afterEach(done => {
    rimraf('./animalsdb', done);
  });

  it('has create method', done => {

    animalDb.create(jsonOne, (err, animal) => {
      fs.readFile(`./animalsdb/${animal._id}.json`, 'utf8', (err, data) => {
        expect(err).toBeFalsy();
        let jsonOnePlusId = { ...jsonOne };
        jsonOnePlusId._id = animal._id;
        expect(JSON.parse(data)).toEqual(jsonOnePlusId);
        done();
      });
    });
  });
});
