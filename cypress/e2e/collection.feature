Feature: Check response of BMJopen collections articles

  Scenario: visit collections page of BMJopen journal 
    Given I visit browse by collections page 
    # Then  I visit all the collections
    Then  I get all the collections
    # Then I check response of first page articles
    # Then I check response of remaining page articles
    #Then I get all the media files with anchor tag on the page
    #Then I check masking of media file with img tag
    #Then I check masking of media file with anchor tag
    #When I get an unmask media file
    #Then I create a record of unmask media files
