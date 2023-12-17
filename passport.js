window.passport = new window.immutable.passport.Passport({
  baseConfig: new window.immutable.config.ImmutableConfiguration({
    environment: window.immutable.config.Environment.SANDBOX,
  }),
  clientId: "vuNkF06sKRhzhdH5UptcPWXVT07gGVVl",
  redirectUri: "https://immutable-stackupinvaders.vercel.app",
  logoutRedirectUri: "https://immutable-stackupinvaders.vercel.app/logout.html",
  audience: "platform_api",
  scope: "openid offline_access email transact",
});
