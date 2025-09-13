import * as fs from "fs";
import * as readline from "readline";
import { z } from "zod";

// Attempt with first schema, the parsing can be found in the respective comment within the parser, and all corresponding code is commented out
export const PersonRowSchema = z.tuple([z.string(), z.coerce.number()])
                         .transform( tup => ({name: tup[0], age: tup[1]}))
export type PersonRow = z.infer<typeof PersonRowSchema>;

// Attempt with second schema, the parsing can be found in the respective comment within the parser, and all corresponding code is active
export const NewPersonSchema = z.object({
  name: z.string(),
  age: z.coerce.number()
});
export type NewPerson = z.infer<typeof NewPersonSchema>;
/**
 * This is a JSDoc comment. Similar to JavaDoc, it documents a public-facing
 * function for others to use. Most modern editors will show the comment when 
 * mousing over this function name. Try it in run-parser.ts!
 * 
 * File I/O in TypeScript is "asynchronous", meaning that we can't just
 * read the file and return its contents. You'll learn more about this 
 * in class. For now, just leave the "async" and "await" where they are. 
 * You shouldn't need to alter them.
 * 
 * @param path The path to the file being loaded.
 * @returns a "promise" to produce a 2-d array of cell values
 */
//export async function parseCSV(path: string): Promise<string[][]> {
export async function parseCSV(path: string): Promise<Array<NewPerson | string[]>> { //Changed so that we can return either person row or an array
  // This initial block of code reads from a file in Node.js. The "rl"
  // value can be iterated over in a "for" loop. 
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // handle different line endings
  });
  
  // Create an empty array to hold the results
  // let result = []

  const result: Array<NewPerson | string[]> = [];
  
  // We add the "await" here because file I/O is asynchronous. 
  // We need to force TypeScript to _wait_ for a row before moving on. 
  // More on this in class soon!
  for await (const line of rl) {
    const values = line.split(",").map((v) => v.trim());
    // result.push(values)
    
    // Attempt with first Schema
    // const validated_person = PersonRowSchema.parse(values); 
    // result.push(validated_person); // I was trying to incorperate this and the line above to parse the data but not all the data fit the person schema, so copilot suggested the try catch block below to handle those cases
    // try {
    // const validated_person = PersonRowSchema.parse(values);
    // result.push([validated_person.name, validated_person.age.toString()]);
  // } catch (e) {
    // result.push(values);
  //}

  // Attempt with second schema
  
  const validated_person = NewPersonSchema.safeParse({
      name: values[0],
      age: values[1]
    });
    if (validated_person.success) 
      result.push(validated_person.data); // Copilot helped to suggest this line when I was trying to figure out how to push only the data that was successfully parsed
    else
      result.push(values)
  }
  return result;
  }