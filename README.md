# GitHub views counter

Better than other views counter, this one checks the IP address of the visitor and counts only one view per IP address on 48 hours.

## Why?

- The other views counter don't have customization options.
- They count the views of the same visitor multiple times causing the number to be inflated.
- They are hosted on a third party which is not good for privacy and they can be down.

## How to use

Host this script on a cloud server or on your own server with `yarn start:prod`.

> You can use [Heroku](https://heroku.com) or other cloud service to host this script.

> You have to create a Postgres database and a redis instance.

Add the environment variables `DATABASE_URL`, `PORT` and `REDIS_TLS_URL` to your environment.

> You can use `PRIVATE_USERNAME` to host only for your personal use.
> Example: `PRIVATE_USERNAME=your_username` and then `https://your-server-domain.com/count/your_username`

Then take the endpoint and add it to your GitHub profile README.md file.

```md
![](https://your-server-domain.com/count/your-username)
```

## How to customize

- Make your art on a vector editor like [Inkscape](https://inkscape.org/)

- On counter text, use `{count}` to display the views count.

- On profile text, use `{profile}` to display the profile name.

> Note: You can't convert the text to path on Inkscape, you have to keep it as text.

> Note: You can use both `{count}` and `{profile}` on the same text.

- Then, save the art as a SVG file on `src/templates` folder.

- Then, use the `template` query parameter with the name of the SVG file to use it.

```md
![](https://your-server-domain.com/count/your-username?template=your-template.svg)
```

## Questions

- Why I have to host this app myself?

  Because I don't want to have the responsibility of the data and privacy of the users and I don't want to pay for the hosting for everyone using this app.

- Why svg?

  Because it's easy to use an vector editor to customize the svg file.

- Why redis?

  To check the IP address of the visitor and count only one view per IP address on 48 hours.

## How to contribute

- Fork the repo
- Create a new branch
- Make your changes
- Check the code with `yarn lint`
- Create a pull request
