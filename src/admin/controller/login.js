'use strict';

import Base from './base.js';

export default class extends Base {
    loginAction(){
		  return this.display();
  	}

	//登录检测
    *judgeAction() {
        let resultData = {};
        let post_user = this.post("username");
        let post_pass = this.post("password");

        let model = this.model('admin_user');
        let data = yield model.where({
            username: post_user,
            password: post_pass
        }).find();

        let username = data.username;
        let password = data.password;
        if (post_user == username && post_pass == password) {
            //更新管理员数据表
            let logInfo = {};
            logInfo.ip = this.ip();
            logInfo.time = parseInt((Date.parse(new Date())) / 1000);
            let affectedRows = yield model.where({
                username: post_user
            }).update({
                lastloginip: logInfo.ip,
                lastlogintime: logInfo.time
            });
            //返回结果并设置session
            let userData = {
                'username': username
            };
            yield this.session("userInfo", userData);
            resultData.static = 1;
            return this.success(resultData);
        } else {
            resultData.static = 0;
            return this.success(resultData);
        }
    }

    //退出
    *logoutAction() {
        yield this.session();
        return this.redirect('/admin/login/login');
    }
}