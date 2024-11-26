// create reusable logic for checking authentication (token) and also removing token (logout)
import { jwtDecode } from "jwt-decode";

//check to see if someone is logged in
// "this" is referring to the WHOLE CLASS
//can access any method within the Class object, so can get info from method to method easier than writing separate functions
class CheckAuth {
  retrieveTokenFromLocalStorage() {
    return localStorage.getItem("token");
  }
  //storing token in localStorage
  storeToken(token, user) {
    localStorage.setItem("token", token);
    if (user.role === "provider") {
      window.location.assign("/provider");
    } else {
      window.location.assign("/patient");
    }
  }
  //decodeToken is going to return: data (username, id, role), initiated at, & expiration
  decodeToken() {
    return jwtDecode(this.retrieveTokenFromLocalStorage());
  }

  isLoggedIn() {
    //see IF theres a token in localstorage
    const token = this.retrieveTokenFromLocalStorage();
    if (token) {
      //check to see if token is expired
      const decoded = this.decodeToken();
      const isExpired = this.checkExp(decoded);
      if (!isExpired) {
        return true;
      }
    }
    //if theres no token or the token is expired...
    return false;
  }

  checkExp(token) {
    if (token.exp < Date.now() / 1000) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem("token");
    window.location.assign("/");
  }

  checkIfProviderOrPatient() {
    //checking if token exists, if so, decode the token, if not then return null
    const tokenInfo = this.isLoggedIn() ? this.decodeToken() : null;
    //if tokenInfo exists, make a variable called role
    if (tokenInfo) {
      const role = tokenInfo.data.role;
      if (role === "patient") {
        //go to patient home page
        window.location.assign("/patient");
      } else {
        //go to provider home page
        window.location.assign("/provider");
      }
    }
  }
  role(){
    //using decode token, return the role
  }
}

//export a new instance of a Class object so that the new object is already created, instead of having to create a new object everytime we want to use a method inside CheckAuth
//you have to create a new instance of the Class object in order to access/execute the methods inside. if you don't you only have access to the blueprint - you cant actually do functionality with a blueprint
export default new CheckAuth();
