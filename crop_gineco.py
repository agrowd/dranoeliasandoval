from PIL import Image
import os

img_path = r'c:\Users\Try Hard\Desktop\Nexte\dranoeliasandoval\assets\images\ginecologia-laser.png'
save_path = r'c:\Users\Try Hard\Desktop\Nexte\dranoeliasandoval\assets\images\ginecologia-laser-patient.png'

try:
    with Image.open(img_path) as img:
        width, height = img.size
        # Crop to show only the patient (left part of the image)
        # Left: 0, Top: 0, Right: 60% of width, Bottom: height
        # Slightly more than 60% might be better to capture the patient fully.
        left = 0
        top = 0
        right = int(width * 0.65)
        bottom = height
        
        cropped_img = img.crop((left, top, right, bottom))
        cropped_img.save(save_path)
        print(f"Image saved successfully to {save_path}")
except Exception as e:
    print(f"Error: {e}")
