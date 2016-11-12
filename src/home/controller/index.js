'use strict';

import Base from './base.js';

export default class extends Base {
	async indexAction(){
		let categoryModel=this.model("t_category");
		let articleModel=this.model("t_article");
		let tagModel=this.model("t_tags");
        let categories=await categoryModel.field(["Id","Name"]).select();
		let articles=await articleModel.field(["Id","Title","Content","UpdatedDate"]).select();
		let tags=await tagModel.select();
		this.assign({
			categories:categories,
			articles:articles,
			tags:tags
		});
		return this.display();
	}

	async detailAction(){
		let id= this.http.get("id");
		let categoryModel=this.model("t_category");
		let articleModel=this.model("t_article");
		let tagModel=this.model("t_tags");
		let categories=await categoryModel.field(["Id","Name"]).select();
		let article=await articleModel.field(["Id","Title","Content","UpdatedDate"]).where({Id:id}).find();
		let tags=await tagModel.select();
		this.assign({
			categories:categories,
			article:article,
			tags:tags
		});
		return this.display();
	}
	async categoryAction(){
       let cateName=this.http.get("name");
       let categoryModel=this.model("t_category");
       let tagModel=this.model("t_tags");
       let articleModel=this.model("t_article");
       let cateId=await categoryModel.field(["Id"]).where({Name:cateName}).find();
       let categories=await categoryModel.field(["Id","Name"]).select();
       let tags=await tagModel.select();
       let articles=await articleModel.field(["Id","Title"]).where({CategoryId:cateId.Id}).select();
       this.assign({
           articles:articles,
           categories:categories,
           tags:tags
       });
       return this.display();
    }
}