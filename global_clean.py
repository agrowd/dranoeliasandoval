from PIL import Image
import os

def clean_all_assets(directory):
    for filename in os.listdir(directory):
        if filename.endswith(('.jpg', '.jpeg', '.png')):
            path = os.path.join(directory, filename)
            try:
                img = Image.open(path)
                w, h = img.size
                # If tall (phone screenshot)
                if h / w > 1.6:
                    print(f"Cleaning {filename} (aspect {h/w:.2f})")
                    # Be aggressive: 25% top, 25% bottom
                    top = int(h * 0.25)
                    bottom = int(h * 0.75)
                    cropped = img.crop((0, top, w, bottom))
                    cropped.save(path, quality=95)
            except Exception as e:
                print(f"Error processing {filename}: {e}")

clean_all_assets('assets/images')
