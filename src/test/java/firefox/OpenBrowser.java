package firefox;		

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.Assert;		
import org.testng.annotations.Test;		

public class OpenBrowser {		
		@Test
	   public void portability() throws InterruptedException {
		   
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
		   driver.switchTo().alert().sendKeys("jenkinsTestChrome");
			driver.switchTo().alert().accept();

			// Confirm test ID
			driver.switchTo().alert().accept();
		   
		   //Close Driver
		   driver.quit();
		}		
}	