Feature: Login 

  Scenario: Check login functionality

    Given visit login page
    Then  enter valid username
    Then  enter valid password
    When  click on login button

