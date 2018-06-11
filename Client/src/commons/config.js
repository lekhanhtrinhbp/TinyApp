const devMode = process.env.NODE_ENV !== "development";

export default {
  // App Details
  appName: "Starter Kit",

  // Build Configuration - eg. Debug or Release?
  DEV: devMode,

  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: devMode ? "UA-84284256-2" : "UA-84284256-1",

  __APP_API__: devMode
    ? "http://localhost:52304/api"
    : "http://localhost:52304/api",


  // TODO: [Doan] check whether this is mobile mode
  __MOBILE_BREAKPOINT__: 760
};
