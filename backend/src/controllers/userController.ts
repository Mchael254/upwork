import { Express, Request, Response } from "express";
import { sqlConfig } from "../config/sqlConfig";
import { v4 } from "uuid";
import mssql from "mssql";
import bcrypt from 'bcrypt';
import { userRegisterValidationSchema } from "../validators/userValidators";


//register user
export const registerUser = async (req: Request, res: Response) => {
    try {
        let { userName, email, password } = req.body;
        const { error } = userRegisterValidationSchema.validate(req.body);
        if (error) {
            return res.json({ message: error.details[0].message })
        }

        let userID = v4();
        const hashedPwd = await bcrypt.hash(password, 5);

        const pool = await mssql.connect(sqlConfig);

        const checkEmailQuery = `SELECT 1 FROM Users WHERE email = @email`;
        const emailCheckResult = await pool.request()
            .input("email", mssql.VarChar, email)
            .query(checkEmailQuery);

        const checkUserNameQuery = `SELECT 1 FROM Users WHERE userName = @userName`;
        const userNameCheckResult = await pool.request()
            .input("userName", mssql.VarChar, userName)
            .query(checkUserNameQuery);

        if (emailCheckResult.recordset.length > 0 && userNameCheckResult.recordset.length > 0) {
            return res.status(400).json({ error: 'Email and userName already exist.' });
        } else if (emailCheckResult.recordset.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        } else if (userNameCheckResult.recordset.length > 0) {
            return res.status(400).json({ error: 'UserName already exists' });
        }

        const data = await pool.request()
            .input("userID", mssql.VarChar, userID)
            .input("userName", mssql.VarChar, userName)
            .input("email", mssql.VarChar, email)
            .input("password", mssql.VarChar, hashedPwd)
            .execute("registerUser");

        return res.status(200).json({
            message: 'User registered successfully.',
            email: 'welcome user email sent to new user'
        });
    } catch (error) {
        return res.json({
            error: error instanceof Error ? error.message : JSON.stringify(error)
        })

    }
}