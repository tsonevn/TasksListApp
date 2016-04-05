import{Config} from "../shared/config";
import{User} from "../shared/view-models/user-model";
// var AsyncSpec = require("node-jasmine-async");

// describe("test config class", function(){
//     var user:User = new User(false, false, "example@example.com", "password");
//     var config:Config = new Config();
//     var response;
//     var async = new AsyncSpec(this);
     
//     async.beforeEach(function(){
//         response =  user.login();
//     });
    
    
    
//     it("test login function user module", function(done){
//         expect(response).toBeDefine();
        
//     });
    
//     // async.it("test config token user", function(){
//     //     expect(response).toBeDefine();
//     // })
// })


describe("test spec", function(){
    
   var a=1;
   
   it("example", function(){
       expect(a).toEqual(1);
   });
   
});

describe("test cinfig user token", function(){
    var user:User = new User(false, false, "example@example.com", "password");
    var config:Config = new Config();
    var response;
    
    beforeAll(function(done){
        setTimeout(function(){
            done();
        },1000)
        user.login();
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  "+response);
    },2000)
    
    it("test initial user token",function(done){
        setTimeout(function(){
            done();
        },3000);
        var result = config.userToken;
            console.log("????????????????????????????????????????");
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! - "+result+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            expect(result).toBeDefined();
        
    }, 4000);
    
    
    
    it("test user id", function(){
        var result = config.userToken;
        expect(result).toEqual(jasmine.stringMatching('4804'));
    })
});