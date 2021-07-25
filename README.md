<h1 align="center">Talentbait CRUD</h1>
<p>
  <a href="https://mit-license.org/" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Nodejs CRUD app using Firebase & Firestore

## BUILD

```npm run build```

## RUN

```npm run start```

## DOCS

### API Authentication

To make any request to the sentences or translation api you will need to provide an authorization header:

```{ 'Authorization': 'Bearer <token>' }```

### Sentences API

+ Endpoint: `https://sentences-crud.herokuapp.com/api/v1/sentences`

+ operations:
+ + GET /?[lastId=string]&[orderBy=string]&[order='asc' | 'desc']
+ + GET /:id
+ + POST /:id { text: string, category: string }
+ + PUT /:id { text?: string, category?: string }
+ + DELETE /:id

### Translation API

+ Endpoint: `https://sentences-crud.herokuapp.com/api/v1/translate`

+ operations:
+ + POST / { sentence: string }

### Sentences views

You can access the views on `https://sentences-crud.herokuapp.com`

From this webpage you can perform any operation you can do with the sentences API

### TODO

- Test sentences component
- aggregate script

## Author

👤 **Victor Martinez**

- Github: [@JasterV](https://github.com/JasterV)
- LinkedIn: [@Victor Martinez](https://linkedin.com/in/victor-martinez-montane)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Victor Martinez](https://github.com/JasterV).<br /> This
project is [MIT](https://mit-license.org/) licensed.

---

_This README was generated with ❤️ by
[readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
