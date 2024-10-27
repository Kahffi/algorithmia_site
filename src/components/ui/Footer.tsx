import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    <footer className="flex justify-center gap-7 w-full py-3 mt-6 text-xs text-center text-gray-600">
      <a
        href="https://www.instagram.com/algorithmia.fest/"
        className="text-pink-500 hover:underline"
      >
        <Icon icon="mdi:instagram" className="inline text-lg mr-1" />
        @Algorithmia.fest
      </a>
      <a
        href="mailto:algorithmiafest@gmail.com"
        className="text-blue-500 hover:underline"
      >
        <Icon icon="mdi:email-outline" className="text-xl inline mr-1" />
        algorithmiafest@gmail.com
      </a>
    </footer>
  );
}
