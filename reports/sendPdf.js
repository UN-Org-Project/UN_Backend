const PDFDocument = require("pdfkit-table");
const fs = require("fs");
const path = require("path");
// const PDF = require("pdfkit");
const nodemailer = require("nodemailer");
const Student = require("../models/student");
const Parent = require("../models/parent");
const Teacher = require("../models/teacher");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ilovesyria898testnode@gmail.com",
    pass: "pmuojgznqazvmwmp"
  }
});

exports.getPdfDoc = (req, res) => {
  try {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename= report.pdf");

    // var pdfPath = path.join(__dirname + "/pdfs", "report.pdf");
    var imagePath = path.join(__dirname + "/images", "st2.jpg");

    // JUST I WANT ID TEACHER HERE..
    // const teacherId = req.body.id;
    Teacher.findOne({ _id: "64503c4d6a91908b55655014" }).then((dbTeacher) => {
      dbTeacher
        .populate({
          path: "allStudents"
        })
        .then((dbTeacher) => {
          dbTeacher.allStudents.forEach((student, index) => {
            var pdfPath = path.join(__dirname + "/pdfs", `report-${index}.pdf`);
            var stream = fs.createWriteStream(pdfPath);

            fs.writeFileSync(pdfPath, "hello");

            Student.findOne({ _id: student._id }).then((dbStudent) => {
              const parentId = dbStudent.parent_id;
              Parent.findOne({ _id: parentId }).then((dbParent) => {
                const defaultOptions = {
                  margins: { top: 50, left: 100, right: 100, bottom: 10 },
                  size: "A4"
                };
                const mathMarkFirst =
                  dbStudent.typeExam.first.subjects.math.mark;
                const englishMarkFirst =
                  dbStudent.typeExam.first.subjects.english.mark;
                const arbicMarkFirst =
                  dbStudent.typeExam.first.subjects.arbic.mark;
                const historyMarkFirst =
                  dbStudent.typeExam.first.subjects.history.mark;
                const scienceMarkFirst =
                  dbStudent.typeExam.first.subjects.science.mark;

                const mathNoteFirst =
                  dbStudent.typeExam.first.subjects.math.note;
                const englishNoteFirst =
                  dbStudent.typeExam.first.subjects.english.note;
                const arbicNoteFirst =
                  dbStudent.typeExam.first.subjects.arbic.note;
                const historyNoteFirst =
                  dbStudent.typeExam.first.subjects.history.note;
                const scienceNoteFirst =
                  dbStudent.typeExam.first.subjects.science.note;

                const mathStarFirst =
                  dbStudent.typeExam.first.subjects.math.star;
                const englishStarFirst =
                  dbStudent.typeExam.first.subjects.english.star;
                const arbicStarFirst =
                  dbStudent.typeExam.first.subjects.arbic.star;
                const historyStarFirst =
                  dbStudent.typeExam.first.subjects.history.star;
                const scienceStarFirst =
                  dbStudent.typeExam.first.subjects.science.star;

                const mathMarkSecond =
                  dbStudent.typeExam.second.subjects.math.mark;
                const englishMarkSecond =
                  dbStudent.typeExam.second.subjects.english.mark;
                const arbicMarkSecond =
                  dbStudent.typeExam.second.subjects.arbic.mark;
                const historyMarkSecond =
                  dbStudent.typeExam.second.subjects.history.mark;
                const scienceMarkSecond =
                  dbStudent.typeExam.second.subjects.science.mark;

                const mathNoteSecond =
                  dbStudent.typeExam.second.subjects.math.note;
                const englishNoteSecond =
                  dbStudent.typeExam.second.subjects.english.note;
                const arbicNoteSecond =
                  dbStudent.typeExam.second.subjects.arbic.note;
                const historyNoteSecond =
                  dbStudent.typeExam.second.subjects.history.note;
                const scienceNoteSecond =
                  dbStudent.typeExam.second.subjects.science.note;

                const mathStarSecond =
                  dbStudent.typeExam.second.subjects.math.star;
                const englishStarSecond =
                  dbStudent.typeExam.second.subjects.english.star;
                const arbicStarSecond =
                  dbStudent.typeExam.second.subjects.arbic.star;
                const historyStarSecond =
                  dbStudent.typeExam.second.subjects.history.star;
                const scienceStarSecond =
                  dbStudent.typeExam.second.subjects.science.star;

                const mathMarkFinal =
                  dbStudent.typeExam.final.subjects.math.mark;
                const englishMarkFinal =
                  dbStudent.typeExam.final.subjects.english.mark;
                const arbicMarkFinal =
                  dbStudent.typeExam.final.subjects.arbic.mark;
                const historyMarkFinal =
                  dbStudent.typeExam.final.subjects.history.mark;
                const scienceMarkFinal =
                  dbStudent.typeExam.final.subjects.science.mark;

                const mathNoteFinal =
                  dbStudent.typeExam.final.subjects.math.note;
                const englishNoteFinal =
                  dbStudent.typeExam.final.subjects.english.note;
                const arbicNoteFinal =
                  dbStudent.typeExam.final.subjects.arbic.note;
                const historyNoteFinal =
                  dbStudent.typeExam.final.subjects.history.note;
                const scienceNoteFinal =
                  dbStudent.typeExam.final.subjects.science.note;

                const mathStarFinal =
                  dbStudent.typeExam.final.subjects.math.star;
                const englishStarFinal =
                  dbStudent.typeExam.final.subjects.english.star;
                const arbicStarFinal =
                  dbStudent.typeExam.final.subjects.arbic.star;
                const historyStarFinal =
                  dbStudent.typeExam.final.subjects.history.star;
                const scienceStarFinal =
                  dbStudent.typeExam.final.subjects.science.star;

                if (mathMarkFinal >= 0) {
                  var type = "Final";
                  var mathMark = mathMarkFinal;
                  var mathNote = mathNoteFinal;
                  var mathStar = mathStarFinal;

                  var englishMark = englishMarkFinal;
                  var englishNote = englishNoteFinal;
                  var englishStar = englishStarFinal;

                  var arbicMark = arbicMarkFinal;
                  var arbicNote = arbicNoteFinal;
                  var arbicStar = arbicStarFinal;

                  var historyMark = historyMarkFinal;
                  var historyNote = historyNoteFinal;
                  var historyStar = historyStarFinal;

                  var scienceMark = scienceMarkFinal;
                  var scienceNote = scienceNoteFinal;
                  var scienceStar = scienceStarFinal;
                } else if (mathMarkSecond >= 0) {
                  var type = "Second";
                  var mathMark = mathMarkSecond;
                  var mathNote = mathNoteSecond;
                  var mathStar = mathStarSecond;

                  var englishMark = englishMarkSecond;
                  var englishNote = englishNoteSecond;
                  var englishStar = englishStarSecond;

                  var arbicMark = arbicMarkSecond;
                  var arbicNote = arbicNoteSecond;
                  var arbicStar = arbicStarSecond;

                  var historyMark = historyMarkSecond;
                  var historyNote = historyNoteSecond;
                  var historyStar = historyStarSecond;

                  var scienceMark = scienceMarkSecond;
                  var scienceNote = scienceNoteSecond;
                  var scienceStar = scienceStarSecond;
                } else if (mathMarkFirst >= 0) {
                  var type = "First";
                  var mathMark = mathMarkFirst;
                  var mathNote = mathNoteFirst;
                  var mathStar = mathStarFirst;

                  var englishMark = englishMarkFirst;
                  var englishNote = englishNoteFirst;
                  var englishStar = englishStarFirst;

                  var arbicMark = arbicMarkFirst;
                  var arbicNote = arbicNoteFirst;
                  var arbicStar = arbicStarFirst;

                  var historyMark = historyMarkFirst;
                  var historyNote = historyNoteFirst;
                  var historyStar = historyStarFirst;

                  var scienceMark = scienceMarkFirst;
                  var scienceNote = scienceNoteFirst;
                  var scienceStar = scienceStarFirst;
                }
                var mathBehavior,
                  arbicBehavior,
                  englishBehavior,
                  historyBehavior,
                  scienceBehavior = "undefined";

                const pdfDoc = new PDFDocument(defaultOptions);

                pdfDoc
                  .fontSize(20)
                  .font("Helvetica-Bold")
                  .text(`Monthlly Report(${type})`, {
                    fit: [250, 300],
                    align: "center",
                    valign: "center"
                  })
                  .moveDown();
                pdfDoc.moveDown();

                pdfDoc
                  .fontSize(14)
                  .text(`Student name : ${dbStudent.studentName}`);

                pdfDoc.moveDown();

                pdfDoc.image(imagePath, 70, 140, { width: 150, height: 150 });

                pdfDoc.moveDown();
                pdfDoc.moveDown();

                //shoud get his number id dinamically later
                const lastTwoCharId = dbStudent._id.toString().slice(-3);
                pdfDoc
                  .fontSize(14)
                  .font("Helvetica")
                  .text(`ID Number : ${lastTwoCharId}`, {
                    fit: [250, 300],
                    align: "center",
                    valign: "center"
                  });
                pdfDoc.moveDown();

                pdfDoc.fontSize(14).text(`Class : ${dbStudent.class}`, {
                  fit: [250, 300],
                  align: "center",
                  valign: "center"
                });
                pdfDoc.moveDown();

                const teacherName = dbTeacher.name;
                pdfDoc.fontSize(14).text(`Teacher : ${teacherName}`, {
                  fit: [250, 300],
                  align: "center",
                  valign: "center"
                });

                pdfDoc.moveDown();
                pdfDoc.moveDown();
                pdfDoc.moveDown();

                (async () => {
                  mathMark >= 80
                    ? (mathBehavior = "Excelent")
                    : mathMark >= 70 && mathMark < 80
                    ? (mathBehavior = "Very good")
                    : mathMark >= 50 && mathMark < 70
                    ? (mathBehavior = "Bad")
                    : mathMark >= 0 && mathMark < 50
                    ? (mathBehavior = "Fail")
                    : "";

                  englishMark >= 80
                    ? (englishBehavior = "Excelent")
                    : englishMark >= 70 && englishMark < 80
                    ? (englishBehavior = "Very good")
                    : englishMark >= 50 && englishMark < 70
                    ? (englishBehavior = "Bad")
                    : englishMark >= 0 && englishMark < 50
                    ? (englishBehavior = "Fail")
                    : "";

                  arbicMark >= 80
                    ? (arbicBehavior = "Excelent")
                    : arbicMark >= 70 && arbicMark < 80
                    ? (arbicBehavior = "Very good")
                    : arbicMark >= 50 && arbicMark < 70
                    ? (arbicBehavior = "Bad")
                    : arbicMark >= 0 && arbicMark < 50
                    ? (arbicBehavior = "Fail")
                    : "";

                  historyMark >= 80
                    ? (historyBehavior = "Excelent")
                    : historyMark >= 70 && historyMark < 80
                    ? (historyBehavior = "Very good")
                    : historyMark >= 50 && historyMark < 70
                    ? (historyBehavior = "Bad")
                    : historyMark >= 0 && historyMark < 50
                    ? (historyBehavior = "Fail")
                    : "";

                  scienceMark >= 80
                    ? (scienceBehavior = "Excelent")
                    : scienceMark >= 70 && scienceMark < 80
                    ? (scienceBehavior = "Very good")
                    : scienceMark >= 50 && scienceMark < 70
                    ? (scienceBehavior = "Bad")
                    : scienceMark >= 0 && scienceMark < 50
                    ? (scienceBehavior = "Fail")
                    : "";

                  //------------- create table -----------------------

                  const table = {
                    title: "Student Table ",
                    headers: [
                      {
                        label: "Subject",
                        property: "subject",
                        width: 60,
                        renderer: null
                      },
                      {
                        label: "Behavior",
                        property: "behavior",
                        width: 60,
                        renderer: null
                      },
                      {
                        label: "Mark",
                        property: "mark",
                        width: 60,
                        renderer: null
                      },
                      {
                        label: "Note",
                        property: "note",
                        width: 150,
                        renderer: null
                      },
                      {
                        label: "Star",
                        property: "star",
                        width: 60,
                        renderer: null
                      }
                    ],
                    rows: [
                      [
                        "Math",
                        mathBehavior || "undefined",
                        `${mathMark}` || "undefind",
                        mathNote || "undefind",
                        `${mathStar}/5`
                      ],
                      [
                        "English",
                        englishBehavior || "undefined",
                        `${englishMark}` || "undefind",
                        englishNote || "undefind",
                        `${englishStar}/5`
                      ],
                      [
                        "Arbic",
                        arbicBehavior || "undefined",
                        `${arbicMark}` || "undefind",
                        arbicNote || "undefind",
                        `${arbicStar}/5`
                      ],
                      [
                        "History",
                        historyBehavior || "undefined",
                        `${historyMark}` || "undefind",
                        historyNote || "undefind",
                        `${historyStar}/5`
                      ],
                      [
                        "Science",
                        scienceBehavior || "undefined",
                        `${scienceMark}` || "undefind",
                        scienceNote || "undefind",
                        `${scienceStar}/5`
                      ]
                    ]
                  };
                  // the magic
                  pdfDoc.table(table, {
                    prepareHeader: () =>
                      pdfDoc.font("Helvetica-Bold").fontSize(10),
                    prepareRow: (row, indexColumn, indexRow, rectRow) => {
                      pdfDoc.font("Helvetica").fontSize(9);
                      indexColumn === 0 &&
                        pdfDoc.addBackground(rectRow, "green", 0.26);
                    }
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

                transporter.sendMail({
                  to: dbParent.emailAdress,
                  from: "ilovesyria898testnode@gmail.com",
                  subject: "Student Tracking System",
                  html: `It's a monthlly report`,
                  attachments: [
                    {
                      filename: `report-${index}.pdf`,
                      path: pdfPath,
                      contentType: "application/pdf"
                    }
                  ]
                });
              });
            });
          });
          res.json("the report  send");
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("server error occured");
  }
};
