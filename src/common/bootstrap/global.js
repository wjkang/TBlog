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
global.formatDate=function(date){
   return date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate() +' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
}