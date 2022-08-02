import { createContext, useContext, ReactNode, useState } from "react";

const defaultUser = {
    id: 0,
    username: 'anonymous'
}
const defaultContext = {
    user: defaultUser,
    setUser: (user: { id: number, username: string }) => { }
}

const UserContext = createContext(defaultContext)

export function useUser() {
    return useContext(UserContext)
}

interface Props {
    children: ReactNode
}
export const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState(defaultUser)

    const value = {
        user,
        setUser,
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
