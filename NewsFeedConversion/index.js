function getCould(news) {

    let new_cloud = {};
    const stopwords = ['in', 'the', 'to', 'from', 'who', 'what'];
    for(var key in news.Demo.value) {
      let obj = news.Demo.value[key];
      const words = obj.name.split(" ");
      for (var word_id in words) {
        const word = words[word_id];
        let cloud_item = new_cloud[word];
        if (!cloud_item) {
          new_cloud[word] = {
            text: word,
            weight: 1,
          }
        } else {
          cloud_item['weight']  = cloud_item['weight'] +1;
        }
        console.warn('new_cloud[word]',word,new_cloud[word]);
      }
      console.warn('new_cloud_update',new_cloud);
    }
    return  Object.values(new_cloud).filter(w => !stopwords.includes(w.text));
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    } else if(req.body && req.body.source_news_results) {
        const cloud = getCould(req.body.source_news_results);
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: cloud
        };
    }  else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};