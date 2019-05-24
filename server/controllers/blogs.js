const request = require('request');
const cheerio = require('cheerio');


module.exports = {
    kith: (req, response) => {
        console.log('in Kith')
        var scrapesRemaining = 42;
        let data = [];
        for(let i=1; i<=7;i++){
            console.log(i);
            request(`https://kith.com/blogs/news?page=${i}`, (err, res, html) => {
                if(!err && res.statusCode == 200) {
                    const $ = cheerio.load(html);
    
                    $('.blog-article a').each((i, el) => {
                        const site = "Kith"
    
                        const title = $(el)
                        .text()
                        .replace(/\s\s+/g, '')
                        .trim();
                        
                        const link ="https://kith.com" + $(el).attr('href');
                        
                        let img = $(el)
                        .find('div.background-box')
                        .attr('data-bgset')
                        .split(',', 1);
                        
                        img = 'https:' + img[0]
                        .replace(/([0-9])([0-9])([0-9])([w])+/g, '')
                        .replace(/([0-9])([0-9])([0-9])([h])+/g, '')
                        .replace(/180x.jpg/, '360x.jpg')
                        .trim();
    
                        data.push({site: site, title: title, link: link, img: img});
    
                        --scrapesRemaining;
                    
                        if(scrapesRemaining <= 0){
                            for(let i = 0; i<data.length; i++){
                                console.log(i, data[i].link);
                                request(data[i].link, (err, res, html) => {
                                    if(!err && res.statusCode == 200) {
                                        
                                        var resp = function() {
                                            console.log('data:', data);
                                            response.json({data: data})
                                        }

                                        const $ = cheerio.load(html);
                    
                                        let date = $('h2.article__publish time')
                                        .attr('datetime');

                                        let dateString = date
                                            .split('-');
                                        
                                        if(dateString[1] == '01'){
                                            dateString[1] = 'January'
                                        }
                                        else if(dateString[1] == '02'){
                                            dateString[1] = 'February'
                                        }
                                        else if(dateString[1] == '03'){
                                            dateString[1] = 'March'
                                        }
                                        else if(dateString[1] == '04'){
                                            dateString[1] = 'April'
                                        }
                                        else if(dateString[1] == '05'){
                                            dateString[1] = 'May'
                                        }
                                        else if(dateString[1] == '06'){
                                            dateString[1] = 'June'
                                        }
                                        else if(dateString[1] == '07'){
                                            dateString[1] = 'July'
                                        }
                                        else if(dateString[1] == '08'){
                                            dateString[1] = 'August'
                                        }
                                        else if(dateString[1] == '09'){
                                            dateString[1] = 'September'
                                        }
                                        else if(dateString[1] == '10'){
                                            dateString[1] = 'October'
                                        }
                                        else if(dateString[1] == '11'){
                                            dateString[1] = 'November'
                                        }
                                        else if(dateString[1] == '12'){
                                            dateString[1] = 'December'
                                        }


                                        if(Number(dateString[2]) < 10){
                                            dateString[2] = dateString[2]
                                                .replace(/0/, '');
                                            
                                        }
                                        

                                        data[i].dateString = dateString[1] + ' ' + dateString[2] + ', ' + dateString[0];

                                        
                                        data[i].dateInt = Number(date.replace(/-/g, ''));
                                        
                                        if(i+1 == data.length){
                                            setTimeout(resp, 3000);
                                        }
                    
                                    } else {
                                        console.log(err);
                                        return;
                                    }
                                });
                            }
                        }
                    })
                } else {
                    console.log(err);
                    return;
                }
            });
        }
    },

    nike: (req, response) => {
        console.log('in nike');
        var scrapesRemaining = 54;
        let data = [];

        for(let i=1; i<=3; i++) {
            if(i == 1) {
                request('https://news.nike.com/news', (err, res, html) => {
                scrapeNike(err, res, html);
                })
            }
            else {
                request(`https://news.nike.com/news/page/${i}`, (err, res, html) => {
                scrapeNike(err, res, html);
                })
            }
        }
        var scrapeNike = function(err, res, html) {
            if(!err && res.statusCode == 200) {
                const $ = cheerio.load(html);

                $('article.feature-tile__container').each((i, el) => {
                    const site = "Nike";

                    let title = $(el)
                        .find('h2')
                        .text();

                    let link = 'https://news.nike.com' + $(el)
                        .find('a')
                        .attr('href');

                    let img = $(el)
                        .find('img')
                        .attr('src');

                    let date = $(el)
                        .find('span.font--italic')
                        .text();



                    let dateString = date
                        .replace(/\,/, '')
                        .split(' ');

                    
                    
                    if(Number(dateString[1]) < 10){
                        dateString[1] = dateString[1]
                        .replace(/0/, '');
                    }

                    dateString = dateString[0] + ' ' + dateString[1] + ', ' + dateString[2];

                    console.log('dateString', dateString);
                        
                    
                    
                    let dateInt = date
                        .replace(/January/, '01')
                        .replace(/February/, '02')
                        .replace(/March/, '03')
                        .replace(/April/, '04')
                        .replace(/May/, '05')
                        .replace(/June/, '06')
                        .replace(/July/, '07')
                        .replace(/August/, '08')
                        .replace(/September/, '09')
                        .replace(/October/, '10')
                        .replace(/November/, '11')
                        .replace(/December/, '12')
                        .replace(/,/, '')
                        .replace(/\s/g, '-')
                        .split('-',3);
                    
                    
                    dateInt = Number(dateInt[2] + dateInt[0] + dateInt[1]);
                    
                    console.log('dateInt', dateInt);
                        
                        

                    data.push({site: site, title: title, link: link, img: img, dateString: dateString, dateInt: dateInt})

                    
                    --scrapesRemaining;
                    
                    if(scrapesRemaining == 0) {
                        console.log('data:', data)
                        response.json({data: data});
                    }
                })
            } else {
                console.log(err);
                return;
            }
        }
    },

    theHundreds: (req, response) => {
        console.log('in The Hundreds');
        var scrapesRemaining = 10;
        let data = [];

        request('https://thehundreds.com/blogs/bobby-hundreds', (err, res, html) => {

            if(!err && res.statusCode == 200) {
                const $ = cheerio.load(html);

                $('div.post-row').each((i,el) => {
                    const site = 'The Hundreds';

                    let title = $(el)
                        .find('h3.article-title')
                        .text();

                    let link = 'https://thehundreds.com' + $(el)
                        .find('a')
                        .attr('href');

                    let img = 'https:' + $(el)
                        .find('div.image')
                        .attr('style')
                        .replace(/background-image: url\(\'/, '')
                        .replace(/\'\)\;/, '');


                    let date = $(el)
                        .find('b')
                        .text()
                        .replace(/Bobby Hundreds :: /, '')
                        .split('.');

                        console.log('date', date);

                    let dateString = date;
                    
                    if(dateString[0] == '1'){
                        dateString[0] = 'January'
                    }
                    else if(dateString[0] == '2'){
                        dateString[0] = 'February'
                    }
                    else if(dateString[0] == '3'){
                        dateString[0] = 'March'
                    }
                    else if(dateString[0] == '4'){
                        dateString[0] = 'April'
                    }
                    else if(dateString[0] == '5'){
                        dateString[0] = 'May'
                    }
                    else if(dateString[0] == '6'){
                        dateString[0] = 'June'
                    }
                    else if(dateString[0] == '7'){
                        dateString[0] = 'July'
                    }
                    else if(dateString[0] == '8'){
                        dateString[0] = 'August'
                    }
                    else if(dateString[0] == '9'){
                        dateString[0] = 'September'
                    }
                    else if(dateString[0] == '10'){
                        dateString[0] = 'October'
                    }
                    else if(dateString[0] == '11'){
                        dateString[0] = 'November'
                    }
                    else if(dateString[0] == '12'){
                        dateString[0] = 'December'
                    }
                    
                    
                    dateString = dateString[0] + ' ' + dateString[1] + ', 20' + dateString[2];

                    console.log('dateString', dateString);

                    
                    let dateInt = date;

                    if(Number(dateInt[0]) < 10) {
                        dateInt[0] = '0' + dateInt[0];
                    }
                    if(Number(dateInt[1]) < 10) {
                        dateInt[1] = '0' + dateInt[1];
                    }
                    
                    dateInt = Number('20' + dateInt[2] + dateInt[1] + dateInt[0]);



                    data.push({site: site, title: title, link: link, img: img, dateString: dateString, dateInt: dateInt})

                    
                    --scrapesRemaining;
                    
                    if(scrapesRemaining == 0) {
                        console.log('data:', data)
                        response.json({data: data});
                    }
                })
            } else {
                console.log(err);
                return;
            }
        })
    },

    bape: (req, response) => {
        console.log('in Bape');
        var scrapesRemaining = 50;
        let data = [];

        request('https://us.bape.com/blogs/news', (err, res, html) => {

            if(!err && res.statusCode == 200) {
                const $ = cheerio.load(html);

                $('div.SelectedNews-block').each((i, el) => {
                    const site = 'Bape';

                    let title = $(el)
                        .find('div.SelectedNews-text a')
                        .text();

                    let link = 'https://us.bape.com' + $(el)
                        .find('a')
                        .attr('href');

                    let img = $(el)
                        .find('img')
                        .attr('src');

                    let date = $(el)
                        .attr('class')
                        .replace(/SelectedNews-block/, '')
                        .trim()
                        .replace(/2/, '.2')
                        .split('.');

                    dateString = date[0] + ' ' + date[1];
                    dateInt = Number(date[1] + date[0]
                        .replace(/January/, '01')
                        .replace(/February/, '02')
                        .replace(/March/, '03')
                        .replace(/April/, '04')
                        .replace(/May/, '05')
                        .replace(/June/, '06')
                        .replace(/July/, '07')
                        .replace(/August/, '08')
                        .replace(/September/, '09')
                        .replace(/October/, '10')
                        .replace(/November/, '11')
                        .replace(/December/, '12')
                        + '00')

                    data.push({site: site, title: title, link: link, img: img, dateString: dateString, dateInt: dateInt})

                    console.log(scrapesRemaining);
                    --scrapesRemaining;
                    
                    if(scrapesRemaining == 0) {
                        console.log('data:', data)
                        response.json({data: data});
                    }
                })
            } else {
                console.log(err);
                return;
            }
        })
    },

    end: (req, response) => {
        console.log('in END')
        var scrapesRemaining = 36;
        let data = [];

        request('https://www.endclothing.com/gb/features/latest', (err, res, html) => {

            if(!err && res.statusCode == 200) {
                const $ = cheerio.load(html);

                $('div.fVMSxp').each((i, el) => {
                    const site = "END."

                    let title = $(el)
                        .find('h3')
                        .text();

                    let link = 'https://endclothing.com' + $(el)
                        .find('a')
                        .attr('href');

                    let img = $(el)
                        .find('img')
                        .attr('src');

                    let date = $(el)
                        .find('span.PostDate__PostDateSC-sc-1frfw1p-0')
                        .text()
                        .trim()
                        .split(' ');

                    console.log('date', date);
                    
                    let dateString = date[1] + ' ' + date[0] + ', ' + date[2];

                    console.log('dateString:', dateString);

                    date[1] = date[1]
                        .replace(/January/, '01')
                        .replace(/February/, '02')
                        .replace(/March/, '03')
                        .replace(/April/, '04')
                        .replace(/May/, '05')
                        .replace(/June/, '06')
                        .replace(/July/, '07')
                        .replace(/August/, '08')
                        .replace(/September/, '09')
                        .replace(/October/, '10')
                        .replace(/November/, '11')
                        .replace(/December/, '12');

                    let dateInt = date;

                    if(Number(dateInt[0]) < 10) {
                        dateInt[0] = '0' + dateInt[0];
                    }

                    dateInt = Number(dateInt[2] + dateInt[1] + dateInt[0]);

                    data.push({site: site, title: title, link: link, img: img, dateString: dateString, dateInt: dateInt})

                    console.log(scrapesRemaining);
                    --scrapesRemaining;
                    
                    if(scrapesRemaining == 0) {
                        console.log('data:', data)
                        response.json({data: data});
                    }
                })
            } else {
                console.log(err);
                return;
            }
        })
    },
    adidas: (req, response) => {
        console.log('in ADIDAS')
        var scrapesRemaining = 36;
        let data = [];

        for(let i=1; i<=3; i++){
            request(`https://news.adidas.com/latest-news?page=${i}`, (err, res, html) => {
                console.log(i);
                if(!err && res.statusCode == 200) {
                    const $ = cheerio.load(html);
    
                    $('div.desktop div.news-list-item').each((i, el) => {
                        const site = "adidas"
    
                        let title = $(el)
                            .find('h5')
                            .text()
                            .replace(/\'/, '')
                            .replace(/'\n'/, '')
                            .trim();
    
                        let link = $(el)
                            .find('a')
                            .attr('href');
    
                        let img = $(el)
                            .find('img')
                            .attr('src');
    
                        let date = $(el)
                            .find('span.item-type-date')
                            .text()
                            .replace(/\"/, '')
                            .trim();
                            
                        console.log('date', date);
                        
                        let dateString = date
                            .replace(/Jan/, 'January')
                            .replace(/Feb/, 'February')
                            .replace(/Mar/, 'March')
                            .replace(/Apr/, 'April')
                            .replace(/May/, 'May')
                            .replace(/Jun/, 'June')
                            .replace(/Jul/, 'July')
                            .replace(/Aug/, 'August')
                            .replace(/Sep/, 'September')
                            .replace(/Oct/, 'October')
                            .replace(/Nov/, 'November')
                            .replace(/Dec/, 'Decmber')
                            .split('-');
    
                        if(Number(dateString[0]) < 10) {
                            dateString[0] = dateString[0]
                                .replace(/0/, '');
                        }
    
                        dateString = dateString[1] + ' ' + dateString[0] + ', ' + dateString[2];
    
                        
                        let dateInt = date
                            .replace(/Jan/, '01')
                            .replace(/Feb/, '02')
                            .replace(/Mar/, '03')
                            .replace(/Apr/, '04')
                            .replace(/May/, '05')
                            .replace(/Jun/, '06')
                            .replace(/Jul/, '07')
                            .replace(/Aug/, '08')
                            .replace(/Sep/, '09')
                            .replace(/Oct/, '10')
                            .replace(/Nov/, '11')
                            .replace(/Dec/, '12')
                            .split('-');
    
                        dateInt = Number(dateInt[2] + dateInt[1] + dateInt[0]);
    
                        data.push({site: site, title: title, link: link, img: img, dateString: dateString, dateInt: dateInt})

                        scrapesRemaining--;
    
                        if(scrapesRemaining == 0) {
                            console.log('data:', data)
                            response.json({data: data});
                        }
                    })
                } else {
                    console.log(err);
                    return;
                }
            })
        }
    }
}
