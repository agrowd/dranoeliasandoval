import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all card titles
titles = re.findall(r'<h3 class="card-title">(.*?)</h3>', content)
print(f"Titles found: {titles}")

# Count occurrences
counts = {}
for t in titles:
    counts[t] = counts.get(t, 0) + 1

for t, c in counts.items():
    if c > 1:
        print(f"DUPLICATE TITLE FOUND: {t} ({c} times)")

# Check if pico is pico
pico_section = re.search(r'id="card-pico".*?<h3 class="card-title">(.*?)</h3>', content, re.DOTALL)
if pico_section:
    print(f"Card-Pico Title: '{pico_section.group(1)}'")
