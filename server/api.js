const yaml = require('js-yaml');
const fs = require('fs');

const PATHS = {
    DATA: './data',
    CODE_SNIPPETS: "./data/code-snippets.yaml"
}


const getCodeSnippets = () => {
    try {
        let codeSnippets = yaml.load(fs.readFileSync(PATHS.CODE_SNIPPETS, 'utf8')) ?? [];
        codeSnippets = codeSnippets.map((codeSnippet) => {
            // console.log(Buffer.from(codeSnippet.code, 'base64').toString());
            return {
                ...codeSnippet,
                code: fs.readFileSync(`${PATHS.DATA}/${codeSnippet.id}.txt`, 'utf8') ?? ""
                // code: Buffer.from(codeSnippet.code, 'base64').toString()
                // code : `var express = require('express');
                // var app = express();

                // app.get('/', function (req, res) {
                //    res.send('Hello World');
                // })

                // var server = app.listen(8081, function () {
                //    var host = server.address().address
                //    var port = server.address().port

                //    console.log("Example app listening at http://%s:%s", host, port)
                // })`
            }
        })
        return codeSnippets;
    } catch (e) {
        console.log(e);
        return [];
    }
};

module.exports = { getCodeSnippets }