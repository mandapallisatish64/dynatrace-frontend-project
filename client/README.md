## Description

Please follow the guide below to complete the user interface part of the project. We provide a scaffolded application for you to use, but if you have a technology or framework you prefer, please feel free to use it. We are looking to see that you can write readable, maintainable code.

The Sales Leads UI is an application designed to display sales information to the user. Different components include: top action bar, side navigation menu, data table, and a form with action buttons. 

The [Invision design document](design-doc) follows our internal and external company design guidelines as [documented here](https://barista.dynatrace.com/components/get-started). It is not necessary for your implementation to meet the exact specifications of the design document, but please use it as a general guide for the functionality and layout of your implementation. You are encouraged to make usability improvements, but be prepared to explain the reasons behind your decisions.

## Application requirements 

- Create global navigation and side menu.
- Create a list of sales leads using live data from the provided REST API endpoint.
- Display all of the available columns.
- Display total count of all records.
- Create ability to add sales leads using the provided REST API endpoint.

## Development practices requirements

- Source code is tracked by a Git repo with focused, understandable commits.
- When using TypeScript, the `any` type is avoided where possible and all types match the object they represent.
- TypeScript is used instead of JavaScript where possible.
- Code is formatted and linted according to a consistent specification.

## Bonus features 

- Reasonable test coverage through automated tests such as unit, component, or E2E tests.
- Do not use jQuery.
- Responsive for tablet and phone.
- Leverage advanced CSS preprocessor features.
- Form validation.
- Error messages.
- Date picker.
- App routing with extra pages.
- Progress loader for requests.
- Table with sorting and pagination.
- Improve the UI in any way.

## Notes

### Open API specification
- http://localhost:3000/api/

### Endpoints 
- GET - http://localhost:3000/api/leads 
- GET - http://localhost:3000/api/leads/{id} 
- POST - http://localhost:3000/api/leads 
- PUT - http://localhost:3000/api/leads/
- DELETE - http://localhost:3000/api/leads/{id} 

### TypeScript interface for a sales lead
```typescript
export interface SalesLeadDto {
  id?: number;
  name: string;
  value: number;
  date: Date;
  clientName: string;
  ownerName: string;
}
```

[design-doc]: https://invis.io/2CQQPI9B6WE#/349121744_Add_Sales_Leads 
[barista-docs]: https://barista.dynatrace.com/components/get-started
