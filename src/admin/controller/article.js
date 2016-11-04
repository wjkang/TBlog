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
        let article={
           Id:0,
           Title:"",
           MarkDown:""
        };
        this.assign(article);
        return this.display("editarticle");
    }
}