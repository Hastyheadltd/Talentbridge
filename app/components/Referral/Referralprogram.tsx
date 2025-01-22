"use client";

import { useUser } from "@/app/lib/UserContext";
import React, { useState, useEffect } from "react";
import { FaCopy, FaFacebook, FaTwitter, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function ReferralProgram() {
  const { user } = useUser();
  const [referralCode, setReferralCode] = useState(user?.referralCode || "");
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
   
    if (user?.referralCode) {
      setReferralCode(user.referralCode);
    }

 
    if (typeof window !== "undefined" && user?.referralCode) {
      setShareLink(`${window.location.origin}/referral?code=${user.referralCode}`);
    }
  }, [user]);

  const generateReferralCode = async () => {
    if (referralCode) {
      toast.error("Referral code already generated!");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/generate-referral-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?._id }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to generate referral code.");
        return;
      }

      setReferralCode(data.referralCode);
      setShareLink(`${window.location.origin}/referral?code=${data.referralCode}`);
      toast.success("Referral code generated successfully!");
    } catch (error) {
      console.error("Error generating referral code:", error);
      toast.error("Failed to generate referral code.");
    }
  };

  const copyToClipboard = () => {
    if (!referralCode) {
      toast.error("No referral code to copy!");
      return;
    }
    navigator.clipboard.writeText(referralCode);
    toast.success("Referral code copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Referral Program</h1>
        <p className="text-center text-gray-600 mb-6">
          Generate and share your referral code with friends to earn rewards!
        </p>

        <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between mb-6">
          <span className="text-lg font-mono text-gray-800">{referralCode || "N/A"}</span>
          <button
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 flex items-center"
            onClick={generateReferralCode}
          >
            Generate Code
          </button>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between mb-6">
          <span className="text-lg font-mono text-gray-800">{referralCode}</span>
          <button
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 flex items-center"
            onClick={copyToClipboard}
          >
            <FaCopy className="mr-2" /> Copy
          </button>
        </div>

        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Share your referral link:</h2>
          <div className="flex justify-center space-x-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-2xl"
            >
              <FaFacebook />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                shareLink
              )}&text=Join+this+amazing+platform+using+my+referral+code!`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600 text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              href={`https://wa.me/?text=Join+this+amazing+platform+using+my+referral+code:+${referralCode}+Sign+up+here:+${encodeURIComponent(
                shareLink
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-700 text-2xl"
            >
              <FaWhatsapp />
            </a>
            <a
              href={`mailto:?subject=Join+this+platform&body=Use+my+referral+code:+${referralCode}+Sign+up+here:+${encodeURIComponent(
                shareLink
              )}`}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500">
          * Rewards will be credited once your referrals successfully sign up.
        </p>
      </div>
    </div>
  );
}
