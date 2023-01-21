Feature: Login 

  Scenario: Check login functionality

    Given I visit login page
    Then I enter valid username
    Then I enter valid password
    When I click on login button
    Then I visit Homepage
    Then I check profile
