// // auth/passport-config.ts
// import { Strategy as LocalStrategy } from 'passport-local';
// import { PassportStatic } from 'passport';
// import User, { IUser } from '../models/user.model';

// export default (passport: PassportStatic) => {
//     passport.use(
//         new LocalStrategy((username, password, done) => {
//             User.findOne({ username: username }, (err: Error, user: IUser | null) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 if (!user) {
//                     return done(null, false, { message: 'Incorrect username' });
//                 }
//                 if (user.password !== password) {
//                     return done(null, false, { message: 'Incorrect password' });
//                 }
//                 return done(null, user);
//             });
//         })
//     );

//     passport.serializeUser<string>((user, done) => {
//         done(null, user.toString());
//     });

//     passport.deserializeUser<string>((id, done) => {
//         User.findById(id, (err: Error, user: IUser | null) => {
//             done(err, user);
//         });
//     });
// };
