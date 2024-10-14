import { signin } from "../../../redux/User/authSlice";
import api from "../../../utils/axios";

export const handleFormChange = (formData, setFormData, setError) => (e) => {
  setFormData({
    ...formData,
    [e.target.id]: e.target.value,
  });
  setError("");
};

export const handleFormSubmit =
  (formData, dispatch, navigate, setError) => async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/signin", formData);
      const { token } = response.data;
      dispatch(signin({ token, username: formData.username }));
      navigate("/todo");
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };
