"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailjet = require('node-mailjet').Client.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
const emailService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
        const order = req.order;
        console.log(email, order);
        const request = yield mailjet.post('send').request({
            FromEmail: process.env.SIB_SENDER_EMAIL,
            FromName: process.env.SIB_SENDER_NAME,
            Subject: 'Checkout bill: MERN EComm',
            'Text-part': 'Dear User, welcome to MERN Ecomm!',
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
        console.log(request);
        if (request)
            return res.status(201).json({ message: `We have sent the final bill to ${email}. Please check your spam if not found.` });
        res.status(400).json({ error: "Failed to send checkout email" });
    }
    catch (err) {
        console.log('Error-forgetPassword: ', err);
        res.status(500).json({ error: 'Internal server error while sending sending email' });
    }
});
exports.default = emailService;
