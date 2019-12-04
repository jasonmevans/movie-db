# To run The Movie Database

- First, install dependencies with `yarn`
- Next, start the API server located in `/movies/server` with `node api.js`
- Lastly, start the React server with `yarn start`

# Dev notes

- I'm new to React, so this is an exploratory exercise
- API keys located in `server/keys.json`. Typically, these would be kept in a secure key store, but for this toy exercise a JSON file should suffice.
- I used Bulma for the CSS framework, https://bulma.io/
- I realized that `create-react-app` handles SCSS out of the box when I installed Bulma, but since the CSS is relatively simple I didn't see a need to change anything in the project code.
-

## Future enhancements

- I'd love to put some more effort into the overall visual design. Incorporating things like the `backdrop_path` for each movie would be great.
- Adding views for the cast and crew, and reviews would be a logical next step
- Switch to Redux for maintaining global state. I used React hooks here for simplicity, but it makes tracking state between different routes tricky.
- 
