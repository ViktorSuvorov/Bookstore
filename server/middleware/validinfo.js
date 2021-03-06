module.exports = (req, res, next) => {
    const { email, name, password } = req.body;
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
    if (req.path === "/register") {
      if (![email, name, password].every(Boolean)) {
        res.status(401)
        throw new Error("Missing Credentials");
      } else if (!validEmail(email)) {
        res.status(401)
        throw new Error("Invalid Email");
      }
    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        res.status(401)
        throw new Error("Missing Credentials");
      } else if (!validEmail(email)) {
        res.status(401)
        throw new Error("Invalid Email");
      }
    }
    next();
  };