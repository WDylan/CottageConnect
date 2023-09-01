import axios from "axios";

export const checkAuth = (setAuth, setAdmin) => {
    axios.defaults.withCredentials = true;

    axios
    .get("http://localhost:3001/users/")
    .then((res) => {
      if (res.data.Status === "Success") {
        setAuth(true);
      } else {
        setAuth(false);
      }
      if (setAdmin && res.data.role === 1) {
        setAdmin(true);
      } else if (setAdmin) {
        setAdmin(false);
      }
    })
    .catch((err) => console.log("Erreur !", err));
    
}