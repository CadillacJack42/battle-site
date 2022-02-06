import React from 'react';

export default function SignUpForm({
  handleSignUpSubmit,
  usernameSignUp,
  handleSignUpUsernameChange,
  passwordSignUp,
  handleSignUpPasswordChange,
  emailSignUp,
  handleSignUPEmailChange,
  
  handleSignInSubmit,
  emailSignIn,
  handleSignINEmailChange,
  passwordSignIn,
  handleSignInPasswordChange,
}) {
  return <div>
    Sign Up
    <form onSubmit={handleSignUpSubmit}>
      <label>
        Username
        <input
          value={usernameSignUp} 
          onChange={handleSignUpUsernameChange}></input>
      </label>
      <label>
        Password
        <input 
          value={passwordSignUp} 
          onChange={handleSignUpPasswordChange}
          type={'password'}
        >
        </input>
      </label>
      <label>
        Email
        <input 
          value={emailSignUp}
          onChange={handleSignUPEmailChange}
          type={'email'}
        >
        </input>
      </label>
      <button>Submit</button>
    </form>
    <br></br>
    <hr></hr>
    <br></br>
    Sign In
    <form onSubmit={handleSignInSubmit}>
      <label>
        Email
        <input
          value={emailSignIn}
          onChange={handleSignINEmailChange}
        >
        </input>
      </label>
      <label>
        Password
        <input 
          value={passwordSignIn} 
          onChange={handleSignInPasswordChange}
          type={'password'}
        >
        </input>
      </label>
      <button>Submit</button>
    </form>
  </div>;
}

// export const SignInForm = (
//   handleSignInSubmit,
//   usernameSignIn,
//   handleSignInUsernameChange,
//   passwordSignUp,
//   handlePasswordChange,
    
// ) => {
//   console.log(usernameSignIn);
//   console.log(handlePasswordChange);
//   return <div>
//      Sign In
//     <form onSubmit={handleSignInSubmit}>
//       <label>
//         Username
//         <input
//           value={usernameSignIn}
//           onChange={handleSignInUsernameChange}
//         >
//         </input>
//       </label>
//       <label>
//         Password
//         <input 
//           value={passwordSignUp} 
//           onChange={handlePasswordChange}
//           type={'password'}
//         >
//         </input>
//       </label>
//       <button>Submit</button>
//     </form>
//   </div>;
// };
