import{Fragment, useContext} from "react"
import {Outlet, Link} from "react-router-dom";

import {ReactComponent as CrwnLogo} from "../../assets/crown.svg"

import { UserContext } from "../../contexts/user.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss"

const Navigation = () =>{
  // we leverage the current user value from our context in our navigation component.....
    const {currentUser} = useContext(UserContext);
    // console.log(currentUser)

    //context code commented out as we now make use of observer pattern to keep track of auth change.
    //we create a signouthandler so we can sign out a user and also ensure to sign 
    //them out of our context by setting the user in our context to null once the user signs out.
    // const signOutHandler= async ()=>{
    //     await signOutUser();
    //     setCurrentUser(null);
    // }

    return(
      <Fragment>
        <div className="navigation">
              <Link className="logo-container" to="/">
                <CrwnLogo className="logo"/>
              </Link>
          <div className="nav-links-container">
              <Link className="nav-link" to="/shop">
                  SHOP
              </Link>
              {
                  currentUser ? (
                      <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                  )
                  : 
              (<Link className="nav-link" to="/auth">
                  SIGN IN
              </Link>
              )}
          </div>
        </div>
        <Outlet/>
      </Fragment>
    );
  };

  export default Navigation;