import * as React from "react";
interface EmailTemplateProps {
  firstName: string;
  subject: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div style={{ width: "95%", maxWidth: "600px", margin: "auto" }}>
    <main
      style={{
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h4>
        <b style={{ textAlign: "left",color: "#2A5568" }}>Your application has been approved!</b>
      </h4>
      <h5 style={{ color: "#2A5568", textAlign: "left", margin: "0 0 15px" }}>
        Dear {firstName},
      </h5>
      <p
        style={{
          lineHeight: "1.75",
          color: "#718096",
          textAlign: "left",
          margin: "0 0 15px",
        }}
      >
        We are delighted to inform you that your digital application to become a
        Rwanda Private Medical Facilities Association (RPMFA) has been approved!
      </p>
      <p
        style={{
          lineHeight: "1.75",
          color: "#718096",
          textAlign: "left",
          margin: "0 0 15px",
        }}
      >
        Your commitment to excellence and your contributions to Rwanda Private
        Medical Facilities Association are truly commendable.
      </p>
      <p
        style={{
          lineHeight: "1.75",
          color: "#718096",
          textAlign: "left",
          margin: "0 0 15px",
        }}
      >
        As an RPMFA member, you now join an elite group of professionals who are
        recognized for their expertise, leadership, and dedication to advancing
        the medical profession in Rwanda.
      </p>
      <p
        style={{
          lineHeight: "1.75",
          color: "#718096",
          textAlign: "left",
          margin: "0 0 15px",
        }}
      >
        Thank you and best regards,
      </p>
      <p
        style={{
          lineHeight: "1.75",
          color: "#718096",
          textAlign: "left",
          margin: "0 0 15px",
        }}
      >
        RPMFA Secretariat.
      </p>
      <p
        style={{
          lineHeight: "1.75",
          color: "#718096",
          textAlign: "left",
          margin: "0 0 15px",
        }}
      >
        For any support or more information, contact: +250-785-143-731
      </p>
    </main>
  </div>
);
