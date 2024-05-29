import React, { useState } from 'react'
const ModalLogin=({

})=>{
    return (
      <>  className="modal-container"
  <button>❌</button>
       <form className='registerForm'>
            <h2 className="title">Log in</h2><br />
            <input type="text" className='input' value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} /><br />
            <input type="password" className='input' value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br />
            <button type="button" className="btnOkLogIn" onClick={handleLogin}>Connect</button><br />
            {loginError && <p className='error' style={{ color: loginError == "Registration successful" ? 'green' : "red" }}>{loginError}</p>}
            <Link className="goToSignUp" to="/Register">Don't have an account? Createaccount</Link>
        </form>
        </> 
    );
}