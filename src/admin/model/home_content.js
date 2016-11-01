'use strict';
/**
 * model
 */
export default class extends think.model.base {
    //获取指定id文章
    readIdContent(id){
        return this.where({id:id}).find();
    }
    //为指定id添加文章
    addIdContent(id,content){
        return this.add({id:id,content:content});
    }
    //删除指定id内容
    deleteId(id){
        return this.where({'id': id}).delete();
    }
    //修改指定id的详细内容
    modifiedIdContent(id,content){
        return this.where({id:id}).update({content:content});
    }
    //获取指定id内容
    getIdContent(id){
        return this.where({id:id}).find();
    }
}