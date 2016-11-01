$(function(){
   $(document).pjax('a', '#content-main');
   $.pjax({url: '/admin/main/main', container: '#content-main'});
});