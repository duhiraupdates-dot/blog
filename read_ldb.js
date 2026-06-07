const fs = require('fs');
const path = require('path');

const leveldbDir = `C:\\Users\\General\\AppData\\Local\\Microsoft\\Edge\\User Data\\Default\\Local Storage\\leveldb`;

if (!fs.existsSync(leveldbDir)) {
    console.error("Directory not found:", leveldbDir);
    process.exit(1);
}

const files = fs.readdirSync(leveldbDir).filter(f => f.endsWith('.ldb') || f.endsWith('.log'));
console.log("Scanning files:", files);

files.forEach(file => {
    const filePath = path.join(leveldbDir, file);
    const stat = fs.statSync(filePath);
    console.log(`\n=========================================`);
    console.log(`File: ${file} (Size: ${stat.size} bytes, Modified: ${stat.mtime})`);
    console.log(`=========================================`);
    
    const buffer = fs.readFileSync(filePath);
    
    // Look for key in both UTF-8 and UTF-16LE
    const searchKeys = ['as_articles', 'as_comments'];
    
    searchKeys.forEach(key => {
        // UTF-8 representation of key
        const keyUtf8 = Buffer.from(key, 'utf8');
        // UTF-16LE representation of key (each char followed by \x00)
        const keyUtf16 = Buffer.from(key, 'utf16le');
        
        findAndExtract(buffer, keyUtf8, key, 'utf8', file);
        findAndExtract(buffer, keyUtf16, key, 'utf16le', file);
    });
});

function findAndExtract(buffer, keyBuf, keyName, encoding, filename) {
    let offset = 0;
    let matchCount = 0;
    
    while (true) {
        const index = buffer.indexOf(keyBuf, offset);
        if (index === -1) break;
        matchCount++;
        
        console.log(`\nMatch ${matchCount} for '${keyName}' (${encoding}) at index ${index}`);
        
        // Search forward for JSON start: '[' or '{'
        // Since we are searching in either UTF-8 or UTF-16LE, we look for the characters in that encoding.
        const slice = buffer.slice(index);
        
        let jsonStart = -1;
        let isArray = false;
        let isObject = false;
        
        if (encoding === 'utf8') {
            for (let j = 0; j < Math.min(slice.length, 10000); j++) {
                if (slice[j] === 91) { // '['
                    jsonStart = j;
                    isArray = true;
                    break;
                }
                if (slice[j] === 123) { // '{'
                    jsonStart = j;
                    isObject = true;
                    break;
                }
            }
        } else {
            // UTF-16LE: look for '[' (91 0) or '{' (123 0) at even offsets relative to slice start
            for (let j = 0; j < Math.min(slice.length - 1, 20000); j += 2) {
                if (slice[j] === 91 && slice[j+1] === 0) {
                    jsonStart = j;
                    isArray = true;
                    break;
                }
                if (slice[j] === 123 && slice[j+1] === 0) {
                    jsonStart = j;
                    isObject = true;
                    break;
                }
            }
        }
        
        if (jsonStart !== -1) {
            let jsonEnd = -1;
            let bracketCount = 1;
            
            if (encoding === 'utf8') {
                const openBracket = isArray ? 91 : 123;
                const closeBracket = isArray ? 93 : 125;
                for (let j = jsonStart + 1; j < Math.min(slice.length, 20000); j++) {
                    if (slice[j] === openBracket) {
                        bracketCount++;
                    } else if (slice[j] === closeBracket) {
                        bracketCount--;
                        if (bracketCount === 0) {
                            jsonEnd = j;
                            break;
                        }
                    }
                }
            } else {
                const openBracket = isArray ? 91 : 123;
                const closeBracket = isArray ? 93 : 125;
                for (let j = jsonStart + 2; j < Math.min(slice.length - 1, 40000); j += 2) {
                    if (slice[j] === openBracket && slice[j+1] === 0) {
                        bracketCount++;
                    } else if (slice[j] === closeBracket && slice[j+1] === 0) {
                        bracketCount--;
                        if (bracketCount === 0) {
                            jsonEnd = j + 1; // include the \x00
                            break;
                        }
                    }
                }
            }
            
            if (jsonEnd !== -1) {
                const jsonSlice = slice.slice(jsonStart, jsonEnd + 1);
                const decoded = jsonSlice.toString(encoding);
                try {
                    const parsed = JSON.parse(decoded);
                    console.log(`SUCCESSFULLY PARSED JSON FROM ${filename}! Length: ${decoded.length}`);
                    // Save to a file in workspace directory
                    const outName = `extracted_${filename}_${keyName}_${encoding}_${matchCount}.json`;
                    fs.writeFileSync(path.join(__dirname, outName), JSON.stringify(parsed, null, 2), 'utf8');
                    console.log(`Saved to ${outName}`);
                } catch (e) {
                    console.log(`Failed to parse decoded JSON (len: ${decoded.length}). Preview:`);
                    console.log(decoded.substring(0, 300));
                }
            } else {
                console.log("Matching bracket not found.");
            }
        } else {
            console.log("JSON start character not found.");
        }
        
        offset = index + 1;
    }
}
