import * as React from "react";

interface EmailFacilityCreationTemplateProps {
  firstName: string;
  email: string;
}

export const EmailFacilityCreationTemplate: React.FC<
  Readonly<EmailFacilityCreationTemplateProps>
> = ({ firstName, email }) => {
  return (
    <div style={{ width: "75%" }}>
      <main
        style={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginRight: "20px",
          marginLeft: "5px",
        }}
      >
        <h2 style={{ color: "#2A5568", textAlign: "left" }}>
          Dear {firstName},
        </h2>
        <p style={{ textAlign: "left", color: "#718096" }}>
          We trust this email finds you well.
        </p>
        <p
          style={{
            marginTop: "2px",
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
          }}
        >
          This serves to notify you that an account has been created for you on
          RPMFA Member Management System (RPMFA MIS).
        </p>
        <p
          style={{
            marginTop: "2px",
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
          }}
        >
          The purpose of the system is to improve service delivery to the
          members of RPMFA through digitization.
        </p>
        <p
          style={{
            marginTop: "2px",
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
          }}
        >
          Below are your credentials:
        </p>
        <p style={{ marginTop: "2px", color: "#718096", textAlign: "left" }}>
          Email, <b>{email}</b>
        </p>
        <p style={{ marginTop: "1px", color: "#718096", textAlign: "left" }}>
          for password click <b>Login button</b> on login screen{" "}
          <b>click forgot password link</b> then follow the instructions and
          create your own new password.
        </p>
        <p
          style={{
            marginTop: "2px",
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
          }}
        >
          Please expect to receive further communication from us informing you
          about the next steps and guide on how to use the platform.
        </p>
        <p
          style={{
            marginTop: "2px",
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
          }}
        >
          For any support or clarification, you may contact the following
          people:
        </p>
        <p style={{ marginTop: "2px", color: "#718096", textAlign: "left" }}>
          1. Angelo Igitego, Software Engineer, <b>+250 788 597 772</b>
        </p>
        <p style={{ marginTop: "2px", color: "#718096", textAlign: "left" }}>
          2. Henriette Iradukunda, Admin, <b>+250 785 123 731</b>
        </p>
        <p style={{ marginTop: "2px", color: "#718096", textAlign: "left" }}>
          3. Christian Ntakirutimana, Executive Secretary,{" "}
          <b>+250 788 515 358</b>
        </p>
        <p
          style={{
            marginTop: "2px",
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
          }}
        >
          We wish you a productive day.
        </p>
        <p
          style={{
            marginTop: "2px",
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
          }}
        >
          Best regards,
        </p>
        <p
          style={{
            marginTop: "2px",
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
          }}
        >
          RPMFA Secretariat.
        </p>
      </main>
    </div>
  );
};
