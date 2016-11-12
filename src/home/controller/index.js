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
           tags:tags,
           cateName:cateName
       });
       return this.display();
    }
    async tagAction(){
        let tagName=this.http.get("name");
        let categoryModel=this.model("t_category");
        let tagModel=this.model("t_tags");
        let articleModel=this.model("t_article");
        let relateModel=this.model("t_aticletagrelate");
        let categories=await categoryModel.field(["Id","Name"]).select();
        let tags=await tagModel.select();
        let tagId=await tagModel.field(["Id"]).where({Name:tagName}).find();
        let articleIds=await relateModel.field(["ArticleId"]).where({TagId:tagId.Id}).distinct("ArticleId").select();
        let articles=await articleModel.field(["Id","Title"]).where({Id:["IN",articleIds.map(function(item){return item.ArticleId})]}).select();
        this.assign({
            articles:articles,
            categories:categories,
            tags:tags,
            tagName:tagName
        });
        return this.display();
    }
    async archives(){
        return this.display();
    }
}