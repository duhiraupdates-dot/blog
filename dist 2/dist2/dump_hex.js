const fs = require('fs');
const path = require('path');

const leveldbDir = `C:\\Users\\General\\AppData\\Local\\Microsoft\\Edge\\User Data\\Default\\Local Storage\\leveldb`;
const filePath = path.join(leveldbDir, '001258.ldb');

if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
    process.exit(1);
}

const buffer = fs.readFileSync(filePath);
const keyBuf = Buffer.from('as_articles', 'utf8');

let offset = 0;
while (true) {
    const index = buffer.indexOf(keyBuf, offset);
    if (index === -1) break;
    
    console.log(`\nKey 'as_articles' found at offset ${index}`);
    const slice = buffer.slice(index, index + 300);
    
    // Print hex and ASCII representation
    for (let i = 0; i < slice.length; i += 16) {
        const lineSlice = slice.slice(i, i + 16);
        const hex = [];
        const ascii = [];
        for (let j = 0; j < lineSlice.length; j++) {
            const b = lineSlice[j];
            hex.push(b.toString(16).padStart(2, '0'));
            ascii.push(b >= 32 && b <= 126 ? String.fromCharCode(b) : '.');
        }
        console.log(`${(index + i).toString().padStart(6)}: ${hex.join(' ')}  | ${ascii.join('')}`);
    }
    
    offset = index + 1;
}
