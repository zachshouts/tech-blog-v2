import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import cookie from "js-cookie"

interface UserState {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  posts: object[];
  likes: object[];
  comments: object[];
  following: object[];
  followers: object[];
  postCount: number;
  followingCount: number;
  followerCount: number;
}

export const UserAuthContext = createContext<UserState | null>(null)
export const useUserAuthCtx = () => useContext(UserAuthContext)

export const UserAuthProvider = ({children}: {children: ReactNode}) => {
  const [ user, setUser ] = useState(null)

  const verifyUser = async () => {
    const authCookie = cookie.get("auth-token")
    if( authCookie ){
      const query = await fetch("/api/users/verify", {
        method: "post",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": authCookie
        }
      })
      const result = await query.json()
      if( result ){
        setUser(result)
      }
    }
  }

  useEffect(() => {
    verifyUser()
  },[])

  return (
    <UserAuthContext.Provider value={ user }>
      {children}
    </UserAuthContext.Provider>
  )
}