class BaseView {
    constructor(templateName,responseObject){
        this.templateName = templateName;
        this.responseObject = responseObject;
    }

    render(data){
        return this.responseObject.render(this.templateName,data);
    }
}

module.exports = BaseView;