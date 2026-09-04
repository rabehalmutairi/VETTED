interface OutboundLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

// Every outbound URL is https-only and shows its destination domain, per
// CLAUDE.md's link-safety rules — never a bare "click here" to an unverified host.
export function OutboundLink({ href, children, className }: OutboundLinkProps) {
  let domain: string;
  try {
    const url = new URL(href);
    if (url.protocol !== "https:") return null;
    domain = url.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow ugc"
      className={className}
    >
      {children}
      <span className="opacity-75"> ({domain})</span>
    </a>
  );
}
