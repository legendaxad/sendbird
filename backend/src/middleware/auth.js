export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const user = await userModel.findOne({ token }); // Check if token is in DB

    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
