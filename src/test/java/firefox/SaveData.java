package firefox;		

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.Assert;		
import org.testng.annotations.Test;		

public class SaveData {		
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
		   driver.get("https://belieflab.yale.edu/capr/prl/code/card_task_01.php");

		   // Enter test ID
		   driver.switchTo().alert().sendKeys("jenkinsTestFirefox");
			driver.switchTo().alert().accept();

			// Confirm test ID
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
		   
		   // Practice , press middle key
		   Thread.sleep(1000);
		   driver.findElement(By.tagName("body")).sendKeys("2");
		   
		   // Practice , press right key
		   Thread.sleep(1000);
		   driver.findElement(By.tagName("body")).sendKeys("3");
		   
		   // Begin Practice survey , press zero
		   Thread.sleep(1000);
		   driver.findElement(By.tagName("body")).sendKeys("0");
		   
		   // Click the Next button
		   driver.findElement(By.id("nextButton")).click();
		   
		   // Key Test , 3 times
		   Thread.sleep(3000);
		   driver.findElement(By.tagName("body")).sendKeys("1");
		   Thread.sleep(3000);
		   driver.findElement(By.tagName("body")).sendKeys("2");
		   Thread.sleep(3000);
		   driver.findElement(By.tagName("body")).sendKeys("3");
		   // Click the Next button
		   Thread.sleep(3000);
		   driver.findElement(By.id("nextButton")).click();
		   
		   // Perform the first 25% of the survey
		   for (int i = 0; i < 41; i++) {
			   Thread.sleep(2000);
			   driver.findElement(By.tagName("body")).sendKeys("1");
			   if (i == 40) {
				   break;
			   }
		   }
		   
		   // Press 0 to go to the next part of the survey
		   Thread.sleep(3000);
		   driver.findElement(By.tagName("body")).sendKeys("0");
		   
		   // Perform the next 25% of survey (50%)
		   for (int i = 0; i < 41; i++) {
			   Thread.sleep(2000);
			   driver.findElement(By.tagName("body")).sendKeys("1");
			   if (i == 40) {
				   break;
			   }
		   }
		   
		   // Press 0 to go to the next part of the survey
		   Thread.sleep(3000);
		   driver.findElement(By.tagName("body")).sendKeys("0");
		   
		   // Perform the next 25% of survey (75%)
		   for (int i = 0; i < 41; i++) {
			   Thread.sleep(2000);
			   driver.findElement(By.tagName("body")).sendKeys("1");
			   if (i == 40) {
				   break;
			   }
		   }
		   
		   // Press 0 to go to the next part of the survey
		   Thread.sleep(3000);
		   driver.findElement(By.tagName("body")).sendKeys("0");
		   
		   // Perform the next 25% of survey (100%)
		   for (int i = 0; i < 41; i++) {
			   Thread.sleep(2000);
			   driver.findElement(By.tagName("body")).sendKeys("1");
			   if (i == 40) {
				   break;
			   }
		   }
		   
		   // End first part of survey , Click link on page
		   driver.findElement(By.xpath("/html/body/div[9]/a")).click();
		   
		   //Close Driver
		   driver.quit();
		}		
}	