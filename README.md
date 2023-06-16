# PER(N)sonal Budgetting Application

Per(n)sonal Budgetting is an application meant for users to keep track of their expenses and create customizable budgets for future spendings.

## Description 

Each new user can create an account by registering with an email, password, and username. They will then be allowed to access their own personal account, protected with a unique **JWT token**, where they can access the following pages with their respective features:

1. Transactions Page
* **Create** expenses by listing the name, date, category, and amount of each transaction.
* **Edit** or **delete** each transaction.
* **View** specific transactions by entering the name or category in a search bar.
* View a sum of all of their listed transactions.
* Add funds to their account in order to see what proportion of their available funds has been spent (This can be done through the "Manage Account" page.

2. Budget Page
* **Create** new baskets of categories to organize their transactions in.
* Add a limit (budget) for spending in each category.
* **View** the sum of expenses for each category, and how much is left of the limit they set
* Add transactions for each budgetting category
* **Edit** or **delete** each categories and/or each transaction

## Technologies Used

Per(n)sonal Budgetting is a **full-stack** web application built by using the **PERN stack**; 

The app was built entirely in **JavaScript** using **React** as a Front-End Library (with **Bootstrap** stylying), **Express** as a Back-End Framework, **Node.js** as a runtime environment and **PostgreSQL** as a relational database. This app is able to perform all **CRUD** operations

In addition, the application implements **JWT (JSON Web Token)** authentication and authorization mechanisms, ensuring secure user registration and login processes.
