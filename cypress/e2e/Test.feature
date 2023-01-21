Feature: Search somthing on google
  Scenario: visit google and search for doubtnut
    Given I visit google.com
    Then I search for doubtnut.com
    Then I select videos
    When I click on Questionbank
    Then I get the title
