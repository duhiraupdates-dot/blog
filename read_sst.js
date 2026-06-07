const fs = require('fs');
const path = require('path');

const ldbPath = `C:\\Users\\General\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 20\\Local Storage\\leveldb\\000034.ldb`;

if (!fs.existsSync(ldbPath)) {
    console.error("File not found:", ldbPath);
    process.exit(1);
}

const buffer = fs.readFileSync(ldbPath);

// Snappy Decompressor implementation in pure JS
function snappyDecompress(buf) {
    try {
        let pos = 0;
        let decompressedLen = 0;
        let shift = 0;
        while (true) {
            if (pos >= buf.length) return null;
            const b = buf[pos++];
            decompressedLen |= (b & 0x7f) << shift;
            if ((b & 0x80) === 0) break;
            shift += 7;
        }
        
        const out = Buffer.alloc(decompressedLen);
        let outPos = 0;
        
        while (pos < buf.length && outPos < decompressedLen) {
            const tag = buf[pos++];
            const type = tag & 0x03;
            if (type === 0) {
                // Literal
                let len = tag >> 2;
                if (len < 60) {
                    len = len + 1;
                } else if (len === 60) {
                    len = buf[pos++] + 1;
                } else if (len === 61) {
                    len = buf.readUInt16LE(pos) + 1;
                    pos += 2;
                } else if (len === 62) {
                    len = buf[pos] | (buf[pos+1] << 8) | (buf[pos+2] << 16);
                    len = len + 1;
                    pos += 3;
                } else if (len === 63) {
                    len = buf.readUInt32LE(pos) + 1;
                    pos += 4;
                }
                if (pos + len > buf.length || outPos + len > decompressedLen) break;
                buf.copy(out, outPos, pos, pos + len);
                pos += len;
                outPos += len;
            } else if (type === 1) {
                // Copy with 1-byte offset
                const len = ((tag >> 2) & 0x07) + 4;
                const offset = ((tag & 0xe0) << 3) | buf[pos++];
                const start = outPos - offset;
                for (let i = 0; i < len; i++) {
                    out[outPos + i] = out[start + i];
                }
                outPos += len;
            } else if (type === 2) {
                // Copy with 2-byte offset
                const len = (tag >> 2) + 1;
                const offset = buf.readUInt16LE(pos);
                pos += 2;
                const start = outPos - offset;
                for (let i = 0; i < len; i++) {
                    out[outPos + i] = out[start + i];
                }
                outPos += len;
            } else if (type === 3) {
                // Copy with 4-byte offset
                const len = (tag >> 2) + 1;
                const offset = buf.readUInt32LE(pos);
                pos += 4;
                const start = outPos - offset;
                for (let i = 0; i < len; i++) {
                    out[outPos + i] = out[start + i];
                }
                outPos += len;
            }
        }
        return out.slice(0, outPos);
    } catch (e) {
        console.error("Snappy decompress error:", e);
        return null;
    }
}

function readVarint64(buf, pos) {
    let value = 0n;
    let shift = 0n;
    while (true) {
        const b = buf[pos++];
        value |= BigInt(b & 0x7f) << shift;
        if ((b & 0x80) === 0) break;
        shift += 7n;
    }
    return { value: Number(value), nextPos: pos };
}

function readBlockHandle(buf, pos) {
    const offsetRes = readVarint64(buf, pos);
    const sizeRes = readBlockHandleSize(buf, offsetRes.nextPos);
    return {
        offset: offsetRes.value,
        size: sizeRes.size,
        nextPos: sizeRes.nextPos
    };
}

function readBlockHandleSize(buf, pos) {
    const sizeRes = readVarint64(buf, pos);
    return { size: sizeRes.value, nextPos: sizeRes.nextPos };
}

function readBlock(offset, size) {
    const blockData = buffer.slice(offset, offset + size);
    const compType = buffer[offset + size];
    if (compType === 0) {
        return blockData;
    } else if (compType === 1) {
        return snappyDecompress(blockData);
    } else {
        console.error(`Unknown compression type ${compType} at offset ${offset}`);
        return null;
    }
}

// LevelDB Footer is the last 48 bytes of the file.
// The magic number is at the very end.
const footerOffset = buffer.length - 48;
const magic = buffer.slice(buffer.length - 8);
const magicHex = magic.toString('hex');
console.log("Magic number:", magicHex);
if (magicHex !== "57fbo88b247547db" && magicHex !== "57fb088b247547db") {
    // Note: endianness might be different: db 47 75 24 8b 80 fb 57 -> in little endian is 57 fb 08 8b 24 75 47 db
    console.log("Magic number matches standard LevelDB!");
}

