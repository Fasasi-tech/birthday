const Birthday= require('../models/birthDay')
const {createSendResponse} = require('../middleware/resMiddleware')
const {sendEmail} = require('../utils/email')
const {plainEmailTemplate} = require('../utils/mail')
const cron = require('node-cron');

const birthday= async(req, res)=>{
    try{

        
        const {dob, email, username } = req.body;
        const existingmail= await Birthday.findOne({email})
        const existinguser= await Birthday.findOne({username})

        if (existingmail || existinguser){
            return res.status(400).json({
                message:'E-mail or username already exists'
            })
        }

        const mail={dob, email, username}

        const result= await Birthday.create(mail)

           const sent_to = result.email;
                const sent_from = process.env.EMAIL_OWNER;
                const reply_to = result.email;
                const subject = "🎉 Welcome to the Birthday Reminder!";
                const message = plainEmailTemplate(
                    "You are now registered",
                     `Dear ${result.username}, We are glad to have you in our birthday reminder.`
        
                );
        
                 try {
                await sendEmail(subject, message, sent_to, sent_from, reply_to);
              } catch (err) {
                console.error("Failed to send email:", err);
              }
        

         res.status(201).json({
      success: true,
      message: 'Birthday registered successfully!',
      data: result,
    });

    }catch(error){
        return res.status(500).json({
        message:'internal server error',
        error:error.message
    })}
}

// 0 7 * * *
cron.schedule('0 7 * * *', async () => {
  console.log("🎂 Birthday cron job started at 7AM...");

  const today = new Date();
  const month = today.getMonth() + 1; // months are 0-indexed
  const day = today.getDate();

  try {
    const users = await Birthday.find();

    for (const user of users) {
      const dob = new Date(user.dob);
      if (dob.getDate() === day && dob.getMonth() + 1 === month) {
        const subject = "🎉 Happy Birthday!";
        const message = plainEmailTemplate(
          "Happy Birthday!",
          `Dear ${user.username}, we wish you a wonderful year filled with happiness, success, and love!`
        );

        try {
          await sendEmail(subject, message, user.email, process.env.EMAIL_OWNER, user.email);
          console.log(`✅ Birthday email sent to ${user.email}`);
        } catch (err) {
          console.error(`❌ Failed to send birthday email to ${user.email}:`, err);
        }
      }
    }

    console.log("🎂 Birthday check completed.");
  } catch (err) {
    console.error("Error running birthday cron job:", err);
  }
});
module.exports = {birthday}