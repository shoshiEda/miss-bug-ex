import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { UserMsg } from './UserMsg.jsx'


const {useEffect} = React
const { Link, NavLink } = ReactRouterDOM
const { useState } = React
const { useNavigate } = ReactRouter
/*export function AppHeader() {
  useEffect(() => {
    // component did mount when dependancy array is empty
  }, [])*/

  export function AppHeader() {

    const navigate = useNavigate()

    const [user, setUser] = useState(userService.getLoggedinUser())

    function onLogout() {
        userService.logout()
            .then(()=>{
                onSetUser(null)
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    function onSetUser(user) {
        setUser(user)
        navigate('/')
    }




  return (
    <header>
      <UserMsg />
      <nav>
        <NavLink to="/">Home</NavLink> |<NavLink to="/bug">Bugs</NavLink> |
        <NavLink to="/about">About</NavLink>
      </nav>
      <h1>Bugs are Forever</h1>
      {user ? (
                < section >

                    <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup onSetUser={onSetUser} />
                </section>
            )}
    </header>
  )
}
