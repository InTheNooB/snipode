const yaml = require('js-yaml');
const fs = require('fs');

const PATHS = {
    DATA: './data',
    CODE_SNIPPETS: './data/code-snippets.yaml',
    AVAILABLE_LANGUAGES: './data/available-languages.yaml'
}


const getCodeSnippets = () => {
    try {
        return yaml.load(fs.readFileSync(PATHS.CODE_SNIPPETS, 'utf8'));
    } catch (e) {
        console.log(e);
        return null;
    }
};


const getLanguagesList = () => {
    try {
        return yaml.load(fs.readFileSync(PATHS.AVAILABLE_LANGUAGES, 'utf8'));
    } catch (e) {
        console.log(e);
        return null;
    }
};

const addCodeSnippet = (newCodeSnippet) => {
    let codeSnippets = getCodeSnippets() ?? [];

    // Calculates the max index and adds it to the new snippet
    newCodeSnippet['id'] = codeSnippets.reduce((acc, current) => {
        return current.id > acc ? current.id : acc;
    }, 0) + 1;

    newCodeSnippet['color'] = randomColor();

    // Add the snippet to the list
    codeSnippets.push(newCodeSnippet);

    try {
        // Writes the list back into the file
        fs.writeFileSync(PATHS.CODE_SNIPPETS, yaml.dump(codeSnippets), 'utf8');
        return newCodeSnippet;
    } catch (error) {
        return null;
    }
};


const randomColor = (() => {
    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return () => {
        var h = randomInt(0, 360);
        var s = randomInt(42, 98);
        var l = randomInt(40, 90);
        return `hsl(${h},${s}%,${l}%)`;
    };
})();


module.exports = { getCodeSnippets, getLanguagesList, addCodeSnippet }