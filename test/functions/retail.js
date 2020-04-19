import * as helper from '../utils/helper';
import { getLogger } from 'log4js';
import {assert, expect} from 'chai';

const logger = getLogger();

let infoMessage = false;
let noOfFundssSel = 0;
 const elements = { 
    homePgBanner: '//div[@id="banner_head"]/img',
    desktopLinkToRetail: '//h2[@class="hideOnSml"]/a[@href="/retail/jsp/home.jsp"]',  
    sliderImage: '#slider',
    retailFundsLink: '//dl//a[contains(@href,"productType=retail")]', 
    loadingIndImage: '//div[not(@class)]/div[@class="loadingindicator"]',
    fundListTable: '#listviewTable',
    fundIdCheckbox: '//div[contains(@class,"vuiScrollingTableLeftSide")]//a[contains(text(),"fundId")]/../../..//input[@type="checkbox"]', 
    fundIdCheckbox1: '//div[contains(@class,"vuiScrollingTableRightSide")]//a[contains(text(),"fundId")]',  
    noFundsSelected: '//span[@ng-if="selectedProducts==0"]',
    compareFundsBtn: '#compareFunds',
    noOfFundsSelected: '//span[@data-ng-bind="selectedProducts"]',
    compareProdLoadingImage: '//div[@id="loadingGif" and not(@style)]',
    compareProductsTable: '#compareTableResults',
    diffFundTypesErrMessage: '#errorMessage',
    fundsToCompare: '//td/strong[@id="identifierDataPnt"]/../following-sibling::td[text()!=""]',
    productName: '#productNameDataPnt',
    fundManager: '#fundManagerDataPnt',
    isin: '#isinDataPnt',
    benchMark: '#benchmarkDataPnt',
    fundSize: '#fundSizeDataPnt',
    minInvstment: '#minimumInvestmentDataPnt',
}
     
export function navigateToHomePage(appendUrl){
    const baseUrl = browser["config"]["baseUrl"];
    helper.navigateToUrl(baseUrl+appendUrl);
    helper.waitForElementDisplayed(elements.homePgBanner, 30);
    helper.waitForElementDisplayed(elements.desktopLinkToRetail);
}

export function navigateToRetailPage(){
    helper.waitForElementDisplayed(elements.desktopLinkToRetail);
    helper.click(elements.desktopLinkToRetail);
    helper.waitForElementDisplayed(elements.sliderImage, 30);
    helper.waitForElementDisplayed(elements.retailFundsLink);
}

export function navigateToRetailManagedFundsPage(){
    helper.waitForElementDisplayed(elements.retailFundsLink);
    helper.click(elements.retailFundsLink);
    helper.waitForElementToDisAppear(elements.loadingIndImage, 60);
    helper.waitForElementDisplayed(elements.fundListTable, 30);
}

export function selectRetailFunds(retailFunds){
    let retailFundDtls = retailFunds.toString().split(",");
    let firstFundType = null;
    let i=0;
    helper.waitForElementDisplayed(elements.noFundsSelected, 60);
    retailFundDtls.forEach(element => {
        let fundType = element.split("-")[0];
        let fundId = element.split("-")[1];
        logger.info("fundType - "+fundType +" fundId - "+fundId);
        browser.waitUntil(()=> $(elements.fundIdCheckbox.replace("fundId", fundId)).isClickable());
        if($(elements.fundIdCheckbox.replace("fundId", fundId)).isClickable())
            i++;
        //helper.click(elements.fundIdCheckbox.replace("fundId", fundId));
        $(elements.fundIdCheckbox.replace("fundId", fundId)).click();
        if( firstFundType != null && firstFundType != fundType)
            infoMessage = true;
        firstFundType = fundType;
        //helper.waitForElementDisplayed(elements.noOfFundsSelected);
        //helper.verifyTextValue(elements.noOfFundsSelected, i);                
    });
    noOfFundssSel = i;
    logger.info("No of funds selected++"+ noOfFundssSel);
    logger.info("Information message++"+ infoMessage);
    helper.waitForElementDisplayed(elements.compareFundsBtn);
}

export function clickCompareButton()
{
    helper.waitForElementEnabled(elements.compareFundsBtn);
    helper.click(elements.compareFundsBtn);
    helper.waitForElementToDisAppear(elements.compareProdLoadingImage);
    helper.waitForElementDisplayed(elements.compareProductsTable);
}

export function compareProductFacts(retailFunds){
    let retailFundDtls = retailFunds.toString().split(",");
    if(infoMessage)
        helper.waitForElementDisplayed(elements.diffFundTypesErrMessage);
    expect(helper.getNumberOfNestedElements(elements.fundsToCompare)).to.equal(retailFundDtls.length);
    retailFundDtls.forEach(element => {
        let fundId = element.split("-")[1];
        helper.verifyTextInMultipleSelectors(helper.getNestedElements(elements.fundsToCompare), fundId);
    });
    helper.waitForElementDisplayed(elements.fundManager);
    helper.waitForElementDisplayed(elements.productName);
    helper.waitForElementDisplayed(elements.isin);
    helper.waitForElementDisplayed(elements.benchMark);
    helper.waitForElementDisplayed(elements.minInvstment);
    helper.waitForElementDisplayed(elements.fundSize);
}
