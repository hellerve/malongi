var config        = require('../config')
  , express       = require('express')
  , nodemailer    = require('nodemailer')
  , smtpTransport = require('nodemailer-smtp-transport')

  , router        = express.Router()
  ;

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/malongi/index');
});

/* GET home page. */
router.get('', function(req, res) {
  res.redirect('/malongi/index');
});

/* GET home page. */
router.get('/index', function(req, res) {
  res.render('index');
});

/* GET imprint. */
router.get('/imprint', function(req, res) {
  res.render('imprint');
});

// the mail transporter
var transporter = nodemailer.createTransport(smtpTransport({
  host: 'smtp.webfaction.com', // hostname 
  port: 465, // port for secure SMTP 
  secure: true,
  auth: {
    user: config.email_user,
    pass: config.email_pass
  }
}));

// mailer
router.get('contact', function(req, res) {
  transporter.sendMail({
    subject: "news from your contact form!",
    to: config.email_to,
    from: "mail@malongi.com",
    text: "You received a message from: " + req.query.subject + " <" + req.query.from + ">\n\n" + req.query.text
  }, function(err) {
    console.log(err);
  });
  res.redirect("index");
});

module.exports = router;
