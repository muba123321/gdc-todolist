import { signin } from "../../../redux/User/authSlice";
import api from "../../../utils/axios";

// Handle form changes
export const handleFormChange = (formData, setFormData, setError) => (e) => {
  setFormData({
    ...formData,
    [e.target.id]: e.target.value,
  });
  setError("");
};

// Handle sign-up form submission
export const handleSignUpSubmit =
  (formData, dispatch, setLoading, setError, setSuccessMessage, navigate) =>
  async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation: Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setSuccessMessage("");
      return;
    }

    const { confirmPassword, ...submitData } = formData;

    try {
      setLoading(true);
      console.log("started......");
      const response = await api.post("/auth/signup", submitData);
      console.log(response);

      const { token } = response.data;

      dispatch(signin({ token, username: submitData.username }));

      console.log(token);
      setSuccessMessage("User created successfully");

      // Redirect to login page after 2 seconds
      setTimeout(() => navigate("/todo"), 2000);
    } catch (err) {
      console.log(err.response.data.message);
      setError(`Signup failed. Please try again. ${err.response.data.message}`);
      setLoading(false);
    }
  };
