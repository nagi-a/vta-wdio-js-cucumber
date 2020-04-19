Feature: Manage retail fund investments
As a user
I want to compare retail funds using Product facts

@chrome @retail
Scenario Outline: Compare retail funds
    Given I navigate to Vanguard home page
    And I click on Individual and SMSF investors page link
    And I click on Retail managed funds page link
    When I select retail funds "<retailFunds>"
    Then I click on compare button 
    And I see product facts details for "<retailFunds>"

    Examples:
    | retailFunds |
    | Cash-VAN0100AU,Property-VAN0012AU |
    | Cash-VAN0100AU,Property-VAN0012AU,Australian Shares-VAN0017AU |
    | Cash-VAN0100AU,Property-VAN0012AU,Australian Shares-VAN0017AU,International Shares-VAN0107AU |