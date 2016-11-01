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
        return this.limit().where({path:c}).order("orders ASC").select();
    }
    //取出指定id数据
    readId(id){
        return this.where({id:id}).find();
    }
    //文章点击次数
    articleChildClick(id){
        return this.where({id:id}).increment("click",1);
    }
}