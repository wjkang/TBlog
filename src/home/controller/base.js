'use strict';
import moment from 'moment';

export default class extends think.controller.base {
	* __before(){
		let model = this.model("home_statistics");
		let ip = this.ip();
		//验证数据库是否存有当前日期
		let overTime = moment().format("YYYY-MM-DD");
		let dbDate = yield model.readDateIp(overTime);
		/**
		 * 判断数据是否存在
		 * 如果true为不存在,如果不存在便添加一条
		 * 如果存在则更新
		 */
		if(think.isEmpty(dbDate)){
			let insertId = model.addRowIp(ip,overTime);
		} else {
			let readIp = yield model.readIp(ip);
			if(think.isEmpty(readIp)){
				let insertId = model.addRowIp(ip,overTime);
			} else {
				model.updateIpClickNumber(ip,overTime);
			}
		}
	}
}