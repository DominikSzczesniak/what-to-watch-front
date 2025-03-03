import {UserLogin} from "./UserLogin";

type ActiveUserView =
    | { name: "LOGIN" }
    | { name: "REGISTER"; };

export const UserGeneral = () => {
    return (
        <UserLogin/>
    )
}