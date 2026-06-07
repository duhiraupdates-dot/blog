const fs = require('fs');
const path = require('path');
const https = require('https');

const images = [
    { filename: '1518156677180.jpg', url: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=600' },
    { filename: '1516979187457.jpg', url: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600' },
    { filename: '1455390582262.jpg', url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600' },
    { filename: '1509198397868.jpg', url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600' }
];

const fonts_urls = [
    'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;700&family=Noto+Naskh+Arabic:wght@400;700&family=Noto+Nastaliq+Urdu:wght@400;700&family=Noto+Sans+Devanagari:wght@400;700&family=Noto+Sans+Malayalam:wght@400;700&display=swap'
];

fs.mkdirSync(path.join(__dirname, 'public/assets/images'), { recursive: true });
fs.mkdirSync(path.join(__dirname, 'public/assets/fonts'), { recursive: true });

function download(url, dest) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(dest)) {
            resolve();
            return;
        }
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                download(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

function fetchText(url, headers) {
    return new Promise((resolve, reject) => {
        const options = { headers };
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function main() {
    console.log("Downloading images...");
    for (const img of images) {
        const dest = path.join(__dirname, 'public/assets/images', img.filename);
        await download(img.url, dest);
        console.log(`Downloaded ${img.filename}`);
    }

    console.log("Processing fonts...");
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
    };

    let combined_css = [];
    let fontCounter = 0;

    for (const css_url of fonts_urls) {
        try {
            let css = await fetchText(css_url, headers);
            const regex = /url\((https:\/\/[^)]+)\)/g;
            let match;
            const urlSet = new Set();
            while ((match = regex.exec(css)) !== null) {
                urlSet.add(match[1]);
            }

            for (const woff2_url of urlSet) {
                fontCounter++;
                const fontName = `font_${fontCounter}.woff2`;
                const dest = path.join(__dirname, 'public/assets/fonts', fontName);
                
                await download(woff2_url, dest);
                console.log(`Downloaded ${fontName}`);
                
                css = css.split(woff2_url).join(fontName);
            }
            combined_css.push(css);
        } catch (e) {
            console.error("Error fetching", css_url, e);
        }
    }

    const fontsCssPath = path.join(__dirname, 'public/assets/fonts', 'fonts.css');
    fs.writeFileSync(fontsCssPath, combined_css.join('\n'));
    console.log(`Saved fonts.css`);
    console.log("Done.");
}

main().catch(console.error);
