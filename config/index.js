let config = {
    local:{
        server:{
            address:"localhost://",
            port:8080
        },
        db:{
            mongodb:{
                user:"test",
                password:"password1",
                address:`mongodb://test:password1@ds235302.mlab.com:35302/sqrt4`
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