import * as React from "react";
import { SlEnvolope } from "react-icons/sl";

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
    <div style={{ width: "50%" }}>
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
        {/* <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: "35%",
          }}
        >
          <a
            href={`${appUrl}/confirm/${token}`}
            style={{ textDecoration: "none", textAlign: "center" }}
          >
            <button
              style={{
                paddingLeft: "22px",
                paddingRight: "22px",
                paddingTop: "8px",
                paddingBottom: "8px",
                marginTop: "22px",
                fontSize: "0.875rem",
                fontWeight: "700",
                textTransform: "capitalize",
                backgroundColor: "#3182CE",
                color: "white",
                borderRadius: "0.375rem",
                transition: "background-color 0.3s ease",
                cursor: "pointer",
                border: "none",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#2C5282")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#3182CE")
              }
            >
              Confirm your email
            </button>
          </a>
        </div> */}
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
