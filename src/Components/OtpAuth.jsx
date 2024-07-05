import { BsFillShieldFill, BsTelephoneFill } from "react-icons/bs";
import OtpInput from "otp-input-react";
import { useState } from "react";
import "../Components/Loader.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Toaster, toast } from "react-hot-toast";

import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function OtpAuth() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(false);

  //Verify Captcha
  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            onSignUp();
          },
          "expired-callback": () => {},
        }
      );
    }
  };

  const onSignUp = () => {
    setLoading(true); //enable loading state
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier; // Captcha Verifier

    //Phone Number format
    const phoneNumber = "+" + phone;

    //Authentication : signInWithPhoneNumber
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP Sent Successfully...");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // To Verification
  const onOTPVerify = () => {
    setLoading(true);
    toast.success("OTP Verified!");
    window.confirmationResult
      .confirm(otp)
      .then(async (response) => {
        console.log(response);
        setUser(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <section className="bg-[#EDF2F6] h-screen flex justify-center items-center font-pro relative">
        {/* Recaptcha container */}
        <div id="recaptcha-container" className="absolute top-[76%]"></div>
        {/* Recaptcha container */}
        <div>
          {!user ? (
            <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
              <h1 className="text-center text-slate-800 leading-normal font-semibold text-3xl mb-6">
                Welcome to <br />
                THAAI <span className="text-emerald-500">FOOD</span>
              </h1>
              {showOTP ? (
                <>
                  <div className="bg-white text-emerald-500 mx-auto p-4 rounded-full">
                    <BsFillShieldFill size={30} />
                  </div>
                  <label
                    htmlFor="otp"
                    className="font-bold text-2xl text-white text-center"
                  >
                    Enter your OTP
                  </label>
                  <OtpInput
                    OTPLength={6}
                    otpType="number"
                    onChange={setOtp}
                    disabled={false}
                    value={otp}
                    autoFocus={true}
                    className="opt-container"
                  ></OtpInput>
                  <button
                    className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded tracking-wide font-medium mt-5"
                    onClick={onOTPVerify}
                  >
                    {loading && <div className="loader" />}
                    <span className="pl-4">Verify OTP</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="bg-white text-emerald-500 mx-auto p-4 rounded-full">
                    <BsTelephoneFill size={30} />
                  </div>
                  <label
                    htmlFor=""
                    className="font-bold text-xl text-slate-700 text-center"
                  >
                    Verify your phone number
                  </label>
                  {/* Phone Input  */}
                  <PhoneInput
                    country={"in"}
                    value={phone}
                    onChange={setPhone}
                  />
                  <button
                    className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded tracking-wide font-medium mt-3"
                    onClick={onSignUp}
                  >
                    {loading && <div className="loader" />}
                    <span className="pl-4">Send code via SMS</span>
                  </button>
                </>
              )}
            </div>
          ) : (
            <h2 className="text-center text-slate-700 font-medium text-2xl">
              👍 Login Sucess
            </h2>
          )}
        </div>
      </section>
      <Toaster toastOptions={{ duration: 4000 }} />
    </>
  );
}
