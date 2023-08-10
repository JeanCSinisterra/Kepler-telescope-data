const { parse } = require("csv-parse");
const fs = require("fs");

// Empty Array for Results
const HabitablePlanets = [];

// Function to pass only the Confirmed Potential Candidates to Habitable Planets based on Insolation Flux & Planet Diameter
function isHabitablePlanets(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' 
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 // Insolation Flux: amount of solar energy received per unit area on a planet's surface.
        && planet['koi_prad'] < 1.6; // Planet radius: radius of the planet in kilometers. 
}

// Read the CSV File through a Read Stream function 
fs.createReadStream("kepler-data.csv")
    .pipe(parse({
        comment: "#",
        columns: true
    }))
    .on("data", data => {
        if (isHabitablePlanets(data)) {
            HabitablePlanets.push(data); //Pushing results through an Array
        }
    }).on("error", (err) => {
        console.log(err); //Display if there is an error
    }).on("end", () => {
        console.log(HabitablePlanets.map((planet) => {
            return planet['kepler_name'];
        }))
        console.log(`${HabitablePlanets.length} Habitable Planets Found!`);
        console.log("Done");
    });


