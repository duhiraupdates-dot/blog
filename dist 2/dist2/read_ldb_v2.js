const fs = require('fs');
const path = require('path');

const leveldbDir = `C:\\Users\\General\\AppData\\Local\\Microsoft\\Edge\\User Data\\Default\\Local Storage\\leveldb`;
const files = fs.readdirSync(leveldbDir).filter(f => f.endsWith('.ldb') || f.endsWith('.log'));

files.forEach(file => {
    const filePath = path.join(leveldbDir, file);
    const buffer = fs.readFileSync(filePath);
    
    ['as_articles', 'as_comments'].forEach(key => {
        const keyBuf = Buffer.from(key, 'utf8');
        let offset = 0;
        
        while (true) {
            const index = buffer.indexOf(keyBuf, offset);
            if (index === -1) break;
            
            console.log(`\nFound key '${key}' in ${file} at offset ${index}`);
            
            const slice = buffer.slice(index);
            
            let foundIndex = -1;
            let foundEncoding = null;
            let isArray = false;
            
            // 1. Try to find UTF-16LE '[' or '{' first
            for (let i = 0; i < 200; i++) {
                if (i % 2 === 0 && i + 1 < slice.length) {
                    if (slice[i] === 91 && slice[i+1] === 0) {
                        foundIndex = i;
                        foundEncoding = 'utf16le';
                        isArray = true;
                        break;
                    }
                    if (slice[i] === 123 && slice[i+1] === 0) {
                        foundIndex = i;
                        foundEncoding = 'utf16le';
                        isArray = false;
                        break;
                    }
                }
            }
            
            // 2. Fall back to UTF-8
            if (foundIndex === -1) {
                for (let i = 0; i < 200; i++) {
                    if (slice[i] === 91) {
                        foundIndex = i;
                        foundEncoding = 'utf8';
                        isArray = true;
                        break;
                    }
                    if (slice[i] === 123) {
                        foundIndex = i;
                        foundEncoding = 'utf8';
                        isArray = false;
                        break;
                    }
                }
            }
            
            if (foundIndex !== -1) {
                console.log(`Detected JSON start character at offset ${index + foundIndex} with encoding ${foundEncoding}`);
                let bracketCount = 1;
                let jsonEndIndex = -1;
                
                const openChar = isArray ? 91 : 123;
                const closeChar = isArray ? 93 : 125;
                
                if (foundEncoding === 'utf8') {
                    for (let j = foundIndex + 1; j < slice.length; j++) {
                        if (slice[j] === openChar) bracketCount++;
                        else if (slice[j] === closeChar) {
                            bracketCount--;
                            if (bracketCount === 0) {
                                jsonEndIndex = j;
                                break;
                            }
                        }
                    }
                } else {
                    // UTF-16LE: check every 2 bytes
                    for (let j = foundIndex + 2; j < slice.length - 1; j += 2) {
                        if (slice[j] === openChar && slice[j+1] === 0) bracketCount++;
                        else if (slice[j] === closeChar && slice[j+1] === 0) {
                            bracketCount--;
                            if (bracketCount === 0) {
                                jsonEndIndex = j + 1; // Include the 00 byte
                                break;
                            }
                        }
                    }
                }
                
                if (jsonEndIndex !== -1) {
                    const jsonBuf = slice.slice(foundIndex, jsonEndIndex + 1);
                    const jsonStr = jsonBuf.toString(foundEncoding);
                    try {
                        const parsed = JSON.parse(jsonStr);
                        console.log("SUCCESSFULLY EXTRACTED JSON!");
                        console.log("JSON Length:", jsonStr.length);
                        // Save it
                        const outPath = path.join(__dirname, `extracted_${file}_${key}_${foundEncoding}.json`);
                        fs.writeFileSync(outPath, JSON.stringify(parsed, null, 2), 'utf8');
                        console.log("Saved to:", outPath);
                    } catch (e) {
                        console.error("Failed to parse JSON string:", e.message);
                        console.log("Raw preview:", jsonStr.substring(0, 200));
                    }
                } else {
                    console.log("Could not find matching closing bracket");
                }
            } else {
                console.log("Could not find start of JSON array or object");
            }
            
            offset = index + 1;
        }
    });
});
