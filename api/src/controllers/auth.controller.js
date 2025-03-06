const registerController = async (req, res) => {
  res.json({ message: "Register route" });
};

const loginController = async (req, res) => {
  res.json({ message: "Login route" });
};

export { registerController, loginController };
