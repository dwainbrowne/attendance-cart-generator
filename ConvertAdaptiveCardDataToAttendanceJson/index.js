// Import the Luxon library for handling date and time
const { DateTime } = require("luxon");

// The main function handler for the Azure Function
module.exports = async function (context, req) {
    context.log('Adaptive Card Conversion HTTP trigger function processed a request.');

    // Extract the input JSON from the request body
    const inputJson = req.body;

    // Check if the input JSON is provided
    if (inputJson) {
        // Call the formatOutputJson function to process the input JSON and create the output JSON
        const outputJson = formatOutputJson(inputJson);

        // Return the output JSON in the response
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: outputJson
        };
    } else {
        // If the input JSON is not provided, return an error response
        context.res = {
            status: 400,
            body: "Please pass a JSON object in the request body"
        };
    }
};

// Function to process the input JSON and create the output JSON structure
function formatOutputJson(inputJson) {
    // Initialize an empty array to store the formatted attendance data
    const attendance = [];

    // Get the current date and time using the Luxon library
    const currentDate = DateTime.local();
    // Initialize a counter to calculate the date for each record
    let counter = 0;


    // Iterate over each property (name) in the input JSON
    for (const key in inputJson.attendance) {
        // Check if the inputJson object has the property (key)
        if (inputJson.attendance.hasOwnProperty(key)) {
            // Get the value of the current property (key)
            const attended = inputJson.attendance[key] === "true" ? true : false;

            // Calculate the date for the current record
            const datetime = currentDate.toISO();

            // Add the formatted attendance object to the attendance array
            attendance.push({
                name: key,
                datetime: datetime,
                attended: attended
            });

            // Increment the counter for the next record
            counter++;
        }
    }

    // Return the output JSON structure with the formatted attendance array
    return {
        id: inputJson.id,
        meeting: inputJson.meeting,
        attendance: attendance,
        created: currentDate.toISO(),
        displayCreated: currentDate.toLocaleString(DateTime.DATETIME_MED, { timeZone: "America/New_York" })   
    };
}
