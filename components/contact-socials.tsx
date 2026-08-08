import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

/* Social links for the dark contact band.
   This replaced Vengeance's SocialFlipButton: that component hid each icon
   behind a hover flip, which meant mobile visitors (most of our traffic) saw
   four unlabelled letters — A C T X — with no way to reveal what they were.
   Icons and labels are always visible now; the motion is decoration, not the
   mechanism for reading the link. */

const links = [
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/actorix/",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/actorix.in/",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/Actorix",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    href: "mailto:hello@actorix.in",
  },
];

export default function ContactSocials() {
  return (
    <div className="flex flex-wrap gap-2.5">
      {links.map(({ icon: Icon, label, href }) => {
        const external = href.startsWith("http");
        return (
          <a
            key={label}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            aria-label={label}
            /* min-h-[44px] is the accessible tap-target floor on touch devices */
            className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.12] hover:text-white active:scale-95"
          >
            <Icon className="text-base transition-transform duration-300 group-hover:scale-110" />
            {label}
          </a>
        );
      })}
    </div>
  );
}
