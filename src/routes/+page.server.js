export async function load() {
    return {
        watches: await fetch('https://www.horlogeforum.nl/c/horlogemarkt/12')
            .then(data => data.text())
            .then(text => new Promise((resolve) => {

                const urlRegex = /<meta itemprop='url' content='(.*?)'>/g;
                const nameRegex = /<meta itemprop='name' content='(.*?)'>/g;

                let urlMatches;
                let nameMatches;

                const extractedUrls = [];
                const extractedNames = [];

                while ((urlMatches = urlRegex.exec(text)) !== null) {
                    if (urlMatches[1]) {
                        extractedUrls.push(urlMatches[1]);
                    }
                }

                while ((nameMatches = nameRegex.exec(text)) !== null) {
                    if (nameMatches[1]) {
                        extractedNames.push(nameMatches[1]);
                    }
                }

                // Store the results in an array
                const resultsArray = [];

                for (let i = 0; i < extractedUrls.length; i++) {
                    resultsArray.push({
                        url: extractedUrls[i],
                        name: extractedNames[i] || 'No Name' // If name is not available, use 'No Name'
                    });
                }
                const filteredArray = resultsArray
                    .filter(watch => !watch.name.startsWith('Regels voor de'))
                    .filter(watch => !watch.name.startsWith('Binnen 6 maanden'))
                    .slice(0, 10);

                const withPicture = Promise.all(filteredArray
                    .map(watch => {
                        return {watch, fetch: fetch(watch.url)}
                    })
                    .map(async watchFetch => {
                        const fetchResult = await watchFetch.fetch;
                        const html = await fetchResult.text();
                        const hrefRegex = /<a\s+[^>]*?class=["'][^"']*lightbox[^"']*["'][^>]*?href=["'](.*?)["']/i;
                        const imageMatch = html.match(hrefRegex);
                        const priceRegex = /Vraagprijs:\s*\w*:{0,1}\u20AC{0,1}\s*(\d+(?:\.\d+)?)\s*\u20AC{0,1}\s*/i;
                        const priceMatch = html.match(priceRegex);

                        const imageUrl = imageMatch ? imageMatch[1] : '';
                        const price = priceMatch ? priceMatch[1] : '';
                        return {...watchFetch.watch, pictureUrl: imageUrl, price}
                    }));

                withPicture.then(value =>{
                    console.log(value);
                    resolve(value);
                })
            }))
    };
}
