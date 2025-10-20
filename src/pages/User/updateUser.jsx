import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import Kontaktperson from "../../components/Kontaktperson";
import Personliche from "../../components/Personliche";
import Pflegekasse from "../../components/Pflegekasse";
import Profilbar from "../../components/Profilbar";
import Versicherungsdaten from "../../components/Versicherungsdaten";

const Updateuser = () => {
  const data = JSON.parse(localStorage.getItem("user"));
  const [isActive, setisActive] = useState("personliche");

  return (
    <>
      <div className="mx-auto max-w-290">
        <Breadcrumb pageName={`${data?.full_name} Profil`} />
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-5 xl:col-span-4">
            <Profilbar isActive={isActive} setisActive={setisActive} />
          </div>
          <div className="md:col-span-3 lg:col-span-6 xl:col-span-8">
            {isActive === "personliche" && (
              <Personliche setisActive={setisActive} />
            )}
            {isActive === "versicherungsdaten" && (
              <Versicherungsdaten setisActive={setisActive} />
            )}
            {isActive === "pflegekasse" && (
              <Pflegekasse setisActive={setisActive} />
            )}
            {isActive === "kontaktperson" && <Kontaktperson />}
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default Updateuser;
