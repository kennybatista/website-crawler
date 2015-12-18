
var request = require("request");  //We are asking to include these npm modules in our project.
var cheerio = require("cheerio");


// request('https://news.ycombinator.com', function (error, response, html) {
// 	if (!error && response.statusCode == 200){
// 		console.log(html);
// 	}
// }); 

//If we run node scrape.js we should see the website's html.

//------------------------------------------------------------------------------------------------------------------


request('https://news.ycombinator.com', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('span.comhead').each(function(i, element){
      var a = $(this).prev(); 	//Will select the previous element.
      var rank = a.parent().parent().text(); 	//get the rank by parsing the element two levels above the "a" element.
      var title = a.text();	 //parse the link title.
      var url = a.attr('href'); 	//parse the href attribute from the "a" element.
      var subtext = a.parent().parent().next().children('.subtext').children(); // get the subtext children from the next row in the HTML table.
      var points = $(subtext).eq(0).text(); 	//extract the relevant data from the children.
      var username = $(subtext).eq(1).text();	 //extract the relevant data from the children.
      var comments = $(subtext).eq(2).text(); 	//extract the relevant data from the children.
      // Our parsed meta data object
      var metadata = {
        rank: parseInt(rank),
        title: title,
        url: url,
        points: parseInt(points),
        username: username,
        comments: parseInt(comments)
      };
      console.log(metadata);
    });
  }
});


//Running the the code above will output an array of objects like this: 
// [ { rank: 1,
//     title: 'The Meteoric Rise of DigitalOcean ',
//     url: 'http://news.netcraft.com/archives/2013/06/13/the-meteoric-rise-of-digitalocean.html',
//     points: 240,
//     username: 'beigeotter',
//     comments: 163 },
//   { rank: 2,
//     title: 'Introducing Private Networking',
//     url: 'https://www.digitalocean.com/blog_posts/introducing-private-networking',
//     points: 172,
//     username: 'Goranek',
//     comments: 75 },
// ...


//We could store the extracted data in a database like MongoDB or Redis to further process it.
