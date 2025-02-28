import {User} from "../model/User";

export const UsersApi = {
    register: async (userToCreate: User) => {
        try {
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userToCreate),
            });
            return await response.json();
        } catch (error) {
            console.error('Error during registration:', error);
        }
    },

    login: async (userToLogin: User) => {
        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userToLogin),
            });
            return await response.json();
        } catch (error) {
            console.error('Error during login:', error);
        }
    }
};