// Read index_handle from Footer
// Footer structure:
// metaindex_handle: BlockHandle
// index_handle: BlockHandle
// padding
// magic number
const metaindexRes = readBlockHandle(buffer, footerOffset);
const indexRes = readBlockHandle(buffer, metaindexRes.nextPos);
console.log("Index block handle:", indexRes);

// Read the index block
const indexBlock = readBlock(indexRes.offset, indexRes.size);
if (!indexBlock) {
    console.error("Failed to read index block");
    process.exit(1);
}

console.log("Successfully read index block. Size:", indexBlock.length);

// The index block contains key-value pairs where the key is a separator key,
// and the value is the BlockHandle for a data block.
// Let's extract all data block handles from the index block.
const blockHandles = [];
let pos = 0;
// A block has restarts at the end. Let's find num_restarts.
const numRestarts = indexBlock.readUInt32LE(indexBlock.length - 4);
const restartOffset = indexBlock.length - 4 - (numRestarts * 4);

console.log("Index block restarts:", numRestarts);

// Parse records in indexBlock
let lastKey = Buffer.alloc(0);
while (pos < restartOffset) {
    const sharedRes = readVarint64(indexBlock, pos);
    const unsharedRes = readVarint64(indexBlock, sharedRes.nextPos);
    const valLenRes = readVarint64(indexBlock, unsharedRes.nextPos);
    
    pos = valLenRes.nextPos;
    const keyUnshared = indexBlock.slice(pos, pos + unsharedRes.value);
    pos += unsharedRes.value;
    const valBytes = indexBlock.slice(pos, pos + valLenRes.value);
    pos += valLenRes.value;
    
    // Construct key
    const key = Buffer.concat([lastKey.slice(0, sharedRes.value), keyUnshared]);
    lastKey = key;
    
    // Parse value as BlockHandle
    const handle = readBlockHandle(valBytes, 0);
    blockHandles.push(handle);
}

console.log(`Found ${blockHandles.length} data blocks.`);

// Now, scan each data block for 'as_articles' and 'as_comments'
blockHandles.forEach((handle, blockIdx) => {
    const decBlock = readBlock(handle.offset, handle.size);
    if (!decBlock) return;
    
    ['as_articles', 'as_comments'].forEach(key => {
        const keyBuf = Buffer.from(key, 'utf8');
        let matchOffset = 0;
        
        while (true) {
            const idx = decBlock.indexOf(keyBuf, matchOffset);
            if (idx === -1) break;
            
            console.log(`\n--- Found '${key}' in Data Block ${blockIdx} (offset ${handle.offset}, decompressed size ${decBlock.length}) ---`);
            
            // Search for JSON start '[' (91) or '{' (123) in UTF-16LE format (since we know it's stored as UTF-16LE)
            const slice = decBlock.slice(idx);
            let jsonStart = -1;
            let isArray = false;
            
            for (let i = 0; i < 200; i++) {
                if (i % 2 === 0 && i + 1 < slice.length) {
                    if (slice[i] === 91 && slice[i+1] === 0) {
                        jsonStart = i;
                        isArray = true;
                        break;
                    }
                    if (slice[i] === 123 && slice[i+1] === 0) {
                        jsonStart = i;
                        isArray = false;
                        break;
                    }
                }
            }
            
            if (jsonStart !== -1) {
                let bracketCount = 1;
                let jsonEnd = -1;
                const openChar = isArray ? 91 : 123;
                const closeChar = isArray ? 93 : 125;
                
                for (let j = jsonStart + 2; j < slice.length - 1; j += 2) {
                    if (slice[j] === openChar && slice[j+1] === 0) bracketCount++;
                    else if (slice[j] === closeChar && slice[j+1] === 0) {
                        bracketCount--;
                        if (bracketCount === 0) {
                            jsonEnd = j + 1;
                            break;
                        }
                    }
                }
                
                if (jsonEnd !== -1) {
                    const jsonBuf = slice.slice(jsonStart, jsonEnd + 1);
                    const jsonStr = jsonBuf.toString('utf16le');
                    try {
                        const parsed = JSON.parse(jsonStr);
                        console.log("SUCCESSFULLY PARSED EXTRACTED JSON!");
                        console.log("Length:", jsonStr.length);
                        // Save it
                        const outName = `clean_${key}_block_${blockIdx}.json`;
                        fs.writeFileSync(path.join(__dirname, outName), JSON.stringify(parsed, null, 2), 'utf8');
                        console.log("Saved to:", outName);
                    } catch (e) {
                        console.error("Failed to parse JSON string:", e.message);
                        console.log("Preview:", jsonStr.substring(0, 300));
                    }
                } else {
                    console.log("Could not find matching closing bracket");
                }
            } else {
                console.log("Could not find JSON start");
            }
            
            matchOffset = idx + 1;
        }
    });
});
