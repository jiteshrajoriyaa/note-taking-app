import nodemailer from 'nodemailer'

export const sendEmail = async (to: string, subject: string, text: string) =>{
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })

    const mailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject,
        text
    }

    try{
        await transporter.sendMail(mailOptions)
        console.log(`Email sent to ${to}`)

    }catch(e){
        console.error('Error sending mail', e)
        throw new Error('Could not send email')
    }
}