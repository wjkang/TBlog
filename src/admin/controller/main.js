'use strict';

import Base from './base.js';
import moment from 'moment';

export default class extends Base {
    * mainAction(){
        let sessionName = yield this.session("userInfo");
        let model       = this.model('admin_user');
        let statistics  = this.model('home_statistics');

        //管理员信息
        let data        = yield model.getUserMessage(sessionName.username);
        let adminData   = {};
        adminData.name  = sessionName;
        adminData.lastip= data.lastloginip;
        adminData.lasttm= moment().format("YYYY-MM-DD HH:mm:ss");
        //流量统计
        let flow = {};
        //当日流量
		let overTime = moment().format("YYYY-MM-DD");
        flow.allIp   = yield statistics.getAllIp(overTime);
        flow.ipNumber = yield statistics.getIpNumber(overTime);
        this.assign({
            'adminInfo' : adminData,
            'flow' : flow
        });
        return this.display();
    }
}