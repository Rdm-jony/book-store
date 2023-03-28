import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const AllUser = () => {
    const { user } = useContext(AuthContext)
    let count = 0
    const { data: allUsers,refetch } = useQuery({
        queryKey: ["allUsers"],
        queryFn: () => fetch(`${process.env.REACT_APP_URL}/allUsers`)
            .then(res => res.json())
    })
    const handleDelete = (id) => {
        const confirm = window.confirm("Are your sure to delete this User")
        if (confirm) {
            fetch(`${process.env.REACT_APP_URL}/user/delete/${id}`, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        toast.success(`${user?.email} deleted successfully`)
                        refetch()
                    }
                    console.log(data)
                })
                .catch(er => console.log(er))
        }

    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <tbody>
                        {
                            allUsers?.map(user => <tr>
                                <th>{++count}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td> <button onClick={() => handleDelete(user._id)} className='btn btn-xs border-t-red-600' type="">delete</button> </td>
                            </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>

        </div >
    );
};

export default AllUser;