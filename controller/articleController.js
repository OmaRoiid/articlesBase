const Articles= require('../model/articlesDB')
module.exports={
    getArticlesListToHomePage(req,res,next){
        limit=parseInt(req.query.limit)||''
        Articles.find({}).limit(limit)
        .then(article=> res.render('index',
        { title: 'Article', message: 'Articles',artciles:article }
        ))
        .catch(next)
    },
    getArticlesListToAddArticle(req,res,next){
        limit=parseInt(req.query.limit)||''
        Articles.find({}).limit(limit)
        .then(article=> res.render('add_article',
        { title: 'Article', message: 'Add New article'}
        ))
        .catch(next)
    },
    addArticle(req,res){
        let addedArticle= new Articles()
        addedArticle.title=req.body.title;
        addedArticle.author=req.body.author;
        addedArticle.body=req.body.body
        addedArticle.save((err)=>{
            if(err) {
                console.log(err)
                return;
            }
            else{
                res.redirect('/')
            }
        })
        console.log("Submiited") 
    },
    getArticleDetails(req,res){
        Articles.findById(req.params.id, function(err, article){
              res.render('article_detailes', {
                article:article
              });
          });
    }

}