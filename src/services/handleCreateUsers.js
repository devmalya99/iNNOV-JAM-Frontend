
const VITE_API_URL = import.meta.env.VITE_API_URL;

const handleCreateUsers = async (users ) => {
    try {
      const response = await fetch(`${VITE_API_URL}/api/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(users),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Users created:', data);
        alert('Users created successfully');
      } else {
        console.error('Error creating users:', response.statusText);
        alert('Error creating users');
      }
    } catch (error) {
      console.error('Error creating users:', error);
      alert('Error creating users');
    }
  };

  export default handleCreateUsers