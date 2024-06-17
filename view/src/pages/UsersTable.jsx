import { React, useEffect, useState } from 'react'
import config from '../config.js';

function UsersTable() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await config.getData("users", null, null, null, null, null); // Example fetch function, adjust as needed
                setUsers(data);
            } catch (error) {
                console.error("Error fetching data from DB:", error);
            }
        }

        fetchData();
    }, []);
    return (
        <>
            <table>
                <thead>
                    <tr>
                         <th>Status</th>
                        <th>User Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>
                                <select value={user.role} onChange={e => handleChangeStatus(user.id, e.target.value)}>
                                    <option value="leader">Leader</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </td>
                            <td>{user.user_name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
export default UsersTable;