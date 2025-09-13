import { error } from "console";
import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(17);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  
  expect(results[4]).toEqual(["Nim", "22"]);
  
  // expect(results[5]).toEqual(["Cameron", "22"]); // This is what should be spit out, instead of the next line
  expect(results[5]).toEqual(["22", "Cameron"]); // Issue, the parser just knows to split the data into respective strings at the comma, but it didn't correct for the fact that the data is in wrong order (age, name, should be name, age)

  
  expect(results[7]).toEqual([""]) // Maybe we should have this throw an error instead so we know the entry is blank and problematic
  
  expect(results[8]).toEqual(["Cameron Boise", "22"]) // Ideally maybe the first and last name get counted as one string, but the parser doesn't know to split at spaces, only commas. Copilot suggested we test for this case, spaces in a name

  expect(results[9]).toEqual(["Jack", "50"]) // This one is fine, the parser just trims the extra spaces
  
  expect(results[10]).toEqual(["", "22"]) // Debating whether this should throw an error or not, should we maintain data that is only partially complete? Copilot suggested we test for this case, empty field
  
  expect(results[11]).toEqual(["李", "55"]) // This is fine, the parser can handle unicode characters, Copilot suggested we test for non ascii characters

  // Below in results 6 and 12 we see that the parser doesnt handle the case that there are too many or too few fields (seperated by commas)
  // expect(results[6]).toBeUndefined(); // This is what shouuld be spit out instad of next line
  expect(results[6]).toEqual(["aaaa"]) // Issue here is the parser doesnt check that we have two items (one for name, one for age) and thus it simply converts aaa to "aaaa" and puts it in an array

  expect(results[12]).toEqual(["Bob", "5", "Bob"]) // Debating whether this should throw an error or not, should we maintain data that has too many fields? Copilot suggested we test for this case, extra field
  //expect(results[12]).toEqual(["Bob", "5"]) // What it should be

  expect(results[13]).toEqual(["Bob", "Bob"]) // Debating whether this should throw an error or not, should we maintain data that has too few fields? Furthermore, this gets into the question of whether we should enforce types, thus bob in age field would be invalid

  expect(results[14]).toEqual(["To", "ny", "Williams", "60"]) // Debating whether this should throw an error or not, should we maintain data that has too many fields? Furthermore, this gets into the question of whether we should enforce types, thus 60 in name field would be invalid]))
  // expect(results[14]).toEqual(["Tony Williams", "60"]) // What it should be

  expect(results[15]).toEqual(["John 15"]) // Debating whether this should throw an error or not, should we maintain data that has too few fields? Copilot suggested we test for this case, missing field

  // expect(results[16]).toBeUndefined(); // Clearly there was a typo in the age field, 444, so it seems the parser should ideally throw an error to the user instead of just accepting it. 
  expect(results[16]).toEqual(["Malakai", "444"]) // What we actually parse right now, the parser just sees 444 and converts it to a string and puts it in an array

});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
    // expect(Array.isArray(row)).toBe(false); // to reflect changes made in parser based NewPersonSchema
  }
});
