$(function(){
   $(document).pjax('a', '#content-main');
   $.pjax({url: '/admin/main/main', container: '#content-main'});
   $("#small-chat").on("click",function(){
      $.pjax.reload("#content-main");
   });
});