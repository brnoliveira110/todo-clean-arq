import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TODO PWA",
    short_name: "TODO PWA",
    description: "A Progressive Web App built with Next.js",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/image/freepik__todo_192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/image/freepik__todo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
