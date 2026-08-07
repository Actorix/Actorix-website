"use client";

import SocialFlipButton from "@/components/ui/social-flip-button";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

/* Vengeance UI SocialFlipButton wired to the real Actorix profiles.
   Front letters spell the brand's first four letters: A · C · T · X. */
const items = [
  {
    letter: "A",
    icon: <FaGithub />,
    label: "GitHub",
    href: "https://github.com/Actorix",
  },
  {
    letter: "C",
    icon: <FaLinkedin />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/actorix/",
  },
  {
    letter: "T",
    icon: <FaInstagram />,
    label: "Instagram",
    href: "https://www.instagram.com/actorix.in/",
  },
  {
    letter: "X",
    icon: <FaEnvelope />,
    label: "Email",
    href: "mailto:hello@actorix.in",
  },
];

export default function ContactSocials() {
  return <SocialFlipButton items={items} className="justify-start" />;
}
