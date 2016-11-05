'use strict';

import Base from './base.js';
import moment from 'moment';

export default class extends Base {
    async articlelistAction(){
        let model=this.model("t_article");
        let articles=await model.field("Id,Title,UpdatedDate").select();
        this.assign({
            articles:articles
        });
        return this.display();

    }

    async addarticleAction(){
        let model=this.model("t_category");
        let categories=await model.field("Id,Name").select();
        let article={
           Id:0,
           Title:"",
           MarkDown:'',
           CategoryId:0,
           Categories:categories
        };
        this.assign(article);
        return this.display("editarticle");
    }
    async editarticleAction(){
        let id=this.http.get("id");
        let cateModel=this.model("t_category");
        let articleModel=this.model("t_article");
        let articel=await articleModel.where({Id:id}).find();
        let categories=await cateModel.field("Id,Name").select();
        let article={
            Id:articel.Id,
            Title:articel.Title,
            MarkDown:articel.MarkDown,
            CategoryId:articel.CategoryId,
            Categories:categories
        };
        this.assign(article);
        return this.display();
    }
    async savearticleAction(){
       let id=this.http.post("id");
       let title=this.http.post("title");
       let category=this.http.post("category");
       let content=this.http.post("content");
       let markdown=this.http.post("markdown");
       let date=moment().format("YYYY-MM-DD HH:mm:ss");
       let model=this.model("t_article");
       if(id==0){
          let insertId=await model.add({Title:title,Content:content,MarkDown:markdown,CategoryId:category,UpdatedDate:date,CreatedDate:date});
           return this.success(insertId);
       }else{
           return this.success(0);
       }

    }
}