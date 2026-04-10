
import { response } from "express";
import nodemailer,{Transporter} from "nodemailer";

export class MailService{
    private transporter:Transporter;

    constructor(){
        this.transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port:Number(process.env.MAIL_PORT),
            secure:false,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        });
    }

    public async sendMail(to:string,subject:string,text:any){
        const info=await this.transporter.sendMail({
            from:`"E-COMMERCE "<${process.env.MAIL_USER}>`,
            to,
            subject,
            text
        })

        console.log("Message Id:",info.messageId);

        console.log("Preview Url:",nodemailer.getTestMessageUrl(info));
        return `{previewurl:${nodemailer.getTestMessageUrl(info)}`;
    }
}



export const mailService=new MailService();;
