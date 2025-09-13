# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.
    Point 1: In terms of functionality, it appears that the parser simply seperates terms based on the commas for any given single value/line within the CSV file and converts each respective term to a string, and puts all the strings within that single value/line in the CSV into an array based on the order (earlier terms in the CSV (based on comma seperation) come toward the beggining of the new array). It could be the case that a user inputs too many fields (too many fields), or forgets a comma (too few fields) and thus the info which the user inputs will be parsed incorrectly. 

    Point 2: In terms of functionality, the CSV could do a better job of specifying to the user how they should be inputting their data. For instance, do we want the first and last name in the name field? Do we want their age in terms of a number or a string representative of their age? 

    Point 3: In terms of extensibility, based on the specifications which we tell the user above, we should validate the data which the user inputs accordingly. Moreover, if we want age to be an integer, we should not only validate that the user has input an integer (and not a string or any other data type representative of their age) but also possibly a lower and upper bound on the integer (ie, 0 < integer < 150). Moreover, if the user inputs data out of this range we could potentially provide the user with an unmistakeable confirmation message that the age they input is correct (maybe the user is unputting an expected newborn, or maybe we are inputting someone who is already passed away or really is abnormally old). 
    
    Point 4: In terms of extensibility, regaurding the name information, if a user has input their name and we want their first and last name, asking the user to validate that their first and last name is truly in the system if we get an unexpected number of spaces in the CSV (Ie just Emily, so it looks like only their first name is in there), we should prompt the user with a confirmation message or have them confirm that they don't want to share this info and put N/A or Unspecified in a new, potential last name field (so 2 field might now represent a name, 1st is first name, 2nd is last name, each of which seperated by a comma in the CSV)
- #### Step 2: Use an LLM to help expand your perspective.
     After prompting ChatGPT with a prompt similar to the one provided in the handout, there was some overlap with its suggestions in terms of both functionality, and extensibility of the CSV. Furthermore, it suggested to test for empty / malformed rows, which was covered in point 3, Encodings such as non standard characters which was covered in one of my tests.  It also suggested appropriate error handling which was addressed in step 1 and in the tests, wherein we should have custom error messages with row/column numbers. Some of its additional suggestions which I missed included using a different data structure like a dictionary to intentionally store the data by their respective fields, with an id for each data point. For instance, { id: "1", name: "Alice", age: "33"}. This could definitely help with accessing certain fields with more specificity as opposed to accessing name and age by assuming where it might exist in the array of strings. 

    After prompting ChatGPT with a broader prompt in comparison to that which was in the handout, being "I am a software developer creating a CSV parser to store data regarding people in TypeScript. How should I go about this" I got a somewhat similar suggestion to that of the dictionary suggestion discussed in the lateral part of the previous paragraph. Moreover, the LLM described a CSV parser implementation which took in a CSV file that still contained peoples information where fields were seperated by commas (ie name,age,email); However, the parser would be able to seperate this info into a dictionary accessed where each key corresponds to the field and the value corresponds to the specific data for that specific data point. For example, in the CSV file the point Alice,23,alice@example.com becomes { name: "Alice", age: 23, email: "alice@example.com" }. This prompt did not give any comprehensive insight errors we might expect and how to handle them though. 
- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    Point 1: 
        In terms of extensibility, I propose the use of a dictionary to store each value of each respective CSV. For example in the CSV file the point Alice,23,alice@example.com becomes { name: "Alice", age: 23, email: "alice@example.com" }. This suggestion came on behalf of the LLM. I believe this will help callers access data with better ease and specificity as opposed to guessing where certain data might fall within the array for that given data point in the CSV. This was suggested on behald of the LLM, and it was not something I considered prior. This resonated with me because it allows for easy access of specific data for any given user (ie easily access name of certain user with key, or age of certain user with key.)
            User story: As a caller/software engineer who needs to access the data which has been parsed from the CSV, I need to easily find specific data for any given user. 
            Acceptance Criteria: I am guarantee to access a certain field upon input (ie I want to access name, thus I can use name key for some user)


    Point 2: 
        User story: In terms of functionality, I want  myself as a user to be told what the type and format is of each piece of information i'm putting in (specify the type and format of each field). For example, in the name category I need to know whether to put only my first name, or both my first name and last name seperated only by a space? Furthermore, do you want me to put an alphabetic representation of my age or do you want a numerical?
            My initial idea for this is to somehow build it into the web page where the user inputs their information. Alternatively the user can input their data incorrectly and get an error message which instructs them on the correct format required. The LLM did not change this idea, and only in the first prompt did it suggest throwing an error message if there was an issue, the second prompt was broadly about building the parser and did not ask for fixes to potential issues.

    Point 3: 
        (Extensibility) Similar to above, an additional step we need to make sure the data is inputted in the correct format / manner can also be thought of from the extensibility standpoint, from the developers prespective. I had initially thought of this idea before the LLM suggested it, but this step will further ensure that data can be retrieved swiftly. 
            User story: As the developer, I want to make sure that the users are inputting their data in a specific format. Therefore, I want to build my parser so that it accepts only data in this type. Maybe my parser will throw an error if the data is input incorrectly, or it should be able to handle incorrect data by converting it to the correct data type and format. 

    Point 4: 
        In terms of extensibility, I want to make sure I have enough memory on my CPU as the CSV file might contain extremely large amounts of information. This idea came from the LLM, as it suggested that real world CSVs can be gigabytes in size. This resonated with me because this fact will impact the performance of the CPU running the program and will allow the parser to be used in real world contexts and not just in these smaller test cases.
            User story: As a developer, I want to be able to deal with large files. Moreover, I want to be able to moad only portions of the CSV file into memory in order to save capability on my CPU, as it is not uncommon for CSV files to be many gigabytes. 

