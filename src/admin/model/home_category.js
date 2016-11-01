'use strict';
/**
 * model
 */
export default class extends think.model.base {
    //取出顶级分类
    readTopClass(){
        return this.limit().where({path: 0}).order("orders ASC").select();
    }
    //取出指定子集分类
    readChildClass(c){
        return this.limit().where({path:c}).select();
    }
    //取出指定id数据
    readId(id){
        return this.where({id:id}).find();
    }
    //添加顶级分类
    addTopClass(name,insertDate){
        return this.add({name:name,path: 0,date:insertDate});
    }
    //添加子集分类
    addChildClass(name,path,brief,insertDate){
        return this.add({name:name,path:path,brief:brief,date:insertDate});
    }
    //删除指定id条目
    deleteId(id){
        return this.where({id: id}).delete();
    }
    //修改顶级分类名称
    modifiedTopName(id,name){
        return this.where({id: id}).update({name: name})
    }
    //修改指定id的标题,简介
    modifiedIdHead(id,name,brief){
        return this.where({id:id}).update({name:name,brief:brief});
    }
    //获取指定id标题,简介
    getIdHead(id){
        return this.where({id:id}).find();
    }
    //更新改同级顺序
    updateIdContent(id,content){
        return this.where({id:id}).update({orders:content});
    }
    //更新非同级顺序
    updateNoContent(parentId,childId){
        return this.where({id:childId}).update({path:parentId});
    }
    //更新顶级Path
    updateTopPath(id){
        return this.where({id:id}).update({path:0});
    }
}