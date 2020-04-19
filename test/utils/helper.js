import {assert, expect} from 'chai';
import {getLogger} from 'log4js';
const logger = getLogger();
logger.level = "info";



export function navigateToUrl(url){
        //browser.setWindowSize(1080, 1010);
        browser.url(url);
        browser.setTimeout({'pageLoad': 600000});
    }

export function  getNumberOfNestedElements(selector){
        return $$(selector).length;
    }

export function getNestedElements(selector){
    return $$(selector);
}

export function  waitForElementEnabled(selector, timeout){
        $(selector).waitForEnabled(timeout ? timeout * 1000 : 15000);
    }

export function  waitForElementDisplayed(selector, timeout){
        $(selector).waitForDisplayed(timeout * 1000);
    }

export function  waitForElementToDisAppear(selector, timeout){
        browser.waitUntil(
            () => this.isElementDisplayed(selector) === false, timeout * 1000, "Element still present - "+selector+ " after "+timeout*1000+" seconds", 5000
        );
    }

export function  isElementDisplayed(selector){
        return $(selector).isDisplayed();
    }

export function  click(selector){
        browser.waitUntil(()=> this.waitForClickable(selector) === true, 30000, "Element not clickable even after wait of 30 sec ", 5000);
}

export function  waitForClickable(selector){
        try{
            $(selector).waitForDisplayed(10000);
            $(selector).scrollIntoView();
            $(selector).click();
            return true;
        }
        catch(err){
            logger.error(selector+" is not clickable "+err);
            return false;
        }
    }

export function  verifyPartialTextValue(selector, expText){
        try{
            $(selector).waitForDisplayed(5000);
            const value = $(selector).getText();
            expect(value).to.include(expText);
        }
        catch(err){
            assert.fail(err.message+ " : " +selector);
            logger.error(err);
        }
    }

export function verifyTextValue(selector, expText){
        try{
            $(selector).waitForDisplayed(5000);
            browser.waitUntil(()=> { return $(selector).getText().trim() === expText }, 15000, 'expected text to be different \"expected\": ' +expText+ '"\actual\": '+ $(selector).getText());
        }
        catch(err){
            assert.fail(err.message+ " : " +selector);
            logger.error(err);
        }
    }

export function verifyElementValue(selector, expText){
        try{
            $(selector).waitForDisplayed(5000);
            browser.waitUntil(()=> { return $(selector).getValue().trim() === expText }, 15000, 'expected value to be different \"expected\": ' +expText+ '"\actual\": '+ $(selector).getText());
        }
        catch(err){
            assert.fail(err.message+ " : " +selector);
            logger.error(err);
        }
    }

export function inputText(selector, text){
    $(selector).waitForElementDisplayed();
    $(selector).clearValue();
    $(selector).setValue(text);
}

export function verifyTextInMultipleSelectors(selectors, expected){
    try{
        const texts = [];
        selectors.forEach(selector => {
            if(selector.isDisplayed()){
                const text = selector.getText();
                texts.push(text.trim());
            }
        });
        if(texts.indexOf(expected) > -1){
            logger.info("Matched text "+texts[texts.indexOf(expected)]);
            assert.equal(texts[texts.indexOf(expected)], expected);
        }
        else {
            logger.error("All Texts: "+texts);
            assert.fail("Text not matching any selector :"+expected);
        }
    }
    catch(err){
        logger.error(err);
        assert.fail(err.message+ " : "+selectors+expected)
    }
}