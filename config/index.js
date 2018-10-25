let config = {
    local:{
        server:{
            address:"localhost://",
            port:8080
        },
        db:{
            mongodb:{
                address:"LINK TO MLABS",
                user:"admin",
                password:"pwd"
            }
        }
    },
    production:{
        server:
        {
            address:"aws", //to fill in
            port:0000
        },
        db:{
            mongodb:{
                address:"",
                user:"",
                password:""
            }
        }
    }
}

module.exports = function(env){
    return (config[env] || config["local"])
}