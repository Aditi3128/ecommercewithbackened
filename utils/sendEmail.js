// import nodemailer from "nodemailer";

// export const sendEmail = async (to, subject, text) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: `"FASCO" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     text,
//   });
// };
// import nodemailer from "nodemailer";

// const sendEmail = async ({ to, subject, html }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//       tls: {
//         rejectUnauthorized: false, // 🔥 FIX
//       },
//     });

//     await transporter.sendMail({
//       from: `"Fasco Support" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     });

//     console.log("✅ OTP email sent");
//   } catch (error) {
//     console.error("❌ Email sending failed:", error.message);
//     throw new Error("Email sending failed");
//   }
// };

// export default sendEmail;
import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // 🔥 DEV FIX
    },
  });

  await transporter.sendMail({
    from: `"Fasco Support" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

export default sendEmail;
