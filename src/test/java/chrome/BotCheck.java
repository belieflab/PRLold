package chrome;		

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;		
import org.testng.annotations.Test;		

public class BotCheck {		
		@Test
	   public void reliability() throws InterruptedException {
		   
		   String os = System.getProperty("os.name").toLowerCase();
		   
		   //System.setProperty("webdriver.chrome.driver", /usr/bin/chromedriver);
				  
		   WebDriver driver = new ChromeDriver();
		   
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
		   driver.findElement(By.id("nextButton")).click();
		   
		   // Input text into required field
		   driver.findElement(By.id("attritionAns")).sendKeys("I will answer open-ended questions.");
		   
		   // Click Next Button
		   driver.findElement(By.id("nextButton")).click();

		   //Close Driver
		   driver.quit();
		}		
}	