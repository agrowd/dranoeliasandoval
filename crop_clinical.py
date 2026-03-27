from PIL import Image
import os

def aggressive_cleanup(image_path):
    if not os.path.exists(image_path):
        return
    
    img = Image.open(image_path)
    width, height = img.size
    
    # If it's a phone screenshot (tall aspect)
    if height / width > 1.7:
        # Crop 22% from top (WhatsApp header + status bar)
        # Crop 18% from bottom (WhatsApp text box + nav bar)
        top = int(height * 0.22)
        bottom = int(height * 0.78)
        
        cropped = img.crop((0, top, width, bottom))
        cropped.save(image_path, "JPEG", quality=95)
        print(f"Aggressively cleaned {image_path}")

files = [
    'assets/images/co2-result-1.jpg',
    'assets/images/co2-result-2.jpg',
    'assets/images/co2-procedural.jpg',
    'assets/images/vascular-procedural.jpg',
    'assets/images/pico-tattoo-1.jpg',
    'assets/images/pico-tattoo-2.jpg',
    'assets/images/pico-tattoo-3.jpg',
    'assets/images/pico-tattoo-4.jpg',
    'assets/images/pico-tattoo-5.jpg',
    'assets/images/pico-tattoo-6.jpg'
]

for f in files:
    aggressive_cleanup(f)
