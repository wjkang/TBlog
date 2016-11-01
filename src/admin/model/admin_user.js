'use strict';
/**
 * model
 */
export default class extends think.model.base {
    //获取当前登录管理员信息
    getUserMessage(username){
        return this.where({
            username:username
        }).find();
    }
}