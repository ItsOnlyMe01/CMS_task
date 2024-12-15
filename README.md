# CMS_task
LIVE SERVER LINK (render)   https://cms-task.onrender.com

1.open link
2.click on role user or admin then sinup accordingly if already have a account then login.
3.as a user a form will appear for complaint raising.
4.now after submiting the comaplaint re signup(new user) as an admin then u will see all the issues raised by users.
5.email functionality is working complelety fine for submiting compalin (to admin) and status cahnging(to respective user ).

WAITING FOR POSTIVE RESPONSE!

Working Structure>
frontend: signinchoice(to select role admin or member)>login page(authntication)>complainForm(for user)>OR>compalinTable (for admin).
Backend>index.js>routes>controllers.


Used NodeMailer for implementation
Start command >npm start(from root directory).
add .env like this 
PORT=5000
MONGODB_URI=<URL OF MONGODB>
USER_EMAIL=<EMAIL OF TRANSPORTER>
EMAIL_PASS=<APP PASS OF TRANSPORTER>
JWT_SECRET=<ANYSECRETCODE>
NODE_ENV=production








