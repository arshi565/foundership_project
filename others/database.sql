Write style.css code file for the online money transfer portal. Here's a summary of the acceptance criteria
● Customer opens the portal home/landing page and clicks on register me.
● A form is displayed asking a few mandatory fields, few optional fields, and a file
upload option.
● Customer must fill out the form containing an email id and upload an age/Id proof
document (like a passport).
● These details are accepted by the server, a new entry is made to the database and
the file is stored on the server in a user specific folder.
● A username and automatically generated password is sent to the user's email id.
● The user can then log in from the home/landing page.
● Once he/she logs in, they have the option to view/edit their details including the
uploaded file.
● User will also have a dashboard like page, showing different currency exchange
rates which will be fetched from the database.
● He/she can search source and destination countries and get the latest rates
● He/she can also favorite up to 5 such combinations which will be shown
automatically on his dashboard.
Firstly, you would need to create a HTML page for the home/landing page, including the "register me" button which leads to a form. In the form, you would need to include mandatory fields such as first name, last name, email address, and password. The optional fields could include address, phone number, etc. The file upload option could be implemented using a file input field.

Once the user submits the form, you would need to validate the input on the client-side and the server-side. If the validation is successful, you would need to store the user's details in a database and create a user-specific folder on the server to store the uploaded file. You can use a back-end language like Node.js with a framework like Express.js to handle the server-side logic.

To send an email containing the username and password, you can use a third-party email service like SendGrid or Nodemailer.

To implement the login functionality, you would need to create a login page with fields for email address and password. Once the user submits the form, you would need to validate the input on the client-side and the server-side. If the validation is successful, you can authenticate the user by checking the email address and password against the database.

To implement the dashboard, you would need to create a new page that displays the different currency exchange rates fetched from the database. You can use a back-end language like Node.js with a framework like Express.js to handle the database queries. You can also implement a search functionality to allow the user to search for exchange rates between different countries. To implement the favorite functionality, you can use a database to store the user's favorite combinations and display them on the dashboard.
