const [storageItemName, setStorageItemName] = useState('');
const [storageItemLocation, setStorageItemLocation] = useState('');
const [errorMessage, setErrorMessage] = useState('');
// const router = useRouter();

<form
  onSubmit={async (e) => {
    // Prevent the default browser behavior of forms
    e.preventDefault();

    // Send the email, username, password and token to the
    // API route
    const response = await fetch('/api/storage_item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storageItemName: storage_item_name,
        storageItemLocation: storage_item_location,
        userId: userId,
        // token: props.token,
      }),
    });

    const { success } = await response.json();

    if (success) {
      // Redirect to the homepage if successfully registered
      router.push('/login');
    } else {
      // If the response status code (set using response.status()
      // in the API route) is 409 (Conflict) then show an error
      // message that the user already exists
      if (response.status === 409) {
        setErrorMessage('User already exists!');
      } else {
        setErrorMessage('Failed!');
      }
    }
  }}
>
  <label htmlFor="name">
    Name of storage item:
    <input
      type="text"
      id="name"
      value={name}
      placeholder="e.g. brown box"
      maxLength={50}
      required
      onChange={(e) => setStorageItemName(e.currentTarget.value)}
    />
  </label>
  <br />
  <label htmlFor="location">
    Location of storage item:
    <input
      type="text"
      id="location"
      value={location}
      placeholder=".e.g. basement"
      maxLength={50}
      onChange={(e) => setStorageItemLocation(e.currentTarget.value)}
    />
  </label>
  <br />
  <button>Register</button>
</form>;
