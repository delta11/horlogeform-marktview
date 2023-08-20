export async function load({setHeaders}) {
    setHeaders({
        "Cache-Control": "public, max-age=3600",
    });
    return {
        // Endpoint returns 30 posts by default, first 2 posts are the rules
        watches: await fetch('https://www.horlogeforum.nl/c/horlogemarkt/12')
            .then(data => data.text())
            .then(text => new Promise((resolve) => {
                const body = text.substring(text.indexOf('<body'));

                const urlRegex = /<meta itemprop='url' content='(.*?)'>/g;
                const nameRegex = /<meta itemprop='name' content='(.*?)'>/g;

                let urlMatches;
                let nameMatches;

                const extractedUrls = [];
                const extractedNames = [];

                while ((urlMatches = urlRegex.exec(body)) !== null) {
                    if (urlMatches[1]) {
                        extractedUrls.push(urlMatches[1]);
                    }
                }

                while ((nameMatches = nameRegex.exec(body)) !== null) {
                    if (nameMatches[1]) {
                        let nameMatch = nameMatches[1];
                        if (nameMatch.startsWith('TK:')) {
                            nameMatch = nameMatch.substring(3);
                        }
                        if (nameMatch.startsWith('TK/TR:')) {
                            nameMatch = nameMatch.substring(6);
                        }
                        extractedNames.push(nameMatch);
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
                    .filter(watch => !watch.name.startsWith('Binnen 6 maanden'));

                const withPicture = Promise.all(filteredArray
                    .map(watch => {
                        return {watch, fetch: fetch(watch.url)}
                    })
                    .map(async watchFetch => {
                        const fetchResult = await watchFetch.fetch;
                        const html = await fetchResult.text();
                        const watchFetchBody = html.substring(html.indexOf('<body'));
                        const imageUrl = findImageUrl(watchFetchBody);
                        const price = findPrice(watchFetchBody);
                        return {...watchFetch.watch, pictureUrl: imageUrl, price}
                    }));

                withPicture.then(value => {
                    resolve(value);
                })
            }))
    };
}

const findPrice = (html) => {
    const priceRegex = /Vraagprijs:\s*\W*:{0,1}\u20AC{0,1}\s*(\d+(?:\.\d+)?(?:,\d+)?)\s*\u20AC{0,1}\s*/i;
    const priceMatch = html.match(priceRegex);
    if(priceMatch) {
        console.log(priceMatch[1]);
        console.log(priceMatch[0]);
    }
    return priceMatch ? priceMatch[1] : '-';
}

const findImageUrl = (html) => {
    const hrefRegex = /<a\s+[^>]*?class=["'][^"']*lightbox[^"']*["'][^>]*?href=["'](.*?)["']/i;
    const imageMatch = html.match(hrefRegex);
    return imageMatch ? imageMatch[1] : findImageUrlFallBack(html);
};

const findImageUrlFallBack = (html) => {
    const regex =   /<img[^>]*?src=["'](.*uploads.*?)["'][^>]*>/gi;;
    const imageMatch = html.match(regex);
    return imageMatch ? imageMatch.map(match => match.match(/src=["'](.*?)["']/i)[1])[1] : '';
}
