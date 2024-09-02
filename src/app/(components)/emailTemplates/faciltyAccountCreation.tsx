import * as React from "react";

interface EmailFacilityCreationTemplateProps {
  firstName: string;
  email: string;
  appUrl: string;
  facilityName: string;
  facId: string;
}

export const EmailFacilityCreationTemplate: React.FC<
  Readonly<EmailFacilityCreationTemplateProps>
> = ({ firstName, email, appUrl, facilityName, facId }) => {
  return (
    <div style={{ width: "95%", maxWidth: "450px", margin: "auto" }}>
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
        <h2 style={{ color: "#2A5568", textAlign: "left" }}>
          Dear {firstName},
        </h2>
        <p
          style={{
            marginTop: "1px",
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
          }}
        >
          This serves to notify you that an account has been created for your
          facility <b>{facilityName}</b> on RPMFA MIS.Your username is:{" "}
          <b>{email}</b>
        </p>
        <p
          style={{
            marginTop: "1px",
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
          }}
        >
          These are the next steps:
        </p>
        <div>
          <p style={{ color: "#718096", textAlign: "left" }}>
            1. Log into the system by clicking{" "}
            <a
              href={`rpmfa.org/auth/login`}
              style={{ textDecoration: "none", color: "blue" }}
            >
              here
            </a>
          </p>
          <p style={{ color: "#718096", textAlign: "left" }}>
            2. Update your password by clicking{" "}
            <a
              href={`rpmfa.org/auth/forgot_password`}
              style={{ textDecoration: "none", color: "blue" }}
            >
              here
            </a>
          </p>
          <p style={{ color: "#718096", textAlign: "left" }}>
            2. Update {"facility’s"} information by clicking{" "}
            <a
              href={`rpmfa.org/member/dashboard/applications/${facId}/edit/${facId}`}
              style={{ textDecoration: "none", color: "blue" }}
            >
              here
            </a>
          </p>
        </div>
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
        <p style={{ color: "#718096", textAlign: "left" }}>
          1. Angelo Igitego, Software Engineer, <b>+250 788 597 772</b>
        </p>
        <p style={{ color: "#718096", textAlign: "left" }}>
          2. Henriette Iradukunda, Admin, <b>+250 785 123 731</b>
        </p>
        <p style={{ color: "#718096", textAlign: "left" }}>
          3. Christian Ntakirutimana, Executive Secretary,{" "}
          <b>+250 788 515 358</b>
        </p>
        <p
          style={{
            marginTop: "1px",
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
          }}
        >
          We wish you a productive day.
        </p>
        <p
          style={{
            marginTop: "1px",
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
          }}
        >
          Best regards,
        </p>
        <p
          style={{
            marginTop: "1px",
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
