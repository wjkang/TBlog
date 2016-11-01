'use strict';

import Base from './base.js';
import moment from 'moment';

export default class extends Base {
    * addarticleAction(){
        //取出顶级分类
        let model   = this.model('home_category');
        let topList = yield model.readTopClass();
        let data    = topList;
        //合并二级分类
        let topListLength = topList.length;
        for(let i = 0; i < topListLength; i++){
            let twoList = yield model.readChildClass(topList[i].id);
            data[i].twoCategory = twoList;
            //三级分类
            let threeListLength = data[i].twoCategory.length;
            for(let t = 0; t < threeListLength; t++){
                let twoId     = data[i].twoCategory[t].id;
                let threeList =  yield model.readChildClass(twoId);
                data[i].twoCategory[t].threeCategory = threeList;
                //四级分类
                let fourListLength = data[i].twoCategory[t].threeCategory.length;
                for(let f = 0; f < fourListLength; f ++){
                    let fourId = data[i].twoCategory[t].threeCategory[f].id;
                    let fourList = yield model.readChildClass(fourId);
                    data[i].twoCategory[t].threeCategory[f].fourCategory = fourList;
                }
            }
        }
        //console.log(data)
        this.assign({
            'line' : data
        });
        return this.display();
    }
    
    //添加顶级分类
    * addtoparticleAction(){
        let data = this.http.post("cts");
        let model = this.model('home_category');
        let insertDate = moment().format("YYYY-MM-DD");
        let insertId = yield model.addTopClass(data,insertDate);
        return this.success(insertId);
    }

    //添加二级分类
    * addtwoarticleAction(){
        let data = this.http.post("cts");
        let path = this.http.post("path");
        let brief = this.http.post("br");
        let content = this.http.post("content");

        let model = this.model('home_category');
        let cModel = this.model('home_content');
        let insertDate = moment().format("YYYY-MM-DD");
        let insertId = yield model.addChildClass(data,path,brief,insertDate);

        let insertContent = yield cModel.addIdContent(insertId,content);
        return this.success(insertId);
    }

    //删除
    * deletearticleAction(){
        let id = this.http.get("id");
        let model   = this.model('home_category');
        let cModel  = this.model('home_content');
        //删除所选条
        let affectedRows = yield model.deleteId(id);
        let affectedCRows = yield cModel.deleteId(id);
        //删除子类
        let childRows = yield model.readChildClass(id);
        for(let i = 0; i < childRows.length; i++){
            if(childRows.length>0){
                let childRowsTwo = yield model.deleteId(childRows[i].id);
                let cTwoRows = yield cModel.deleteId(childRows[i].id);;
                let childRowsTows = yield model.readChildClass(childRows[i].id);
                if(childRowsTows.length>0){
                    for(let x = 0; x < childRowsTows.length; x++){
                        let childRowsThree = yield model.deleteId(childRowsTows[x].id);
                        let cThreeRows = yield cModel.deleteId(childRowsTows[x].id);
                        let childRowsFour = yield model.readChildClass(childRowsTows[x].id);
                        if(childRowsFour.length>0){
                            for(let f = 0; f < childRowsFour.length; f++){
                                let childRowsFours = yield model.deleteId(childRowsFour[f].id);
                                let cFourRows = yield cModel.deleteId(childRowsFour[f].id);
                            }
                        }
                    }
                }
            }
        }
        return this.http.redirect("/admin/article/addarticle");
    }

    //修改顶级分类
    * altertopAction(){
        let id = this.http.post("id");
        let content = this.http.post("data");

        let model = this.model('home_category');
        let affectedRows = yield model.modifiedTopName(id,content);;
        return this.success(affectedRows);
    }

    //获取指定id内容
    * getcontentAction(){
        let id = this.http.post("id");
        let model = this.model('home_category');
        let cModel = this.model('home_content');
        let title = yield model.getIdHead(id);
        let cont  = yield cModel.getIdContent(id);
        let resultData = {title,cont};
        return this.success(resultData);
    }

    //修改指定id内容
    * editingAction(){
        let data = this.http.post("cts");
        let path = this.http.post("path");
        let brief = this.http.post("br");
        let content = this.http.post("content");

        let model = this.model('home_category');
        let cModel = this.model('home_content');

        let insertId = yield model.modifiedIdHead(path,data,brief);
        let insertContent = yield cModel.modifiedIdContent(path,content);
        
        return this.success(insertId);
    }

    //更改排序
    * setorderAction(){
        let data = JSON.parse(this.http.post("content"));
        let model = this.model('home_category');
        let updateId;
        //以数组下标为顺序
        for(let i = 0; i < data.length; i++){
            updateId = yield model.updateIdContent(data[i].id,i);
            let updateTop = yield model.updateTopPath(data[i].id);
            if(!(think.isEmpty(data[i].children))){
                for(let x = 0; x < data[i].children.length; x++){
                    let updateTwo = yield model.updateIdContent(data[i].children[x].id,x);
                    let updateTwoPath = yield model.updateNoContent(data[i].id,data[i].children[x].id);
                    if(!(think.isEmpty(data[i].children[x].children))){
                        for(let f = 0; f < data[i].children[x].children.length; f++){
                            let updateFour = yield model.updateIdContent(data[i].children[x].children[f].id,f);
                            let updateFourPath = yield model.updateNoContent(data[i].children[x].id,data[i].children[x].children[f].id);
                            if(!(think.isEmpty(data[i].children[x].children[f].children))){
                                for(let w = 0; w < data[i].children[x].children[f].children.length; w++){
                                    let updateFive = yield model.updateIdContent(data[i].children[x].children[f].children[w].id,w);
                                    let updateFivePath = yield model.updateNoContent(data[i].children[x].children[f].id,data[i].children[x].children[f].children[w].id);
                                }
                            }
                        }
                    }
                }   
            }
        }
        return this.success(updateId);
    }
}