import fs from 'fs';

export const writeDataToFile = function (filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf-8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}