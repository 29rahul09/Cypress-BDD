Feature: Check BMJopen collections articles

  Scenario: visit collections page of BMJopen journal 
    Given I visit the collection page
    Then  I get all the collections topic
    Then  I visit the topics article pages
    Then  I check the response of articles
    Then  I check for the missing article data
    
