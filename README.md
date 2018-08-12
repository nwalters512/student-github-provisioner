# github-provisioner

A simple webapp to provision GitHub repositories for students.

### Adding your course

The supported courses are defined in `config.js`. To add your course, submit
a pull request with your course added to the config. A course looks like the
following:

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
to adding your course to this app.

### Running locally

Run `npm install` to install all necessary dependencies.

Run `npm run dev` to start a local dev server.

In production, this will be run with an admin token that has the ability to
create repositories in any organization. When running locally, you'll
likely want to test with a more limited token. Create a GitHub token with
the ability to create repositories and put it in a `.env` file at the root
of this repository:

```
GITHUB_TOKEN=abcde12345
```

This will allow you to test repo creation on any organization that you have
permission to create repositories.

In production, a student's identity is provided by Shibboleth. When running
locally, it assumes a static NetID of `dev`. To change this, you can set a
`NET_ID` environment variable in your `.env` file:

```
NETID=mynetid
```
