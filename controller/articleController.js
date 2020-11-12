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
        req.checkBody('title','Title is required').notEmpty()
        req.checkBody('author','Author is required').notEmpty()
        req.checkBody('body','Descreption is required').notEmpty()
        //get errors
        let errors=req.validationErrors()
        if(errors){
            res.render('add_article',{
                title:'Add Article',
                errors:errors
            })
        }
        else{

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
                    req.flash('success','Article Added')
                    res.redirect('/')
                }
            })
            console.log("Submiited") 
        }
    },
    getArticleDetails(req,res){
        Articles.findById(req.params.id, function(err, article){
              res.render('article_detailes', {
                article:article
              });
          });
    },
    editArticleData(req,res){
        Articles.findById(req.params.id, function(err, article){
              res.render('article_edit', {
                  message:'Edit Article',
                article:article
              });
          });
    },
    submitUpdatedArticleToDB(req,res){
        let updatedArticle= {}
        let query={_id:req.params.id}
        updatedArticle.title=req.body.title;
        updatedArticle.author=req.body.author;
        updatedArticle.body=req.body.body

        Articles.updateOne(query, updatedArticle,function(err){
            if(err) {
                console.log(err)
                return;
            }
            else{
                req.flash('success','Article Updated')
                res.redirect('/')
            }
        })
    },
    deleteArticleFromDB(req,res){
        let query={_id:req.params.id}
       Articles.remove(query,function(err){
        if(err) {
            console.log(err)
            return;
        }
        else{
            res.send("Done ")
        }
       })

    }

}