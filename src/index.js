import cron from "node-cron";
import axios from "axios";
import nodemailer from 'nodemailer';

const NASA_API_URL = 'https://api.nasa.gov';
const NASA_API_KEY = 'sgFcdFawA4b2MCRh7lRoR8as88onBecxVGapmEOZ';

const http = axios.create({
    baseURL: `${NASA_API_URL}`,
    headers: { 'Content-Type': 'application/json' }
});

const dateOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

console.log('Starting CRON schedule');

/*
 Your changes go inside the code below. You can't test your
 changes but you can test that you didn't break anything else.

 To do that, comment out the schedule code (line 26 and 39), and then run the app.
 Also change the receiving email to your email so that I don't get an email every time you test.
 See https://www.npmjs.com/package/node-cron for information about the Cron scheduling libraryh
*/

cron.schedule('0 0 9 * * *', () => {
    http.get(`/planetary/apod?api_key=${NASA_API_KEY}`)
    .then(response => {
        console.log(response.data);
        const { date, title, explanation, url } = response.data;
        console.log('============= DATA ============');
        console.log(date);
        console.log(title);
        console.log(explanation);
        const sms = `Here is the NASA image for ${formateDate(date)}\n\n ${url} \n\n Title: ${title} \n\nContext: ${explanation} \n\n`;
        console.log(sms);
        sendEmail(sms);
    });
})

const formateDate = (date) => {
    const values = date.split('-');
    return new Date(values[0], values[1] - 1, values[2]).toLocaleDateString('en-us', dateOptions);
};

const sendEmail = async (message) =>  {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: '',
      pass: ''
    }
  });
  const response = await transporter.sendMail({
    from: '"👻" <>',
    to: "",
    subject: 'NASA Image',
    text: message
  });
  console.log(`Message sent at ${new Date().toLocaleDateString()}: %s`, response);
}
