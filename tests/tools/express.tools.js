



let req = {
    method:null,
    path:null,
    body:null,
    query:null,
    cookie:null
};

let res = {
    params:{},
    render:function(view,data){
        this.params.view = view;
        this.params.data = data;
    },
    send:function(){
        return
    },
    json:function(data){
        this.params.data = data;
    }
};

let next = {
    params:{}
}

module.exports = {
    req,req,next
}


