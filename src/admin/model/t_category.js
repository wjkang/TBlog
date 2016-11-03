'use strict';
export default class extends think.model.base {
    getAllCategories(){
        return this.select();
    }
    addCategory(name,insertDate){
      return this.add({Name:name,CreatedDate:insertDate,UpdatedDate:insertDate,Sort:0,ParentId:0});
    }
}