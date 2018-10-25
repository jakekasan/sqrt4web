class BaseView {
    constructor(templateName,responseObject){
        //
    }

    render(data){
        return this.responseObject.render(this.templateName,{data:data});
    }
}