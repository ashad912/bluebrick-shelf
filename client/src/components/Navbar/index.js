import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import './Navbar.scss'
import { Toolbar, Typography, AppBar } from '@material-ui/core'

import { signOut } from 'store/actions'

const Navbar = () => {

    const isAuth = useSelector(state => state.auth.uid)

    const dispatch = useDispatch()

    const handleSignout = async () => {
        await dispatch(signOut())
    }

    const TypoLink = ({ children, to, onClick }) => {
        return (
            <Link className="TypoLinkContainer" to={to} onClick={onClick}>

                <Typography>

                    {children}

                </Typography>
            </Link>
        )
    }

    TypoLink.propTypes = {
        children: PropTypes.string.isRequired || PropTypes.element.isRequired,
        to: PropTypes.string,
        onClick: PropTypes.func,
    }

    return (
        <AppBar color="secondary" position="static">
            <Toolbar className="ToolbarRoot" >
                <Typography className="NavbarTitle" variant="h6">
                    Bluebrick Shelf
                </Typography>
                {isAuth ? (
                    <TypoLink
                        onClick={handleSignout}
                    >
                        Sign Out
                    </TypoLink>
                ) : (
                        <Fragment>
                            <TypoLink
                                to='/signup'
                            >
                                Sign Up
                            </TypoLink>
                            <TypoLink
                                to='/signin'
                            >
                                Sign In
                            </TypoLink>
                        </Fragment>
                    )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar