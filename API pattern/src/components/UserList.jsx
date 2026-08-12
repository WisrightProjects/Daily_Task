import useApi from "../hooks/useApi";

function UserList() {
  const {
    data: users,
    loading,
    error,
  } = useApi("/users");

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Failed to load users.</p>;
  }

  if (!users || users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <div>
      <h2>Users</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;