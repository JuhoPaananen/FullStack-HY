import { useState } from 'react';

const LoginForm = ({ handleSubmit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSubmit(username, password);
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
}

export default LoginForm;