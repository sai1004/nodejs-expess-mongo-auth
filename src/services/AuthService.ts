import * as argon2 from "argon2";
import { randomBytes } from "crypto";
const bcrypt = require("bcryptjs");

import UserModel from "../models/user";

import * as jwt from "jsonwebtoken";

export default class AuthService {
    constructor() {}

    public async login(email: any, password: any): Promise<any> {
        console.log("email::>>", email);

        try {
            const userRecord = await UserModel.findOne({ email: email });
            if (!userRecord) {
                console.log("User not found!! ");
                throw new Error("User not found");
            }

            if (userRecord) {
                bcrypt.compare(password, userRecord.password, (err: any, isMatch: any) => {
                    if (err) {
                        throw err;
                    } else if (!isMatch) {
                        console.log("Password Doesn't Match");
                    } else {
                        console.log("Password Matched!! ");
                    }
                });
            }

            return {
                user: {
                    email: userRecord.email,
                    name: userRecord.name,
                },
                token: this.generateJWT(userRecord),
            };
        } catch (error) {
            console.log(error);
        }
    }

    public async SignUp(email: any, password: any, name: any): Promise<any> {
        let userRecord;

        const checkUser = await UserModel.findOne({ email: email });
        if (checkUser) {
            console.log("User Already Exist!! ");
            throw new Error("User Already Exist");
        } else {
            try {
                bcrypt.hash(password, 10, async function (err: any, hash: any) {
                    userRecord = await UserModel.create({
                        password: hash,
                        email,
                        salt: "hex",
                        name,
                    });
                });

                const token = this.generateJWT(userRecord);
                return {
                    user: {
                        email: "jhjk",
                        name: "hg",
                    },
                    token,
                };
            } catch (error) {
                console.log(error);
            }
        }
    }

    private generateJWT(user: any) {
        return jwt.sign(
            {
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
            "MySuP3R_z3kr3t.",
            { expiresIn: "6h" }
        ); // @TODO move this to an env var
    }

    private validateUser(UserModel: any) {}
}
