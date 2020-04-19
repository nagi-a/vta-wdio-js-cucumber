const { Given } = require('cucumber');
const { When } = require('cucumber');
const { Then } = require('cucumber');
import * as retail from '../functions/retail';

    Given(/^I navigate to Vanguard home page$/, function() {
        retail.navigateToHomePage('/au/portal/homepage.jsp');
    });

    Given(/^I click on Individual and SMSF investors page link$/, function() {
        retail.navigateToRetailPage();
    });

    Given(/^I click on Retail managed funds page link$/, function() {
        retail.navigateToRetailManagedFundsPage();
    });

    When(/^I select retail funds "(.*)"$/, function(retailFunds) {
        retail.selectRetailFunds(retailFunds);
    });

    Then(/^I click on compare button$/, function() {
        retail.clickCompareButton();
    });

    Then(/^I see product facts details for "(.*)"$/, function(retailFunds) {
        retail.compareProductFacts(retailFunds);
    });

    
  
    

    
  