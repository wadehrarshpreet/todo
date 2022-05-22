# TODO App


URL: https://todo-ten-mu.vercel.app



## Development

### Pre-requisite

- Install [NodeJS 16.10+](https://nodejs.org/en/download/)
- Install Yarn 1.2x
    ```sh
    npm global install yarn
    ```
<br />

### Get started

- Clone the Repo
    ```bash
    git clone https://github.com/wadehrarshpreet/todo.git
    ```

- go to project directoy and install dependencies
    ```bash
    cd todo && yarn
    rm -rf .git # remove .git
    git init # setup new git repo
    ```

- Start dev server
    ```bash
    npm run dev
    ```

Navigate to [localhost:8080](http://localhost:8080). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

<br />

### Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for *any* path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

----


<br />

## Deployment

We are using [vercel](https://vercel.com/)

[Github Action](.github/workflows/deploy.yml) is in place which deploy on every push to `main` branch

Set Following Secrets to make sure deployment works
- VERCEL_TOKEN (access token)
- VERCEL_PROJECT_ID (project id)
- VERCEL_ORG_ID (account id)



<br />

## Links
- UX inspire by [Alex Arutuynov](https://dribbble.com/shots/14100356-ToDo-App-UI)
- Boilerplate [Svelte-typescript-boilerplate](https://github.com/wadehrarshpreet/svelte-typescript-boilerplace)
- [Twitter](https://twitter.com/wadehrarshpreet/)
- [LinkedIn](https://www.linkedin.com/in/wadehrarshpreet/)
- [https://wadehrarshpreet.com](https://wadehrarshpreet.com)

## License

[MIT](LICENSE.md)