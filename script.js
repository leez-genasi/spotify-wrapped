import * as d3 from 'd3';

const USERNAME = 'leez-genasi';
const REPO = 'spotify-wrapped';
const BRANCH = 'main';
const FOLDER_PATH = 'wrapped-python/my_spotify_data';

const BASE_URL = `https://raw.githubusercontent.com/${USERNAME}/${REPO}/${BRANCH}/${FOLDER_PATH}`;


let data = [];

async function fetchData() {
    try {
        console.log("Fetching file list")
        const listResponse = await fetch(`${BASE_URL}/files.txt`);
        if (!listResponse.ok) { throw new Error("Could not find files.txt") };

        const listText = await listResponse.text();

        const fileNames = listText.split('\n')
                                  .map(line => line.trim())
                                  .filter(line => line.length > 0);

        for (const file of fileNames) {
            try {
                console.log(`Fetching file ${file}`);
                const fileResponse = await fetch(`${BASE_URL}/${file}`);
                if (!fileResponse.ok) { throw new Error(fileResponse.status)}

                const fileContent = await fileResponse.json()
                fileContent.forEach(obj => {
                    data.push({
                        source: file,
                        data: obj
                    });                    
                })

            } catch (error) {
                console.error(`Failed to process ${file}: `, error)
            }
        }

        console.log("All files loaded. ", data.length)
        const tsCount = data.filter(item => item.data.master_metadata_album_artist_name == 'Taylor Swift').length
        console.log(tsCount)
    } catch (error) {
        console.error("Error initiatlizing list: ", error)
    }
}

fetchData();