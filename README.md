# Brand Collective Germany

@project:9df65705-f87e-40d8-9886-28b3753c01c5:"HACCORA" @project:2c80c269-5ea9-4d69-b7ea-bb11b18311cf:"KINDERSTARS" @project:de353dc8-0ab4-45fc-8728-c8752e37f169:"EventPlanrGER" @project:57df29a6-dd14-4f45-b117-64139a2902e4:"RETTIO" @project:9703dbc8-9803-4ce2-a4e9-da35a0efd3c1:"KIEZIO" @project:2c1ee435-a224-4dd8-ab86-0d4073336275:"BERATERMARKT" @project:ce949b25-b577-4f33-99c0-c9cf874b1004:"STELLENXPERT" @project:cd152f0f-ea0c-470e-95d3-4e07d6f001c2:"VIAZENO" @project:cccfd7db-098e-4b17-b8be-ef8bf1d89a80:"IMMOVIQ" @project:3f46c97f-04a4-4979-bb65-a197320d0525:"BEINSTANDPLUS" LoungeTech Digitallösungen GmbH is the company that builds and operates these brands. We need a full document to highlight the brands, what they provide, whom they serve, the reasons for the services. The value proposition they provide, comparisons to competitors and competitors advantage. How they will operate and how they will generate revenues. Any costs, expenses etc. All brands will operate under the one GmbH with one legal and compliance team, one finance team, one tech team. One admin team. One sales and marketing team and one management team. One office. With each having their own coordinator overseeing them. The projects are German centric initially, with potential growth in other territories. €1m is required in funding to cover everything going forward payable in €100k tranches over 12 months. We intend to launch each one every 3 weeks. And then run them successfully. We will over 2 months free trial for all subscribers on all projects then charge the subscription fees. That will be our main income. We intend to push to good growth in subscribers too each and will use the synergies of the collective to push subscribers in the various saas and apps. Make profit and loss over 36 months, balance sheet, cash flow forecast, expenses, revenue both for Individual projects and the system as a whole. Use € as the currency. With growth in each projects revenue on a monthly basis. Highlight risks and positives , but show the market for each in germany in terms of numbers and € and how we can push into this with each to make good revenues and good net profit. Any investors will get 45% for the investment of net profit and be 45% shareholders in the GmbH. No hands on work will be required. Add anything else create a full comprehensive report on each project, the full company shared operations, operations of each and collective and full financials etc. We envisage around 60% net margin on revenue after expenses and asset purchases etc

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://kirankk123.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/aa77fedb-5e70-4c32-aa09-8a0ee825719c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Public and private areas

- `/` redirects to `/portfolio`, the public, search-indexable showcase of all brands, their plain-language purpose and services. It contains no forecasts, private traction or portfolio domains.
- `/investment` — private investor dashboard protected by `SITE_PASSWORD`.
- `/marketing` — separate private marketing command centre protected by `MARKETING_PASSWORD`.

Required production secrets:

```sh
SITE_PASSWORD=<investor-access-password>
SESSION_SECRET=<long-random-investor-session-secret>
MARKETING_PASSWORD=<different-marketing-access-password>
# Optional. If omitted, a purpose-separated value is derived from SESSION_SECRET.
MARKETING_SESSION_SECRET=<long-random-marketing-session-secret>
```

Use different investor and marketing passwords. The two gates use separate cookies, browser tokens and signed token purposes, so unlocking one area does not unlock the other.
