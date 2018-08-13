# github-provisioner

A simple webapp to provision GitHub repositories for students.

### Adding your course

The supported courses are defined in `config.js`. To add your course, simply
add it to the config.

```js
{
  id: 'cs225',
  shortname: 'CS 225',
  name: 'Data Structures',
  org: 'cs225fa18',
}
```

Note that `id` must be unique among all courses. `org` refers to a Github
organization that the repos will be created in. This should be created prior
to adding the course to this app.

Each course needs an Github token that has permissions to create repos in that
course's organization. It must be provided in an environment variable like
`GITHUB_TOKEN_[uppercase course ID]`. For example, the token for the example
CS 225 course about would provide a token in `GITHUB_TOKEN_CS225`, since the
course ID is `cs225`.

### Running locally

Run `npm install` to install all necessary dependencies.

Run `npm run dev` to start a local dev server.

Create a GitHub token with the ability to create repositories in your course's
organization and put it in a `.env` file at the root of this repository:

```
GITHUB_TOKEN_CS225=abcde12345
```

You can also provide it directly on the command line:

```
GITHUB_TOKEN_CS225=abcde12345 npm run dev
```

This will allow you to test repo creation on any organization that you have
permission to create repositories.

In production, a student's identity is provided by Shibboleth. When running
locally, it assumes a static NetID of `dev`. To change this, you can set a
`NET_ID` environment variable in your `.env` file:

```
NETID=mynetid
```

Like the Github token, it can also be provided directly when starting the server.
