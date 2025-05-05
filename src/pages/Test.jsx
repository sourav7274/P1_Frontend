import axios from "axios";

const Test = () => {
  const handleCheckDashboard = async () => {
    const token = localStorage.getItem("token");
    // console.log(token)
    try {
      const response = await axios.get(
        "https://p1-backend-pqsg.onrender.com/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message); // should show: hello User XYZ
    } catch (err) {
      console.error("Access denied:", err.response?.data || err.message);
      alert("Unauthorized or error occurred.");
    }
  };

  return (
    <div>
      <button onClick={handleCheckDashboard}>Check Dashboard Access</button>
    </div>
  );
};

export default Test;
