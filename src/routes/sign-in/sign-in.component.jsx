import { signInwithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const Signin = () => {
    const logGoogleUser = async () =>{
        const {user} = await signInwithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return ( 
        <div>
            <h1>Sign In Page</h1>
        <button onClick={logGoogleUser}>
            Sign in with Google Popup
        </button>
        </div>
     );
}
 
export default Signin;