### Design Choices

### 1340 Supplement

- #### 1. Correctness
I would argue that a CSV parser is correct if it can properly transform any input CSV file and effectively transform and transport each datapoint into a data structure. Furthermore, the parser should ideally be able to validate data so that it conforms with a certain desired structure and style so that the caller may be able to work with that data with greater ease and applicability. For example, in this assignment we saw that it might be a good idea to store data in terms of an array of dictionaries, this way we can explicitly access name and age fields using keys for each entry. Furthermore, a good parser needs to be able to handle edge cases in which the data does not fit the desired style or defined schema to ideally coerce that data to fit. 
- #### 2. Random, On-Demand Generation
If this was the case, this reframes my testing from a standpoint of "what bugs do I foresee happening" and to a new broader standpoint of "what are all the possible issues that could come up with my CSV parser." I would then need to go in to my parser and put in a ton of new case handlings and restrictions to the type of data that comes in. This would make my parser and my tests much more comprehensive, making the parser a more effective and reliable one. 
- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
This sprint was much more engaging and interactive than most programming assignments I have done. I appreciated the amount of exploration and reflection that was encouraged in the assignment, as well as the open collaboration, LLM and resource policy. This enabled me to use the resources which are available in our world today to learn as I completed the assignment. Many of the encountered bugs were related to environment and directory issues, and I was able to use Copilot effectively to navigate these issues. For instance, I was able to see why my run-parser.ts was not running due to directory issues, and it gave me the import statements to run my basic-parser.test.ts. In task 3, I ran into some issues building the CSV parser. I was able to refer to our handout to realize the properties associated with ZOD neccessary for this assignment. I was then able to work with Copilot in debugging the fact that my result needs to be either a NewPerson Schema or a string, and that my function promises either to be returned. Furthermore, I was having trouble correctly returning the NewPerson validated data in the parser (a dictionary of name: and age:), and Copilot was able to suggest that I push validated_person.data, the successfully parsed datapoints in terms of the NewPersonSchema form. 
#### Tests:
The tests I have written cover the parser in its initial form, wherein we are testing the parser when it simply seperated each line in the CSV based on comma seperation. In terms of the testing specifics, below is each test and its corresponding logic behind it, 

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

#### How To…
All my tests can be found in the basic-parser.tests.ts (found in src directory), which can be run with npm run test in the terminal, which is testing the code found in basic-parser.ts (in src directory), which is parsing data from the CSV people.csv (in data directory). The parser can be run on people.csv raw not testing by executing npx ts-node run-parser.ts in the terminal, running the parser using file run-parser.ts. 

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):

I used copilot to get help running test file running properly

For a few of the tests, I allowed copilots autofill to fill in some of the tests based on what I wrote in the CSV file

I used ChatGPT for some suggestions on how I could enhance the parser in step  of task B

I used ChatGPT for some help  on understanding ZOD schemas and understanding the PersonRowSchema. 

Additionally, In my first attempt at incorperating the first schema, I had tried incorperating a line of code that would parse the data but I needed a way to catch the errors that I was running into, and Copilot suggest the try catch block which can be found in the file basic-parser.test.ts. I documented this in comments in the same file

In the second schema, I was running into a similar issue where certain lines in the CSV were unable to be parsed correctly. Copilot suggested the line in which I push the validated_person.data if the validated_person was a success. This took care of that error. 
#### Total estimated time it took to complete project:
Roughly 5 - 7 hours
#### Link to GitHub Repo:  
