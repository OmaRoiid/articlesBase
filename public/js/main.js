
    $('.delete-article').on("click",function(){
    const articleID=$(this).attr('data-id')
    $.ajax({
        type:'DELETE',
        url: '/article/'+articleID,
        success: function(response){
          alert('Deleting Article');
          window.location.href='/';
        },
        error: function(err){
          console.log(err);
        }
      });
      })  
  