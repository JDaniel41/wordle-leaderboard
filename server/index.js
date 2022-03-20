const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

let table = [];

function addToTable(rowOutput, name, score, gameNum) {
    // Check if character in rowOutput is a black square emoji
    table.push({
        timestamp: Date.now(),
        name: name,
        score: score,
        gameNum: gameNum,
        rowOutput: rowOutput,
    });
}

function checkIfUserAlreadyScoredToday(name, gameNum) {
    for (let i = 0; i < table.length; i++) {
        if (table[i].name === name && table[i].gameNum === gameNum) {
            return true;
        }
    }
    return false;
}

app.post("/api/addScore", (req, res) => {
    gameOutput = req.body.output;
    nameOutput = req.body.name;
    pinNum = req.body.pinNum;

    if (!gameOutput || !nameOutput || !pinNum) {
        res.status(400).send("Bad Request");
        return;
    }

    if (pinNum != "1234") {
        res.status(401).send("Unauthorized");
        return;
    }
    // Read the first number in the body
    processedOutput = gameOutput
        .split(" ")
        .slice(0, 3)
        .concat(gameOutput.split("\n").slice(2));
    processedOutput[2] = processedOutput[2].slice(0, 3);

    let gameNum = processedOutput[1];
    let numLinesUsed = processedOutput[2][0];

    if (checkIfUserAlreadyScoredToday(nameOutput, gameNum)) {
        res.status(400).send("User already scored today");
        return;
    } else {
        addToTable(processedOutput.slice(3), nameOutput, numLinesUsed, gameNum);
    }

    res.send(table);
});

/*
const {
    DynamoDBClient,
    ListTablesCommand,
} = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
    region: "us-east-1",
});

(async () => {
    const client = new DynamoDBClient({ region: "us-west-2" });
    const command = new ListTablesCommand({});
    try {
        const results = await client.send(command);
        console.log("DONE!");
        console.log(results.TableNames.join("\n"));
    } catch (err) {
        console.log("Whoops");
        console.error(err);
    }
})();*/

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started on port 3000");
});
