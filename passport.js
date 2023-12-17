window.passport = new window.immutable.passport.Passport({
  baseConfig: new window.immutable.config.ImmutableConfiguration({
    environment: window.immutable.config.Environment.SANDBOX,
  }),
  clientId: "vuNkF06sKRhzhdH5UptcPWXVT07gGVVl",
  redirectUri: "https://kid-proper-falcon.ngrok-free.app",
  logoutRedirectUri: "https://kid-proper-falcon.ngrok-free.app/logout.html",
  audience: "platform_api",
  scope: "openid offline_access email transact",
});
