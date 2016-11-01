'use strict';

import Base from './base.js';

export default class extends Base {
	*indexAction(){
		let sessionName = yield this.session("userInfo");
        let adminData   = {};
        adminData.name  = sessionName;
        this.assign({
            'adminInfo' : adminData
        });
		return this.display();
  	}
}