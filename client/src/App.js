import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import Feed from 'components/Feed';
import SignUp from 'components/SignUp';
import withAuth from 'components/hoc/withAuth';
import withNoAuth from 'components/withNoAuth';

import './index.css'

import authCheck from 'components/actions'

export default () => {

  const [loaded, setLoaded] = useState(false)

  const dispatch = useDispatch()

  const auth = async () => {
    await dispatch(authCheck())
    setLoaded(true)
  }

  useEffect(() => {
    auth()
  }, [])

  if (!loaded) {
    return null
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={withAuth(Feed)} />
          <Route exact path="/singup" component={withNoAuth(SignUp)} />
        </Switch>
      </div>
    </BrowserRouter>

  );
}
