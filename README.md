This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## The Problem
Your team is tasked with listing out music festival data in a particular manner: at the top level, it should show the band record label, below that it should list out all bands under their management, and below that it should display which festivals they've attended, if any. All entries should be sorted alphabetically.

For example:
```
Record Label 1
    Band X
        Omega Festival
    Band Y

Record Label 2
    Band A
        Alpha Festival
        Beta Festival
```

The data is provided to you via an API by another team; they assure you all the data is available but it's in a different format and provide you with the Swagger documentation needed to get started.
Use this API as is to output the format specified above in any medium you desire; let it be a website, terminal, file or morse code if that's what you want to do - we just want to see the result somehow.

## Coding Test
The task cannot be completed as the data that the API team has provided is incomplete.

In the example above, `Band Y` wouldn't be in the response to begin with.

The `festivals` endpoint lists out festivals that bands have attended, but won't show bands that haven't attended any festivals at all.
Because of that, we wouldn't be able to list them out under their record label.

A different endpoint would be needed to get the data that we need. Best to ask the API team if there are any other endpoints that will return the data to us.
Preferably a complete solution without needed us to manually sort the results.

Nonetheless, if there's still interest, here's a solution for record labels and bands that have attended music festivals before. 
