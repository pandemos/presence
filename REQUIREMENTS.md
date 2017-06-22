# Requirements

#### MVP

- 100% unit test coverage
- JWT-based Authentication & Authorization
- Two roles: user and admin
- Users are identified by a specific email address
- User can only set their own availability
- Users and admin can be assigned to one or more teams
- Login/logout
- specify core hours
- in-office-now
- out-of-office-now
- out-of-office-at TIME
- View availability by team

Note: API is complete for MVP. Frontend CRUD needs to be implemented.

#### V1

- 100% unit test coverage
- Third role: super-user
- super-user can view all availability and modify all fields
- Email specifically-formatted availability updates to update the system
- Hipchat integration
- UI/UX improvements (responsive!)
- Admin can set any user's availability
- Full docker-compose environment (API and web and db)

#### Vnext

- 100% unit test coverage
- Slack integration
- Machine learning based updates from messages in email and hipchat