import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/user";
import { IOrder } from "../models/order";
const mailjet = require('node-mailjet').Client.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
);

interface CheckoutRequest extends Request {
    user?: IUser;
    order?: IOrder;
}

const emailService = async(req: CheckoutRequest, res: Response, next: NextFunction) => {
    try{
        const email = req.user?.email;
        const order = req.order;

        console.log(email, order);
        const request = await mailjet.post('send').request({
            FromEmail: process.env.SIB_SENDER_EMAIL,
            FromName: process.env.SIB_SENDER_NAME,
            Subject: 'Checkout bill: MERN EComm',
            'Text-part':
                'Dear User, welcome to MERN Ecomm!',
            'Html-part': `
                <h1>MERN Ecomm - Checkout Bill</h1><br>
                <br>
                <h3>Dear ${email},</h3><br>
                <br>
                <p>Please find you final reciept below </p>
                <br>
                <p> ${order} </p><br>
                <br><br>
                <h5>Thank You<h5><br>
            `,
            Recipients: [{ Email: email }],
        });  
        console.log(request)
        if(request)   
            return res.status(201).json({message: `We have sent the final bill to ${email}. Please check your spam if not found.`}); 
        res.status(400).json({error: "Failed to send checkout email"});
    }
    catch(err){
        console.log('Error-forgetPassword: ',err);
        res.status(500).json({error: 'Internal server error while sending sending email'});
    }

};

export default emailService;