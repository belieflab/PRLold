package firefox;		

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.Assert;		
import org.testng.annotations.Test;		

public class KeyMapLeft {		
		@Test
	   public void reliability() throws InterruptedException {
		   
		   String os = System.getProperty("os.name").toLowerCase();
		   
		   //System.setProperty("webdriver.gecko.driver", "/Users/Joshua/Downloads/geckodriver26");
				  
		   WebDriver driver = new FirefoxDriver();
		   
		   // Open driver , navigate to google.com
		   driver.get("https://google.com");
		   String getTitle = driver.getTitle();
		   Assert.assertEquals(getTitle, "Google");
		   
		   driver.getCurrentUrl();
		   
		   // Navigate to the required web application
		   driver.get("https://belieflab.yale.edu/PRL/code/card_task_01.php");

		   // Enter test ID
		   driver.switchTo().alert().sendKeys("jenkinsTestChrome");
			driver.switchTo().alert().accept();

			// Confirm test ID
			driver.switchTo().alert().sendKeys("jenkinsTestChrome");
			driver.switchTo().alert().accept();
		   
		   // Click the Consent/Next button
		   driver.findElement(By.id("nextButton")).sendKeys(Keys.RETURN);
		   
		   // Input text into required field
		   driver.findElement(By.id("attritionAns")).sendKeys("I will answer open-ended questions.");
		   
		   // Click Next Button
		   driver.findElement(By.id("nextButton")).sendKeys(Keys.RETURN);
		   
		   // Maximize Browser Window
		   driver.manage().window().maximize();
		   
		   // Press 0 key to continue
		   Thread.sleep(1000);
		   driver.findElement(By.tagName("body")).sendKeys("0");
		   
		   // Press 0 key to begin survey
		   Thread.sleep(1000);
		   driver.findElement(By.tagName("body")).sendKeys("0");
		   
		   // Practice , press left key
		   Thread.sleep(1000);
		   driver.findElement(By.tagName("body")).sendKeys("1");
		   
		   //Close Driver
		   driver.quit();
		}		
}	