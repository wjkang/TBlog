'use strict';
/**
 * model
 */
export default class extends think.model.base {
    //更新点击次数
    updateIpClickNumber(ip,times){
		return this.where({"ip": ip,"createDate": times}).increment("time", 1); //将ip加 1
	}
    //新增一条ip访问
    addRowIp(ip,times){
        return this.add({ip: ip,createDate:times});
    }
    //取出对应当前访问日期的数据
    readDateIp(times){
        return this.where({createDate:times}).find();
    }
    //取出一条ip所对应的数据
    readIp(ip){
        return this.where({ip:ip}).find();
    }
}