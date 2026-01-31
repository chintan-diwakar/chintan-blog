export const SITE = {
  website: "https://chintan.dev/", // replace this with your deployed domain
  author: "Chintan Diwakar",
  profile: "https://github.com/chintan-diwakar",
  desc: "Technical writings on AI, developer tools, and building software - by Chintan Diwakar",
  title: "Chintan's Blog",
  ogImage: "og-image.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/chintan-diwakar/chintan-blog/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Kolkata", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
