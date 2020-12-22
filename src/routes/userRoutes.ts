import AuthService from "../services/auth";
const express = require("express");
// import items from "./itemsRoutes";

const router = express.Router();

// export default (app: any) => {
router.post("/user/login", async (req: any, res: any) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log("USer-->.", email, password);
    try {
        const authServiceInstance = new AuthService();
        const { user, token } = await authServiceInstance.login(email, password);
        return res.status(200).json({ user, token }).end();
    } catch (e) {
        return res.json(e).status(500).end();
    }
});
// };

router.post("/user/signup", async (req: any, res: any) => {
    try {
        const { name, email, password } = req.body;
        const authServiceInstance = new AuthService();
        const { user, token } = await authServiceInstance.SignUp(email, password, name);
        return res.json({ user, token }).status(200).end();
    } catch (e) {
        return res.json(e).status(500).end();
    }
});

module.exports = router;
