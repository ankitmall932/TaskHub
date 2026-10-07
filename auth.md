# TaskHub Authentication Setup

This guide describes how to set up and extend the authentication currently used
by TaskHub. It is ordered from project prerequisites to the user-facing flows.
It documents the current implementation; it is not a timestamped Git history.

## 1. Install the project dependencies

TaskHub uses Next.js App Router, Better Auth, Prisma with PostgreSQL, Zod, and
Nodemailer. From the project root, install the dependencies declared in
`package.json`:

```bash
npm install
```

Relevant packages already declared by the project include:

- `better-auth`
- `@prisma/client`
- `@prisma/adapter-pg`
- `prisma`
- `nodemailer`
- `zod`

## 2. Configure environment variables

Create a local `.env` file (do not commit it) and configure the values required
by the database, Better Auth, OAuth providers, and transactional email:

```dotenv
DATABASE_URL=
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

BREVO_SMTP_HOST=
BREVO_SMTP_PORT=
BREVO_SMTP_USERNAME=
BREVO_SMTP_PASSWORD=
BREVO_MAIL_FROM=
```

Use the deployed application's base URL for `BETTER_AUTH_URL` in production.
Generate a strong, private `BETTER_AUTH_SECRET`; never expose or commit secrets.
Create OAuth credentials in the Google and GitHub developer consoles and
register the Better Auth callback URLs for both local development and the
production domain. The usual local callback URLs are:

- `http://localhost:3000/api/auth/callback/google`
- `http://localhost:3000/api/auth/callback/github`

Use the SMTP credentials and verified sender address from Brevo. Never paste
real `.env` values into this document, issues, or source control.

## 3. Set up Prisma and the authentication tables

The Prisma schema is in `prisma/schema.prisma`. The Better Auth data model
contains:

- `User`: name, unique email, verification state, and optional avatar.
- `Session`: expiry, unique token, user-agent/IP metadata, and user relation.
- `Account`: OAuth provider identity or the `credential` password account.
- `Verification`: email-verification and password-reset token storage.

The project uses Prisma 7 configuration in `prisma7.config.ts` and a PostgreSQL
driver adapter in `src/lib/db/prisma.ts`. The schema datasource therefore
declares its provider, while the Prisma config supplies `DATABASE_URL`.

For a new database, create/apply a migration and generate Prisma Client:

```bash
npx prisma migrate dev --name better_auth
npx prisma generate
```

When the schema changes later, update the schema first, then create a
descriptive migration and regenerate the client.

## 4. Create the shared Prisma client

`src/lib/db/prisma.ts` loads environment variables, creates the PostgreSQL
adapter using `DATABASE_URL`, and exports one `PrismaClient`. Import this shared
client rather than creating another Prisma client in each auth module.

## 5. Configure Better Auth

Create `src/lib/auth/auth.ts` as the central server-side auth configuration:

1. Connect Better Auth to Prisma with `prismaAdapter`.
2. Set `baseURL` from `BETTER_AUTH_URL`.
3. Enable email/password sign-in and require email verification.
4. Configure email verification and password-reset email callbacks using the
   shared mail helper.
5. Configure Google and GitHub client ID/secret environment variables.
6. Enable account deletion.
7. Install the `nextCookies()` plugin for Next.js Server Actions.
8. Enable session revocation when a password is reset.

Keep auth provider configuration in this module so both the API route and
server actions use the same instance.

## 6. Add the email transport

`src/lib/auth/email.ts` creates the Nodemailer transporter using the Brevo SMTP
environment variables and exports `sendEmail({ to, subject, text })`.

The Better Auth callbacks in `src/lib/auth/auth.ts` call this helper for:

- Email verification messages.
- Password-reset messages containing a time-limited link.

If sending mail fails, check the SMTP host, port, login, sender verification,
and the server logs. Do not return a successful signup/reset result when the
mail service has failed.

## 7. Expose Better Auth through Next.js

Create the catch-all route at
`src/app/api/auth/[...all]/route.ts`:

