const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const desktopDir = 'C:/Users/General/OneDrive/Desktop';
const tempDir = path.join(__dirname, 'temp_docx_extract');

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

// Find all docx files on Desktop
const files = fs.readdirSync(desktopDir).filter(f => f.endsWith('.docx'));
console.log('Found docx files:', files);

files.forEach(file => {
    const filePath = path.join(desktopDir, file);
    const extractPath = path.join(tempDir, 'extract_temp');
    
    try {
        console.log(`Extracting ${file}...`);
        // Clean extract path
        try {
            fs.rmSync(extractPath, { recursive: true, force: true });
        } catch (e) {}
        fs.mkdirSync(extractPath, { recursive: true });
        
        // Copy to temp.docx to avoid shell encoding issues with non-ASCII file names
        const tempDocxPath = path.join(tempDir, 'temp.docx');
        fs.copyFileSync(filePath, tempDocxPath);
        
        execSync(`tar -xf "${tempDocxPath}" -C "${extractPath}"`);
        
        // Clean up the temp.docx copy
        try {
            fs.unlinkSync(tempDocxPath);
        } catch (e) {}
        
        const docXmlPath = path.join(extractPath, 'word', 'document.xml');
        if (fs.existsSync(docXmlPath)) {
            const xmlContent = fs.readFileSync(docXmlPath, 'utf8');
            
            // We want to extract paragraphs and texts.
            // In docx xml, paragraphs are <w:p>...</w:p>
            // Inside paragraphs, texts are in <w:t>...</w:t>
            
            // Let's use regex to extract <w:p> content first, then <w:t> within each
            const paragraphRegex = /<w:p(?:\s[^>]*)?>([\s\S]*?)<\/w:p>/g;
            const textRegex = /<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g;
            
            let paragraphs = [];
            let match;
            
            while ((match = paragraphRegex.exec(xmlContent)) !== null) {
                const pContent = match[1];
                let textMatch;
                let pText = '';
                
                while ((textMatch = textRegex.exec(pContent)) !== null) {
                    // Unescape simple XML entities
                    let txt = textMatch[1]
                        .replace(/&amp;/g, '&')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&quot;/g, '"')
                        .replace(/&apos;/g, "'");
                    pText += txt;
                }
                
                if (pText.trim() !== '') {
                    paragraphs.push(pText);
                }
            }
            
            console.log(`=== Content of ${file} (${paragraphs.length} paragraphs) ===`);
            const fullText = paragraphs.join('\n\n');
            console.log(fullText.substring(0, 1000));
            console.log('=======================\n');
            
            // Save text output to a txt file in temp folder for easy inspection
            fs.writeFileSync(path.join(tempDir, file.replace('.docx', '.txt')), fullText, 'utf8');
        } else {
            console.log(`document.xml not found for ${file}`);
        }
    } catch (err) {
        console.error(`Error processing ${file}:`, err);
    }
});

console.log('Done extraction. Text files saved in', tempDir);
