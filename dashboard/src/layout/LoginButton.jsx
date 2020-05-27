import React from "react"
import { useDispatch, useSelector } from 'react-redux';

import { signIn } from '../store/action'

export default function LoginButton() {

  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.loggedIn);

  const [password, setPassword] = React.useState('');

  const changePassword = (e) => {
    setPassword(e.target.value);
  }

  const buttonClick = () => {
    dispatch(signIn(password));
  }

  return (
    <div>
      {!loggedIn &&
        <>
          <input type="password" onChange={changePassword} />
          <button onClick={buttonClick}>Sign In</button>
        </>
      }
    </div>
  )

}
