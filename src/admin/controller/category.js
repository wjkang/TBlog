'use strict';

import Base from './base.js';
import moment from 'moment';

export default class extends Base {
    async categoryAction(){
        let model=this.model('t_category');
        let categories=await model.getAllCategories();
        this.assign({
            'categories': categories
        });
        return this.display();
    }
    async addcategoryAction(){
        let name=this.http.post("name");
        let model=this.model('t_category');
        let insertDate=moment().format("YYYY-MM-DD HH:mm:ss");
        let insertId=await model.addCategory(name,insertDate);
        return this.success(insertId);
    }

    async editcategoryAction(){
        let name=this.http.post("name");
        let id=this.http.post("id");
        let model=this.model("t_category");
        let updatedDate=moment().format("YYYY-MM-DD HH:mm:ss");
        let count= model.where({Id:id}).update({Name:name,UpdatedDate:updatedDate});
        return this.success(count);
    }
    async delcategoryAction() {
        let id=this.http.post("id");
        let model=this.model("t_category");
        let count=model.where({Id:id}).delete();
        return this.success(count);
    }
}