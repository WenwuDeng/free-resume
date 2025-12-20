const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

const resumePath = path.join(__dirname, '../大数据开发工程师_邓文武_17859735572.pdf');

async function parse() {
    if (!fs.existsSync(resumePath)) {
        console.error('File not found:', resumePath);
        return;
    }
    
    const dataBuffer = fs.readFileSync(resumePath);
    
    try {
        const data = await pdf(dataBuffer);
        console.log('--- START PDF TEXT ---');
        console.log(data.text);
        console.log('--- END PDF TEXT ---');
    } catch (e) {
        console.error('Error:', e);
    }
}

parse();
