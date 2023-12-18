const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const prisma = require("../prisma");
const bcrypt = require("bcrypt");

const GitHubStrategy = require("passport-github2").Strategy;

require("dotenv").config();

passport.use(
  new LocalStrategy(async (userName, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { userName: userName },
      });
      if (!user) {
        return done(null, false, { message: "Usuario no encontrado" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: "Contraseña incorrecta" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userEmail =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : null;

        if (userEmail !== null) {
          const user = await prisma.user.findUnique({
            where: {
              githubId: profile.id.toString(),
            },
          });

          if (user) {
            return done(null, user);
          } else {
            const hashedPassword = await bcrypt.hash(
              "github-authenticated",
              10
            );

            const newUser = await prisma.user.create({
              data: {
                userName: profile.username,
                email: userEmail,
                githubId: profile.id.toString(),
                githubUsername: profile.username,
                githubEmail: userEmail,
                password: hashedPassword,
              },
            });
            return done(null, newUser);
          }
        } else {
          return done(
            new Error("GitHub profile does not contain an email address")
          );
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
