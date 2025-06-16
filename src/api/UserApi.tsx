import {User} from "../model/User";

export const UserApi = {

    register: async (userToCreate: User) => {
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userToCreate),
            });
            return await response.json();
    },

    login: async (userToLogin: User) => {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userToLogin),
            });
            return await response.json();
    }
};