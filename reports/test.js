const nodemailer = require('nodemailer');
const fs = require('fs');
const PDFDocument = require('pdfkit');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ilovesyria898testnode@gmail.com', // Enter your email address
    pass: 'pmuojgznqazvmwmp', // Enter your email password
  },
});

// Function to send an email with a PDF attachment
function sendEmailWithAttachment(content, subject, recipientEmail) {
  // Create a new PDF document
  const doc = new PDFDocument();

  // Add content to the document
  doc.text(content);

  // End the document to ensure all data is written to the file
  doc.end();

  // Read the PDF file
  const data = fs.readFileSync(path.join(__dirname + "/pdfs", "report.pdf"));

  // Create an attachment for the email
  const attachment = {
    filename: 'report.pdf',
    content: data,
  };

  // Send the email
  const mailOptions = {
    from: 'ilovesyria898testnode@gmail.com',
    to:recipientEmail,
    subject: subject,
    attachments: [attachment],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// Call the function with the updated content
sendEmailWithAttachment('Hello, World!', 'Email Subject', 'yaseenzzzzz898@gmail.com');