const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: 'Af5CSu2s-3QLCGq5arWonXrIqCc2fAf8Mg3lVsQU6fDAXwdA8m5x-pt4NtOXPOjn0Xx5HIfWXgnSy2ch',
  client_secret: "EFtLInSRP9cpx6BaOiyEpH6P_1rv5003202aw8QxsZH2FUu2jerZKqk34gijusyB7FDvCyIU925UMD-W",
});

 module.exports = paypal;
