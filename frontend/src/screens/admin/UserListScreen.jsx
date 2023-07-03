import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Table,Button} from 'react-bootstrap'
import {  useGetAllUsersQuery , useDeleteUserMutation} from '../../slices/usersApiSlice'
import Loader from '../../components/Loader'
import { Alert } from 'react-bootstrap'
import { FaTimes,FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import {toast} from 'react-toastify'

const UserListScreen = () => {

    const { data: users, refetch, isLoading, error } = useGetAllUsersQuery();
    const [deleteUser, {isLoading : loadingDelete}] = useDeleteUserMutation();
  
    const deleteHandler = async (id) => {
      if (window.confirm('Are you sure')) {
        try {
          await deleteUser(id);
          refetch();
          toast.success('User deleted successfully')
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    };
  
    return (
      <>
        <h1>Users</h1>
        {loadingDelete && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Alert variant='danger'>
            {error?.data?.message || error.error}
          </Alert>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {!user.isAdmin && (
                      <>
                        <LinkContainer
                          to={`/admin/user/${user._id}/edit`}
                          style={{ marginRight: '10px' }}
                        >
                          <Button variant='light' className='btn-sm'>
                            <FaEdit />
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(user._id)}
                        >
                          <FaTrash/>
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </>
    );
    }
    
 

export default UserListScreen