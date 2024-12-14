import User from "../models/User.js";

export const userView = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const currentUserId = req.user?.id;
    const isCurrentUser =
      currentUserId && currentUserId.toString() === user._id.toString();

    if (isCurrentUser) {
      req.profileData = {
        name: user.name,
        username: user.username,
        patients: user.patients,
      };
      res.status(200).json(req.profileData);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
