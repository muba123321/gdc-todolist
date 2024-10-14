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
  (formData, setLoading, setError, setSuccessMessage, navigate) =>
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

      await api.post("/auth/signup", submitData);
      setSuccessMessage("User created successfully");

      // Redirect to login page after 2 seconds
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError("Signup failed. Please try again.");
      setLoading(false);
    }
  };
