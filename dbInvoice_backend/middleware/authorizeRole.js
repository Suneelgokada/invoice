// middleware/authorizeRole.js
module.exports = function authorizeRole(requiredRole) {
  return (req, res, next) => {
    // Token verification should already have attached decoded user to req.account
    if (!req.account) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    if (req.account.role !== requiredRole) {
      return res.status(403).json({ success: false, error: "Forbidden: Insufficient role" });
    }

    next();
  };
};
