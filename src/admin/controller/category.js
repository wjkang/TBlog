'use strict';

import Base from './base.js';

export default class extends Base {
    async categoryAction(){
        let model=this.model('t_category');
        let categories=await model.getAllCategories();
        this.assign({
            'categories': categories
        });
        return this.display();
    }
}