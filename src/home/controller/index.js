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

	* detialAction(){
		let ids 	= this.http.get("id");
		let fatherId = this.http.get("path");
		let model 	= this.model('home_category'); 
		let cModel  = this.model('home_content');
		let tsUrl = this.http.url;
		//更新点击次数
		let updateClick = model.articleChildClick(fatherId);
		//获取顶级分类
		let category= yield model.readTopClass();
		//获取当前文章单条
		let resObj  = yield model.readId(ids);
		//文章多条
		let detialData = [];
		let detialList = yield model.readChildClass(fatherId);
		let listLength = detialList.length;
		for(let i = 0; i < listLength; i ++){
			detialData.push(detialList[i]);
			let parentId = detialList[i].id;
			let detialChild = yield model.readChildClass(parentId);
			detialData[i].parents = [];
			detialData[i].parents = detialChild;
		}

		//获取文章详情
		let cContent = yield cModel.readIdContent(ids);
		this.assign({
			'title' : resObj.name,
			'allCategory' : category,
			'listLength' : listLength,
			'leftData' : detialData,
			'content' : cContent.content,
			'markId' : ids,
			'url' : tsUrl
		});
		return this.display();
	}
}