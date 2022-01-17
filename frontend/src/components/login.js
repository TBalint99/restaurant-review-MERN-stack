import React, { useState } from "react"
import { useHistory } from "react-router-dom"

export default function Login(props) {
    
    const history = useHistory()

    const initialState = {
        name: "",
        id: ""
    }

    const [user, setUser] = useState(initialState)

    const handleInputChange = event => {
        const { name, value } = event.target
        setUser({
            ...user,
            [name] : value
        })
    }

    const login = () => {
        props.login(user)
        history.push('/restaurants')
    }

    return (
        <div className="submit-form">
            <div>
                <div className="form-group">
                    <label htmlFor="user">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={user.name}
                        onChange={handleInputChange}
                        name="name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="id"
                        required
                        value={user.id}
                        onChange={handleInputChange}
                        name="id"
                    />
                </div>

                <button onClick={login} className="btn btn-success mt-2">
                    Login
                </button>
            </div>
        </div>
    )
}