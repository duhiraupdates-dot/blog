import os
import re
import urllib.request
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

images = [
    ('1518156677180.jpg', 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=600'),
    ('1516979187457.jpg', 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600'),
    ('1455390582262.jpg', 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600'),
    ('1509198397868.jpg', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600')
]

fonts_urls = [
    'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;700&family=Noto+Naskh+Arabic:wght@400;700&family=Noto+Nastaliq+Urdu:wght@400;700&family=Noto+Sans+Devanagari:wght@400;700&family=Noto+Sans+Malayalam:wght@400;700&display=swap'
]

# Create directories if they don't exist
os.makedirs('public/assets/images', exist_ok=True)
os.makedirs('public/assets/fonts', exist_ok=True)

print("Downloading images...")
for filename, url in images:
    filepath = os.path.join('public/assets/images', filename)
    if not os.path.exists(filepath):
        print(f"Downloading {filename}...")
        urllib.request.urlretrieve(url, filepath)

print("Processing fonts...")
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
}

combined_css = []
font_counter = 0

for css_url in fonts_urls:
    req = urllib.request.Request(css_url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            css_content = response.read().decode('utf-8')
            
            # Find all url(...) in CSS
            urls = re.findall(r'url\((https://[^)]+)\)', css_content)
            
            for woff2_url in set(urls):
                font_counter += 1
                font_filename = f"font_{font_counter}.woff2"
                font_filepath = os.path.join('public/assets/fonts', font_filename)
                
                # Download font file
                if not os.path.exists(font_filepath):
                    print(f"Downloading {font_filename} from {woff2_url}")
                    urllib.request.urlretrieve(woff2_url, font_filepath)
                
                # Replace url in CSS
                css_content = css_content.replace(woff2_url, font_filename)
            
            combined_css.append(css_content)
    except Exception as e:
        print(f"Error fetching {css_url}: {e}")

fonts_css_path = os.path.join('public/assets/fonts', 'fonts.css')
with open(fonts_css_path, 'w', encoding='utf-8') as f:
    f.write("\n".join(combined_css))
print(f"Saved {fonts_css_path}")

print("Done.")
