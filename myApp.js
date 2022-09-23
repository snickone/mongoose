require('dotenv').config();
let mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [{
    type: String
  }]
});

let arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let andyRaven = new Person({name: 'Andy Raven', age: 32, favoriteFoods: ['steak']});
  andyRaven.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if(err) return console.error(err);
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, personFound) => {
    if (err) return console.log(err);
    done(null , personFound);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';
  
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName},{age: ageToSet}, (err, person) => {
    if(err) return console.log(err);
    done(null , person);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, deletedPerson) => {
    if(err) return console.log(err);
    done(null , deletedPerson);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, result) => {
    if(err) return console.log(err);
    done(null, result);  
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch})
  .sort({ name: 1 })
  .limit(2)
  .select({age: 0})
  .exec(function(err, people) {
    if(err) return console.log(err);
    console.log(people);
    done(null, people);  
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
