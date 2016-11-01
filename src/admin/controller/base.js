'use strict';

export default class extends think.controller.base {
	* __before(){
		 let loginSession = yield this.session("userInfo");
		 //登录状态判断
		 if( loginSession == "undefined" || loginSession == undefined ){
			 if ( this.http.action === 'login' || this.http.action === 'judge'){
				 return;
			 } else {
				this.redirect('/admin/login/login');
            	return;
			 }
        }
	}
}