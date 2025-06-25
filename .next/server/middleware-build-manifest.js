self.__BUILD_MANIFEST = {
  "polyfillFiles": [
    "static/chunks/polyfills.js"
  ],
  "devFiles": [
    "static/chunks/react-refresh.js"
  ],
  "ampDevFiles": [],
  "lowPriorityFiles": [],
  "rootMainFiles": [],
  "pages": {
    "/_app": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_app.js"
    ],
    "/_error": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_error.js"
    ],
    "/dashboard": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/dashboard.js"
    ],
    "/goals": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/goals.js"
    ],
    "/profile": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/profile.js"
    ],
    "/rewards": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/rewards.js"
    ],
    "/settings": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/settings.js"
    ],
    "/wellness": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/wellness.js"
    ]
  },
  "ampFirstPages": []
};
self.__BUILD_MANIFEST.lowPriorityFiles = [
"/static/" + process.env.__NEXT_BUILD_ID + "/_buildManifest.js",
,"/static/" + process.env.__NEXT_BUILD_ID + "/_ssgManifest.js",

];