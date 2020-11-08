const articleController= require('../controller/articleController')
module.exports=(app)=>{ 
    app.get('/', articleController.getArticlesListToHomePage)
//get all aticles from DB using conterol file 
app.get('/articles/add',articleController.getArticlesListToAddArticle)
//Add Article To DB
app.post('/articles/add',articleController.addArticle)
// get article detail with id
app.get('/article/:id',articleController.getArticleDetails)
}
