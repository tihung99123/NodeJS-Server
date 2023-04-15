from PIL import Image
import requests
import sys

url = sys.argv[1]
response = requests.get(url, stream=True)
img = Image.open(response.raw)
img = img.convert("RGBA")
datas = img.getdata()

new_data = []
for item in datas:
    if item[0] >= 225 and item[1] >= 225 and item[2] >= 225:
        new_data.append((255, 255, 255, 0))
    else:        
        new_data.append(item)

img.putdata(new_data)
img.save(sys.argv[2],"PNG")