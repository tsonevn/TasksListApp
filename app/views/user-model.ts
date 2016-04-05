import{User} from "../shared/view-models/user-model";
import{Config} from "../shared/config";
import{Observable} from "data/observable";

describe("test user view model", function(){
    var user:User;
    var email:string;
    var password:string;
    var model:Observable = new Observable();;
    
    beforeAll(function(){
        user = new User(true, true, "example@example.com", "password");
        email = "example@example.com";
        password = "password";
    });
    
    it("match any User",function(){
        expect(user).toEqual(jasmine.any(User));
    });
    
    it("test get email", function(){
        expect(user.email).toBe(email);
    });
    
    it("user object exist", function(){
        expect(user).not.toBe(null);
    });
    
    it("obervable test", function(){
        user.email = "test@test.bg";
        expect(user.email).toEqual("test@test.bg");
    });
    
    
})

// describe("everlive test data transfer", function(){
//     var user:User;
//     beforeAll(function(){
//         user = new User(true, true, "example@example.com", "password");
//     });
    
    
    
// })

describe("email validaror", function(){
    var user:User = new User(true, true, "example@example.com", "password");
    
    it("test not valide email", function(){
        expect(user.validateEmail("1234")).toBe(false);
    });
    
    it("test valide email", function(){
        expect(user.validateEmail("test@test.com")).toBe(true);
    });
    
    it("test valide email", function(){
        expect(user.validateEmail("test@test.com")).not.toBe(false);
    });
})
