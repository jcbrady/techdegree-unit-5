# techdegree-unit-5

Unit 5 - Working with API's

Additional Features to CSS
• Added drop shadows to the 12 cards
• Added a hover effect to subtly scale up the names and photos
• Added background image to page for a textured effect

Consider Additional Features to JavaScript
• I want to add functionality to close Modal window if user clicks the background, but this goal is sidetracking me right now. Will come back ot it

Robert's feedback
if you created that element in a function that is invoked in a .then() method, then you would not be able to reference it the way you currently are. When a JS file is loaded up, all the code in there that isn't asynchronous will get parsed immediately. So that updateModal function and the log statement on line 106 will get parsed and executed long before your API request completes and returns a response. And the modal elements won't get made and added to the DOM till after that response comes back.
Also:
You should be adding the "modal-info-container" div to the template literal in the generateModalConstants function. And that template literal should not be generated in a loop, since you should only be making one of those.
