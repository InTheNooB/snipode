const yaml = require('js-yaml');
const fs = require('fs');

const PATHS = {
    DATA: './data',
    CODE_SNIPPETS: "./data/code-snippets.yaml"
}


const getCodeSnippets = () => {
    try {
        return yaml.load(fs.readFileSync(PATHS.CODE_SNIPPETS, 'utf8'));
    } catch (e) {
        console.log(e);
        return null;
    }
};

const addCodeSnippet = (data) => {
    let codeSnippets = getCodeSnippets() ?? [];

    // Calculates the max index and adds it to the new snippet
    data['id'] = codeSnippets.reduce((acc, current) => {
        return current.id > acc ? current.id : acc;
    }, 0) + 1;

    data['color'] = randomColor();

    // Add the snippet to the list
    codeSnippets.push(data);

    try {
        // Writes the list back into the file
        fs.writeFileSync(PATHS.CODE_SNIPPETS, yaml.dump(codeSnippets), 'utf8');
        // sendRegistrationConfirmationEmail(newTeam);
        return true;
    } catch (error) {
        return false;
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


module.exports = { getCodeSnippets, addCodeSnippet }