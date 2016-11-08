'use strict';

import Base from './base.js';
import moment from 'moment';

export default class extends Base {
    async articlelistAction() {
        let model = this.model("t_article");
        let articles = await model.field("Id,Title,UpdatedDate").select();
        this.assign({
            articles: articles
        });
        return this.display();

    }

    async addarticleAction() {
        let model = this.model("t_category");
        let categories = await model.field("Id,Name").select();
        let article = {
            Id: 0,
            Title: "",
            MarkDown: '',
            CategoryId: 0,
            Categories: categories,
            Tags: []
        };
        this.assign(article);
        return this.display("editarticle");
    }

    async editarticleAction() {
        let id = this.http.get("id");
        let cateModel = this.model("t_category");
        let articleModel = this.model("t_article");
        let tagsModel = this.model("t_tags");
        let articel = await articleModel.where({Id: id}).find();
        let categories = await cateModel.field("Id,Name").select();
        let tags = await tagsModel.field("Name").where("ID IN(SELECT TAGID FROM t_aticletagrelate WHERE ArticleId=" + id + ")").select();
        let article = {
            Id: articel.Id,
            Title: articel.Title,
            MarkDown: articel.MarkDown,
            CategoryId: articel.CategoryId,
            Categories: categories,
            Tags: JSON.parse(JSON.stringify(tags)).map(x=>x.Name)
        };
        console.log(JSON.parse(JSON.stringify(tags)));
        this.assign(article);
        return this.display();
    }

    async savearticleAction() {
        let id = this.http.post("id");
        let title = this.http.post("title");
        let category = this.http.post("category");
        let content = this.http.post("content");
        let markdown = this.http.post("markdown");
        let tags = this.http.post("tags");
        let tagArray = tags.split(",");
        let date = moment().format("YYYY-MM-DD HH:mm:ss");
        let model = this.model("t_article");
        let tagModel = this.model("t_tags");
        let tagRealateModel = this.model("t_aticletagrelate");
        var tagIds = [];
        if (tagArray[0] != "") {
            let existTag =await tagModel.where({Name: ["IN", tags]}).select();
            let existTagArray = JSON.parse(JSON.stringify(existTag));
            var newTag = [];
            for (var i = 0; i < tagArray.length; i++) {
                var exist = false;
                for (var j = 0; j < existTagArray.length; j++) {
                    if (tagArray[i].toUpperCase() == existTagArray[j].Name.toUpperCase()) {
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    newTag.push(tagArray[i]);
                }
            }
            var newTagIds = [];
            if (newTag.length > 0) {
                for (var i = 0; i < newTag.length; i++) {
                    let tagId=await tagModel.add({Name: newTag[i]});
                    newTagIds.push(tagId);
                }
            }
            if (existTagArray.length > 0) {
                for (var j = 0; j < existTagArray.length; j++) {
                    tagIds.push(existTagArray[j].Id);
                }
            }
            if (newTagIds.length > 0) {
                for (var j = 0; j < newTagIds.length; j++) {
                    tagIds.push(newTagIds[j]);
                }
            }
        }
        if (id == 0) {
            let insertId = await model.add({
                Title: title,
                Content: content,
                MarkDown: markdown,
                CategoryId: category,
                UpdatedDate: date,
                CreatedDate: date
            });
            if(tagIds.length>0){
                var tagrealate=[];
                for(var i=0;i<tagIds.length;i++){
                    tagrealate.push({ArticleId:insertId,TagId:tagIds[i]});
                }
                await tagRealateModel.addMany(tagrealate);
            }
            return this.success(insertId);
        } else {
            await tagRealateModel.delete({where: {ArticleId: id}});
            if(tagIds.length>0){
                var tagrealate=[];
                for(var i=0;i<tagIds.length;i++){
                    tagrealate.push({ArticleId:id,TagId:tagIds[i]});
                }
                await tagRealateModel.addMany(tagrealate);
            }
            await model.where({Id:id}).update({
                Title: title,
                Content: content,
                MarkDown: markdown,
                CategoryId: category,
                UpdatedDate: date
            });
            return this.success(0);
        }

    }
}