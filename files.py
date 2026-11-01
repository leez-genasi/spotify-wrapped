import os

f = []
for root, dirs, files in os.walk('my_spotify_data'):
    for file in files:
        if file.endswith('.json'):
            f.append(file)

with open('files.txt', 'w') as file:
    for item in f:
        file.write(item + '\n')