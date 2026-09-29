import { Footer } from "@i-dot-ai-npm/component-library-react";

const links = [
    { text: "Accessibility statement", href: "#" },
    { text: "Sitemap", href: "#" },
    { text: "Cookies", href: "#" },
    { text: "Privacy", href: "#" },
    { text: "Contact the team", href: "#" },
];

export function ExampleFooter() {
    return <Footer links={links} />;
}
