/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */

/**
 * use global.xxx to define global functions
 * 
 * global.fn1 = function(){
 *     
 * }
 */
global.formatDate=function (d, sec) {
   var time;
   var date = new Date(d);
   var y = date.getFullYear();
   var M = date.getMonth() + 1;
   M = M < 10 ? "0" + M : M;
   var d = date.getDate();
   d = d < 10 ? "0" + d : d;
   var h = date.getHours();
   h = h < 10 ? "0" + h : h;
   var m = date.getMinutes();
   m = m < 10 ? "0" + m : m;
   var s = date.getSeconds();
   s = s < 10 ? "0" + s : s;
   if (sec) {
      time = y + "-" + M + "-" + d + " " + h + ":" + m + ":" + s;
   } else {
      time = y + "-" + M + "-" + d + " " + h + ":" + m;
   }
   return time;
}
global.formatDate1=function (d) {
   var time;
   var date = new Date(d);
   var y = date.getFullYear();
   var M = date.getMonth() + 1;
   M = M < 10 ? "0" + M : M;
   var d = date.getDate();
   d = d < 10 ? "0" + d : d;
   time = y + "年" + M + "月" + d + "日";
   return time;
}
global.delHtmlTag=function(html){
   return html.replace(/<[^>]+>/g,"")
}