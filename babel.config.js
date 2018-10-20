const presets = [
  [
    "@babel/env",
    {
      targets: {
            browsers: [
                "last 2 versions",
                "ie >= 9",
                "iOS >= 8"
            ]
        }, 
      useBuiltIns: "usage",
    },
  ],
];

module.exports = { presets };