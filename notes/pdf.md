//const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const PDF = require("pdfkit");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ilovesyria898testnode@gmail.com",
    pass: "pmuojgznqazvmwmp",
  },
});

exports.getPdfDoc = (req, res) => {
    try {
      const pdfDoc = new PDF({ size: "A4" });
  
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline; filename= report.pdf");
  
      const pdfPath = path.join(__dirname +'/reports','report.pdf');
      const stream = fs.createWriteStream(pdfPath);
      //pdfDoc.pipe(res);//
      pdfDoc.text("hi yassin alfarwan");
  
      stream.on("finish", () => {
        res.sendFile(pdfPath);
  
        transporter.sendMail({
          to: "yaseenzzzzz898@gmail.com",
          from: "ilovesyria898testnode@gmail.com",
          subject: "Student Tracking System",
          html: ` hi`,
          attachments: [{
            filename:'./report.pdf',
            path: pdfPath,
            contentType: 'application/pdf'
          }]
        });
      });
  
      stream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Failed to send pdf.");
      });
  
      pdfDoc.pipe(stream);
  
      pdfDoc.end();
    } catch (error) {
      console.log(error);
      res.status(500).send("server error occured");
    }
  };
  