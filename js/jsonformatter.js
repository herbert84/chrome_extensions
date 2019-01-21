function getSeparator(line)
{
    if (line.indexOf(';') !== -1) {
        return ';';
    }
    else if (line.indexOf(',') !== -1) {
        return ',';
    }

    return ';';
}

function csvToJSON(csv)
{
    const lines = csv.split("\n");
    let result = [];
    const separator = getSeparator(lines[0]);
    let headers = lines[0].split(separator);

    for (let i=1;i<lines.length;i++) {
        let obj = {};
        let currentline = lines[i].split(separator);

        for(let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }

    return JSON.stringify(result, null, 4);
}

let formatBtn = document.getElementById('formatJson');

formatBtn.onclick = function()
{
    try {
        let jsonParsed = JSON.parse(document.getElementById('content').value);
        document.getElementById('output').textContent = JSON.stringify(jsonParsed, null, 4);
    }
    catch(error) {
        try {
            let csvParsed = csvToJSON(document.getElementById('content').value);
            document.getElementById('output').textContent = csvParsed;
        } catch(error) {
            document.getElementById('output').textContent = error;
        }
    }
};