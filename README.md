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
### Clearing up requirements
The requirement is to print out festival attendance from bands under their respective record labels.
However, a band might not be signed to a label and still perform at a festival (unless it's a really exclusive festival).

In this case, best to ask the product manager/owner and get UX involved if available to know what we should display in this scenario. 

We should also confirm what should be shown when the data is empty.

I opted to not show bands without record labels and show `No data found` when there is no data.

### Schemas and resources
In the API documentation all models have their fields set to optional. This means that a `Band` can exist without a name, which is nonsensical. The documentation should be updated to reflect any required properties in the model.

In the responses that the API returns, a Band may not have a record label field, or can be an empty string. If this is not intentional, then the response should be fixed and the documentation updated to indicate that strings have a minimum length.

The festival endpoint returns festivals with an optional name field. This let's us list out record labels and their bands regardless of whether thay have attended any festivals.
While this get the data we want, it also means that the `festival` resource may not be describing festivals and be describing bands instead.

It would be better to expose a separate endpoint that returns the sorted data instead of going through the festival endpoint.

### API responses
The responses returned by the API are inconsistent. Data entries would sometimes be missing, or returning a value that doesn't match the swagger documentation (namely an empty string).

Contact the API team and let them know that the API doesn't consistently return all data in the correct format.

Also worth noting is that the API has exposed the `X-Powered-By` header in its responses (it's running on Express.js) and it should be removed.
