import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  token: string;
  appUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  token,
  appUrl,
}) => {
  return (
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
        <h2 style={{ color: "#2A5568", textAlign: "left", margin: "0 0 15px" }}>
          Dear {firstName},
        </h2>
        <p style={{ textAlign: "left", color: "#718096", margin: "0 0 15px" }}>
          We trust this email finds you well.
        </p>
        <p
          style={{
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
            margin: "0 0 15px",
          }}
        >
          This serves to notify you that an account has been created for you on RPMFA Member Management Information System (RPMFA MIS).
        </p>
        <p
          style={{
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
            margin: "0 0 15px",
          }}
        >
          The purpose of the system is to improve service delivery to the members of RPMFA through digitalization.
        </p>
        <p
          style={{
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
            margin: "0 0 15px",
          }}
        >
          Please expect to receive further communication from us informing you about the next steps and guide on how to use the platform.
        </p>
        <p
          style={{
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
            margin: "0 0 15px",
          }}
        >
          For any support or clarification, you may contact the following people:
        </p>
        <p style={{ color: "#718096", textAlign: "left", margin: "0 0 10px" }}>
          1. Angelo Igitego, Software Engineer, <b>+250 788 597 772</b>
        </p>
        <p style={{ color: "#718096", textAlign: "left", margin: "0 0 10px" }}>
          2. Henriette Iradukunda, Admin, <b>+250 785 123 731</b>
        </p>
        <p style={{ color: "#718096", textAlign: "left", margin: "0 0 10px" }}>
          3. Christian Ntakirutimana, Executive Secretary, <b>+250 788 515 358</b>
        </p>
        <p
          style={{
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
            margin: "0 0 15px",
          }}
        >
          We wish you a productive day.
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
      </main>
    </div>
  );
};
