import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';

function User() {
    const allUsers = useQuery(FETCH_USERS);
    const [userId,setId] = useState(1);

    const handleChange = (e) => {
        setId(e.target.value)
        e.preventDefault();
    }

    const {loading,data,error} = useQuery(GET_USER_DATA, {
        variables: {
            id: userId
        }
    });

    return <>
    {
        data && data.user !== null ?<> <h1>Id:- {data.user.id}</h1> <h1>Name:- {data.user.name}</h1></> : <p>Not Found</p>
    }
        <input type="text" value={userId} onChange={handleChange}></input>

        {allUsers.data.users.map(({ id, name }) => (
            <div key={id}>
                <p>
                    {id}: {name}
                </p>
            </div>
        ))}
    </>
}

const FETCH_USERS = gql`
 {
  users{
    id
    name
  }
}
`;

const GET_USER_DATA = gql`
 query getUserData($id: ID!){
     user(id: $id){
         id
         name
     }
 }
`;

export default User