'use strict';
/**
 * model
 */
export default class extends think.model.base {
    //取出当日ip访问总和
    getAllIp(times){
        return this.where({createDate: times}).sum("time");
    }
    //取出当日ip个数
    getIpNumber(times){
        return this.where({createDate: times}).count();
    }
}