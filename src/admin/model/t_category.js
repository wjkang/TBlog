'use strict';
export default class extends think.model.base {
    getAllCategories(){
        return this.select();
    }
}