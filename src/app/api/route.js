import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the JSON body
    // console.log("Parsed request body:", body);

    if (req.headers.get("authorization") !== "Q4n2ql2nqnZVlRlqwv") {
      return new Response(JSON.stringify({ status: "Unauthorized" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const transporter = nodemailer.createTransport({
      port: process.env.SMTP_PORT,
      host: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      secure: true,
    });

    const mailData = {
      from: process.env.SMTP_USER,
      to: "jusmanasif435@gmail.com",
      //   bcc: "usmanasifdev@gmail.com",
      replyTo: body.email,
      subject: `New Contact at Usmanasifdev`,
      html: `
        <div><strong>Full Name:</strong> ${body.firstName}</div>
        <br/>
        <div><strong>Last Name:</strong> ${body.lastName}</div>
        <br/>
        <div><strong>Email Address:</strong> ${body.email}</div>
        <br/>
        <div><strong>Company:</strong> ${body.company}</div>
        <br/>
        <div><strong>Phone:</strong> ${body.phone}</div>
        <br/>
        <div><strong>How can we help you?:</strong> ${body.message}</div>
        <br/>
        <div><strong>Expected budget:</strong> ${body.budget}</div>
        <br/>
        <div>This Email was sent from a contact form on https://usmanasifdev.com/ </div>`,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, function (err, info) {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log("Email sent:", info);
          resolve(info);
        }
      });
    });

    return new Response(JSON.stringify({ status: "OK" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Error in processing request:", err);
    return new Response(
      JSON.stringify({ status: "Internal Server Error", error: err.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
