import Image from "next/image";
import React from 'react';
import ResearchImage from "../icons/icons-research.png";
import PermissionImage from "../icons/icons-permission.png";
import HealthCare from "../icons/icons-healthcare.png";
import MedRecordImage from "../icons/icons-medical-record.png";
import UserProfileImage from "../icons/icons-user-profile.png";
import ButtonWithImage from '../../../public/components/ButtonWithImage';

export default function Home() {
    return (
        <main>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", marginLeft: "20px", marginTop: "20px" }}>
              <Image src={HealthCare} className="icon" alt="healthcare" />
            </div>
            <div style={{ display: "flex", alignItems: "center", marginRight: "30px", marginTop: "15px" }}>
              <Image
                src={UserProfileImage}
                className="icon"
                alt="user-profile"
                style={{ height: "90px", width: "90px" }}
              />
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "40px", marginBottom: "100px" }}>
            <div className="BEHS" style={{ fontSize: "65px" }}>
              <strong>WELCOME, [XXX]</strong>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ marginRight: '20px' }}>
            <ButtonWithImage text="Research Opportunities" imageSrc={ResearchImage} onClick={""} />
            </div>
            <div style={{ marginRight: '20px' }}>
            <ButtonWithImage text="Permissions" imageSrc={PermissionImage} onClick={""} />
            </div>
            <div>
            <ButtonWithImage text="Medical Records" imageSrc={MedRecordImage} onClick={""} />
            </div>
        </div>
        </main>
      );
    }