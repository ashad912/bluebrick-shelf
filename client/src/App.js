import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Feed from 'components/Feed';
import Navbar from 'components/Navbar';
import SignUp from 'components/SignUp';
import SignIn from 'components/SignIn';
import withAuth from 'components/hoc/withAuth';
import withNoAuth from 'components/hoc/withNoAuth';

import './index.css'

import { authCheck } from 'store/actions'
import PageNotFound from 'components/PageNotFound';

const App = (props) => {

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
      <Navbar />
      <div className="root">
        <Switch>
          <Route exact path="/" component={withAuth(Feed)} />
          <Route exact path="/signup" component={withNoAuth(SignUp)} />
          <Route exact path="/signin" component={withNoAuth(SignIn)} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App