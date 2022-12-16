# Frontend for Yoga Class Enrollment Form
This is the frontend for the Yoga Class Enrollment Form. This app is Hosted at (https://stereogon.github.io/yoga-class-enrollment-form/). The Backend for this application is hosted at (https://yoga-class-enrollment-form-server.onrender.com). The Backend Github Repo Link is https://github.com/stereogon/yoga-class-enrollment-form-server.

# Technologies
1. React.js
2. TailwindCSS
3. Node.js

# Components
1. App
2. EnrollmentForm
3. UserForm
4. PaymentForm
5. Program
6. Button
7. Panel
8. Error
9. InputField
10. Dropdown

# Components Tree
![Dribbble shot - 1 (2)](https://user-images.githubusercontent.com/64136587/208112955-4ca94ede-a515-48db-adc5-2991a8bcde58.png)

# Components Description
## App 
Base Application Component or the Root Component of the entire Component Tree. It is responsible for Rendering the Entire Application.

## EnrollmentForm
Component that contains the Enrollment Form (UserForm and the PaymentForm). It is responsible for rendering the Enrollment Form.

## UserForm
Component That contains the form that collects Enrollment Information from the User (firstName, lastName, age, mobile, month, batch, and gender). It is responsible for Making post request to the application backend to make the enrollment. It is also responsible for displaying the errors encountered during the process.

## PaymentForm
Component That contains the section to search for Enrollments and make payment. It contains search box and area to show the response. It Contains Program Component that collects Billing information.

## Program
This component displays individual Enrollments. This Component also collects the Billing information of the user and shows appropriate html depending upon the payment status of the enrollments. It makes a get request to the application backend to retrieve enrollment records of the mobile number entered in the search field. It also makes a post request to the application backend with the billing info to complete the payment.

## Panel
This is a Component that puts all the children components in a Panel Like Container. Which looks visually nice.

## Button
This is a Wrapper Component for the <button>. This Component Specifies certain properties which can be directly used to get the desired button styling. eg. Primary, Secondary, Success, Warning, Danger, Outline, and Rounded. It can also take any other Properties just like <button>.
  
## InputField
This is a Wrapper Component for the <input>. This Component has inbuild Styling for the <input> tag. Which makes it look visually nice. It can take all the other properties just like <input> tag.
  
## Dropdown
This is a Dropdown Component Which Takes a "data" property. It then Displays the data in a dropdown format. It also takes state and setState properties to get the selected option.
  
## Error
This is a Component to Show the Error Tags on the Forms whenever an error occurs.
  
# Context Description
## FormContext
This contains all the Form related States and setState methods. It also contains other methods which are related to the user form handling.
  
## ErrorContext
This Contains all the Error related states and setState methods.
  
# Custom Hooks
## useMonthString
This contains two functions:
1. getCurrentMonthString(curDate): This returns the month string(MM-YYYY) of the current date. 
2. getNextMonthString(curDate): This returns the month string(MM-YYYY) of the next month according to the current date.
