//shoud lenk id teacher

const PDFDocument = require("pdfkit-table");
const fs = require("fs");
const path = require("path");
// const PDF = require("pdfkit");
const nodemailer = require("nodemailer");
const Student = require("../models/student");
const Parent = require("../models/parent");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ilovesyria898testnode@gmail.com",
    pass: "pmuojgznqazvmwmp",
  },
});

exports.getPdfDoc = (req, res) => {
  try {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename= report.pdf");

    const pdfPath = path.join(__dirname + "/pdfs", "report.pdf");
    const imagePath = path.join(__dirname + "/images", "st2.jpg");

    const stream = fs.createWriteStream(pdfPath);

    Student.findOne({ _id: "641af0a29bce6b7854a85621" })
      .then((dbStudent) => {
        const defaultOptions = {
          margins: { top: 50, left: 100, right: 100, bottom: 10 },
          size: "A4",
        };

        const pdfDoc = new PDFDocument(defaultOptions);

        // pdfDoc.fontSize(21).text(`Student Tracking System`);
        // pdfDoc.moveDown();
        // pdfDoc.moveDown();

        pdfDoc
          .fontSize(20)
          .font("Helvetica-Bold")
          .text(`Monthlly Report`, {
            fit: [250, 300],
            align: "center",
            valign: "center",
          })
          .moveDown();
        pdfDoc.moveDown();

        pdfDoc.fontSize(14).text(`Student name : ${dbStudent.studentName}`);

        pdfDoc.moveDown();

        pdfDoc.image(imagePath, 70, 140, { width: 150, height: 150 });

        pdfDoc.moveDown();
        pdfDoc.moveDown();

        //shoud get his number id dinamically later
        pdfDoc
          .fontSize(14)
          .font("Helvetica")
          .text(`ID Number : 22`, {
            fit: [250, 300],
            align: "center",
            valign: "center",
          });
        pdfDoc.moveDown();

        pdfDoc.fontSize(14).text(`Class : ${dbStudent.class}`, {
          fit: [250, 300],
          align: "center",
          valign: "center",
        });
        pdfDoc.moveDown();

        //shoud get his teacher dinamically later
        pdfDoc.fontSize(14).text(`Teacher : Ahmad Samhan`, {
          fit: [250, 300],
          align: "center",
          valign: "center",
        });
        pdfDoc.moveDown();
        pdfDoc.moveDown();
        pdfDoc.moveDown();

        //------------- create table -----------------------
        (async () => {
          const mathMark = dbStudent.typeExam.first.subjects.math.mark;
          const englishMark = dbStudent.typeExam.first.subjects.english.mark;
          const arbicMark = dbStudent.typeExam.first.subjects.arbic.mark;
          const historyMark = dbStudent.typeExam.first.subjects.history.mark;
          const scienceMark = dbStudent.typeExam.first.subjects.science.mark;

          const mathNote = dbStudent.typeExam.first.subjects.math.note;
          const englishNote = dbStudent.typeExam.first.subjects.english.note;
          const arbicNote = dbStudent.typeExam.first.subjects.arbic.note;
          const historyNote = dbStudent.typeExam.first.subjects.history.note;
          const scienceNote = dbStudent.typeExam.first.subjects.science.note;

          const mathStar = dbStudent.typeExam.first.subjects.math.star;
          const englishStar = dbStudent.typeExam.first.subjects.english.star;
          const arbicStar = dbStudent.typeExam.first.subjects.arbic.star;
          const historyStar = dbStudent.typeExam.first.subjects.history.star;
          const scienceStar = dbStudent.typeExam.first.subjects.science.star;


          



          const table = {
            title: "Student Table ",
            headers: [
              {
                label: "Subject",
                property: "subject",
                width: 60,
                renderer: null,
              },
              {
                label: "Behavior",
                property: "behavior",
                width: 60,
                renderer: null,
              },
              { label: "Mark", property: "mark", width: 60, renderer: null },
              { label: "Note", property: "note", width: 150, renderer: null },
              { label: "Star", property: "star", width: 60, renderer: null },
            ],

            rows: [
              ["Math", "Excellent", mathMark, mathNote, `${mathStar}/5`],
              [
                "English",
                "Very Good",
                englishMark,
                englishNote,
                `${englishStar}/5`,
              ],
              ["Arbic", "Good", arbicMark, arbicNote, `${arbicStar}/5`],
              ["History", "Bad", historyMark, historyNote, `${historyStar}/5`],
              [
                "Science",
                "Very Good",
                scienceMark,
                scienceNote,
                `${scienceStar}/5`,
              ],
            ],
          };
          // the magic
          pdfDoc.table(table, {
            prepareHeader: () => pdfDoc.font("Helvetica-Bold").fontSize(10),
            prepareRow: (row, indexColumn, indexRow, rectRow) => {
              pdfDoc.font("Helvetica").fontSize(9);
              indexColumn === 0 && pdfDoc.addBackground(rectRow, "green", 0.26);
            },
          });
        })();

        pdfDoc.moveDown();
        pdfDoc
          .fontSize(14)
          .text(`All absence days : ${dbStudent.absence.length}`);
        pdfDoc.moveDown();
        pdfDoc
          .fontSize(14)
          .text(`Student Level : ${dbStudent.studentLevelRate}%`);

        pdfDoc.pipe(stream);
        pdfDoc.end();
      })
      .catch((err) => {
        console.log(err);
      });

    stream.on("finish", () => {
      res.sendFile(pdfPath);

      // Send to the parent Email
      Student.findById({ _id: "641af0a29bce6b7854a85621" })
        .then((dbStudent) => {
          const parentId = dbStudent.parent_id[0];
          Parent.findById({ parentId })
            .then((dbParent) => {
              transporter.sendMail({
                to: dbParent.emailAdress,
                from: "ilovesyria898testnode@gmail.com",
                subject: "Student Tracking System",
                html: `It's a monthlly report`,
                attachments: [
                  {
                    filename: "Report.pdf",
                    path: pdfPath,
                    contentType: "application/pdf",
                  },
                ],
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });

    stream.on("error", (err) => {
      console.error(err);
      res.status(500).send("Failed to send pdf.");
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("server error occured");
  }
};
