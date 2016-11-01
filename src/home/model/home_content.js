'use strict';
/**
 * model
 */
export default class extends think.model.base {
    //获取指定id文章
    readIdContent(id){
        return this.where({id:id}).find();
    }
}