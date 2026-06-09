import zipfile
import xml.etree.ElementTree as ET
import os

def read_docx(file_path):
    try:
        with zipfile.ZipFile(file_path) as docx:
            xml_content = docx.read('word/document.xml')
            root = ET.fromstring(xml_content)
            
            # Namespace for word processing ML
            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            
            paragraphs = []
            for paragraph in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
                texts = [node.text for node in paragraph.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text]
                if texts:
                    paragraphs.append("".join(texts))
            return "\n".join(paragraphs)
    except Exception as e:
        return f"Error reading {file_path}: {e}"

desktop = r"C:\Users\General\OneDrive\Desktop"
files = [
    "anshith.docx",
    "grave.docx",
    "rain.docx",
    "time.docx",
    "മായ്ഞ്ഞു പോയ കുഞ്ഞുങ്ങൾ 2.docx",
    "മായ്ഞ്ഞു പോയ കുഞ്ഞുങ്ങൾ.docx"
]

for f in files:
    path = os.path.join(desktop, f)
    if os.path.exists(path):
        print(f"=== Content of {f} ===")
        print(read_docx(path)[:1500]) # print first 1500 chars
        print("=======================\n")
    else:
        print(f"File {f} not found")
