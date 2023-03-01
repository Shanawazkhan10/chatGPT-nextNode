// 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
const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8080;
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
const configuration = new Configuration({
    organization: "org-EgRlifvX6cDhvysLNRCZ7WCA",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

// const { Configuration, OpenAIApi } = require("openai");
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

app.post('/', async (req, res) => {
    const { message } = req.body;
    // const apiCall = async () => {
    const response = await openai.createEdit({
        model: "text-davinci-edit-001",
        input: `${message}`,
        instruction: "Fix the spelling mistakes",
    });
    // console.log(response.data.choices[0].text, "LSLSLSLLSSL");
    res.json({
        data: response.data.choices[0].text
    })
    // }
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running,and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);

