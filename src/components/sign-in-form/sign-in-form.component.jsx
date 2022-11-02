//use to track the actual input inside of the inputd below
import {useState} from "react";

import FormInput from "../form-input/form-input.component"

import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component"

//context code commented out as we now make use of observer pattern to keep track of auth change.
// import { UserContext } from "../../contexts/user.context";

import { signInWithGooglePopup , signInAuthUserWithEmailAndPassword} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss"


const defaultFormFields= {
    email: "",
    password: "",
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    //the code below sends the user data into the context... thereby making the user
    // data available in the navigation component
    //context code commented out as we now make use of observer pattern to keep track of auth change.
    // const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = () =>{
        setFormFields(defaultFormFields)
    }

    //this fxn allows users sign in with google pop up
    const signInWithGoogle = async () =>{
        await signInWithGooglePopup();
        //sets user in user context...
        //context code commented out as we now make use of observer pattern to keep track of auth change.
        // setCurrentUser(user)
        // await createUserDocumentFromAuth(user)
        //code moved into the user context component.
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password)
            //here we set the current value, i.e current user
            //context code commented out as we now make use of observer pattern to keep track of auth change.
            //setCurrentUser(user)
            
            resetFormFields();
            
        } catch (error) {
            switch(error.code){
                case "auth/wrongPassword":
                    alert ("incorrect password");
                    break
                case "auth/user-not-found":
                    alert("no user associated with this email");
                    break
                default:
                    console.log(error)
            }
        }
    }

    const handleChange= (e) => {
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value})
    }

    return ( 
        <div className="sign-up-container">
            <h2>Already have an account ?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
                
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
            
            <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign In</Button>
                {/* buttons inside forms have a default type = submit, to prevent the google button from firing as a submit button
                we change the type from type="submit" to type="button". */}
            </div>
            </form>
        </div>
     );
}
 
export default SignInForm;