/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import logo from "../../images/logo/logo.png";
import { Link } from "react-router-dom";
const ForgotPass = () => {
  const [loader] = useState(false);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-screen">
        <Link to={"/"}>
          <img src={logo} className="mt-1" alt="" />
        </Link>
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full border-stroke dark:border-strokedark xl:w-2/5">
            <div className="w-full ">
              <form className="shadow-2xl p-7 rounded-2xl bg-white">
                <div className="text-4xl text-center font-bold text-black dark:text-white  ">
                  Passwort vergessen?
                </div>
                <div className="mt-10 text-[16px] text-black relative mb-4">
                  Keine Sorge, wir können Ihnen helfen! Wenn Sie sich noch an
                  Ihre E-Mail-Adresse erinnern, können Sie Ihr Passwort schnell
                  zurücksetzen.
                  <div className="w-full absolute bottom-0  border-b-[1px] border-dashed border-b-bodydark2" />
                </div>
                <div className="mt-10 mb-6">
                  <div className="relative">
                    <input
                      type={"email"}
                      placeholder="Deine E-Mail"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      name="email"
                    />
                  </div>
                </div>
                <div className="mb-1">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg bg-[#2F93F6] p-4 text-white transition hover:bg-opacity-90"
                  >
                    {loader ? (
                      <div role="status">
                        <div className="flex justify-center">
                          <div className="h-6 w-6 animate-spin rounded-full border-2 border-solid border-white border-t-transparent"></div>
                        </div>
                      </div>
                    ) : (
                      "Passwortänderung anfordern"
                    )}
                  </button>
                </div>
                <div className="w-full my-10 border-b-[1px] border-dashed border-b-bodydark2" />
                <div className="text-center text-[#333333] text-lg opacity-[30%] mb-3">
                  Brauchst du Hilfe?
                </div>
                <div className="text-center text-[#2F93F6] text-lg ">
                  Kundendienst
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPass;