```ts
import { auth } from "@/lib/auth/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

Better Auth owns the endpoints under `/api/auth/*`, including email/password,
OAuth callbacks, session, verification, and password-reset endpoints.

## 8. Add a shared server-side session helper

`src/lib/auth/get-session.ts` calls `auth.api.getSession()` with the request
headers from `next/headers`. Use this helper from Server Components and layouts
instead of separately parsing session cookies.

`src/app/layout.tsx` reads the session and passes it to the navbar. The
authenticated user layout at `src/app/user/layout.tsx` redirects unauthenticated
visitors to `/`.

## 9. Build email/password signup and login

### Signup validation

`src/lib/validations/signUp.ts` defines the Zod signup schema:

- Name: at least 2 characters.
- Email: valid email format.
- Password: at least 8 characters.

### Server actions

`src/app/actions/auth/auth-actions.ts` contains the server-side operations:

- `signUp`: validates submitted fields, checks for an already verified email,
  then calls `auth.api.signUpEmail()`. On success it redirects to
  `/auth/verify-email`.
- `signIn`: calls `auth.api.signInEmail()` and redirects to
  `/user/dashboard`.
- `signOut`: ends the current session.
- `signOutAll`: revokes the user's sessions.

Keep validation and auth mutations in server actions; client form validation
improves usability but must not replace server-side checks.

### Forms and routes

- `src/app/auth/signup/page.tsx` renders `SignUp.tsx`.
- `src/app/auth/signup/SignUp.tsx` contains the signup form and OAuth buttons.
- `src/app/auth/login/page.tsx` renders `SignIn.tsx`.
- `src/app/auth/login/SignIn.tsx` contains the login form and a
  **Forgot password?** link.
- `src/app/auth/verify-email/page.tsx` tells users to check their email.

The current signup flow requires verification before a normal email/password
login. Better Auth's verification callback is configured to sign the user in
after verification.

## 10. Add Google and GitHub sign-in

`src/lib/auth/social-login.ts` uses Better Auth's React client to call
`signIn.social()` for `google` or `github`, with `/user/dashboard` as the
callback destination.

The signup and login forms invoke this helper from their provider buttons.
OAuth secrets stay on the server in environment variables; never put provider
client secrets in a client component.

## 11. Add the account page and profile update

The account route is `src/app/user/account/page.tsx`. It loads the current
session and renders:

- `Basic.tsx`: name, email, avatar, edit-name link, and password control.
- `Security.tsx`: sign-out controls and the active-device list.

`edit-name/page.tsx` loads the user's current name and renders
`edit-name/EditNameForm.tsx`. The form calls `updateAccountName` in the auth
server actions, which should call `auth.api.updateUser()` with a `name` field.

## 12. Add set-password and change-password

`Password.tsx` calls `auth.api.listUserAccounts()` and checks whether any
account has `providerId === "credential"`:

- If yes, show **Change password** and link to
  `/user/account/change-password`.
- If no, show **Set password** and link to `/user/account/set-password`.

The corresponding routes and forms are:

- `change-password/page.tsx` and `change-password/ChangePasswordForm.tsx`.
  The user supplies the current password and a new password.
- `set-password/page.tsx` and `set-password/SetPasswordForm.tsx`.
  This is intended for OAuth users adding an email/password credential.

The server actions call `auth.api.changePassword()` or `auth.api.setPassword()`.
Validate required fields, minimum password length, and the confirmation match
on the server before calling Better Auth.

## 13. Add forgot-password and reset-password

The complete reset flow uses Better Auth's reset token API:

1. `src/lib/auth/auth.ts` configures `emailAndPassword.sendResetPassword`.
   The callback sends Better Auth's reset URL through `sendEmail`.
2. The login form links to `/auth/forgot-password`.
3. `forgot-password/page.tsx` renders `ForgotPasswordForm.tsx`.
4. The form calls `requestPasswordReset` in `auth-actions.ts`, which calls
   `auth.api.requestPasswordReset()` with a redirect back to
   `/auth/reset-password`.
5. Better Auth emails the link. Its token is short-lived (one hour by default).
6. The Better Auth callback validates the token and redirects to the app with
   a `token` query parameter.
7. `reset-password/page.tsx` shows the form only when a token is present and
   no token error was returned.
8. `ResetPasswordForm.tsx` calls `resetAccountPassword`, which uses
   `auth.api.resetPassword()`.
9. The configuration revokes existing sessions on successful reset.

Always use a generic request response such as “If an account exists for this
email…” so the reset endpoint does not disclose whether an email is registered.

## 14. Add device/session management and account deletion

`Security.tsx` calls `auth.api.listSessions()` and identifies the current device
using the current session ID. Better Auth requires a fresh session for this
operation. If it returns `SESSION_NOT_FRESH`, the page shows a sign-in-again
message instead of crashing; it does not disable the freshness policy.

The same section provides:

- Current-session logout through `signOut`.
- Logout on all devices through `signOutAll`.
- Account deletion through `DeleteAccountButton.tsx` and `deleteAccount`.

Account deletion is enabled in `src/lib/auth/auth.ts`. Treat deletion as
permanent and keep a confirmation step in the UI.

## 15. Run and verify the project

Start the development server:

```bash
npm run dev
```

Before shipping auth changes, run:

```bash
npm run lint
npm run build
```

Test the main paths manually with a development email account:

1. Sign up and verify the email.
2. Sign in and sign out.
3. Try Google/GitHub OAuth callbacks.
4. Open the account page, update the name, and check the displayed name.
5. Set a password on an OAuth-only account; change it on a credential account.
6. Request a reset email, follow the link, reset the password, and verify that
   the old password no longer works.
7. Check active sessions and test logout on the current/all devices.

## Current implementation checks

Before treating every account feature as production-ready, verify these details
in `src/app/actions/auth/auth-actions.ts`:

- Better Auth's `updateUser` expects an object such as `body: { name }`. Ensure
  the edit-name action passes that object, not the raw string.
- The change/set/reset password actions must compare `newPassword` with
  `confirmPassword` on the server. Having two password fields in the UI alone
  does not enforce a match.
- Validate email format, password minimum length, and required fields server
  side even when the HTML form uses `required` or `minLength`.

Keep this file updated whenever auth routes, providers, database fields,
environment variables, or email flows change.
