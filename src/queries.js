import { Op } from 'sequelize';
import { Animal, Human } from './model.js';

// Get the human with the primary key 2
export const query1 = Human.findByPk(2);

// Get the first animal whose species is "fish"
export const query2 = Animal.findOne({
    where: {
        species: 'fish'
    }
});

// Get all animals belonging to the human with primary key 5
export const query3 = Animal.findAll({
    where: {
        animal_id: 5
    }
})

// Get all animals born in a year greater than (but not equal to) 2015.
export const query4 = Animal.findAll({
    where: {
        birth_year: { [Op.gt]: 2015}
    }
});

// Get all the humans with first names that start with "J"
export const query5 = Human.findAll({
    where: {
        fname: { [Op.startsWith]: 'j'}
    }
});

// Get all the animals who don't have a birth year
export const query6 = Animal.findAll({
    where: {
        birth_year: { [Op.is]: null}
    }
});

// Get all the animals with species "fish" OR "rabbit"
export const query7 = Animal.findAll({
    where: {
        [Op.or]: [
            { species: 'fish' },
            { species: 'rabbit' }
        ]
    }
});

// Get all the humans who DON'T have an email address that contains "gmail"
export const query8 = Human.findAll({
    where: {
        email: {
            [Op.like]: '%gmail'
        }
    }
});

// Continue reading the instructions before you move on!

// Print a directory of humans and their animals
export async function printHumansAndAnimals() {
    for (const human of Human) {
        console.log(`${human.fname}, ${human.lname}`)
        for (const animal of Animal) {
            if (animal.animal_id === human.human_id) {
                console.log(`- ${animal.name}, ${animal.species}`)
            }
        }
    }
}

// Return a Set containing the full names of all humans
// with animals of the given species.
export async function getHumansByAnimalSpecies(species) {
    const humans = new Set()
    for (const human of Human) {
        for (const animal of Animal) {
            if (animal.animal_id === human.human_id && animal.species === species) {
                humans.add(`${human.fname}, ${human.lname}`)
            }
        }
    }
    return humans
}
